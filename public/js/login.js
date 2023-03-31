const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    
    // const userObject = {
    //   username: email,
    //   password: password,

    // }

    // console.log(userObject);
  
    if (email && password) {
      fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: { 'Content-Type': 'application/json' },
      })

      .then(res => {
        if (res.ok) {
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