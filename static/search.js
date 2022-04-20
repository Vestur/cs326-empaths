const searchbar = document.getElementById("searchbar");
const search_response_body = document.getElementById("response-body");

let cur_account_id = -1;
let search_results = [];

async function add_to_favorites(ein) {
    try {
        const response = await fetch('/updateList', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                'ein': ein,
            }
        });
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

async function remove_from_favorites(ein) {
    try {
        const response = await fetch('/deleteList', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                'ein': ein,
            }
        });
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

    let outter_div = document.createElement("div");
    outter_div.classList.add("card-title");
    outter_div.classList.add("charitable-card-title");
    outter_div.classList.add("d-flex");
    outter_div.classList.add("justify-content-between");
    let name = document.createElement("div");
    let charity_name = charity.name;
    console.log(charity_name);

    name.appendChild(document.createTextNode(charity_name()));
    let button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("results-button");
    button.classList.add("to-add");
    button.id = `${num}`;
    button.textContent = "➖";
    outter_div.appendChild(name);
    outter_div.appendChild(button);
    let info_div = document.createElement("div")
    info_div.classList.add("card-text");
    info_div.classList.add("charitable-card-text");
    let charity_address = charity.address;
    let charity_mission = charity.mission;
    info_div.appendChild(document.createTextNode(charity_address()));
    info_div.appendChild(document.createTextNode(charity_mission()));
    card_body.appendChild(outter_div);
    card_body.appendChild(info_div);

    container_div.appendChild(card_body);

    search_response_body.appendChild(card_body);
    console.log("ttttt");
}

async function search_for(query) {
    let response = [];
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
        console.log(json_response);

        // assume response is array of ein numbers
        for(let i = 0; i < json_response.length; ++i) {
            // limit to ten search results
            if (i >= 10) {
                break;
            }
            console.log("yup");
            let response1 = await fetch("/getCharity", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                query: {
                    'ein': json_response[i],
                }
            });
            console.log("yupper");
            let new_charity = response1.json();
            create_search_result_card(new_charity, i);
        }
    }
    catch (err) {
        console.log("error searching");
        console.log(err);
    }
    const charities = response;
    search_results = response;
    return charities;
}

search_button.addEventListener('click', async () => {
    // get search query
    const query = searchbar.value;
    // search and build results on page
    charities_result = await search_for(query);
})

const results_selection = document.querySelectorAll(".results-button");

results_selection.forEach(function(elem) {
  elem.addEventListener("click", () => {

    let classes= elem.classList;
    let charity_num = int(elem.id);
    let charity = search_results[charity_num];

    // find charity in question
    try {
        let charity = charities_result[charity_num];
    }
    catch {
        console.log("can't find charity");
    }

    // decide to add or remove charity from favorites
    if("to-add" in classes) {
        try {
            add_to_favorites(charity);
            elem.value = "✔️";
            elem.classList.remove("to-add");
            elem.classList.add("to-remove");
        }
        catch (error) {
            console.log("error adding charity to favorites");
            console.log(error);
        }
    }
    else {
        try {
            remove_from_favorites(charity);
            elem.value = "➖";
            elem.classList.remove("to-remove");
            elem.classList.add("to-add");
        }
        catch (error) {
            console.log("error adding charity to favorites");
            console.log(error);
        }
    }
  })
});
