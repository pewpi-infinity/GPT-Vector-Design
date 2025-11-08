// Add this at the end of your existing <script> (before </script>)
;(function enableOnTapForMobile(){
  try {
    const userInput = document.getElementById('user-input');
    const forceToggle = document.getElementById('force-enable');
    // If elements are missing, abort silently
    if (!userInput || !forceToggle) return;

    // Ensure input can receive focus even if temporarily enabled
    userInput.setAttribute('tabindex', '0');
    userInput.autocomplete = 'off';

    // On touchstart (mobile) or mousedown (desktop), enable and focus
    function enableAndFocusOnce(e){
      if (!userInput.disabled) return;
      e && e.preventDefault();
      // enable UI for testing
      try { forceToggle.checked = true; } catch(_) {}
      try { userInput.disabled = false; } catch(_) {}
      // small delay before focusing to let the browser render state change
      setTimeout(()=> {
        try { userInput.focus(); } catch(_) {}
      }, 60);
      // keep this handler but allow future taps to behave normally
    }

    // Use touchstart for mobile and mousedown for non-touch fallback
    userInput.addEventListener('touchstart', enableAndFocusOnce, {passive:false});
    userInput.addEventListener('mousedown', enableAndFocusOnce);

    // If the user navigates away and back or reloads, the script still applies.
    console.debug('enableOnTapForMobile active');
  } catch (err) {
    console.warn('enableOnTapForMobile error', err);
  }
})();