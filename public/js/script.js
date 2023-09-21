class App {
    constructor() {
        this.header = document.querySelector('header');
        this.navbarMenuItems = document.querySelectorAll('.navbar .menu li');
        this.scrollDuration = 1000;
        this.navLinks = [
            ...document.querySelectorAll('.menu a'),
            ...document.querySelectorAll('.intro-button a'),
        ];

        this.init();
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

            // Save the theme preference in local storage
            localStorage.setItem('theme', theme);
        }

        // Check if a theme preference is saved in local storage and apply it
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            themeToggleElement.setAttribute('data-theme', savedTheme);
            setTheme(savedTheme)
        }

        toggleTheme.addEventListener('change', () => {
            const newTheme = themeToggleElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light'
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
    
    init() {
        this.fixHeader();
        this.animateScroll();
        this.toggleMenu();
        this.toggleTheme();
        this.hideMobileMenu();
        this.generateSkills();
        this.filterPortfolio();
    }
}

const app = new App();

