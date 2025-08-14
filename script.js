const container = document.getElementById("product-list");

// Load existing cart from localStorage or initialize empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to update cart count badge
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  cartCount.innerText = cart.length;
}

// Call this once on page load
updateCartCount();

products.forEach(product => {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <h2>${product.name}</h2>
    <img src="${product.image}" width="150" />
    <p>Price: ₹${product.price}</p>
    <button class="add-cart-btn">Add to Cart</button>
    
  `;

  // Add event listener to the button
  const btn = card.querySelector(".add-cart-btn");
  btn.addEventListener("click", () => {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    
  });

  container.appendChild(card);
});


let menu = document.querySelector("#menu");
let menus = document.querySelector(".menus");
let close = document.querySelector("#close-btn");

menu.addEventListener("click", () => {
  menus.style.display = "flex"; // ✅ Use the variable
  menus.style.display = "opacity:1"; // ✅ Use the variable
});
close.addEventListener("click", () => {
  menus.style.display = "none"; // ✅ Use the variable
  menus.style.display = "opacity:0"; // ✅ Use the variable
});




const scrollBtn = document.getElementById("scroll-btn");
const productList = document.getElementById("main");

scrollBtn.addEventListener("click", () => {
  productList.scrollIntoView({ behavior: "smooth" });
});
