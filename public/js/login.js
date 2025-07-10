document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('error');
    const successMsg = document.getElementById('success');

    // Reset messages
    errorMsg.textContent = '';
    successMsg.textContent = '';

    // Client-side validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorMsg.textContent = "Invalid email format.";
        return;
    }

    if (password.length < 8) {
        errorMsg.textContent = "Password must be at least 8 characters.";
        return;
    }

    try {
        const BASE_URL = window.location.hostname === "localhost"
            ? "http://localhost:3000"
            : "https://auth-klxi.onrender.com";

            const response = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            successMsg.textContent = data.message || "Login successful!";
            setTimeout(()=>{
                window.location.href = "/dashboard";
            },1500)
                
        } else {
            errorMsg.textContent = data.message || "Login failed.";
        }
    } catch (err) {
        console.error(err);
        errorMsg.textContent = "Server error. Please try again.";
    }
});
