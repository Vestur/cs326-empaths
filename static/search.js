import {createCharityCard, addFavorite, removeFavorite} from "./utils.js";
const searchbar = document.getElementById("searchbar");
const search_response_body = document.getElementById("response-body");
const search_button = document.getElementById("search_button");

let search_results = {};

// async function add_to_favorites(ein) {
//     try {
//         const response = addFavorite(ein);
//         return true;
//     }
//     catch (error) {
//         console.log(error);
//         return false;
//     }
// }

// async function remove_from_favorites(ein) {
//     try {
//         let response = removeFavorite(ein);
//         return true;
//     }
//     catch (error) {
//         console.log(error);
//         return false;
//     }
// }

async function search_for(query) {
    let response = [];
    search_results = [];
    try {
        response = await fetch(`/search?query=${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            query: {
                'query': query,
            }
        });
        let json_response = await response.json();
        search_response_body.innerHTML = "";

        for(let i = 0; i < json_response.length; i++) {
            let charity = json_response[i];
            search_response_body.appendChild(await createCharityCard(charity));
            search_results.push(charity);
        }
    }
    catch (err) {
        console.log("error searching");
        console.log(err);
    }
    const charities = response;
    return charities;
}

search_button.addEventListener('click', async () => {
    // get search query
    const query = searchbar.value;
    console.log(searchbar.value);
    // search and build results on page
    await search_for(query);
})

await search_for("");
