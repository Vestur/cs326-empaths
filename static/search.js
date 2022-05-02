import {createCharityCard, addFavorite, removeFavorite} from "./utils.js";
const searchbar = document.getElementById("searchbar");
const search_response_body = document.getElementById("response-body");
const search_button = document.getElementById("search_button");

let search_results = {};

function add_remove_listener() {
    let charity_num = parseInt(this.id);
    let charity = null;
    // find charity in question
    try {
        charity = search_results[charity_num];
    }
    catch (error) {
        console.log(error);
        console.log("can't find charity");
        return -1;
    }

    // decide to add or remove charity from favorites
    if(this.classList.contains("to-add")) {
        try {
            let statis = add_to_favorites(charity_num);
            if (statis) {
                this.innerText = "⭐";
                this.classList.remove("to-add");
                this.classList.add("to-remove");
            }
            else {
                throw "Error adding charity from favorites";
            }
        }
        catch (error) {
            console.log("error adding charity to favorites");
            console.log(error);
        }
    }
    else {
        try {
            let statis = remove_from_favorites(charity_num);
            if (statis) {
                this.innerText = "➖";
                this.classList.remove("to-remove");
                this.classList.add("to-add");
            }
            else {
                throw "Error deleting charity from favorites";
            }
        }
        catch (error) {
            console.log("error adding charity to favorites");
            console.log(error);
        }
    }
}

async function add_to_favorites(ein) {
    try {
        const response = addFavorite(ein);
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

async function remove_from_favorites(ein) {
    try {
        let response = removeFavorite(ein);
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

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
