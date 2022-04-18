
const addrowB = document.getElementById("add_row");
addrowB.addEventListener('click', () => {
    const tableBody = document.getElementById("my_table").getElementsByTagName('tbody')[0];
    let row = tableBody.insertRow(-1);
    let name = row.insertCell(0);
    let amount = row.insertCell(1);
    let date = row.insertCell(2);
    name.innerHTML = "Charity";
    amount.innerHTML = "Amount";
    date.innerHTML = "Date";
});

const deleteB = document.getElementById("delete_row");
deleteB.addEventListener('click', () => {
    document.getElementById("my_table").getElementByTagName('tbody')[0].deleteRow(-1);
});