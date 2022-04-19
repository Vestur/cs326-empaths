const loginB = document.getElementById("login");
loginB.addEventListener('click', () => {
    window.location.href = "search.html";
    //this is a placeholder for later authentication, just a bandaid for chaning the page for now
    //will try to use express endpoints and redirect to achieve this
    //GET account using CRUD
});

const signupB = document.getElementById("signup");
signupB.addEventListener('click', () => {
    //add account to data base? 
    //just use CRUD operations to add to JSOn file
    window.location.href = "profile.html";
});

const username = document.getElementById("username").value;
const password = document.getElementById("password").value; 

//how to get this info to create and save Account?
//async functions