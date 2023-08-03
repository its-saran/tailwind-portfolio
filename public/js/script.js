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


  // // Fixed header
  // const header = document.querySelector('.header');
  // const navbarMenu = document.querySelector('.navbar .menu');

  // window.addEventListener('scroll', () => {
  //   const isScrolled = window.scrollY > 70;
  //   header.classList.toggle('fix-header', isScrolled);
  //   navbarMenu.classList.toggle('gap-4', isScrolled);
  // });


  // Fixed header
  const header = document.querySelector('.header');
  const navbarMenuItems = document.querySelectorAll('.navbar .menu li');

  window.addEventListener('scroll', () => {
    const isScrolled = window.scrollY > 70;
    header.classList.toggle('fix-header', isScrolled);

    navbarMenuItems.forEach(item => {
      item.classList.toggle('px-2', isScrolled);
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

  toggleTheme.addEventListener('change', () => {
    if (toggleTheme.checked) {
      themeToggleElement.setAttribute('data-theme', 'dark');
    } else {
      themeToggleElement.setAttribute('data-theme', 'light');
    }
  });


  const htmlElement = document.querySelector('html');

  // Function to change the data-theme attribute
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
});
