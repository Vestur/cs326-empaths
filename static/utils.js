async function getReviews(ein) {
  const response = await fetch("/getReviews", {
    method: 'GET',
  });
  const data = await response.json();
  return data;
}

// TODO
// Add unique id for each card to have button event listeners for each of them
// that call the delete like/favorites functions
export async function createCharityCard(charity) {

  const card = document.createElement("div");
  card.classList.add("card", "charitable-card");

  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");
  cardHeader.innerHTML = `Rating - ${charity.current_rating}`;

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const cardTitle = document.createElement("div");
  cardTitle.classList.add("card-title", "charitable-card-title", "d-flex", "justify-content-between");
  const wrapper = document.createElement("div");

  const titleText = document.createElement("span");
  titleText.innerHTML = `${charity.name}`;
  const favorite = document.createElement("button");
  favorite.classList.add("btn");

  // Replace with function that determines which emoji
  favorite.innerHTML = "⭐";

  wrapper.appendChild(favorite);
  wrapper.appendChild(titleText);

  const likes = document.createElement("button");
  likes.classList.add(["btn"]);
  likes.innerHTML = `${charity.likes} 💛`;

  const cardSubtitle = document.createElement("div");
  cardSubtitle.classList.add("card-subtitle", "mb-2", "text-muted");
  cardSubtitle.innerHTML = charity.address;

  cardTitle.appendChild(wrapper);
  cardTitle.appendChild(likes);
  const info = document.createElement("div");
  info.classList.add("card-text", "charitable-card-text");
  info.innerHTML = charity.mission;

  const reviews = await getReviews();

  const targetId = `reviews-wrapper-${charity.eid}`;

  const reviewsButton = document.createElement("button");
  reviewsButton.classList.add("btn", "btn-secondary");
  reviewsButton.setAttribute("type", "button");
  reviewsButton.setAttribute("data-bs-toggle", "collapse");
  reviewsButton.setAttribute("data-bs-target", "#"+targetId);
  reviewsButton.setAttribute("aria-expanded", "false");
  reviewsButton.setAttribute("aria-controls", targetId);
  reviewsButton.innerHTML = "Reviews";

  const reviewsWrapper = document.createElement("div");
  reviewsWrapper.id = targetId;
  reviewsWrapper.classList.add("collapse");

  const reviewsList = document.createElement("ul");
  reviewsList.classList.add("list-group", "list-group-flush");

  for(let review of reviews) {
    const reviewItem = document.createElement("li");
    reviewItem.classList.add("list-group-item");
    const reviewRating = document.createElement("span");
    const reviewText = document.createElement("p");

    reviewRating.innerHTML = `Review rating - ${review.stars}`;
    reviewText.innerHTML = review.text;

    reviewItem.appendChild(reviewRating);
    reviewItem.appendChild(reviewText);

    reviewsList.appendChild(reviewItem);
  }
  reviewsWrapper.appendChild(reviewsList);

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardSubtitle);
  cardBody.appendChild(info);

  card.appendChild(cardHeader);
  card.appendChild(cardBody);
  card.appendChild(reviewsButton);
  card.appendChild(reviewsWrapper);

  return card;
}
async function createLike(ein) {
  const response = await fetch("/createLike", {
    method: 'POST',
    body: {
      ein: ein,
    },
  });
  const data = await response.json();
  return data;
}

async function deleteLike(ein) {
  const response = await fetch("/deleteLike", {
    method: 'DELETE',
    body: {
      ein: ein,
    },
  });
  const data = await response.json();
  return data;
}

export async function addFavorite(ein) {
  const response = await fetch("/addFavorite", {
    method: 'POST',
    body: {
      ein: ein,
    },
  });
  const data = await response.json();
  return data;
}

export async function removeFavorite(ein) {
  const response = await fetch("/removeFavorite", {
    method: 'DELETE',
    body: {
      ein: ein,
    },
  });
  const data = await response.json();
  return data;
}