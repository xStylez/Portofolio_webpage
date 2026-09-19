(() => {
const header = document.querySelector(".site-header");
const toTop = document.querySelector(".to-top");
const shots = [...document.querySelectorAll(".project-slider .project-shot")];
const prevBtn = document.querySelector(".shot-btn--prev");
const nextBtn = document.querySelector(".shot-btn--next");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = [...document.querySelectorAll("main section[id], .hero")];
const nav = document.querySelector(".site-nav");



// Header + back-to-top on scroll
 const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    header?.classList.toggle("is-scrolled", y > 24);

    if (toTop) {
      const show = y > 480;
      toTop.hidden = false;
      toTop.classList.toggle("is-visible", show);
      if (!show && y < 100) {
        // keep hidden attribute only at very top for a11y cleanliness optional
      }
    }
  };
  
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });


let i = 0;

function showShot(index) {
  shots[i].classList.remove("is-active");
  i = (index + shots.length) % shots.length; // wraps around
  shots[i].classList.add("is-active");
}
prevBtn?.addEventListener("click", () => showShot(i - 1));
nextBtn?.addEventListener("click", () => showShot(i + 1));

// Scroll spy for nav
const spy = () => {
  const offset = 120;
  let current = "";

  for (const section of sections) {
    const id = section.id || (section.classList.contains("hero") ? "top" : "");
    if (!id) continue;
    const top = section.getBoundingClientRect().top;
    if (top - offset <= 0) {
      current = id === "top" ? "" : id;
    }
  }

  navLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    const match = href === `#${current}`;
    link.classList.toggle("is-active", Boolean(current) && match);
  });
};

window.addEventListener("scroll", spy, { passive: true });
spy();


})();
