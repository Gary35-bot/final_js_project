let products = [];
let cart = [];

// this display the products only admin can see this screen
// only admin user can delete, add , edit
fetch("https://blooming-ocean-52967.herokuapp.com/view-products/")
  .then((response) => response.json())
  .then((json) => {
    console.log(json.data);
    products = json.data;
    renderproducts(products);
  });

function renderproducts(products) {
  let productContainer = document.querySelector("#products-container");
  productContainer.innerHTML = "";

  products.forEach((product) => {
    productContainer.innerHTML += `
      <div class="products">
        <img class="phone-img" src=${product.image} alt="pic">
        <div class="content"
        <h3 class="product-discription">${product.product_name}</h3>
        <h3 class="product-discription">${product.description}</h3>
        <h3 class="product-discription">${product.features}</h3>
        <h3 class="product-price">${product.price}</h3>
        <div class="admin-btn_container">
        <button class="admin-btn" onclick="deleteProduct(${product.product_id})">delete</button>
        <button class="admin-btn" onclick="toggleModal('edit-modal-${product.product_id}')" id='${product.product_id}'>edit</button>
        </div>
      </div>
      <div id="edit-modal-${product.product_id}" class="modal">
          <div class="modaler">
            <button onclick="toggleModal('edit-modal-${product.product_id}')" class="modalbtn" id='${product.product_id}'>X</button>
      <!-- edit-prod -->
            <div class="editin">
              <form>
                <input type="file" id="Image" name="image" required>
                <input required type="text" name="product_name" id="product_name${product.product_id}" placeholder="name"/>
                <input required type="text" name="description" id="description${product.product_id}" placeholder="description"/>
                <input required type="text" name="features" id="feature${product.product_id}" placeholder="feature"/>
                <input required type="text" name="price" id="price${product.product_id}" placeholder="price"/>
                <button type="submit" class='button-modal trigger' onclick='event.preventDefault()' id='${product.product_id}'>Submit Information</button>
              </form>
            </div>
          </div>
        </div>
    `;
  });
  document
    .querySelectorAll(".trigger")
    .forEach((button) => button.addEventListener("click", proceed));
  document
    .querySelectorAll("#Image")
    .forEach((input) => input.addEventListener("change", imageConverter));
}

// window.addEventListener("click", windowOnClick);

function toggleModal(modalID) {
  console.log(modalID);
  document.querySelector(`#${modalID}`).classList.toggle("active");
}

// function windowOnClick(event) {
//   if (event.target === document.querySelector('.button-modal')) {
//       toggleModalUpdate();
//   }
// }

// delete a product
function deleteProduct(product_id) {
  let delConfirm = confirm("Are you sure you want to delete this product?");
  if (delConfirm) {
    fetch(
      `https://blooming-ocean-52967.herokuapp.com/delete-product/${product_id}`
    );
  }
}

// image converter
function imageConverter() {
  const image = document.querySelector(".format-img");
  const file = document.querySelector("#Image").files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    function () {
      // convert image file to string
      image.src = reader.result;
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}

// add products
function addPhone() {
  let f_Image = document.querySelector(".format-img").src;
  let productName = document.getElementById("product_name").value;
  let description = document.getElementById("description").value;
  let features = document.getElementById("features").value;
  let Price = document.getElementById("price").value;

  console.log(addPhone);
  if (confirm("Are you sure want to add this product?")) {
    fetch("https://blooming-ocean-52967.herokuapp.com/add-product/", {
      method: "POST",
      body: JSON.stringify({
        image: f_Image,
        product_name: productName,
        description: description,
        features: features,
        price: Price,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.reload();
      });
  } else {
    console.log("Add cancelled");
  }
}

function proceed(e) {
  console.log(e.target.id);
  let productid = e.target.id;
  console.log(productid);

  let f_Image = document.querySelector(`.format-img`).src;
  let productName = document.getElementById(`product_name${productid}`).value;
  let description = document.getElementById(`description${productid}`).value;
  let features = document.getElementById(`feature${productid}`).value;
  let Price = document.getElementById(`price${productid}`).value;
  if (confirm("awe!")) {
    fetch(
      `https://blooming-ocean-52967.herokuapp.com/edit-product/${productid}/`,
      {
        method: "PUT",
        body: JSON.stringify({
          image: f_Image,
          product_name: productName,
          description: description,
          features: features,
          price: Price,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }
}

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
