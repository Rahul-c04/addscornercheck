


const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

addEventOnElements(navTogglers, "click", function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
});

addEventOnElements(navLinks, "click", function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("nav-active");
});


const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  header.classList[window.scrollY > 100 ? "add" : "remove"]("active");
});


gsap.to(".main", {
  backgroundColor: "#000",
  scrollTrigger: {
    trigger: ".main",
    scroller: "body",
    // markers: true,
    start: "top -50vh",
    end: "top -50vh",
    scrub: 1,
  },
});

const header2 = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[down-arrow]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header2.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header2.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});


// Number counting animation

let section_counter = document.querySelector('#page2');
let counters = document.querySelectorAll('.counter-item .counter');

let CounterObserver = new IntersectionObserver(
  (entries, observer) => {
    let [entry] = entries;
    if (!entry.isIntersecting) return;

    let speed = 500;
    counters.forEach((counter, index) => {
      function UpdateCounter() {
        const targetNumber = +counter.dataset.target;
        const initialNumber = +counter.innerText;
        const incPerCount = targetNumber / speed;
        if (initialNumber < targetNumber) {
          counter.innerText = Math.ceil(initialNumber + incPerCount);
          setTimeout(UpdateCounter, 40);
        } else {
          counter.innerText = targetNumber;
        }
      }
      UpdateCounter();

      if (counter.parentElement.style.animation) {
        counter.parentElement.style.animation = '';
      } else {
        counter.parentElement.style.animation = `slide-up 0.3s ease forwards ${
          index / counters.length + 0.5
        }s`;
      }
    });

    observer.unobserve(entry.target);
  },
  {
    root: null,
    threshold: window.innerWidth > 768 ? 0.4 : 0.3,
  }
);

if (section_counter) {
  CounterObserver.observe(section_counter);
}

// circle move animation

   const fade = document.querySelector(".fade");
  const circle = document.querySelector(".circle");

      fade.addEventListener("mousemove", function (e) {
        const rect = fade.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(circle, {
          x: x - circle.offsetWidth / 2,
          y: y - circle.offsetHeight / 2,
          ease: "power3.out",
          duration: 1,
        });
      });
  
  // img move animation

  document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });
});


const button = document.querySelector(".btn-tertiary");

button.addEventListener("mouseenter", function () {
  circle.style.opacity = 0;
});

button.addEventListener("mouseleave", function () {
  circle.style.opacity = 1;
});


// slider move animation

let scrollContainer = document.querySelector(".gallery");
let backBtn = document.getElementById("arrowLeft");
let nextBtn = document.getElementById("arrowRight");

nextBtn.addEventListener("click", () => {
  scrollContainer.style.scrollBehavior = "smooth";
  scrollContainer.scrollLeft += 900;
});

backBtn.addEventListener("click", () => {
  scrollContainer.style.scrollBehavior = "smooth";
  scrollContainer.scrollLeft -= 900;
});

// scroll reveal

const sections = document.querySelectorAll("[data-set]");

const scrollReveal = () => {
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    const threshold = window.innerHeight * 0.85;
    if (top < threshold){
      section.classList.add("active");
    }
  });
}

scrollReveal();

window.addEventListener("scroll", scrollReveal);

// form details collection

  const form = document.querySelector(".contact-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
      name: form.name.value,
      email: form.email_address.value,
      phone: form.phone.value,
      message: form["Enter-messages"].value,
    };

    fetch("https://script.google.com/macros/library/d/1uIs70MNVLdv9SUezqNh7zkGDhKnpKN00A1YNKNWbdQu_zsgT6qITf9-j/5", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res => res.text())
    .then(data => {
      alert("Form submitted successfully!");
      form.reset();
    })
    .catch(err => {
      alert("Error submitting form");
      console.error(err);
    });
  });








