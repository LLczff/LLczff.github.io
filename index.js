/** Particle JS */
// ref: https://github.com/VincentGarreau/particles.js
particlesJS.load("particles-js", "constants/particles.json", () => {
  console.log("Callback: particles.js loaded");
});

/** Typed JS */
// ref: https://github.com/mattboldt/typed.js
const typed = new Typed(".typing", {
  strings: ["a Developer", "an Engineer", "a Learner"],
  typeSpeed: 50,
  backSpeed: 50,
  backDelay: 1000,
  loop: true,
  smartBackspace: false,
});

/** Fetch data from file */
// skills box
fetch("constants/skills.json")
  .then((res) => res.json())
  .then((skills) => {
    document.querySelector("#skills .content").innerHTML = skills
      .map(
        (skill) =>
          // we have to invert Express logo color specifically since we cannot find white logo
          `<figure class="skill">
            <img
              src="${skill.image}" alt="${skill.name}"
              style="height: ${skill.height};
                    ${skill.name === "Express" && "filter: invert(100%);"}"
            />
            <figcaption>${skill.name}</figcaption>
          </figure>`
      )
      .join("");
  });

/** Animation */

// some animation is based on screen size, so we declare a media query
const smallestScreen = window.matchMedia("(max-width: 576px)");

//////////////////////// Method 1 ////////////////////////
// Trigger when scroll to the threshold (only when scroll down)
// animation is reversed when scroll up passed the threshold
function slideFromTop(className, visibleAt) {
  const reveals = document.querySelectorAll(className);
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = visibleAt; // threshold
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("passive-state");
    } else {
      reveals[i].classList.remove("passive-state");
    }
  }
}

window.addEventListener("scroll", function () {
  slideFromTop(".reveal", 300);
  slideFromTop(".skill", 100);

  // change animation of experience section, if screen width <= 576px
  if (smallestScreen.matches) {
    slideFromTop("#experience .checkpoint div", 300);
  }
});

//////////////////////// Method 2 ////////////////////////
//  Trigger when enter the viewport either from scroll up or down
const observer = new IntersectionObserver((entries) =>
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("passive-state");
    } else {
      entry.target.classList.remove("passive-state");
    }
  })
);

// register elements to observer
if (!smallestScreen.matches) {
  const jobs = document.querySelectorAll("#experience .checkpoint div");
  jobs.forEach((element) => observer.observe(element));
}

/** Hamburger menu */
const smallScreen = window.matchMedia("(max-width: 640px)");
const burger = document.getElementById("hamburger");
const navbar = document.getElementById("navbar");

function toggleNavbar() {
  if (burger.classList.contains("menu-active")) {
    burger.classList.remove("menu-active");
    navbar.classList.remove("menu-active");
  } else {
    burger.classList.add("menu-active");
    navbar.classList.add("menu-active");
  }
}

// close the menu when it's active and screen goes to larger size
window.addEventListener("resize", function () {
  if (!smallScreen.matches) {
    burger.classList.remove("menu-active");
    navbar.classList.remove("menu-active");
  }
});

// close the menu when the link was clicked
document.querySelectorAll("#navbar li .link-btn").forEach((link) => {
  link.addEventListener("click", () => {
    if (burger.classList.contains("menu-active")) {
      burger.classList.remove("menu-active");
      navbar.classList.remove("menu-active");
    }
  });
});

// close the menu when click outside the navbar
document.addEventListener("click", function (event) {
  if (
    burger.classList.contains("menu-active") &&
    !event.target.isEqualNode(burger) && // when not clicking on burger
    !event.target.isEqualNode(navbar) && // when not clicking on navbar
    !burger.contains(event.target) && // when clicked area is not inside burger
    !navbar.contains(event.target) // when clicked area is not inside navbar
  ) {
    burger.classList.remove("menu-active");
    navbar.classList.remove("menu-active");
  }
});
