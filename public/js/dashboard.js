document.getElementById("logoutBtn").addEventListener("click", async () => {
  try {
    const response = await fetch('/logout', {
      method: 'GET',
      credentials: 'include' // send cookies
    });

    if (response.ok) {
      alert("You have been logged out!");
      window.location.href = "/login"; // redirect to login
    } else {
      alert("Logout failed.");
    }
  } catch (error) {
    console.error("Logout error:", error);
    alert("Something went wrong.");
  }
});
fetch('/api/user')
    .then(res => res.json())
    .then(data => {
      document.getElementById('greeting').textContent = `Hello, ${data.username}!`;
    })
    .catch(err => console.log(err));
