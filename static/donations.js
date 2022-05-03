const charity_name_input = document.getElementById("charity").value;
const amount_input = document.getElementById("amount").value; 
const date_input = document.getElementById("date").value; 

async function createDonation(account_id) {
    const response = await fetch(`/createDonation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ charity_name: charity_name_input, amount: amount_input, date: date_input }),
    });
    const data = await response.json();
    return data;
  }

async function deleteDonation(account_id) {
    try {
      const response = await fetch(`/deleteDonation`, {
        method: 'DELETE',
      }); 
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  async function getDonations() {
    const response = await fetch("/getDonation", {
        method: 'GET',
    });
    const data = await response.json();
    return data;
  }
  
  const donations = await getDonations(); 
  for(let donation of donations){
    generateRows(donation);
  }
  /** 
  const charities = await getLikedCharities();
  const likesWrapper = document.getElementById("likes-wrapper");
  
  for(let charity of charities) {
    likesWrapper.appendChild(await createCharityCard(charity));
  }
  */
const addrowB = document.getElementById("add_row");
addrowB.addEventListener('click', () => {
  // create donation here so it saves in database
  const tableBody = document.getElementById("my_table").getElementsByTagName('tbody')[0];
  let row = tableBody.insertRow(-1);
  let name = row.insertCell(0);
  let amount = row.insertCell(1);
  let date = row.insertCell(2);
  name.innerHTML = charity_name_input;
  amount.innerHTML = amount_input; 
  date.innerHTML = date_input; 
});

const deleteB = document.getElementById("delete_row");
deleteB.addEventListener('click', () => {
    //document.getElementById("my_table").getElementByTagName('tbody')[0].deleteRow(-1);
});

function generateRows(donation){
  const tableBody = document.getElementById("my_table").getElementsByTagName('tbody')[0];
  let row = tableBody.insertRow(-1);
  let name = row.insertCell(0);
  let amount = row.insertCell(1);
  let date = row.insertCell(2);
  name.innerHTML = donation.charity_name; 
  amount.innerHTML = donation.amount; 
  date.innerHTML = donation.date; 
}

