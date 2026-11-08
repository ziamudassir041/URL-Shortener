
function saveToken(token) {
    if (token) {
        localStorage.setItem("token", token);
    }
}

function getToken() {
    return localStorage.getItem("token");
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

function showMessage(element, message, isError = true) {
    if (!element) return;
    element.textContent = message;
    element.className = isError ? "auth-message error" : "auth-message success";
}

function apiErrorMessage(error) {
    const data = error.response?.data;
    if (typeof data?.message === "string") return data.message;
    if (typeof data?.msg === "string") return data.msg;
    if (error.code === "ERR_NETWORK") return "Cannot reach the server. Check that the backend is running.";
    return error.message || "An unexpected error occurred.";
}
