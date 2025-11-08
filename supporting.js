// --- GitHub Repo / File Auto-Loader ---
const repoSelect = $('repo_select');
const fileSelect = $('file_select');
const loadBtn    = $('load_file');
const repoStatus = $('repo_status');

repoSelect.onchange = async () => {
  const repo = repoSelect.value;
  if (!repo) { 
    fileSelect.innerHTML = '<option value="">Select File</option>';
    fileSelect.disabled = true; loadBtn.disabled = true;
    repoStatus.textContent = "No repository selected.";
    return;
  }
  repoStatus.textContent = "Fetching file list from " + repo + "...";
  try {
    const token = getToken();
    const res = await fetch(`https://api.github.com/repos/YourUser/${repo}/contents`, {
      headers: { Authorization: `token ${token}` }
    });
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("Invalid response");
    const files = data.filter(f => f.type === 'file');
    fileSelect.innerHTML = files.map(f => `<option value="${f.path}">${f.name}</option>`).join('');
    fileSelect.disabled = false;
    loadBtn.disabled = false;
    repoStatus.textContent = `Loaded ${files.length} files from ${repo}`;
  } catch (e) {
    repoStatus.textContent = "Error: " + e.message;
  }
};

loadBtn.onclick = async () => {
  const repo = repoSelect.value, path = fileSelect.value;
  if (!repo || !path) return;
  repoStatus.textContent = `Fetching ${path}...`;
  try {
    const token = getToken();
    const res = await fetch(`https://api.github.com/repos/YourUser/${repo}/contents/${path}`, {
      headers: { Authorization: `token ${token}` }
    });
    const file = await res.json();
    const decoded = atob(file.content || '');
    $('admin_blob').value = decoded;
    repoStatus.textContent = `Loaded ${path} (${(decoded.length/1024).toFixed(1)} KB)`;
  } catch (e) {
    repoStatus.textContent = "Load error: " + e.message;
  }
};
