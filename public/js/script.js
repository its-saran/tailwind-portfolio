document.addEventListener('DOMContentLoaded', function () {
  const animateScroll = (targetId, duration) => {
    const targetPosition = document.querySelector(targetId).offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
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

  const navbar = document.querySelector('.navigation-bar');
  const navbarMenu = document.querySelector('.navbar .menu');

  window.addEventListener('scroll', () => {
    const isScrolled = window.scrollY > 70;
    navbar.classList.toggle('fixed', isScrolled);
    navbar.classList.toggle('mt-[0px]', isScrolled);
    navbar.classList.toggle('w-screen', isScrolled);
    navbarMenu.classList.toggle('gap-4', isScrolled);
  });

  const toggleMenu = document.querySelector('#toggleMenu');
  const contentToggleElement = document.getElementById('content');

  toggleMenu.addEventListener('change', () => {
    contentToggleElement.classList.toggle('show', toggleMenu.checked);
  });

  const targetElement = document.getElementById('content');
  targetElement.addEventListener('click', event => {
    if (event.target.tagName === 'A') {
      event.preventDefault();
      targetElement.classList.remove('show');
      toggleMenu.click();
    }
  });
});
