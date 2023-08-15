// Signup request
const SignupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#first_name').value.trim();
    const lastname = document.querySelector('#last_name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/'); // When successful, load the homepage
      } else {
        alert('Failed to sign up.'); // When unsuccessful, show alert
      }
    }
  };
  
  // Event listener
  const SignupForm = document.querySelector('#signup-form');
  if (SignupForm) {
    SignupForm.addEventListener('submit', SignupFormHandler);
  }