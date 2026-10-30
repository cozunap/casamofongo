/**
 * Smart Browser Language Detection for La Casa Del Mofongo
 * Automatically routes users between English and Spanish (/es/) based on browser language
 */
(function() {
  try {
    // Check if user manually opted out or already chose
    const userPreferred = localStorage.getItem('user_lang_pref');
    const path = window.location.pathname;
    const isSpanishUrl = path.startsWith('/es/') || path === '/es';

    // If preference already set, respect it
    if (userPreferred === 'es' && !isSpanishUrl) {
      const target = '/es/' + (path.split('/').filter(Boolean).pop() || 'index.html');
      window.location.replace(target);
      return;
    } else if (userPreferred === 'en' && isSpanishUrl) {
      const target = '/' + (path.split('/').filter(Boolean).pop() || 'index.html');
      window.location.replace(target);
      return;
    }

    // Detect browser language
    const browserLang = (navigator.languages && navigator.languages.length) 
      ? navigator.languages[0] 
      : (navigator.language || navigator.userLanguage || '');

    const isSpanishBrowser = browserLang.toLowerCase().startsWith('es');

    if (isSpanishBrowser && !isSpanishUrl) {
      // User browser is Spanish, route to /es/
      const file = path.split('/').filter(Boolean).pop() || 'index.html';
      const cleanFile = file.endsWith('.html') ? file : 'index.html';
      localStorage.setItem('user_lang_pref', 'es');
      window.location.replace('/es/' + cleanFile);
    } else if (!isSpanishBrowser && isSpanishUrl && !userPreferred) {
      // Non-spanish browser accessed /es directly without preference, stay or route
      // Leave as is or set pref
    }
  } catch (e) {
    // Fail silently without breaking page execution
  }
})();
