

let charities_result = [];
const search_button = document.getElementById("search");
const searchbar = document.getElementById("searchbar");
const search_response_body = document.getElementById("response-body");

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
    name.appendChild(document.createTextNode(charity.getName()));
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

    card_body.appendChild(outter_div);
    card_body.appendChild(info_div);

    container_div.appendChild(card_body);

    search_response_body.appendChild(card_body);
}

async function search_for(query) {
    try {
        const response = await fetch('/search', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                'query': query,
            }
        });

        search_response_body.innerHTML = "";

        // assume response is array of objects that can be turned into charity objects
        for(let i = 0; i < response.length; ++i) {
            let new_charity = 
            create_search_result_card(response[i], i);
        }
    }
    catch (err) {
        console.log("error searching");
        console.log(err);
        const response = [];
    }
    const charities = response;
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