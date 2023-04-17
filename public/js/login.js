const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    
   
  
    if (email && password) {
      console.log ("cleint login ", email, password);
      fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: { 'Content-Type': 'application/json' },
      })

      .then(res => {
        console.log(res);
        if (res.ok) {
          alert("Logged in Successfully");
          document.location.replace('/');
        } else {
          alert('Failed to log in.');
        }
      })
  
      // if (response.ok) {
      //   document.location.replace('/');
      // } else {
      //   alert('Failed to log in.');
      // }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);