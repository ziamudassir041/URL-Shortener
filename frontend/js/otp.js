
const otpForm = document.getElementById("otpForm");

if (!otpForm) {
    const message = document.getElementById("otpMessage");
    if (message) showMessage(message, "OTP verification is not connected. The backend does not provide an OTP endpoint.");
} else {
otpForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const message = document.getElementById("otpMessage");

    showMessage(
        message,
        "OTP verification is not connected yet. A backend verification endpoint is required."
    );
});
}
