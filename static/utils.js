async function getReviews(ein) {
  const response = await fetch(`/getReviews?ein=${ein}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
}

// get a list of all the eids/eins of the current user's favorite charities
let favorited_charities = await getFavoritedCharitiesEins(0);
let liked_charities = await getLikedCharitiesEins(0);

export let num_favorited = favorited_charities.length;
export let num_liked = liked_charities.length;

export async function addReview(charityId, text, stars) {
  const response = await fetch("/createReview", {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      cid: charityId,
      stars: stars,
      text: text,
    }),
  });
  const data = await response.json();
  return data;
}

async function add_review_handler() {
  let charityId = this["charityID"];
  let text = this["text"].value;
  let stars = this["stars"].value;
  let reviewsList = this["reviewsList"];
  const new_review = await addReview(charityId, text, stars);
  try {
    const reviewItem = document.createElement("li");
    reviewItem.classList.add("list-group-item");
    const reviewRating = document.createElement("span");
    const reviewText = document.createElement("p");

    reviewRating.classList.add("review-rating");
    reviewRating.innerHTML = `Review rating - ${stars}`;
    reviewText.innerHTML = text;

    reviewItem.appendChild(reviewRating);
    reviewItem.appendChild(reviewText);

    reviewsList.appendChild(reviewItem);
  }
  catch (error) {
    console.log("error adding review");
    console.log(error);
  }
}

async function likes_handler() {
  let charity_ein = this["ein"];
  // decide to add or remove charity from favorites
  if(this.classList.contains("unliked")) {
      try {
          let updated_charity = await createLike(charity_ein);
          // reload in likes information (number of likes)
          if (updated_charity) {
              this.innerHTML = `${updated_charity.totalLikes} 💛`;
              this.classList.remove("unliked");
              this.classList.add("liked");
          }
          else {
              throw "Error liking charity";
          }
      }
      catch (error) {
          console.log("error liking");
          console.log(error);
      }
  }
  else {
      try {
          let updated_charity = await deleteLike(charity_ein);
          // reload in likes information (number of likes)
          if (updated_charity) {
              this.innerHTML = `${updated_charity.totalLikes} 🤍`;
              this.classList.remove("liked");
              this.classList.add("unliked");
          }
          else {
              throw "Error unliking";
          }
      }
      catch (error) {
          console.log("Error unliking");
          console.log(error);
      }
  }
}

async function add_remove_listener() {
  let charity_ein = this["ein"];
  // decide to add or remove charity from favorites
  if(this.classList.contains("not-favorite")) {
      try {
          let statis = await addFavorite(charity_ein);
          if (statis) {
              this.innerHTML = "⭐";
              this.classList.remove("not-favorite");
              this.classList.add("favorited");
          }
          else {
              throw "Error adding charity to favorites";
          }
      }
      catch (error) {
          console.log("error adding charity to favorites");
          console.log(error);
      }
  }
  else {
      try {
          let statis = await removeFavorite(charity_ein);
          if (statis) {
              this.innerHTML = "➖";
              this.classList.remove("favorited");
              this.classList.add("not-favorite");
          }
          else {
              throw "Error deleting charity from favorites";
          }
      }
      catch (error) {
          console.log("error deleting charity from favorites");
          console.log(error);
      }
  }
}

async function getCharity(ein){
  const response = await fetch("/getCharity", {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    query: {
      "ein": ein,
    },
  });
  let data = await response.json();
  return data;
}

export function createCharityPlaceholder() {
  const card = document.createElement("div");
  card.classList.add("card", "charitable-card");
  const cardHeader = document.createElement("div");
  cardHeader.classList.add("placeholder-glow", "card-header");
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  const cardTitle = document.createElement("div");
  cardTitle.classList.add("placeholder-glow", "card-title", "charitable-card-title", "d-flex", "justify-content-between");
  const wrapper = document.createElement("div");
  const info = document.createElement("div");
  info.classList.add("placeholder-glow", "card-text", "charitable-card-text");

  const placeholder1 = document.createElement("span");
  placeholder1.classList.add("placeholder", "col-4");

  const placeholder2 = document.createElement("span");
  placeholder2.classList.add("placeholder", "col-7");

  const placeholder3 = document.createElement("span");
  placeholder3.classList.add("placeholder", "col-6");

  const reviewsButton = document.createElement("button");
  reviewsButton.classList.add("btn", "btn-outline-primary", "btn-small", "reviews-button", "placeholder");

  cardTitle.appendChild(placeholder1);
  cardHeader.appendChild(placeholder2);
  info.appendChild(placeholder3);

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(info);

  card.appendChild(cardHeader);
  card.appendChild(cardBody);
  card.appendChild(reviewsButton);

  return card;
}

// TODO
// Add unique id for each card to have button event listeners for each of them
// that call the delete like/favorites functions
export async function createCharityCard(charity) {

  const card = document.createElement("div");
  card.classList.add("card", "charitable-card");

  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");
  const rating = charity.current_rating !== null ? charity.current_rating : "not rated";
  cardHeader.innerHTML = `Rating - ${rating}`;

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const cardTitle = document.createElement("div");
  cardTitle.classList.add("card-title", "charitable-card-title", "d-flex", "justify-content-between");
  const wrapper = document.createElement("div");

  const titleText = document.createElement("span");
  titleText.innerHTML = `${charity.name}`;
  const favorite = document.createElement("button");

  /************ */
  // check if charity is in favorites - if it is add class to-remove make icon star
  // if it is not in favorites - add class to-add and make icon minus sign
  if(favorited_charities.includes(charity.eid)) {
    favorite.classList.add("btn", "favorited");
    // star indicates charity is favorited
    favorite.innerHTML = "⭐";
  }
  else {
    favorite.classList.add("btn", "not-favorite");
    // minus sign indicates charity is NOT favorited
    favorite.innerHTML = "➖";
  }
  // ******************

  // add event listener to favorite button to handle favoriting and unfavoriting
  favorite.addEventListener("click", add_remove_listener);
  favorite["ein"] = charity["eid"];

  wrapper.appendChild(favorite);
  wrapper.appendChild(titleText);

  const likes = document.createElement("button");
  likes.classList.add(["btn"]);

  likes.innerHTML = `${charity.likes} 💛`;
  if(liked_charities.includes(charity.eid)) {
    likes.classList.add("liked");
    likes.innerHTML = `${charity.likes} 💛`;
  }
  else {
    likes.classList.add("unliked");
    likes.innerHTML = `${charity.likes} 🤍`;
  }
  likes.addEventListener("click", likes_handler);
  likes["ein"] = charity["eid"];

  const cardSubtitle = document.createElement("div");
  cardSubtitle.classList.add("card-subtitle", "mb-2", "text-muted");
  cardSubtitle.innerHTML = `Location: ${charity.address}`;

  cardTitle.appendChild(wrapper);
  cardTitle.appendChild(likes);
  const info = document.createElement("div");
  info.classList.add("card-text", "charitable-card-text");
  info.innerHTML = charity.mission;

  const reviews = charity.reviews;

  const targetId = `reviews-wrapper-${charity.eid}`;

  const reviewsButton = document.createElement("button");
  reviewsButton.classList.add("btn", "btn-outline-primary", "btn-small", "reviews-button");
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

    reviewRating.classList.add("review-rating");
    reviewRating.innerHTML = `Review rating - ${review.stars}`;
    reviewText.innerHTML = review.text;

    reviewItem.appendChild(reviewRating);
    reviewItem.appendChild(reviewText);

    reviewsList.appendChild(reviewItem);
  }

  const reviewCreatorWrapper = document.createElement("div");
  reviewCreatorWrapper.classList.add("review-creator-wrapper");
  const reviewsCreator = document.createElement("textarea");
  reviewsCreator.placeholder = "Write a review...";
  reviewsCreator.classList.add("form-control", "review-box");
  const reviewsCreatorStar = document.createElement("label")
  reviewsCreatorStar.textContent = "Stars:";
  reviewsCreatorStar.classList.add("stars-label");
  const reviewsCreatorStarSelector = document.createElement("select");
  reviewsCreatorStarSelector.classList.add("form-control");
  reviewsCreatorStarSelector.classList.add("star-selector");
  for(let i = 1; i < 6; ++i) {
    let new_option = document.createElement("option");
    new_option.value = i;
    new_option.textContent = i;
    reviewsCreatorStarSelector.appendChild(new_option);
  }
  reviewsCreatorStar.appendChild(reviewsCreatorStarSelector);
  // const line_break = document.createElement("br");
  // reviewsCreatorStar.appendChild(line_break);

  const reviewsCreatorSubmit = document.createElement("button");
  reviewsCreatorSubmit.innerHTML = "Submit";
  reviewsCreatorSubmit.classList.add("btn", "btn-primary", "review-submit");
  reviewsCreatorSubmit.addEventListener("click", add_review_handler);
  reviewsCreatorSubmit["charityID"] = charity.eid;
  reviewsCreatorSubmit["text"] = reviewsCreator;
  reviewsCreatorSubmit["stars"] = reviewsCreatorStarSelector;
  reviewsCreatorSubmit["reviewsList"] = reviewsList;

  reviewCreatorWrapper.appendChild(reviewsCreator);
  reviewCreatorWrapper.appendChild(reviewsCreatorStar);
  reviewCreatorWrapper.appendChild(reviewsCreatorSubmit);
  reviewsWrapper.appendChild(reviewsList);
  reviewsWrapper.appendChild(reviewCreatorWrapper);

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
  console.log(`adding like for charity: ${ein}`)
  const response = await fetch("/createLike", {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "ein": ein,
    }),
  });
  const data = await response.json();
  return data;
}

async function deleteLike(ein) {
  console.log(`deleting like for charity: ${ein}`)
  const response = await fetch("/deleteLike", {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "ein": ein,
    }),
  });
  const data = await response.json();
  return data;
}

async function getFavoritedCharitiesEins(user_id) {
  const response = await fetch("/getFavoritedCharitiesEins",  {
    method: "GET",
    query: {
      user_id: user_id
    },
  });
  // returns list of charity objects
  const favorites = await response.json();
  return favorites;
}

async function getLikedCharitiesEins(user_id) {
  const response = await fetch("/getLikedCharitiesEins",  {
    method: "GET",
    query: {
      user_id: user_id
    },
  });
  // returns list of charity objects
  const likes = await response.json();
  return likes;
}

export async function addFavorite(ein) {
  const response = await fetch("/addFavorite", {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "ein": ein,
    }),
  });
  const data = await response.json();
  return data;
}

export async function removeFavorite(ein) {
  const response = await fetch("/removeFavorite", {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "ein": ein,
    }),
  });
  const data = await response.json();
  return data;
}
