document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const categorySelect = document.getElementById("filter");
    const checkboxes = document.querySelectorAll(".search-checkbox");
    const searchButton = document.querySelector(".checkboxes-block button");
    const productGrid = document.querySelector(".grid-carousel");
  
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
  
    if (prevButton && nextButton && productGrid) {
      prevButton.addEventListener('click', () => {
        productGrid.scrollBy({ left: -300, behavior: 'smooth' });
      });
  
      nextButton.addEventListener('click', () => {
        productGrid.scrollBy({ left: 300, behavior: 'smooth' });
      });
    }
  });
  