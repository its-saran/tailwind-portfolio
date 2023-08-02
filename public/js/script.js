document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.navbar a');
  const menuLinks = document.querySelectorAll('.menu a');

  for (const link of [...navLinks, ...menuLinks]) {
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

  const navbar = document.querySelector(".navigation-bar");
  const navbarMenu = document.querySelector(".navbar .menu")

  window.addEventListener("scroll", function () {
    const isScrolled = window.scrollY > 70;
    navbar.classList.toggle("fixed", isScrolled);
    navbar.classList.toggle("mt-[0px]", isScrolled);
    navbar.classList.toggle("w-screen", isScrolled);
    navbarMenu.classList.toggle("gap-4", isScrolled);
  });
});




// document.addEventListener('DOMContentLoaded', function () {
//   const navLinks = document.querySelectorAll('.navbar a');

//   for (const link of navLinks) {
//     link.addEventListener('click', smoothScroll);
//   }

//   function smoothScroll(e) {
//     e.preventDefault();

//     const targetId = this.getAttribute('href');
//     const targetPosition = document.querySelector(targetId).offsetTop;
//     const startPosition = window.pageYOffset;
//     const distance = targetPosition - startPosition;
//     const duration = 1000;
//     let start = null;

//     function animation(currentTime) {
//       if (!start) start = currentTime;
//       const timeElapsed = currentTime - start;
//       const run = ease(timeElapsed, startPosition, distance, duration);
//       window.scrollTo(0, run);
//       if (timeElapsed < duration) requestAnimationFrame(animation);
//     }

//     function ease(t, b, c, d) {
//       t /= d / 2;
//       if (t < 1) return c / 2 * t * t + b;
//       t--;
//       return -c / 2 * (t * (t - 2) - 1) + b;
//     }

//     requestAnimationFrame(animation);
//   }


//   const navbar = document.querySelector(".navigation-bar");
//   const navbarMenu = document.querySelector(".navbar .menu")

//   window.addEventListener("scroll", function () {
//     navbar.classList.toggle("fixed", window.scrollY > 70);
//     navbar.classList.toggle("mt-[0px]", window.scrollY > 70);
//     navbar.classList.toggle("w-screen", window.scrollY > 70);
//     navbarMenu.classList.toggle("gap-4", window.scrollY > 70);
//   });
// });



document.addEventListener("DOMContentLoaded", function () {
  const checkbox = document.querySelector("#toggleMenu");
  const dropdownToggleElement = document.getElementById("dropdown");
  const contentToggleElement = document.getElementById("content");
  const openIcon = document.querySelector(".icon-open");
  const closeIcon = document.querySelector(".icon-close");

  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      contentToggleElement.classList.add("show");
      openIcon.classList.add("hidden");
      closeIcon.classList.remove("hidden");
    } else {
      contentToggleElement.classList.remove("show");
      openIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
    }
  });
});














