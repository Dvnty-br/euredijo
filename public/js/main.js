document.getElementById('form').addEventListener('submit', (e)=> {
  e.preventDefault()
  fetch('/assinar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: document.getElementById('email').value })
  }).then(res => {
    return res.text();
  }).then(message => {
    alert(message);
  })
  
  document.getElementById('email').value = ' '
  
})
