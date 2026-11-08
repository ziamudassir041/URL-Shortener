
const shortenForm = document.getElementById("shortenForm");

if (shortenForm) {
    const originalUrlInput = document.getElementById("originalUrl");
    const shortNameInput = document.getElementById("shortName");
    const shortenButton = document.getElementById("shortenButton");
    const message = document.getElementById("message");
    const result = document.getElementById("result");
    const shortUrlLink = document.getElementById("shortUrl");
    const copyButton = document.getElementById("copyButton");

    shortenForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const originalUrl = originalUrlInput.value.trim();
        const shortName = shortNameInput.value.trim();
        try {
            const parsedUrl = new URL(originalUrl);
            if (!["http:", "https:"].includes(parsedUrl.protocol)) throw new Error();
        } catch {
            showMessage(message, "Enter a valid URL starting with http:// or https://.");
            return;
        }
        if (!/^[A-Za-z0-9_-]{1,50}$/.test(shortName)) {
            showMessage(message, "Use 1–50 letters, numbers, underscores, or hyphens for the short name.");
            return;
        }

        shortenButton.disabled = true;
        shortenButton.textContent = "Creating...";
        result.hidden = true;

        try {
            const response = await api.post(
                "/private-user/shortener",
                { originalUrl, shortName }
            );

            const data = response.data;

            if (!data.shortUrl) {
                throw new Error(
                    "The API did not return a shortUrl. Check the backend response."
                );
            }

            shortUrlLink.href = data.shortUrl;
            shortUrlLink.textContent = data.shortUrl;
            result.hidden = false;

            showMessage(
                message,
                data.message || data.msg || "Short URL created successfully.",
                false
            );

        } catch (error) {
            showMessage(
                message,
                apiErrorMessage(error)
            );
        } finally {
            shortenButton.disabled = false;
            shortenButton.innerHTML =
                'Shorten URL <span aria-hidden="true">→</span>';
        }
    });

    copyButton.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(shortUrlLink.textContent);
            copyButton.textContent = "Copied!";

            setTimeout(() => {
                copyButton.textContent = "Copy";
            }, 1500);

        } catch {
            showMessage(
                message,
                "Copy failed. Please copy the link manually."
            );
        }
    });
}
