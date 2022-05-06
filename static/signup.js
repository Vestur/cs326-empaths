async function createAccount() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const zip = document.getElementById('zip').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const response = await fetch(`/createAccount`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        location: zip,
        username: username,
        password: password
      })
    });
    const data = await response.json();
    return data;
}

document.getElementById('signup').addEventListener('click', async () => {
    await createAccount();
    window.location.href = "login.html";
});
