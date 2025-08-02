let cart = JSON.parse(localStorage.getItem("cart")) || [];
const container = document.getElementById("cart-product");
const subtotalBox = document.getElementById("subtotal");
const taxBox = document.getElementById("tax");
const totalBox = document.getElementById("total");
const total2Box = document.getElementById("total2");

function renderCart() {
  // Clear previous content
  container.innerHTML = "";

  if (!container || !subtotalBox) {
    console.error("❌ Missing cart-product or subtotal element in HTML");
    return;
  }

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    subtotalBox.innerText = `Subtotal: ₹0`;
    taxBox.innerText = `Tax: ₹0`;
    totalBox.innerText = `Total: ₹0.00`;
    total2Box.innerText = `Total: ₹0.00`;
    return;
  }

  let subtotal = 0;
  cart.forEach((product, index) => {
    const item = document.createElement("div");
    item.className = "items";
    item.innerHTML = `
      <img src="../${product.image}" alt="${product.name}">
      <div class="item-details">
        <h3>${product.name}</h3>
        <p>Price: ₹${product.price}</p>
        <button class="remove-btn" data-index="${index}">Remove</button>
      </div>
    `;
    container.appendChild(item);
    subtotal += product.price;
  });

  // Tax and total calculations
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  // Update price values
  subtotalBox.innerText = `Subtotal: ₹${subtotal}`;
  taxBox.innerText = `Tax: ₹${tax.toFixed(2)}`;
  totalBox.innerText = `Total: ₹${total.toFixed(2)}`;
  total2Box.innerText = `Total: ₹${total.toFixed(2)}`;

  // Add remove functionality
  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.getAttribute("data-index"));
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart(); // Re-render cart after removing
    });
  });
}

// Initial render
renderCart();

function showDeliveryPopup() {
  const popup = document.querySelector('.del-over');
  popup.style.display = 'flex';

  setTimeout(() => {
    popup.style.display = 'none';
  }, 3000);
}
