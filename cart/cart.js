let cart = JSON.parse(localStorage.getItem("cart")) || [];
const container = document.getElementById("cart-product");
const subtotalBox = document.getElementById("subtotal");
const taxBox = document.getElementById("tax");
const totalBox = document.getElementById("total");
const total2Box = document.getElementById("total2");
const coupon = document.getElementById("coupon");
const applied = document.getElementById("discount-apllied");
const applyBtn = document.getElementById("apply-coupon"); // Add a button to apply coupon

let discount = 0; // Default no discount

const couponCodes = {
  code: 36665,
  code1: 36675,
  code2: 36685,
};

function renderCart() {
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
        <button class="remove-btn" data-index="${index}"><img src="../Assets/trash-can.png"></img>Remove</button>
      </div>
    `;
    container.appendChild(item);
    subtotal += product.price;
  });

  const tax = subtotal * 0.18;
  let total = subtotal + tax;

  // Apply discount if any
  if (discount > 0) {
    total = total - (total * discount);
    applied.innerText ="Discount" +"₹"+(total * discount).toFixed(2);
  }

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
      renderCart(); // Re-render after removal
    });
  });
}

// Apply coupon logic
if (applyBtn) {
  applyBtn.addEventListener("click", () => {
    const enteredCode = parseInt(coupon.value);
    const validCodes = Object.values(couponCodes);

    if (validCodes.includes(enteredCode)) {
      discount = 0.10; // 10% discount
      alert("✅ Coupon applied successfully! 10% discount.");
    } else {
      discount = 0;
      alert("❌ Invalid coupon code.");
    }

    renderCart(); // Refresh prices
  });
}

function showDeliveryPopup() {
  const popup = document.querySelector('.del-over');
  popup.style.display = 'flex';
  setTimeout(() => {
    popup.style.display = 'none';
  }, 3000);
}

// Initial render
renderCart();
