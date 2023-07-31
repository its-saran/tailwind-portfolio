// Smooth scroll
document.addEventListener('DOMContentLoaded', function() {
    var navLinks = document.querySelectorAll('.navbar a');
  
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener('click', smoothScroll);
    }
  
    function smoothScroll(e) {
      e.preventDefault();
  
      var targetId = this.getAttribute('href');
      var targetPosition = document.querySelector(targetId).offsetTop;
      var startPosition = window.pageYOffset;
      var distance = targetPosition - startPosition;
      var duration = 1000;
      var start = null;
  
      function animation(currentTime) {
        if (start === null) {
          start = currentTime;
        }
        var timeElapsed = currentTime - start;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      }
  
      function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      }
  
      requestAnimationFrame(animation);
    }
});
  

window.addEventListener("scroll", function() {
  var vScroll = window.scrollY;
  var navbar = document.querySelector(".navigation-bar");

  if (vScroll > 70) {
    navbar.classList.add("fixed");
    navbar.classList.add("py-0");
  } else {
    navbar.classList.remove("fixed");
    navbar.classList.remove("py-0");
  }
});

