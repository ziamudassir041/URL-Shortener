
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const message = document.getElementById("loginMessage");
    const button = document.getElementById("loginButton");

    button.disabled = true;
    button.textContent = "Logging in...";
    message.textContent = "";

    try {
        const { data } = await api.post("/public-user/login", { email, password });

        const token = data.token || data.accessToken;

        if (!token) {
            throw new Error("Login response did not contain a token.");
        }

        saveToken(token);
        window.location.href = "dashboard.html";
    } catch (error) {
        showMessage(message, apiErrorMessage(error));
    } finally {
        button.disabled = false;
        button.textContent = "Login";
    }
});
