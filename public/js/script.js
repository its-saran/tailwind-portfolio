class App {
    constructor() {
        this.page = document.documentElement.id
        this.header = document.querySelector('header');
        this.navbarMenuItems = document.querySelectorAll('#home .navbar .menu li');
        this.scrollDuration = 1000;
        this.navLinks = [
            ...document.querySelectorAll('#home .menu a'),
            ...document.querySelectorAll('.intro-button a'),
        ];
        this.contactForm = document.getElementById('contact-form');

        this.init();
    }

    hideLoader() {
        const loading_screen = document.querySelector("#project #loading-screen");
        window.addEventListener("load", function () {
            loading_screen.style.display = "none";
        });
    }

    fixHeader() {
        const fixHeaderInternal = () => {
            const isScrolled = window.scrollY > 70;
            this.header.classList.toggle('fix-header', isScrolled);
            this.navbarMenuItems.forEach(item => {
                item.classList.toggle('mx-2', isScrolled);
            });
        };

        window.addEventListener('scroll', fixHeaderInternal);
        fixHeaderInternal();
    }

    animateScroll() {
        const animate = (targetId, duration) => {
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
            animate(e.currentTarget.getAttribute('href'), this.scrollDuration);
        };
        this.navLinks.forEach(link => link.addEventListener('click', handleLinkClick));
    }

    toggleMenu() {
        const toggleMenu = document.querySelector('#menu-switch .toggleMenu');
        const contentToggleElement = document.getElementById('mobileDropdown');

        toggleMenu.addEventListener('change', () => {
            contentToggleElement.classList.toggle('show', toggleMenu.checked);
        });
    }

    toggleTheme() {
        const toggleTheme = document.querySelector('#theme-switch .toggleTheme');
        const themeToggleElement = document.querySelector('html');
        const socialMediaImages = document.querySelectorAll('#social-medias svg image');
        const github_icon = document.querySelector('#project-container #project-content #right .github-link svg image')

        const darkMode = document.querySelector('#dark-mode');
        const lightMode = document.querySelector('#light-mode');

        function setTheme(theme) {
            themeToggleElement.setAttribute('data-theme', theme);
            socialMediaImages.forEach((link, index) => {
                const socialMediaUrls = [
                    `images/${theme}/github.svg`,
                    `images/${theme}/linkedin.svg`,
                    `images/${theme}/instagram.svg`,
                    `images/${theme}/kaggle.svg`,
                    `images/${theme}/gmail.svg`
                ];

                if (index < socialMediaUrls.length) {
                    link.setAttribute('xlink:href', socialMediaUrls[index]);
                }
            });
            if (github_icon) { github_icon.setAttribute('xlink:href', `../images/${theme}/github.svg`)}

            // Save the theme preference in local storage
            localStorage.setItem('theme', theme);
        }

        // Check if a theme preference is saved in local storage and apply it
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            if (savedTheme === 'light') {

                darkMode.classList.remove('swap-on');
                lightMode.classList.remove('swap-off');

                darkMode.classList.add('swap-off');
                lightMode.classList.add('swap-on');

            } else {

                darkMode.classList.remove('swap-off');
                lightMode.classList.remove('swap-on');

                darkMode.classList.add('swap-on');
                lightMode.classList.add('swap-off');
            }
            setTheme(savedTheme)
        } else {
            darkMode.classList.add('swap-on');
            lightMode.classList.add('swap-off');
        }
        

        toggleTheme.addEventListener('change', () => {
            const dataTheme = themeToggleElement.getAttribute('data-theme');
            const newTheme = (dataTheme === 'light') ? 'dark' : 'light';
            setTheme(newTheme);
        });
    }

    hideMobileMenu() {
        // hide mobile menu while clicking <a>
        const targetElement = document.getElementById('mobileDropdown');
        const toggleMenu = document.querySelector('#menu-switch .toggleMenu');
        targetElement.addEventListener('click', event => {
            if (event.target.tagName === 'A') {
                event.preventDefault();
                targetElement.classList.remove('show');
                toggleMenu.click();
            }
        });
    }
    navigateMobileMenu() {
        const targetElement = document.getElementById('mobileDropdown');
        const toggleMenu = document.querySelector('#menu-switch .toggleMenu');
        targetElement.addEventListener('click', event => {
            if (event.target.tagName === 'A') {
                event.preventDefault();
                toggleMenu.click();

                const href = event.target.getAttribute('href');
                console.log(href);
                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            }
        });
    }

    generateSkills() {
        //Dynamically generate skills content 
        const skills = document.querySelectorAll('#skills .skill');
        skills.forEach(skill => {
            const skillName = skill.getAttribute('name');

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
    }

    filterPortfolio() {
        // Isotope filter
        const squareSection = document.querySelector(".projects");
        const isotopeOptions = {
            itemSelector: ".project",
            layoutMode: "fitRows",
            masonry: {
                columnWidth: ".project", 
            },
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
    }

    setupForm() {
        const self = this; // Store a reference to 'this'
    
        this.contactForm.addEventListener('submit', function (event) {
          event.preventDefault();
    
          const formControls = self.contactForm.querySelectorAll('.form-control');
          const submitButton = self.contactForm.querySelector('.send-msg');
    
          // Disable the submit button and add the loading class
          submitButton.disabled = true;
        //   submitButton.classList.add('loading');
        submitButton.classList.add('sending');
    
          // Loop through each form control
          for (let i = 0; i < formControls.length; i++) {
            // Check if the current control is empty or invalid
            if ((formControls[i].value === '' && formControls[i].required) || !formControls[i].checkValidity()) {
              // If it's empty or invalid, add the "is-invalid" class to set its border color to red
              formControls[i].classList.add('is-invalid');
            } else {
              // If it's not empty or invalid, remove the "is-invalid" class (if it exists)
              formControls[i].classList.remove('is-invalid');
            }
          }
    
          if (!self.contactForm.checkValidity()) { // Use this.contactForm
            // Enable the submit button and remove the loading class
            submitButton.disabled = false;
            // submitButton.classList.remove('loading');
            submitButton.classList.remove('sending');
    
            return;
          }
    
          // Check if email is in a valid format only if it is not empty
          const emailInput = self.contactForm.querySelector('#validationCustomEmail'); // Use self.contactForm
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailInput.value !== '' && !emailRegex.test(emailInput.value)) {
            emailInput.setCustomValidity('Invalid email address.');
    
            // Add the "is-invalid" class to the email input if it is required and empty
            if (emailInput.required && emailInput.value === '') {
              emailInput.classList.add('is-invalid');
            }
          } else {
            emailInput.setCustomValidity('');
    
            // Remove invalid feedback div and class if email input is valid
            emailInput.classList.remove('is-invalid');
          }
    
          self.contactForm.classList.add('was-validated'); // Use this.contactForm
    
          // If form is valid, submit the data via AJAX
          const xhr = new XMLHttpRequest();
          xhr.open('POST', 'https://script.google.com/macros/s/AKfycbywuu8dJaTJMV01hPzTGe7jQ5aRvuSBlKcw6Xf9qk2YwGfTV255zVQ_vREbSEGLifu9sQ/exec');
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.onload = function () {
            if (xhr.status === 200) {
              document.querySelector('.success-msg').textContent = 'Message sent successfully!';
              document.querySelector('.success-msg').style.display = 'block';
              setTimeout(function () {
                document.querySelector('.success-msg').style.display = 'none';
              }, 3000);
    
              // Enable the submit button and remove the loading class
              submitButton.disabled = false;
            //   submitButton.classList.remove('loading');
            submitButton.classList.remove('sending');
            } else {
              document.querySelector('.error-msg').textContent = 'Something went wrong. Please try again!';
              document.querySelector('.error-msg').style.display = 'block';
              setTimeout(function () {
                document.querySelector('.error-msg').style.display = 'none';
              }, 3000);
    
              // Enable the submit button and remove the loading class
              submitButton.disabled = false;
            //   submitButton.classList.remove('loading');
              submitButton.classList.remove('sending');
            }
          };
          xhr.onerror = function () {
            // Error handling
          };
          xhr.send(new URLSearchParams(new FormData(self.contactForm))); // Use self.contactForm
        });
    }
    
    init() {
        if (this.page === "home") {
            this.fixHeader();
            this.animateScroll();
            this.toggleMenu();
            this.toggleTheme();
            this.hideMobileMenu();
            this.generateSkills();
            this.filterPortfolio();
            this.setupForm();
        } else if (this.page === "project") {
            this.fixHeader();
            this.toggleMenu();
            this.toggleTheme();
            this.navigateMobileMenu();
        }

    }
}

const app = new App();

