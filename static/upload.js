document.getElementById('image-input').addEventListener('change', function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    document.getElementById('display-image').src = uploaded_image;
  });
  reader.readAsDataURL(this.files[0]);
});

document.getElementById('save').addEventListener('click', async () => {
  const img = document.getElementById('display-image').src;
  if (img.length < 1) {
    let options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pfp: ''
      })
    };
    await fetch('/updateAccount', options);
  } else {
    let options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pfp: img
      })
    };
    await fetch('/updateAccount', options);
  }
  window.location.href = '/profileAuth';
});

document.getElementById('back').addEventListener('click', async () => {
  window.location.href = '/profileAuth';
});
