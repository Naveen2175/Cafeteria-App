const menuItems = [
  { name: "Veg Sandwich", price: 50, image: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png" },
  { name: "Coffee", price: 30, image: "https://cdn-icons-png.flaticon.com/512/2935/2935416.png" },
  { name: "Burger", price: 80, image: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png" },
  { name: "Pizza Slice", price: 60, image: "https://cdn-icons-png.flaticon.com/512/3132/3132693.png" },
  { name: "French Fries", price: 40, image: "https://cdn-icons-png.flaticon.com/512/1046/1046786.png" }
];


const cart = {};

function renderMenu() {
  const menu = document.getElementById("menu");
  menu.innerHTML = ""; // clear old content
  menuItems.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p>Price: ₹${item.price}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    menu.appendChild(card);
  });
}

function addToCart(index) {
  const item = menuItems[index];
  if (cart[item.name]) {
    cart[item.name].qty += 1;
  } else {
    cart[item.name] = { ...item, qty: 1 };
  }
  updateCartCount();
}

function updateCartCount() {
  const count = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  document.getElementById("cart-count").innerText = count;
}

function showCart() {
  document.getElementById("cart-modal").classList.remove("hidden");
  renderCartItems();
}

function closeCart() {
  document.getElementById("cart-modal").classList.add("hidden");
}

function renderCartItems() {
  const container = document.getElementById("cart-items");
  container.innerHTML = "";
  let total = 0;
  for (const key in cart) {
    const item = cart[key];
    total += item.qty * item.price;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      ${item.name} - ₹${item.price} x ${item.qty}
      <span class="qty-controls">
        <button onclick="changeQty('${item.name}', -1)">-</button>
        <button onclick="changeQty('${item.name}', 1)">+</button>
        <button onclick="removeItem('${item.name}')">🗑</button>
      </span>
    `;
    container.appendChild(div);
  }
  document.getElementById("total").innerText = total;
  document.getElementById("pay-amount").innerText = total;
}

function changeQty(name, delta) {
  cart[name].qty += delta;
  if (cart[name].qty <= 0) delete cart[name];
  updateCartCount();
  renderCartItems();
}

function removeItem(name) {
  delete cart[name];
  updateCartCount();
  renderCartItems();
}

function showPayment() {
  document.getElementById("payment-modal").classList.remove("hidden");
}

function closePayment() {
  document.getElementById("payment-modal").classList.add("hidden");
}

function payNow() {
  alert("Payment Successful! Thank you.");
  Object.keys(cart).forEach(key => delete cart[key]);
  updateCartCount();
  closePayment();
  closeCart();
}
