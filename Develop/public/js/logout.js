document.addEventListener("DOMContentLoaded", () => {
    const logoutLink = document.getElementById("logout-link");

    if (logoutLink) {
        logoutLink.addEventListener("click", async (event) => {
            event.preventDefault();
            console.log("logout clicked");

            try {
                const response = await fetch("/api/users/logout", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                });
                console.log("logout response", response);

                if (response.ok) {
                    // Redirect to the login page
                    window.location.replace("/login");
                } else {
                    alert(response.statusText);
                }
            } catch (err) {
                console.error("logout error", err);
            }
        });
    }
});