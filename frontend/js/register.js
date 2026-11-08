
const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const message = document.getElementById("registerMessage");
    const button = document.getElementById("registerButton");

    button.disabled = true;
    button.textContent = "Creating account...";
    message.textContent = "";

    try {
        const { data } = await api.post("/public-user/register", { name, email, password });

        showMessage(
            message,
            data.message || data.msg || "Registration successful. You can now log in.",
            false
        );

        registerForm.reset();

        // Navigate to login after the success message is displayed.
        // OTP verification must be implemented by the backend before
        // this flow can be changed to require actual OTP verification.
    } catch (error) {
        showMessage(message, apiErrorMessage(error));
    } finally {
        button.disabled = false;
        button.textContent = "Create account";
    }
});
