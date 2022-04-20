async function getLikedCharities() {
  const response = await fetch("/getLikedCharities", {
      method: 'GET',
  });
  const data = await response.json();
  console.log("hi", data);
  return data;
}

function createCharityCard(charity) {
  const card = document.createElement("div");
  card.classList.add("card", "charitable-card");
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const cardTitle = document.createElement("div");
  cardTitle.classList.add("card-title", "charitable-card-title", "d-flex", "justify-content-between");
  const titleText = document.createElement("span");
  titleText.innerHTML = charity.name;
  const likes = document.createElement("button");
  likes.classList.add(["btn"]);
  likes.innerHTML = `${charity.likes} 💛`;

  cardTitle.appendChild(titleText);
  cardTitle.appendChild(likes);
  const info = document.createElement("div");
  info.classList.add("card-text", "charitable-card-text");
  info.innerHTML = charity.mission;

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(info);

  card.appendChild(cardBody);
  return card;
}

const charities = await getLikedCharities();
const likesWrapper = document.getElementById("likes-wrapper");

for(let charity of charities) {
  likesWrapper.appendChild(createCharityCard(charity));
}
