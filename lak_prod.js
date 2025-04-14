document.addEventListener("DOMContentLoaded", () => {
  /* ========================================================
     Section 1: Product Filter + Search Functionality
  ======================================================== */
  const searchInput = document.getElementById("search");
  const filterSelect = document.getElementById("filter");
  const searchBtn = document.querySelector(".search-filter button");
  const productItems = document.querySelectorAll(".product-item");
  const checkboxEls = document.querySelectorAll(".search-checkbox");

  searchBtn.addEventListener("click", () => {
    const keyword = searchInput.value.trim().toLowerCase();
    const filter = filterSelect.value;

       // Collect all checked checkboxes
       let checkBoxKeywords = [];
       checkboxEls.forEach(chk => {
         if (chk.checked) {
           checkBoxKeywords.push(chk.value.toLowerCase());
         }
       });

    if (!keyword && filter === "all") {
      alert("Indtast venligst et søgeord eller vælg en kategori.");
      return;
    }

    productItems.forEach(item => {
      const name = item.querySelector("h3").innerText.toLowerCase();
      const category = item.dataset.category || "all";
      const matchSearch = name.includes(keyword);
      const matchFilter = filter === "all" || category === filter;
      item.style.display = (matchSearch && matchFilter) ? "block" : "none";
    });
  });

    // 1) Filter by text search
    const matchSearch = keyword === "" ? true : (name.includes(keyword) || description.includes(keyword));

    // 2) Filter by category
    const matchFilter = filterVal === "all" || category === filterVal;

    // 3) Filter by checkboxes
    let matchCheckboxes = true;
    for (const cbVal of checkBoxKeywords) {
      if (!name.includes(cbVal) && !description.includes(cbVal)) {
        matchCheckboxes = false;
        break;
      }
    }

     // Decide final display
     if (matchSearch && matchFilter && matchCheckboxes) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });


  /* ========================================================
     Section 2: Lactose Tip Alert
  ======================================================== */
  setTimeout(() => {
    alert("Tip: Prøv laktosefri mælk i din kaffe – det smager fantastisk!");
  }, 2000);

  /* ========================================================
     Section 3: Hover Highlight on Product Items
  ======================================================== */
  productItems.forEach(item => {
    item.addEventListener("mouseover", () => item.style.backgroundColor = "#fdf6e3");
    item.addEventListener("mouseout", () => item.style.backgroundColor = "");
  });

  /* ========================================================
     Section 5: Educational Quiz Prompt
  ======================================================== */
  const takeQuiz = confirm("Vil du tage en hurtig quiz om laktosefri produkter?");
  if (takeQuiz) {
    const answer = prompt("Hvilket af følgende er typisk laktosefrit? \nA) Skummetmælk \nB) Havremælk \nC) Fløde");
    if (answer && answer.toLowerCase().includes("b")) {
      alert("Korrekt! Havremælk indeholder ikke laktose.");
    } else {
      alert("Forkert – prøv igen senere!");
    }
  }

  /* ========================================================
     Section 6: Header Behavior (Hide on Scroll, Reappear on Hover)
  ======================================================== */
  let lastScrollY = window.scrollY;
  const header = document.querySelector(".top-bar");

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    header.style.top = currentScrollY > lastScrollY ? "-100px" : "0";
    lastScrollY = currentScrollY;
  });

  header.addEventListener("mouseover", () => {
    header.style.top = "0";
  });

  /* ========================================================
     Section 7: Sticky Section Headers
  ======================================================== */
  const stickyTitles = document.querySelectorAll(".sticky-title");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle("is-pinned", entry.intersectionRatio < 1);
    });
  }, { threshold: [1] });
  stickyTitles.forEach(title => observer.observe(title));

  /* ========================================================
     Section 8: Animate Product into Cart (Simulation)
  ======================================================== */
  const cart = document.querySelector(".nav-right a[href*='Indkøbsliste']");
  document.querySelectorAll(".product-item").forEach(item => {
    item.addEventListener("click", () => {
      const clone = item.cloneNode(true);
      clone.style.position = "fixed";
      clone.style.zIndex = 1000;
      const rect = item.getBoundingClientRect();
      clone.style.left = `${rect.left}px`;
      clone.style.top = `${rect.top}px`;
      clone.style.width = `${rect.width}px`;
      document.body.appendChild(clone);

      const cartRect = cart.getBoundingClientRect();
      clone.animate([
        { transform: "scale(1)", opacity: 1 },
        {
          transform: `translate(${cartRect.left - rect.left}px, ${cartRect.top - rect.top}px) scale(0.1)`,
          opacity: 0
        }
      ], {
        duration: 600,
        easing: "ease-in-out"
      });

      setTimeout(() => clone.remove(), 600);
    });
  });


  /* ========================================================
     Section 10: Dropdown Nav on Hover
  ======================================================== */
  const navItems = document.querySelectorAll(".nav-center li");
  navItems.forEach(li => {
    li.addEventListener("mouseenter", () => {
      const dropdown = li.querySelector(".dropdown");
      if (dropdown) dropdown.style.display = "block";
    });
    li.addEventListener("mouseleave", () => {
      const dropdown = li.querySelector(".dropdown");
      if (dropdown) dropdown.style.display = "none";
    });
  });

  /* ========================================================
     Section 11: Scroll Animation for Fade-Ins
  ======================================================== */
  const animatedEls = document.querySelectorAll(".fade-in");
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  }, { threshold: 0.3 });
  animatedEls.forEach(el => fadeObserver.observe(el));

  /* ========================================================
     Section 12: Auto-Rotate Product Grid Carousel
  ======================================================== */
  const gridContainer = document.querySelector('.grid-container');
  if (gridContainer) {
    gridContainer.scrollLeft = gridContainer.scrollWidth - gridContainer.clientWidth;
    const speed = 1; // pixels per frame
    function animateCarousel() {
      gridContainer.scrollLeft -= speed;
      if (gridContainer.scrollLeft <= 0) {
        gridContainer.scrollLeft = gridContainer.scrollWidth - gridContainer.clientWidth;
      }
      requestAnimationFrame(animateCarousel);
    }
    animateCarousel();
  }

  /* ========================================================
     Section 13: Horizontal Carousel for "Alle opskrifter"
  ======================================================== */
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

  // --- Quiz Modal Functionality ---
  document.addEventListener("DOMContentLoaded", () => {
    const quizModal = document.getElementById("quizModal");
    const closeQuizForm = document.getElementById("closeQuizForm");
    const quizSubmitBtn = document.getElementById("quizSubmitBtn");
    const quizResult = document.getElementById("quizResult");
  
    // Show the quiz modal after 3 seconds
    setTimeout(() => {
      quizModal.classList.add("show");
    }, 3000);
  
    // Closing the quiz form when clicking “X”
    closeQuizForm.addEventListener("click", () => {
      quizModal.classList.remove("show");
    });
  
    // If user clicks outside the form content, also close
    window.addEventListener("click", (e) => {
      if (e.target === quizModal) {
        quizModal.classList.remove("show");
      }
    });
  
    // Submitting the quiz
    quizSubmitBtn.addEventListener("click", () => {
      // Grab the input values
      const userName = document.getElementById("userName");
      const questionOne = document.getElementById("questionOne");
      const questionTwo = document.getElementById("questionTwo");
  
      // Simple validation
      if (!userName.value || !questionOne.value || !questionTwo.value) {
        quizResult.textContent = "Please fill in all fields!";
        quizResult.style.color = "red";
        return;
      }
  
      // Evaluate correctness
      let correctCount = 0;
      // Let’s say "b" is correct for questionOne
      if (questionOne.value === "b") correctCount++;
      
  
      // For questionTwo, define any logic. Example: correct if “milk”
      if (questionTwo.value.trim().toLowerCase() === "milk") correctCount++;
  
      // Show result
      quizResult.style.color = "green";
      quizResult.textContent = `${userName.value}, you got ${correctCount} out of 2 correct!`;
  
      // close the quiz after a short delay
      setTimeout(() => {
        quizModal.classList.remove("show");
      }, 2500);
    });
  });
  
  
  /* ========================================================
     Section 14: Trustpilot Carousel
  ======================================================== */
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

  
