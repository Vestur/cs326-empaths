async function createDonation(charity_name_input, amount_input, date_input) {
    const response = await fetch(`/createDonation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ charityName: charity_name_input, amount: amount_input, date: date_input }),
    });
    //const data = await response.json(); //do I need these?
    //return data;
  }

async function deleteDonation(charity_name_input, amount_input, date_input) {
    try {
      const response = await fetch(`/deleteDonation`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ charityName: charity_name_input, amount: amount_input, date: date_input }) 
      }); 
      //const data = await response.json();
      //return data;
    } catch (err) {
      console.log(err);
    }
  }
  async function getDonations() {
    const response = await fetch("/getDonation", {
        method: 'GET',
    });
    const data = await response.json();
    console.log(data);
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
addrowB.addEventListener('click', async () => {
  let name = document.getElementById("charity").value;
  let amount = document.getElementById("amount").value; 
  let date = document.getElementById("date").value;
  console.log(name);
  console.log(amount);
  console.log(date);
  await createDonation(name, amount, date); // create donation here so it saves in database
  const tableBody = document.getElementById("my_table").getElementsByTagName('tbody')[0];
  let row = tableBody.insertRow(-1);
  let name_cell = row.insertCell(0);
  let amount_cell = row.insertCell(1);
  let date_cell = row.insertCell(2);
  name_cell.innerHTML = name; 
  amount_cell.innerHTML = amount; 
  date_cell.innerHTML = date;
});

const deleteB = document.getElementById("delete_row");
deleteB.addEventListener('click', async () => {
  let name = document.getElementById("charity").value;
  let amount = document.getElementById("amount").value; 
  let date = document.getElementById("date").value;
  const tableBody = document.getElementById("my_table").getElementsByTagName('tbody')[0];
  let deleted = false;
  //loop through rows aka td elements of table body, check if all cells match, if they do, delete row 
  for(let i = 0; i < tableBody.rows.length; i++){

    console.log(tableBody.rows[i].cells[0].innerHTML);
    console.log(tableBody.rows[i].cells[1].innerHTML);
    console.log(tableBody.rows[i].cells[2].innerHTML);


    if(tableBody.rows[i].cells[0].innerHTML === name && 
       tableBody.rows[i].cells[1].innerHTML === amount &&
       tableBody.rows[i].cells[2].innerHTML === date
      ){
      tableBody.deleteRow(i);
      await deleteDonation(name, amount, date);
      deleted = true; 
    }
  }

  if(deleted === false){
      alert("Failed to Delete Donation :(");
  }
});

function generateRows(donation){
  const tableBody = document.getElementById("my_table").getElementsByTagName('tbody')[0];
  let row = tableBody.insertRow(-1);
  let name = row.insertCell(0);
  let amount = row.insertCell(1);
  let date = row.insertCell(2);
  name.innerHTML = donation.charityName; 
  amount.innerHTML = donation.amount; 
  date.innerHTML = donation.date; 
}

