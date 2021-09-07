let products = []; // created a empty array so products can be displayed //
let cart = []; // array cart is used for the items //

const mystorage = window.localStorage;

// connects with the api
fetch("https://blooming-ocean-52967.herokuapp.com/view-products/")
  .then((response) => response.json())
  .then((json) => {
    console.log(json.data);
    products = json.data;
    renderproducts(products);
  });

// displaying the products in the web browser
function renderproducts(products) {
  let productContainer = document.querySelector("#products-container");
  productContainer.innerHTML = "";

  products.forEach((product) => {
    productContainer.innerHTML += `
      <div class="products">
        <img class="image" src=${product.image} alt="pic">
        <h3 class="product-discription">${product.product_name}</h3>
        <h3 class="product-discription">${product.description}</h3>
        <h3 class="product-discription">${product.features}</h3>
        <h3 class="product-price">${product.price}</h3>
        <button onclick="addToCart(${product.product_id})">Cart</button>
      </div>       
    `;
  });
}

// search bar
function searchPhones() {
  let searchTerm = document.querySelector("#searchTerm").value;
  console.log(searchTerm);

  let searchPhones = products.filter((products) =>
    products.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(searchPhones);

  if (searchPhones.length == 0) {
    document.querySelector("#products-container").innerHTML =
      "<h2>sorry, not found try something else...</h2>";
  } else {
    renderproducts(searchPhones);
  }
}

// filter through products using the buttons
function productFilter(category) {
  if (category !== "All") {
    let searchPhones = products.filter((products) =>
      products.product_name.toLowerCase().includes(category.toLowerCase())
    );
    console.log(searchPhones);
    renderproducts(searchPhones);
  } else {
    renderproducts(products);
  }
}

// add tocard function
function addToCart(id) {
  let product = products.find((item) => {
    return item.product_id == id;
  });
  console.log(product);
  cart = JSON.parse(mystorage.getItem("cart"));
  cart.push(product);
  console.log(cart);
  mystorage.setItem("cart", JSON.stringify(cart));
  console.log(mystorage.getItem("cart"));

  alert("Added to Cart");
  // console.log("Here is your items:", cart);
  // renderCart(cart);
}
let background = 0;
// created a modal
// so when you click the button "add to cart" items gets displayed in the modal
function Modal() {
  if (background == 0) {
    document.body.style.overflowY = "hidden";
    document.querySelector(`.hi`).classList.toggle("active");
    showCart();
    calcuTotal();
    thing = 1;
  } else {
    document.body.style.overflowY = "scroll";
    document.querySelector(`.hi`).classList.toggle("active");
    showCart();
    calcuTotal();
    thing = 0;
  }
}

// this function aligns with the modal so you can see the items in  the cart
function showCart() {
  let container = document.querySelector(".cart");
  container.innerHTML = "";
  cart = JSON.parse(mystorage.getItem("cart"));
  cart.forEach((item) => {
    container.innerHTML += `
  <span onclick="Modal()" class="close">&times</span>
  <div class="products">
      <img class="image" src=${item.image} alt="pic">
      <h3 class="product-discription">${item.product_name}</h3>
      <h3 class="product-discription">${item.description}</h3>
      <h3 class="product-price">${item.price}</h3>
      <button onclick="remove(${item.product_id})" class="remove-btn text-bold">Remove</button>
      <button onclick="calcuTotal(${item.product_id})" class="remove-btn text-bold"></button>
  </div>
  `;
  });
}

function calcuTotal() {
  let totalcost = 0;
  for (let i of cart) {
    price = parseInt(i["price"].substring(1));
    totalcost += price;
  }
  console.log(totalcost);
  document.querySelector(
    ".totalofcart"
  ).innerHTML = `Total Cost: <span> R${totalcost} </span>`;
}
// remove from cart

function remove(id) {
  cart = JSON.parse(mystorage.getItem("cart"));
  cart = cart.filter((item) => item.product_id != id);
  mystorage.setItem("cart", JSON.stringify(cart));
  showCart(cart);
  calcuTotal();
  alert("Removed from Cart");
}
