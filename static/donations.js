async function createDonation(charity, amount, date) {
    const user = await (await fetch('/getAccount')).json()
    let donations = user.donations;
    donations.push({
        charityName: charity,
        amount: amount,
        date: date
    });

    await fetch('/updateAccount', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ donations: donations })
    });
}

async function deleteDonation(charity, amount, date) {
    const user = await (await fetch('/getAccount')).json()
    let donations = user.donations;

    let newDonations = [];
    for (const d of donations) {
        if (! (d.charityName === charity && d.amount === amount && d.date === date)) {
            newDonations.push(d);
        }
    }

    await fetch('/updateAccount', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ donations: newDonations })
    });

    await renderDonations();
}

async function renderDonations() {
    const user = await (await fetch('/getAccount')).json()
    let donations = user.donations;

    const dtable = document.getElementById('dtable');
    dtable.innerHTML = '';

    for (const d of donations) {
        console.log(d);
        const new_row = document.createElement("tr");
        const new_col1 = document.createElement("td");
        new_col1.textContent = d.charityName;
        const new_col2 = document.createElement("td");
        new_col2.textContent = d.amount;
        const new_col3 = document.createElement("td");
        new_col3.textContent = d.date;
        const new_col4 = document.createElement("td");
        const new_button = document.createElement("button");
        new_button.id = "delete_row";
        new_button.classList.add("btn");
        new_button.textContent = 'X';
        new_button.addEventListener("click", () => {
            deleteDonation(d.charityName, d.amount, d.date);
        })
        new_col4.appendChild(new_button);
        new_row.appendChild(new_col1);
        new_row.appendChild(new_col2);
        new_row.appendChild(new_col3);
        new_row.appendChild(new_col4);
        // const tr = `<tr><td>${d.charityName}</td><td>${d.amount}</td><td>${d.date}</td><td><button type="button" id="delete_row" class="btn">X</button></td></tr>`;
        // dtable.innerHTML += tr;
        dtable.appendChild(new_row);
    }
}

document.getElementById('add_row').addEventListener('click', async () => {
    const charity = document.getElementById('charity').value;
    const amount = document.getElementById('amount').value;
    const date = document.getElementById('date').value;

    await createDonation(charity, amount, date);
    await renderDonations();
});

await renderDonations();
