document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const sideMenu = document.getElementById("sideMenu");
  const topBar = document.querySelector(".top-bar");
  const mainContent = document.querySelector(".main-content");

  if (hamburger && sideMenu) {
    hamburger.addEventListener("click", () => {
      sideMenu.classList.toggle("expanded");

      if (topBar) topBar.classList.toggle("expanded");
      if (mainContent) mainContent.classList.toggle("expanded");
    });
  }
});
