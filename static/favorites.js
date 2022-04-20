import { createCharityCard } from "./utils.js";

async function getLikedCharities() {
  const response = await fetch("/getFavoritedCharities", {
      method: 'GET',
  });
  const data = await response.json();
  console.log("hi", data);
  return data;
}

const charities = await getLikedCharities();
const favoritesWrapper = document.getElementById("favorites-wrapper");

for(let charity of charities) {
  favoritesWrapper.appendChild(createCharityCard(charity));
}
