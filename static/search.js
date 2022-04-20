const searchbar = document.getElementById("searchbar");
const search_response_body = document.getElementById("response-body");
const search_button = document.getElementById("search_button");

let cur_account_id = -1;
let search_results = [];

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
                this.innerText = "✔️";
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
        const response = await fetch('/updateList', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            query: {
                'account_id': cur_account_id,
                'ein': ein
            },
        });
        let state = await response.json();
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

async function remove_from_favorites(ein) {
    try {
        let response = await fetch('/deleteList', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            query: {
                'account_id': cur_account_id,
                'ein': ein
            },
        });
        let state = await response.json();
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

function create_search_result_card(charity, num) {
    let container_div = document.createElement("div");
    container_div.classList.add("card");
    container_div.classList.add("charitable-card");
    
    let card_body = document.createElement("div");
    card_body.classList.add("card-body");
    card_body.classList.add("background-white");
  
    let outter_div = document.createElement("div");
    outter_div.classList.add("card-title");
    outter_div.classList.add("charitable-card-title");
    outter_div.classList.add("d-flex");
    outter_div.classList.add("justify-content-between");
    let name = document.createElement("div");
    let charity_name = charity.name;
  
    name.appendChild(document.createTextNode(charity_name));
    let button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("results-button");
    button.classList.add("to-add");
    button.id = `${num}`;
    button.addEventListener("click", add_remove_listener);
    button.myParam = button;
    let choices = ["➖", "✔️"];
    let choices_2 = ["to-add", "to-remove"];
    let choice = Math.floor(Math.random() * 2);
    button.classList.add(choices_2[choice]);
    button.textContent = choices[choice];
    outter_div.appendChild(name);
    outter_div.appendChild(button);
    let info_div = document.createElement("div")
    info_div.classList.add("card-text");
    info_div.classList.add("charitable-card-text");
    let charity_address = charity.address;
    let charity_mission = charity.mission;
    info_div.appendChild(document.createTextNode(charity_address));
    info_div.appendChild(document.createTextNode(charity_mission));
    card_body.appendChild(outter_div);
    card_body.appendChild(info_div);
  
    container_div.appendChild(card_body);
  
    search_response_body.appendChild(container_div);
  }

async function search_for(query) {
    let response = [];
    search_results = [];
    try {
        response = await fetch('/search', {
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

        // assume response is array of ein numbers
        for(let i = 0; i < json_response.length; ++i) {
            // limit to ten search results
            if (i >= 10) {
                break;
            }
            let response1 = await fetch("/getCharity", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                query: {
                    'ein': json_response[i],
                }
            });
            let new_charity = await response1.json();
            create_search_result_card(new_charity, i);
            search_results.push(new_charity);
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
    // search and build results on page
    await search_for(query);
})

await search_for("");