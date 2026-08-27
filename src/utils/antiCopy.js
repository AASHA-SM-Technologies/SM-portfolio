/**
 * Anti-Copy & Portfolio Media Protection Deterrents
 * Provides browser-side deterrents against casual copying and inspect triggers
 * while ensuring normal form input elements work seamlessly.
 */

export function initializeAntiCopyDeterrents() {
  const handleContextMenu = (e) => {
    if (['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) return;
    e.preventDefault();
  };

  const handleKeyDown = (e) => {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S')) ||
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c'))
    ) {
      if (['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) return;
      e.preventDefault();
    }
  };

  document.addEventListener('contextmenu', handleContextMenu);
  document.addEventListener('keydown', handleKeyDown);

  return () => {
    document.removeEventListener('contextmenu', handleContextMenu);
    document.removeEventListener('keydown', handleKeyDown);
  };
}
