document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const apiKey = document.getElementById('email').value;
    const apiSecret = document.getElementById('password').value;
    localStorage.setItem("api_key",apiKey);
    localStorage.setItem("api_secret",apiSecret);

    try {
      const profileData = await window.electronAPI.getProfile(apiKey, apiSecret);
      // console.log('Profile:', profileData);
  

      window.electronAPI.sendLoginSuccess(profileData);

      alert('Login successful!');
    } catch (err) {
      alert(err.message);
    }
  });
});
