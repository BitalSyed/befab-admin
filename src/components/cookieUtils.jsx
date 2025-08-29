// cookieUtils.js

const API_URL = import.meta.env.VITE_API; // Get from .env

/**
 * Set a cookie
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {number} [days] - Days until expiration (optional)
 */
export function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value || "")}${expires}; path=/`;
}

/**
 * Get a cookie value
 * @param {string} name - Cookie name
 * @returns {string|null} Cookie value or null if not found
 */
export function getCookie(name) {
  const nameEQ = encodeURIComponent(name) + "=";
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    while (cookie.charAt(0) === " ") cookie = cookie.substring(1);
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }
  return null;
}

/**
 * Delete a cookie
 * @param {string} name - Cookie name
 */
export function deleteCookie(name) {
  document.cookie = `${encodeURIComponent(name)}=; Max-Age=-99999999; path=/`;
}

// Export API_URL so components can use it too
export { API_URL };
