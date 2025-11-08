/*
  pewpi_core.js
  Shared client-side utilities for PewPi pages:
   - WebCrypto PBKDF2(250k)+AES-GCM encrypt/decrypt
   - GitHub Contents API helpers (GET contents, PUT commit)
   - Token/session management (sessionStorage + BroadcastChannel)
   - Small helpers to wire pages together (auto-start chat when token appears)

  Usage (minimal):
   1) Include <script src="pewpi_core.js"></script> in each HTML page (before other scripts that use PewPi).
   2) Call PewPi.init() once on page load.
   3) Use PewPi.decryptObject(blob, pass) / PewPi.encryptObject(obj, pass) to decrypt/encrypt blobs.
   4) Use PewPi.setToken(token) to load a token in-memory and broadcast to other tabs.
   5) Use PewPi.fetchRepoFile(...) and PewPi.commitFile(...) for GitHub operations.

  NOTE:
   - This file does not perform any UI actions directly; it exposes functions your pages can call.
   - It stores the token in sessionStorage under key 'gh.token' and broadcasts it on channel 'pewpi-token'.
   - Commits require a PAT loaded into the session (via setToken or pass token explicitly).
*/

(function(global){
  const ITER = 250000;
  const SALT_BYTES = 16;
  const IV_BYTES = 12;
  const TOKEN_KEY = 'gh.token';
  const CHANNEL_NAME = 'pewpi-token';

  // --- helpers ---
  function u8FromB64(s){
    const bin = atob(s);
    const u = new Uint8Array(bin.length);
    for(let i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i);
    return u;
  }
  function u8ToB64(u8){
    let s = '';
    for(let i=0;i<u8.length;i++) s += String.fromCharCode(u8[i]);
    return btoa(s);
  }
  function randU8(n){ const a = new Uint8Array(n); crypto.getRandomValues(a); return a; }

  async function deriveKey(pass, saltU8, usages=['encrypt','decrypt']){
    const enc = new TextEncoder();
    const base = await crypto.subtle.importKey('raw', enc.encode(pass), 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey({ name:'PBKDF2', salt: saltU8, iterations: ITER, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, usages);
  }

  // --- encryption / decryption (blob format: { v, salt, iv, ct, created_at }) ---
  async function encryptObject(obj, pass){
    const salt = randU8(SALT_BYTES);
    const iv = randU8(IV_BYTES);
    const key = await deriveKey(pass, salt, ['encrypt']);
    const ct = await crypto.subtle.encrypt({ name:'AES-GCM', iv }, key, new TextEncoder().encode(JSON.stringify(obj)));
    return { v:1, salt: u8ToB64(salt), iv: u8ToB64(iv), ct: u8ToB64(new Uint8Array(ct)), created_at: new Date().toISOString() };
  }

  async function decryptObject(blob, pass){
    if(!blob || !blob.ct) throw new Error('Invalid ciphertext blob');
    const salt = u8FromB64(blob.salt);
    const iv   = u8FromB64(blob.iv);
    const ct   = u8FromB64(blob.ct);
    const key = await deriveKey(pass, salt, ['decrypt']);
    const pt = await crypto.subtle.decrypt({ name:'AES-GCM', iv }, key, ct.buffer);
    const txt = new TextDecoder().decode(pt);
    try { return JSON.parse(txt); } catch(e){ return txt; }
  }

  // --- session/token management ---
  function setToken(token){
    if(!token) return;
    sessionStorage.setItem(TOKEN_KEY, token);
    // broadcast to other tabs
    try {
      const ch = new BroadcastChannel(CHANNEL_NAME);
      ch.postMessage({ token });
      ch.close();
    } catch(e){
      // BroadcastChannel may be unavailable in some environments; fallback to localStorage ping
      try {
        localStorage.setItem('pewpi_token_ping', JSON.stringify({ token, ts: Date.now() }));
      } catch(_) {}
    }
    // keep an in-memory var for convenience
    _INMEM_TOKEN = token;
  }
  function clearToken(){
    sessionStorage.removeItem(TOKEN_KEY);
    _INMEM_TOKEN = null;
  }
  function getToken(){
    return sessionStorage.getItem(TOKEN_KEY) || _INMEM_TOKEN || null;
  }

  // --- GitHub Contents API helpers ---
  async function getFileInfo(owner, repo, path, branch='main'){
    const url = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(branch)}`;
    const headers = { Accept:'application/vnd.github.v3+json' };
    const token = getToken();
    if(token) headers.Authorization = 'Bearer ' + token;
    const r = await fetch(url, { headers });
    if(r.status === 404) return { exists:false };
    const j = await r.json();
    if(!r.ok) throw new Error(`GET failed ${r.status}: ${j && j.message ? j.message : JSON.stringify(j)}`);
    return { exists:true, sha: j.sha, content: j.content };
  }

  async function commitFile(owner, repo, branch, path, message, contentBase64, sha){
    const token = getToken();
    if(!token) throw new Error('No PAT loaded for commit');
    const url = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${encodeURIComponent(path)}`;
    const body = { message, content: contentBase64, branch };
    if(sha) body.sha = sha;
    const r = await fetch(url, { method:'PUT', headers:{ Authorization: 'Bearer ' + token, Accept:'application/vnd.github.v3+json', 'Content-Type':'application/json' }, body: JSON.stringify(body) });
    const j = await r.json().catch(()=>null);
    if(!r.ok) throw new Error(`Commit failed ${r.status}: ${j && j.message ? j.message : JSON.stringify(j)}`);
    return j;
  }

  // --- fetch raw/public helper with token fallback ---
  async function fetchRepoFile(owner, repo, branch, path){
    // try raw.githubusercontent first (public)
    const rawUrl = `https://raw.githubusercontent.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/${encodeURIComponent(branch)}/${path}`;
    try {
      const r = await fetch(rawUrl, { cache:'no-store' });
      if(r.ok) return { ok:true, text: await r.text(), source: rawUrl };
    } catch(e){ /* ignore */ }
    // fallback to API using token
    const token = getToken();
    if(token){
      const api = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(branch)}`;
      const r = await fetch(api, { headers:{ Authorization:'Bearer ' + token, Accept:'application/vnd.github.v3.raw' } });
      if(r.ok) return { ok:true, text: await r.text(), source: api };
      const body = await r.text().catch(()=>String(r.status));
      return { ok:false, err: `GitHub API ${r.status}: ${body}` };
    }
    return { ok:false, err: 'Raw fetch failed and no token available for API.' };
  }

  // --- BroadcastChannel receiver & init ---
  let _INMEM_TOKEN = null;
  function startReceiver(){
    try {
      const ch = new BroadcastChannel(CHANNEL_NAME);
      ch.onmessage = (ev) => {
        if(ev.data && ev.data.token){
          sessionStorage.setItem(TOKEN_KEY, ev.data.token);
          _INMEM_TOKEN = ev.data.token;
          // auto-start chat if page provides startChatMode / startPortalChat
          if(typeof global.startChatMode === 'function') try{ global.startChatMode(); }catch(e){}
          if(typeof global.startPortalChat === 'function') try{ global.startPortalChat(); }catch(e){}
        }
      };
    } catch(e){
      // fallback: listen for localStorage ping (simple)
      window.addEventListener('storage', (ev) => {
        if(ev.key === 'pewpi_token_ping' && ev.newValue){
          try {
            const parsed = JSON.parse(ev.newValue);
            if(parsed && parsed.token){
              sessionStorage.setItem(TOKEN_KEY, parsed.token);
              _INMEM_TOKEN = parsed.token;
              if(typeof global.startChatMode === 'function') try{ global.startChatMode(); }catch(e){}
              if(typeof global.startPortalChat === 'function') try{ global.startPortalChat(); }catch(e){}
            }
          } catch(_) {}
        }
      });
    }
  }

  // --- convenience auto-start: if token exists start chat on load ---
  function autoStartIfToken(){
    const t = getToken();
    if(t){
      if(typeof global.startChatMode === 'function') try{ global.startChatMode(); }catch(e){}
      if(typeof global.startPortalChat === 'function') try{ global.startPortalChat(); }catch(e){}
    }
  }

  // --- public API ---
  const PewPi = {
    // crypto
    encryptObject,
    decryptObject,
    // token/session
    setToken,
    clearToken,
    getToken,
    // broadcast
    startReceiver,
    // GitHub
    getFileInfo,
    commitFile,
    fetchRepoFile,
    // helpers
    autoStartIfToken,
    // small util to replace embedded blob in page (not writing files, just returns string)
    makeEmbeddedSnippet: async (obj, pass) => JSON.stringify(await encryptObject(obj, pass), null, 2),

    // init: start token receiver and attempt auto-start if token present
    init: function(){
      startReceiver();
      // slight delay so other onload setup can finish
      window.addEventListener('load', ()=>{ setTimeout(autoStartIfToken, 300); });
    }
  };

  // expose
  global.PewPi = PewPi;
  // auto-init
  if(typeof document !== 'undefined') PewPi.init();

})(window);