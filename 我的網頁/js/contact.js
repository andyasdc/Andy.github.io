
window.addEventListener('pageshow', event => {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  const navEntries = performance.getEntriesByType?.('navigation') || [];
  const navType = navEntries[0]?.type;
  if (event.persisted || navType === 'back_forward') {
    form.reset();
  }
});