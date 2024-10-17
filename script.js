// Initialize Lenis smooth scrolling
window.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    direction: "vertical",
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Interactive Cursor and Hover Animation
  const links = document.querySelectorAll("nav > .hover-this");
  const cursor = document.querySelector(".cursor");

  const animateHover = function (e) {
    const span = this.querySelector("span");
    const { offsetX: x, offsetY: y } = e,
      { offsetWidth: width, offsetHeight: height } = this,
      move = 25,
      xMove = (x / width) * (move * 2) - move,
      yMove = (y / height) * (move * 2) - move;

    span.style.transform = `translate(${xMove}px, ${yMove}px)`;

    if (e.type === "mouseleave") span.style.transform = "";
  };

  const moveCursor = (e) => {
    const { clientX: x, clientY: y } = e;
    cursor.style.left = x + "px";
    cursor.style.top = y + "px";
  };

  links.forEach((link) => link.addEventListener("mousemove", animateHover));
  links.forEach((link) => link.addEventListener("mouseleave", animateHover));
  window.addEventListener("mousemove", moveCursor);

  // Smooth scrolling to sections when clicking nav links
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default jump behavior

      const targetID = link.getAttribute("href").substring(1); // Get the target section ID
      const targetSection = document.getElementById(targetID);

      // Use Lenis to scroll smoothly to the section
      lenis.scrollTo(targetSection);
    });
  });
});
