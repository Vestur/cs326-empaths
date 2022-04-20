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

//get bio
let options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id: '1'
    })
};
let fetchRes = fetch("http://localhost:3000/getAccount", options);
fetchRes.then(res =>
    res.json()).then(d => {
    console.log('bio: ' + JSON.stringify(d))
})
