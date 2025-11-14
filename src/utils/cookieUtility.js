/**
 * Utilidad para manejar cookies de forma segura
 */

/**
 * Establece una cookie
 * @param {string} name - Nombre de la cookie
 * @param {string} value - Valor de la cookie
 * @param {number} days - Días de expiración (por defecto 7 días)
 * @param {object} options - Opciones adicionales (path, domain, secure, sameSite)
 */
export const setCookie = (name, value, days = 7, options = {}) => {
    const {
        path = '/',
        domain = '',
        secure = true,
        sameSite = 'Strict'
    } = options;

    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=${path}`;

    if (domain) {
        cookieString += `;domain=${domain}`;
    }

    if (secure) {
        cookieString += ';secure';
    }

    if (sameSite) {
        cookieString += `;sameSite=${sameSite}`;
    }

    document.cookie = cookieString;
};

/**
 * Obtiene el valor de una cookie
 * @param {string} name - Nombre de la cookie
 * @returns {string|null} - Valor de la cookie o null si no existe
 */
export const getCookie = (name) => {
    const nameEQ = encodeURIComponent(name) + '=';
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
        }
    }

    return null;
};

/**
 * Elimina una cookie
 * @param {string} name - Nombre de la cookie
 * @param {object} options - Opciones (path, domain)
 */
export const removeCookie = (name, options = {}) => {
    const { path = '/', domain = '' } = options;

    let cookieString = `${encodeURIComponent(name)}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=${path}`;

    if (domain) {
        cookieString += `;domain=${domain}`;
    }

    document.cookie = cookieString;
};

/**
 * Verifica si una cookie existe
 * @param {string} name - Nombre de la cookie
 * @returns {boolean} - true si la cookie existe
 */
export const hasCookie = (name) => {
    return getCookie(name) !== null;
};

