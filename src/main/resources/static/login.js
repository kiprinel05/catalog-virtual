document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Oprește trimiterea formularului prin GET

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token); // Stochează token-ul JWT
                window.location.href = "/index.html"; // Redirecționează utilizatorul după login
            } else {
                document.getElementById("errorMessage").style.display = "block";
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
});
