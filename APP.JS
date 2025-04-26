// Function to add a product to the wishlist
function addToCart(productId) {
    // Check if the user is logged in
    if (!user) {  // `user` is now directly available from the <script> in your HTML
      alert("Du skal være logget ind for at tilføje produkter.");
      return;
    }
  
    // Make a request to the Flask backend to add the product to the wishlist
    fetch(`/add-to-wishlist/${productId}`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert("Produkt tilføjet til din indkøbsliste!");
        } else {
          alert("Noget gik galt. Prøv igen.");
        }
      })
      .catch(error => {
        console.error(error); // Log the error for debugging
        alert("Fejl ved tilføjelse til liste");
      });
  }
  
  // Function to handle the product carousel navigation (optional)
  let currentSlide = 0;
  
  // Carousel functionality to show the next and previous product
  function showSlide(n) {
    const slides = document.querySelectorAll('.product-card');
    if (n >= slides.length) { currentSlide = 0; }
    if (n < 0) { currentSlide = slides.length - 1; }
  
    // Hide all slides
    slides.forEach(slide => {
      slide.style.display = 'none';
    });
  
    // Show the current slide
    slides[currentSlide].style.display = 'block';
  }
  
  // Function to move to the next slide
  function nextSlide() {
    showSlide(currentSlide + 1);
  }
  
  // Function to move to the previous slide
  function prevSlide() {
    showSlide(currentSlide - 1);
  }
  
  // Initialize the carousel to show the first product
  document.addEventListener("DOMContentLoaded", () => {
    showSlide(currentSlide);
  
    // Event listeners for carousel buttons
    document.querySelector('.carousel-prev').addEventListener('click', prevSlide);
    document.querySelector('.carousel-next').addEventListener('click', nextSlide);
  });
  