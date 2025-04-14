document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cart-items");
    const clearBtn = document.getElementById("clear-cart");
  
    // Load items from localStorage
    const savedItems = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  
    function displayCart() {
      cartContainer.innerHTML = "";
  
      if (savedItems.length === 0) {
        cartContainer.innerHTML = '<p class="empty-message">Din indkøbsliste er tom.</p>';
        return;
      }
  
      savedItems.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
          <span>${item}</span>
          <button onclick="removeItem(${index})">Fjern</button>
        `;
        cartContainer.appendChild(div);
      });
    }
  
    window.removeItem = (index) => {
      savedItems.splice(index, 1);
      localStorage.setItem("shoppingCart", JSON.stringify(savedItems));
      displayCart();
    };
  
    clearBtn.addEventListener("click", () => {
      localStorage.removeItem("shoppingCart");
      displayCart();
    });
  
    displayCart();
  });
  
  