async function getAccount() {
  try {
    const response = await fetch(`/getAccount`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}


async function createAccount() {
  const response = await fetch(`/createAccount`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

const signupB = document.getElementById("signup");
signupB.addEventListener('click', async () => {
  // here, account with be created and added to database
  // placeholder for milestone 3
  const account = await createAccount();

  window.location.href = "profile.html";
});

// const loginB = document.getElementById("login");
// loginB.addEventListener('click', async (e) => {
//   e.preventDefault()
//   let loginForm = new FormData();
//   loginForm.append('username', document.getElementById('username').value);
//   loginForm.append('password', document.getElementById('password').value);

//   const response = await fetch('/login', {
//     method: 'POST',
//     body: loginForm
//   });

//   console.log(response);
// });
