document.addEventListener("DOMContentLoaded", () => {
  /****************************************
   * 1. Search Functionality
   ****************************************/
  const searchInput = document.getElementById("recipeSearchInput");
  const searchBtn = document.getElementById("recipeSearchBtn");
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const query = searchInput.value.trim().toLowerCase();
      document.querySelectorAll(".recipe-item").forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? "flex" : "none";
      });
    });
  }

  /****************************************
   * 2. Filtrér Opskrifter Modal
   ****************************************/
  const filterBtn = document.getElementById("filterRecipesBtn");
  const filterModal = document.getElementById("filterModal");
  const closeFilter = document.getElementById("closeFilter");
  const applyFilterBtn = document.getElementById("applyFilterBtn");
  const filterKeyword = document.getElementById("filterKeyword");
  const filterCategory = document.getElementById("filterCategory");
  const filterTime = document.getElementById("filterTime");
  const filterDifficulty = document.getElementById("filterDifficulty");

  if (filterBtn) {
    filterBtn.addEventListener("click", () => {
      if(filterKeyword) filterKeyword.value = "";
      if(filterCategory) filterCategory.value = "";
      if(filterTime) filterTime.value = "";
      if(filterDifficulty) filterDifficulty.value = "";
      filterModal.classList.add("show");
    });
  }
  if (closeFilter) {
    closeFilter.addEventListener("click", () => {
      filterModal.classList.remove("show");
    });
  }
  if (applyFilterBtn) {
    applyFilterBtn.addEventListener("click", () => {
      const keyword = filterKeyword ? filterKeyword.value.trim().toLowerCase() : "";
      const categoryVal = filterCategory ? filterCategory.value : "";
      const timeVal = filterTime ? parseInt(filterTime.value, 10) : NaN;
      const diffVal = filterDifficulty ? filterDifficulty.value : "";
      document.querySelectorAll(".recipe-item").forEach(item => {
        const cat = item.dataset.category || "";
        const time = parseInt(item.dataset.time || "9999", 10);
        const diff = item.dataset.difficulty || "";
        let show = true;
        if (keyword && !item.textContent.toLowerCase().includes(keyword)) {
          show = false;
        }
        if (categoryVal && cat !== categoryVal) {
          show = false;
        }
        if (!isNaN(timeVal) && time > timeVal) {
          show = false;
        }
        if (diffVal && diff !== diffVal) {
          show = false;
        }
        item.style.display = show ? "flex" : "none";
      });
      filterModal.classList.remove("show");
    });
  }

  /****************************************
   * 3. Find Alternativ Modal
   ****************************************/
  const altBtn = document.getElementById("findAlternativeBtn");
  const alternativeModal = document.getElementById("alternativeModal");
  const closeAlternative = document.getElementById("closeAlternative");
  const applyAlternativeBtn = document.getElementById("applyAlternativeBtn");
  const milkTypeInput = document.getElementById("milkType");
  const cookingTypeSelect = document.getElementById("cookingType");

  if (altBtn) {
    altBtn.addEventListener("click", () => {
      milkTypeInput.value = "";
      if (cookingTypeSelect) cookingTypeSelect.value = "dessert";
      alternativeModal.classList.add("show");
    });
  }
  if (closeAlternative) {
    closeAlternative.addEventListener("click", () => {
      alternativeModal.classList.remove("show");
    });
  }
  if (applyAlternativeBtn) {
    applyAlternativeBtn.addEventListener("click", () => {
      const input = milkTypeInput.value.trim().toLowerCase();
      const usage = cookingTypeSelect ? cookingTypeSelect.value : "";
      if (!input) {
        alert("Indtast venligst et produkt.");
        return;
      }
      const alternatives = {
        "mælk": "havremælk",
        "fløde": "kokosfløde",
        "smør": "plantesmør",
        "yoghurt": "kokosyoghurt"
      };
      const suggestion = alternatives[input] || "Prøv mandelmælk!";
      alert(`Du kan erstatte '${milkTypeInput.value}' (til ${usage}) med: ${suggestion}`);
      alternativeModal.classList.remove("show");
    });
  }

  /****************************************
   * 4.Close modal on outside click
   ****************************************/
  window.addEventListener("click", (e) => {
    if (e.target === filterModal) filterModal.classList.remove("show");
    if (e.target === alternativeModal) alternativeModal.classList.remove("show");
  });

  /****************************************
   * 5. Horizontal Carousel (Main "Alle opskrifter" Carousel)
   ****************************************/
  const carouselInner = document.querySelector(".carousel-inner");
  const carouselItems = document.querySelectorAll(".carousel-item");
  const prevBtn = document.querySelector(".carousel-prev");
  const nextBtn = document.querySelector(".carousel-next");
  const dotsContainer = document.querySelector(".carousel-dots");
  let currentIndex = 0;
  
  if (dotsContainer) {
    carouselItems.forEach((item, index) => {
      const dot = document.createElement("button");
      dot.addEventListener("click", () => {
        currentIndex = index;
        updateCarousel();
      });
      dotsContainer.appendChild(dot);
    });
  }
  
  function updateCarousel() {
    const offset = carouselItems[0].offsetWidth + 20;
    carouselInner.style.transform = `translateX(-${currentIndex * offset}px)`;
    if (dotsContainer) {
      [...dotsContainer.children].forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
      });
    }
  }
  
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex === 0) ? carouselItems.length - 1 : currentIndex - 1;
      updateCarousel();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % carouselItems.length;
      updateCarousel();
    });
  }
  updateCarousel();

  /****************************************
   * 6. Trustpilot Carousel 
   ****************************************/
  const trustCarouselInner = document.querySelector(".carousel-inner.trust-inner");
  const trustItems = document.querySelectorAll(".carousel-item.trust-review");
  const trustPrevBtn = document.querySelector(".carousel-prev.trust-prev");
  const trustNextBtn = document.querySelector(".carousel-next.trust-next");
  const trustDotsContainer = document.querySelector(".carousel-dots.trust-dots");
  let trustCurrentIndex = 0;
  
  if (trustDotsContainer) {
    trustItems.forEach((item, index) => {
      const dot = document.createElement("button");
      dot.addEventListener("click", () => {
        trustCurrentIndex = index;
        updateTrustCarousel();
      });
      trustDotsContainer.appendChild(dot);
    });
  }
  
  function updateTrustCarousel() {
    trustCarouselInner.style.transform = `translateX(-${trustCurrentIndex * 100}%)`;
    if (trustDotsContainer) {
      [...trustDotsContainer.children].forEach((dot, index) => {
        dot.classList.toggle("active", index === trustCurrentIndex);
      });
    }
  }
  
  if (trustPrevBtn) {
    trustPrevBtn.addEventListener("click", () => {
      trustCurrentIndex = (trustCurrentIndex > 0) ? trustCurrentIndex - 1 : trustItems.length - 1;
      updateTrustCarousel();
    });
  }
  if (trustNextBtn) {
    trustNextBtn.addEventListener("click", () => {
      trustCurrentIndex = (trustCurrentIndex + 1) % trustItems.length;
      updateTrustCarousel();
    });
  }
  updateTrustCarousel();
  
  setInterval(() => {
    trustCurrentIndex = (trustCurrentIndex + 1) % trustItems.length;
    updateTrustCarousel();
  }, 5000);
  
  
});
