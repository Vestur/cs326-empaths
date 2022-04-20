import { createCharityCard } from "./utils.js";

async function getLikedCharities() {
  const response = await fetch("/getLikedCharities", {
      method: 'GET',
  });
  const data = await response.json();
  return data;
}

const charities = await getLikedCharities();
const likesWrapper = document.getElementById("likes-wrapper");

for(let charity of charities) {
  likesWrapper.appendChild(await createCharityCard(charity));
}
