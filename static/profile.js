const backB = document.getElementById("back");
backB.addEventListener('click', () => {
    window.location.href = "search.html";
});

const bio = document.getElementById("bio");
bio.addEventListener('keyup', (event) => {
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            bio: bio.value
        })
    };
    let fetchRes = fetch("http://localhost:3000/updateAccount", options);
    fetchRes.then(res =>
        res.json()).then(d => {
        console.log('bio: ' + JSON.stringify(d))
    })
}, false);

let options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};
let fetchRes = fetch("http://localhost:3000/getAccount?account_id=1", options);
fetchRes.then(res =>
    res.json()).then(d => {
    bio.value = d.bio;
    document.getElementById('name').value = d.name;
    document.getElementById('username').value = d.username;
    document.getElementById('email').value = d.email;
    document.getElementById('location').value = d.location;
    for (const review of d.reviews) {
        let charityFetch = fetch("http://localhost:3000/getCharity?ein=1");
        charityFetch.then(cres => cres.json()).then(cd => {
            console.log(cd);
            let rating = (Math.round(cd.current_rating * 2) / 2).toFixed(1);
            let reviewElement = `
            <form action="submit" class="background-white d-flex flex-column form-inline a-review" id="profile-charity-1">
            <div class="input-group no-border">
                <textarea placeholder="  ` + cd.name + `" class="default-cursor button-at-end no-border" name="profile-charity-1-name" id="profile-charity-1-name" cols="30" rows="1" readonly=""></textarea>
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
            <textarea placeholder="` + review.text + `" class="default-cursor no-border" name="profile-charity-1-review" id="profile-charity-1-review" cols="30" rows="3" readonly=""></textarea>
            </form>`;
            document.getElementById('review-list').innerHTML += reviewElement;
        })
    }
})
