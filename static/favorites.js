import { createCharityCard, createCharityPlaceholder, num_favorited } from "./utils.js";

async function getLikedCharities() {
  const response = await fetch("/getFavoritedCharities", {
      method: 'GET',
  });
  const data = await response.json();
  return data;
}

const favoritesWrapper = document.getElementById("favorites-wrapper");
for(let i = 0; i < num_favorited; i++) {
  favoritesWrapper.appendChild(createCharityPlaceholder());
}

const charities = await getLikedCharities();
favoritesWrapper.innerHTML = "";

for(let charity of charities) {
  favoritesWrapper.appendChild(await createCharityCard(charity));
}
