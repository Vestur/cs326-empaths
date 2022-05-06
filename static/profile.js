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
    document.getElementById('bio').value = d.bio;
    document.getElementById('email').value = d.email;
    document.getElementById('location').value = d.location;
    const pfp = document.getElementById('main-profile-pic');
    pfp.setAttribute("src", d.pfp);
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
            <textarea placeholder="${charityObj.name}" class="default-cursor button-at-end no-border" name="profile-charity-1-name" id="profile-charity-1-name" cols="30" rows="1" readonly=""></textarea>
            <span class="input-group-btn">
                <button class="btn btn-default state-button" type="button">
                    <i class="bi bi-pencil-fill"></i>
                </button>
            </span>
        </div>
        <div class="star-rating">`
        for (let i = 0; i < 5; ++i) {
            if (rating - i === .5) {
                reviewElement += '<i class="bi bi-star-half"></i>';
            } else if (rating - i > 0 ) {
                reviewElement += '<i class="bi bi-star-fill"></i>';
            } else {
                reviewElement += '<i class="bi bi-star-empty"></i>';
            }
        }
        reviewElement += `</div>
        <textarea placeholder="${reviewObj.text}" class="default-cursor no-border" name="profile-charity-1-review" id="profile-charity-1-review" cols="30" rows="3" readonly=""></textarea>
        </form>`;
        document.getElementById('review-list').innerHTML += reviewElement;

    }
})
