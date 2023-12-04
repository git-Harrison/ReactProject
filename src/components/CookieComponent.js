import React, { useState, useEffect } from "react";

// 쿠키 값을 가져옴
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return '';
}

// 쿠키를 설정
export function setCookie(name, value, days) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    const cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
    document.cookie = cookie;
}

export function useCookie(name, defaultValue) {
    const [cookieValue, setCookieValue] = useState(() => {
        const storedValue = getCookie(name); // 초기값으로 쿠키의 값을 가져옴
        return storedValue || defaultValue; // 가져온 값이 없을 경우 defaultValue
    });

    // 쿠키 값의 변경을 감지하고 cookieValue를 업데이트
    useEffect(() => {
        const storedValue = getCookie(name);
        if (storedValue) {
            setCookieValue(storedValue);
        }
    }, [name]);

    //cookieValue를 업데이트하고 쿠키를 설정
    const updateCookieValue = (value) => {
        setCookieValue(value);
        setCookie(name, value, 7);
    };

    return [cookieValue, updateCookieValue];
}