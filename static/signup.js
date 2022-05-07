async function createAccount() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const zip = document.getElementById('zip').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const img = document.getElementById('display-image').src;
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
        password: password,
        pfp: img
      })
    });
    const data = await response.json();
    return data;
}

document.getElementById('signup').addEventListener('click', async () => {
    await createAccount();
    window.location.href = "login.html";
});

document.getElementById('image-input').addEventListener('change', function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const uploaded_image = reader.result;
      document.getElementById('display-image').src = uploaded_image;
    });
    reader.readAsDataURL(this.files[0]);
});
