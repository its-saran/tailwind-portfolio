

document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.navbar a');
  const navbar = document.querySelector(".navigation-bar");

  for (const link of navLinks) {
    link.addEventListener('click', smoothScroll);
  }

  function smoothScroll(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetPosition = document.querySelector(targetId).offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;

    function animation(currentTime) {
      if (!start) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }

  window.addEventListener("scroll", function() {
    navbar.classList.toggle("fixed", window.scrollY > 70);
    navbar.classList.toggle("mt-[0px]", window.scrollY > 70);
    navbar.classList.toggle("w-screen", window.scrollY > 70);
  });
});
