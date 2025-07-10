document.getElementById('signupForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('error');
    const successMsg = document.getElementById('success');

    // Reset messages
    errorMsg.textContent = '';
    successMsg.textContent = '';

    // Validation
    if (username.length < 3 || username.length > 20) {
        errorMsg.textContent = "Username must be between 3 and 20 characters.";
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorMsg.textContent = "Invalid email format.";
        return;
    }

    if (password.length < 8 || !/[!@#$%^&*]/.test(password)) {
        errorMsg.textContent = "Password must be at least 8 characters and include a special character.";
        return;
    }

    // Send data to backend (mocked for now)
    try {
        const response = await fetch("http://localhost:3000/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            successMsg.textContent = "Signup successful!";
        } else {
            errorMsg.textContent = data.message || "Signup failed.";
        }
    } catch (err) {
        console.error(err);
        errorMsg.textContent = "Server error. Please try again.";
    }
});
