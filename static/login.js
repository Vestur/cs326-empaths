const loginB = document.getElementById("login");
loginB.addEventListener('click', () => {
    window.location.href = "search.html";
});

const signupB = document.getElementById("signup");
signupB.addEventListener('click', () => {
    //add account to data base?
    window.location.href = "profile.html";
});

const username = document.getElementById("username").value;
const password = document.getElementById("password").value; 

//how to get this info to create and save Account?
//async functions