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
    const response = await fetch(`/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: faker.name.firstName() }),
    });
    const data = await response.json();
    return data;
  }


const loginB = document.getElementById("login");
loginB.addEventListener('click', () => {
    const username = document.getElementById("username").value; // will later replace faker data 
    const password = document.getElementById("password").value; // will be added during authentication
    window.location.href = "search.html";
    // this is a placeholder for later authentication, just a bandaid for changing the page for now
    // will try to use express endpoints and redirect to achieve this
    // will GET account from database
});

const signupB = document.getElementById("signup");
signupB.addEventListener('click', () => {
    // here, account with be created and added to database 
    // placeholder for milestone 3
    const account = await createAccount();
     
    window.location.href = "profile.html";
});



