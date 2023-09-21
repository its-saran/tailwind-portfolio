

  // document.getElementById('contact-form').addEventListener('submit', function(event) {
  //   event.preventDefault();

  //   var form = this;
  //   var formControls = form.querySelectorAll('.form-control');
  //   var submitButton = form.querySelector('.send-msg');

  //   // Disable the submit button and add the loading class
  //   submitButton.disabled = true;
  //   submitButton.classList.add('loading');

  //   // Loop through each form control
  //   for (var i = 0; i < formControls.length; i++) {
  //     // Check if the current control is empty or invalid
  //     if ((formControls[i].value === '' && formControls[i].required) || !formControls[i].checkValidity()) {
  //       // If it's empty or invalid, add the "is-invalid" class to set its border color to red
  //       formControls[i].classList.add('is-invalid');
  //     } else {
  //       // If it's not empty or invalid, remove the "is-invalid" class (if it exists)
  //       formControls[i].classList.remove('is-invalid');
  //     }
  //   }

  //   if (!form.checkValidity()) {
  //     event.stopPropagation();

  //     // Enable the submit button and remove the loading class
  //     submitButton.disabled = false;
  //     submitButton.classList.remove('loading');

  //     return;
  //   }

  //   // Check if email is in a valid format only if it is not empty
  //   var emailInput = form.querySelector('#validationCustomEmail');
  //   var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (emailInput.value !== '' && !emailRegex.test(emailInput.value)) {
  //     emailInput.setCustomValidity('Invalid email address.');

  //     // Add the "is-invalid" class to the email input if it is required and empty
  //     if (emailInput.required && emailInput.value === '') {
  //       emailInput.classList.add('is-invalid');
  //     }
  //   } else {
  //     emailInput.setCustomValidity('');

  //     // Remove invalid feedback div and class if email input is valid
  //     emailInput.classList.remove('is-invalid');
  //   }

  //   form.classList.add('was-validated');

  //   // If form is valid, submit the data via AJAX
  //   var xhr = new XMLHttpRequest();
  //   xhr.open('POST', 'https://script.google.com/macros/s/AKfycbywuu8dJaTJMV01hPzTGe7jQ5aRvuSBlKcw6Xf9qk2YwGfTV255zVQ_vREbSEGLifu9sQ/exec');
  //   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  //   xhr.onload = function() {
  //     if (xhr.status === 200) {
  //       document.querySelector('.success-msg').textContent = 'Message sent successfully!';
  //       document.querySelector('.success-msg').style.display = 'block';
  //       setTimeout(function() {
  //         document.querySelector('.success-msg').style.display = 'none';
  //       }, 3000);

  //       // Enable the submit button and remove the loading class
  //       submitButton.disabled = false;
  //       submitButton.classList.remove('loading');
  //     } else {
  //       document.querySelector('.error-msg').textContent = 'Something went wrong. Please try again!';
  //       document.querySelector('.error-msg').style.display = 'block';
  //       setTimeout(function() {
  //         document.querySelector('.error-msg').style.display = 'none';
  //       }, 3000);

  //       // Enable the submit button and remove the loading class
  //       submitButton.disabled = false;
  //       submitButton.classList.remove('loading');
  //     }
  //   };
  //   xhr.onerror = function() {
  //     // Error handling
  //   };
  //   xhr.send(new URLSearchParams(new FormData(form)));
  // });





// // Highlight active nav item
// var navItems = document.querySelectorAll('.navbar-nav .nav-item');

// navItems.forEach(function(navItem) {
//     navItem.addEventListener('click', function() {
//         var activeNavItem = document.querySelector('.navbar-nav .nav-item.active');
//         if (activeNavItem) {
//             activeNavItem.classList.remove('active');
//         }
//         this.classList.add('active');
//     });
// });



