import Cookies from "js-cookie";

export function setCookie(name, value, options = {}) {
    Cookies.set(name, value, options);
}

export function getCookie(name) {
    return Cookies.get(name);
}

export function removeCookie(name) {
    Cookies.remove(name);
}

export function logout() {
    Cookies.remove("token");
    Cookies.remove("id");
    Cookies.remove("username");
    Cookies.remove("role");
    Cookies.remove("drawer-state");
}

export function urlbase() {
    // return "http://localhost:8080";
    return "https://ksu-srikandi.up.railway.app";
}

