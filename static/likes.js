async function getLikedCharities() {
  const response = await fetch("/getLikedCharities", {
      method: 'GET',
  });
  const data = await response.json();
  return data;
}

function createCharityCard() {

}
const charities = getLikedCharities();
