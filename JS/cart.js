// Fetch the loggedInUser object from localStorage
let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || null;
let userDetails = JSON.parse(localStorage.getItem('userDetails')) || [];

if (!loggedInUser) {

} else {
  // Initialize the cart if it doesn't exist
  loggedInUser.cart = loggedInUser.cart || [];
  updateUserDetails(loggedInUser);

  let cart = loggedInUser.cart;

  // Render the cart on the page
  function renderCart() {
    const cartContainer = document.getElementById('cart-items');

    if (!cart.length) {
      cartContainer.innerHTML = `
              <div class="alert alert-warning text-center" role="alert">
                  Your cart is empty. <a href="../index.html#our-products" class="alert-link">Continue shopping</a>.
              </div>
          `;
      return;
    }

    // Create a flex container for the cart
    let total = 0;
    const cartHTML = cart.map((item, index) => {
      const subtotal = item.price * (item.quantity || 1);
      total += subtotal;

      return `
              <div class="cart-item card mb-3">
                  <div class="row g-0">
                      <div class="col-md-3">
                          <img src="${"." + item.image}" class="img-fluid rounded-start" alt="${item.name}">
                      </div>
                      <div class="col-md-7">
                          <div class="card-body">
                              <h5 class="card-title">${item.name}</h5>
                              <p class="card-text">Price: ₹${item.price.toLocaleString("en-IN")}</p>
                              <div class="d-flex align-items-center">
                                  <label for="quantity-${index}" class="me-2">Quantity:</label>
                                  <input type="number" id="quantity-${index}" class="form-control quantity-input me-3" value="${item.quantity || 1}" min="1" data-index="${index}">
                              </div>
                          </div>
                      </div>
                      <div class="col-md-2 d-flex flex-column justify-content-center align-items-center">
                          <p class="fw-bold">Subtotal: ₹${subtotal.toLocaleString("en-IN")}</p>
                          <button class="btn btn-danger btn-sm remove-btn" data-index="${index}">Remove</button>
                      </div>
                  </div>
              </div>
          `;
    }).join('');

    cartContainer.innerHTML = `
          <div class="cart-items-container">${cartHTML}</div>
          <div class="checkout-card card">
              <div class="card-body">
                  <h5 class="card-title">Price Breakdown</h5>
                  <p>Items: ${cart.length}</p>
                  <p>Subtotal: ₹${total.toLocaleString()}</p>
                  <p>VAT (15%): ₹${(total * 0.15).toLocaleString()}</p>
                  <hr>
                  <p class="fw-bold">Total: ₹${(total + total * 0.15).toLocaleString()}</p>
                  <button id="checkoutButton" class="btn btn-primary btn-lg w-100" onclick="displayCartReview()">Checkout</button>
              </div>
          </div>
      `;

    document.querySelectorAll('.quantity-input').forEach(input => {
      input.addEventListener('change', updateQuantity);
    });

    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', removeItem);
    });
  }


  // Update quantity
  function updateQuantity(event) {
    const index = event.target.dataset.index;
    const newQuantity = parseInt(event.target.value);

    if (isNaN(newQuantity) || newQuantity < 1) {
      alert("Quantity must be at least 1.");
      event.target.value = cart[index].quantity || 1;
      return;
    }

    cart[index].quantity = newQuantity;
    updateLoggedInUser();
    renderCart();
  }

  // Remove an item
  function removeItem(event) {
    const index = event.target.dataset.index;
    showRemoveConfirmModal(() => {
      cart.splice(index, 1);
      updateLoggedInUser();
      renderCart();
    });
  }

  function updateLoggedInUser() {
    loggedInUser.cart = cart;
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    updateUserDetails(loggedInUser);
  }

  function updateUserDetails(updatedUser) {
    const userIndex = userDetails.findIndex(user => user.username === updatedUser.username);
    if (userIndex !== -1) {
      userDetails[userIndex] = updatedUser;
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
    }
  }
  document.addEventListener('DOMContentLoaded', renderCart);
}

function showRemoveConfirmModal(onConfirm) {
  var modal = document.getElementById("removeConfirmModal");
  var confirmButton = document.getElementById("confirm-remove-btn");
  var cancelButton = document.getElementById("cancel-remove-btn");
  modal.style.display = "block";
  confirmButton.onclick = function () {
    modal.style.display = "none";
    if (onConfirm) {
      onConfirm();
    }
  };

  cancelButton.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}


function displayCartReview() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedInUser || !loggedInUser.cart || loggedInUser.cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const cartItems = loggedInUser.cart;
  const modal = document.getElementById("cartReviewModal");
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  const totalAmountElement = document.getElementById("totalAmount");

  cartItemsContainer.innerHTML = "";

  let totalAmount = 0;
  cartItems.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";

    itemElement.innerHTML = `
    <div class="d-flex align-items-center">
      <img src="${"." + item.image}" style="width: 100px; height: 70px; object-fit: cover; border-radius: 8px;" class="img-thumbnail me-2" alt="${item.name}">
      <div class="flex-grow-1">
        <span class="cart-item-name">${item.name}</span>
      </div>
      <span class="cart-item-price fw-bold">₹${item.price}</span>
    </div>
  `;


    totalAmount += item.price;
    cartItemsContainer.appendChild(itemElement);
  });

  totalAmountElement.textContent = totalAmount;

  modal.style.display = "block";

  document.getElementById("cancelCheckout").onclick = function () {
    modal.style.display = "none";
  };

  document.getElementById("proceedToShipping").onclick = function () {
    modal.style.display = "none";

    console.log("Proceeding to shipping...");
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}


