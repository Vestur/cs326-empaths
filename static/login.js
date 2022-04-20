/**
 * sync function getAccount() {
    try {
      const response = await fetch(`/getAccount?account_id=${id}`, {
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
      body: JSON.stringify({ name: name }),
    });
    const data = await response.json();
    return data;
  }
 */


const loginB = document.getElementById("login");
loginB.addEventListener('click', () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value; 
    window.location.href = "search.html";
    //this is a placeholder for later authentication, just a bandaid for changing the page for now
    //will try to use express endpoints and redirect to achieve this
    //GET account using CRUD
});

const signupB = document.getElementById("signup");
signupB.addEventListener('click', () => {
    //add account to data base? 
    //just use CRUD operations to add to JSON file
    window.location.href = "profile.html";
});



