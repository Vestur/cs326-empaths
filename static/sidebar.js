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

const listsB = document.getElementById("my_lists");
listsB.addEventListener('click', () => {
    window.location.href = "mylists.html";
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