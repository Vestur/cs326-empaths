import { createCharityCard, createCharityPlaceholder, num_liked } from "./utils.js";

async function getLikedCharities() {
  const response = await fetch("/getLikedCharities", {
      method: 'GET',
  });
  const data = await response.json();
  return data;
}

const likesWrapper = document.getElementById("likes-wrapper");
for(let i = 0; i < num_liked; i++) {
  likesWrapper.appendChild(createCharityPlaceholder());
}

const charities = await getLikedCharities();

likesWrapper.innerHTML = "";
for(let charity of charities) {
  likesWrapper.appendChild(await createCharityCard(charity));
}
