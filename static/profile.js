const backB = document.getElementById("back");
backB.addEventListener('click', () => {
  window.location.href = "/searchAuth";
});

const bio = document.getElementById("sendBio");
bio.addEventListener('click', async (event) => {
  let options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      bio: document.getElementById('bio').value
    })
  };
  let fetchRes = await fetch("/updateAccount", options);
});

const info = document.getElementById("saveInfo");
info.addEventListener('click', async (event) => {
  let options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: document.getElementById('name').value,
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
      bio: document.getElementById('bio').value,
      email: document.getElementById('email').value,
      location: document.getElementById('location').value
    })
  };
  let fetchRes = await fetch("/updateAccount", options);
});

const changeImg = document.getElementById('changeImage');
changeImg.addEventListener('click', async () => {
  window.location.href = '/uploadAuth';
});

let options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};
let fetchRes = fetch("/getAccount", options);
fetchRes.then(res =>
  res.json()).then(async (d) => {
    bio.value = d.bio;
    document.getElementById('name').value = d.name;
    document.getElementById('username').value = d.username;
    document.getElementById('password').value = d.password;
    document.getElementById('bio').value = d.bio;
    document.getElementById('email').value = d.email;
    document.getElementById('location').value = d.location;
    const pfp = document.getElementById('main-profile-pic');
    if (d.pfp.length > 0) {
      pfp.setAttribute("src", d.pfp);
    } else {
      pfp.setAttribute("src", 'images/profile.png')
    }
    for (let review of d.reviews) {
      let options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        query: {
          rid: review
        }
      };
      let reviewObj = await (await fetch(`/readReview?rid=${review}`)).json();
      console.log(reviewObj);
      const charityObj = await (await fetch(`/getCharity?ein=${reviewObj.chid}`)).json();
      console.log(charityObj);
      let rating = (Math.round(reviewObj.stars * 2) / 2).toFixed(1);
      let reviewElement = `
        <form action="submit" class="background-white d-flex flex-column form-inline a-review" id="profile-charity-1">
        <div class="input-group no-border">
            <textarea class="default-cursor button-at-end no-border" name="profile-charity-1-name" id="profile-charity-1-name" cols="30" rows="1" readonly="">${charityObj.name}</textarea>
        </div>
        <div class="star-rating">`
      for (let i = 0; i < 5; ++i) {
        if (rating - i === .5) {
          reviewElement += '<i class="bi bi-star-half"></i>';
        } else if (rating - i > 0) {
          reviewElement += '<i class="bi bi-star-fill"></i>';
        } else {
          reviewElement += '<i class="bi bi-star-empty"></i>';
        }
      }
      reviewElement += `</div>
        <textarea class="default-cursor no-border" name="profile-charity-1-review" id="profile-charity-1-review" cols="30" rows="3" readonly="">${reviewObj.text}</textarea>
        </form>`;
      document.getElementById('review-list').innerHTML += reviewElement;

    }
  })
