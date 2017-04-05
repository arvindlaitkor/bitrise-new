/**
 * Helpers Methods
 */

// Generade UID
export const uid = () =>
  Math.random().toString(34).slice(2);

// Tests an email
export const isValidEmail = email =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Formats numbers with coma
export const numberWithCommas = (x) => {
  if (!x) return '0';
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Checks if a device is touch
export const isTouchDevice = () =>
  (('ontouchstart' in window)
    || (navigator.MaxTouchPoints > 0)
    || (navigator.msMaxTouchPoints > 0));
