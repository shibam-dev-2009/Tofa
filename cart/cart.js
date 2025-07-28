const cart = JSON.parse(localStorage.getItem("cart")) || [];
const container = document.getElementById("cart-product");
const subtotalBox = document.getElementById("subtotal");
const taxBox = document.getElementById("tax");

const totalBox = document.getElementById("total");
const total2Box = document.getElementById("total2");
if (!container || !subtotalBox) {
  console.error("❌ Missing cart-product or subtotal element in HTML");
} else if (cart.length === 0) {
  container.innerHTML = "<p>Your cart is empty.</p>";
} else {
  let subtotal = 0;
  let tax = 0;
  let total = 0;

  cart.forEach(product => {
    const item = document.createElement("div");
    item.className = "items";
    item.innerHTML = `
      <img src="../${product.image}" alt="${product.name}">
      <div class="item-details">
        <h3>${product.name}</h3>
        <p>Price: ₹${product.price}</p>
      </div>
    `;
    container.appendChild(item);
    subtotal += product.price;
    tax = subtotal*0.18;
    total = subtotal+tax;
  });

  subtotalBox.innerText = `Subtotal: ₹${subtotal}`;
  taxBox.innerText = `Tax: ₹${tax}`;
  totalBox.innerText = `Total: ₹${total}`;
  total2Box.innerText = `Total: ₹${total}`;
}
function showDeliveryPopup() {
  const popup = document.querySelector('.del-over');
  popup.style.display = 'flex';

  // Auto-hide after 3 seconds
  setTimeout(() => {
    popup.style.display = 'none';
  }, 3000);
}
