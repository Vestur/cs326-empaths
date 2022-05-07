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
}

async function renderDonations() {
    const user = await (await fetch('/getAccount')).json()
    let donations = user.donations;

    const dtable = document.getElementById('dtable');
    dtable.innerHTML = '';

    for (const d of donations) {
        const tr = `<tr><td>${d.charityName}</td><td>${d.amount}</td><td>${d.date}</td></tr>`;
        dtable.innerHTML += tr;
    }
}

await renderDonations();
