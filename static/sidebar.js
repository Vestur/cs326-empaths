//side-bar buttons & event listeners --> to switch between pages
//window.location.href = "search.html";
const settingsB = document.getElementById("settings");
settingsB.addEventListener('click', () => {
    window.location.href = "profile.html";
});

const searchB = document.getElementById("search");
searchB.addEventListener('click', () => {
    window.location.href = "search.html";
});

const favoritesB = document.getElementById("my_favorites");
favoritesB.addEventListener('click', () => {
    window.location.href = "favorites.html";
});

const likesB = document.getElementById("my_likes");
likesB.addEventListener('click', () => {
    window.location.href = "likes.html";
});

const donationsB = document.getElementById("my_donations");
donationsB.addEventListener('click', () => {
    window.location.href = "donations.html";
});

const signoutB = document.getElementById("signout");
signoutB.addEventListener('click', () => {
    window.location.href = "login.html";
});

const pfp = document.getElementById('profile-pic');
let options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};
let data = await fetch("/getAccount?account_id=1", options);
let account = await data.json();
pfp.setAttribute("src", account.pfp);

//send login info to server

//dynamically create the page
//fetch static html page
//fetch call,
//call repsonse.text
//wrap in div?
//document.body.innerHTML
//
//form fetch for you?

///route called login, redirect to user dashboard (better way for login information)
//redirect denied or go to
//express app.get(path,)
//res.redirect
