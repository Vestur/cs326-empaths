
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

//get user account and donations list and then render in html 
/**
 * 
 *export async function createCounter(name) {
    const response = await fetch(`/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    });
    const data = await response.json();
    return data;
  }

export async function deleteCounter(name) {
    // TODO: Add your solution here.
    try {
      const response = await fetch(`/delete?name=${name}`, {
        method: 'GET',
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
 */

