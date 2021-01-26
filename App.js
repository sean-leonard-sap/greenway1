const burger = document.querySelector(".burger");

// functins
function navToggle(e) {
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    gsap.to(".line1", 0.5, { rotate: "45", y: 5 });
    gsap.to(".line2", 0.5, { rotate: "-45", y: -5 });
    gsap.fromTo(".line3", { opacity: 1 }, { opacity: 0, duration: 0.75 });
    document.getElementById("myNav").style.width = "100%";
    document.getElementById("myNav").style.opacity = "1";
  } else {
    e.target.classList.remove("active");
    gsap.to(".line1", 0.5, { rotate: "0", y: 0 });
    gsap.to(".line2", 0.5, { rotate: "0", y: 0 });
    gsap.fromTo(".line3", { opacity: 0 }, { opacity: 1, duration: 0.75 });
    document.getElementById("myNav").style.width = "0%";
    document.getElementById("myNav").style.opacity = "0";
  }
}

//EventListeners
burger.addEventListener("click", navToggle);
