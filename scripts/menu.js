document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const sideMenu = document.getElementById("sideMenu");
  const topBar = document.querySelector(".top-bar");
  const mainContent = document.querySelector(".main-content");

  if (hamburger && sideMenu && topBar && mainContent) {
    hamburger.addEventListener("click", () => {
      sideMenu.classList.toggle("expanded");
      topBar.classList.toggle("expanded");
      mainContent.classList.toggle("expanded");
    });
  }
});