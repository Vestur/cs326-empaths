const settingsB = document.getElementById("settings");
settingsB.addEventListener('click', () => {
  window.location.href = "/profileAuth";
});

const searchB = document.getElementById("search");
searchB.addEventListener('click', () => {
  window.location.href = "/searchAuth";
});

const favoritesB = document.getElementById("my_favorites");
favoritesB.addEventListener('click', () => {
  window.location.href = "/favoritesAuth";
});

const likesB = document.getElementById("my_likes");
likesB.addEventListener('click', () => {
  window.location.href = "/likesAuth";
});

const donationsB = document.getElementById("my_donations");
donationsB.addEventListener('click', () => {
  window.location.href = "/donationsAuth";
});

const signoutB = document.getElementById("signout");
signoutB.addEventListener('click', async () => {
  const response = await fetch('/logout', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  console.log(response);
  window.location.href = "login.html";
});

const pfp = document.getElementById('profile-pic');
let options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};
let data = await fetch("/getAccount", options);
let account = await data.json();
if (account.pfp.length > 0) {
  pfp.setAttribute("src", account.pfp);
} else {
  pfp.setAttribute("src", 'images/profile.png')
}
