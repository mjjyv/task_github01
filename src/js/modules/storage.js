/**
 * Local Storage Module
 * Manages browser persistence safely.
 */

import { APP_CONFIG } from '../config.js';

export function saveContent(content) {
    try {
        localStorage.setItem(APP_CONFIG.STORAGE_KEY, content);
        return true;
    } catch (e) {
        console.warn('Không thể lưu vào LocalStorage:', e);
        return false;
    }
}

export function loadContent() {
    try {
        return localStorage.getItem(APP_CONFIG.STORAGE_KEY);
    } catch (e) {
        console.warn('Không thể đọc từ LocalStorage:', e);
        return null;
    }
}

export function clearContent() {
    try {
        localStorage.removeItem(APP_CONFIG.STORAGE_KEY);
    } catch (e) {}
}
