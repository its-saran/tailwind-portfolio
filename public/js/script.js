document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll
    const animateScroll = (targetId, duration) => {
        const targetPosition = document.querySelector(targetId).offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - (startPosition + 100);
        let start = null;

        const ease = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        const animation = currentTime => {
            if (!start) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    };

    const handleLinkClick = e => {
        e.preventDefault();
        animateScroll(e.currentTarget.getAttribute('href'), 1000);
    };

    const navLinks = [...document.querySelectorAll('.navbar a'), ...document.querySelectorAll('.menu a')];
    navLinks.forEach(link => link.addEventListener('click', handleLinkClick));


    // Fixed header
    const header = document.querySelector('header'); // Select the header element using the <header> tag
    const navbarMenuItems = document.querySelectorAll('.navbar .menu li');

    window.addEventListener('scroll', () => {
        const isScrolled = window.scrollY > 70;
        header.classList.toggle('fix-header', isScrolled);

        navbarMenuItems.forEach(item => {
          item.classList.toggle('mx-2', isScrolled);
        });
    });

    // Toggle Menu
    const toggleMenu = document.querySelector('#menu-switch .toggleMenu');
    const contentToggleElement = document.getElementById('mobileDropdown');

    toggleMenu.addEventListener('change', () => {
        contentToggleElement.classList.toggle('show', toggleMenu.checked);
    });


    // Toggle Theme
    const toggleTheme = document.querySelector('#theme-switch .toggleTheme');
    const themeToggleElement = document.querySelector('html');
    const socialMediaImages = document.querySelectorAll('#social-medias svg image');

    toggleTheme.addEventListener('change', () => {
        if (toggleTheme.checked) {
            themeToggleElement.setAttribute('data-theme', 'light');

            socialMediaImages.forEach((link, index) => {
                const socialMediaUrls = [
                    'images/svg/github-dark.svg',
                    'images/svg/linkedin-dark.svg',
                    'images/svg/instagram-dark.svg',
                    'images/svg/kaggle-dark.svg',
                    'images/svg/gmail-dark.svg'
                ];
            
                if (index < socialMediaUrls.length) {
                    link.setAttribute('xlink:href', socialMediaUrls[index]);
                }
            });
        } else {
            themeToggleElement.setAttribute('data-theme', 'dark');
            
            socialMediaImages.forEach((link, index) => {
                const socialMediaUrls = [
                    'images/svg/github-light.svg',
                    'images/svg/linkedin-light.svg',
                    'images/svg/instagram-light.svg',
                    'images/svg/kaggle-light.svg',
                    'images/svg/gmail-light.svg'
                ];
            
                if (index < socialMediaUrls.length) {
                    link.setAttribute('xlink:href', socialMediaUrls[index]);
                }
            });
        }
    });




    // Change the data-theme attribute
    const htmlElement = document.querySelector('html');
    function changeTheme(newTheme) {
      htmlElement.setAttribute('data-theme', newTheme);
    }


    // Mobile menu hide while clicking <a>
    const targetElement = document.getElementById('mobileDropdown');
    targetElement.addEventListener('click', event => {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            targetElement.classList.remove('show');
            toggleMenu.click();
        }
    });


    // Isotope filter
    const squareSection = document.querySelector(".projects");
    const isotopeOptions = {
        itemSelector: ".project",
        layoutMode: "fitRows",
    };
    const isotopeInstance = new Isotope(squareSection, isotopeOptions);
    const daisyFilterButtons = document.querySelectorAll("#daisy-filters input");

    daisyFilterButtons.forEach(function (input) {
        input.addEventListener("change", function () {
          if (input.checked) {
              const filterValue = input.getAttribute("data-filter");
              isotopeInstance.arrange({ filter: filterValue });
          }
        });
    });


    //Dynamically generate skills content 
    const skills = document.querySelectorAll('#skills .skill');
    skills.forEach(skill => {
        const skillName = skill.getAttribute('name');
        const skillValue = skill.getAttribute('value');

        skill.innerHTML = `
        <div class="skill-container">
          <div class="skill-title prose-lg max-w-none">
            <h4>${skillName}</h4>
          </div>
          <div class="skill-progress">
            <div style="width: 0;"></div>
          </div>
        </div>
        `;
    });

    // Add width when the element is visited
    const skillProgressBars = document.querySelectorAll('#skills .skill .skill-progress div');
    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillProgress = entry.target;
                const skillElement = skillProgress.closest('.skill');
                const skillValue = skillElement.getAttribute('value');
                skillProgress.style.width = `${skillValue}%`;
                observer.unobserve(skillProgress);
            }
        });
    };

    // Set up the Intersection Observer
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });

    // Observe each skill progress element
    skillProgressBars.forEach(progressBar => {
        observer.observe(progressBar);
    });





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


});


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




