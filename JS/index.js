function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('collapsed');
}

const slider = document.querySelector('.slider');

function activate(e) {
  const items = document.querySelectorAll('.item');
  e.target.matches('.next') && slider.append(items[0]);
  e.target.matches('.prev') && slider.prepend(items[items.length - 1]);
}

document.addEventListener('click', activate, false);

const thumbs = document.querySelectorAll('.thumb li');
const infoSlider = document.querySelectorAll('.info-slider');
const items = document.querySelectorAll('.item');

let index = 0;
let autoplayInterval;

function handleThumbClick(ind) {
  setTimeout(() => {
    document.querySelector('.thumb .selected').classList.remove('selected');
    thumbs[ind].classList.add('selected');
  }, 100);

  thumbs.forEach(thumb => {
    thumb.classList.add('disabled');
    setTimeout(() => {
      thumb.classList.remove('disabled');
    }, 100);
  });

  items[index].classList.add('previously-active');
  setTimeout(() => {
    document.querySelector('.item.previously-active').classList.remove('previously-active');
  }, 100);

  index = ind;

  infoSlider.forEach(slide => {
    slide.style.transform = `translateY(${index * -100}%)`;
  });

  document.querySelector('.item.active').classList.remove('active');
  items[index].classList.add('active');
}

thumbs.forEach((thumb, ind) => {
  thumb.addEventListener('click', () => {
    handleThumbClick(ind);
  });
});

function startAutoplay() {
  autoplayInterval = setInterval(() => {
    index = (index + 1) % thumbs.length; // Loop back to the first thumbnail
    handleThumbClick(index);
  }, 2000); // Change slide every 3 seconds
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

// Start autoplay on page load
startAutoplay();

// Optional: Stop autoplay on user interaction
thumbs.forEach(thumb => {
  thumb.addEventListener('mouseover', stopAutoplay);
  thumb.addEventListener('mouseout', startAutoplay);
});


// Variables to store the current and previous scroll positions
let lastScrollTop = 0;
const header = document.querySelector('.header'); // Target your top navbar

// Listen for the scroll event
window.addEventListener('scroll', () => {
  let currentScroll = window.scrollY || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    header.style.top = "-80px";
  } else {

    header.style.top = "0px";
  }

  // Update the last scroll position
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
});


const signinButton = document.getElementById('signinButton');
const loginLink = document.getElementById('loginLink');
const profileDropdown = document.getElementById('profileDropdown');
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedInUser) {
  // If the user is logged in, hide the login link
  loginLink.style.display = 'none';

  // Hide the Sign In button
  signinButton.style.display = 'none';

  // Create the dropdown menu with "View Cart" and "Logout" options
  const dropdownMenuHTML = `
    <button class="dropdown-toggle btn btn-dark rounded-pill" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
     &#x1F464; Hi,${loggedInUser.firstName}
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <li><button id="viewCart" class="dropdown-item">View Cart</button></li>
      <li><button id="logout" class="dropdown-item text-danger">Logout</button></li>
    </ul>
  `;

  // Insert the dropdown menu into the profileDropdown div
  profileDropdown.style.display = 'block';  // Show the dropdown container
  profileDropdown.innerHTML = dropdownMenuHTML;

  // Event listener for the View Cart button
  const viewCartButton = document.getElementById('viewCart');
  viewCartButton.addEventListener('click', () => {
    window.location.href = './HTML/cart.html'; // Redirect to cart page
  });

  // Event listener for the Logout button
  const logoutButton = document.getElementById('logout');
  logoutButton.addEventListener('click', () => {
    // Clear user data from localStorage and reload the page
    localStorage.removeItem('loggedInUser');
    window.location.reload(); // Reload the page to reset the state
  });
}



// Check if user is logged in and update the dropdown
function getLoggedInUser() {
  const addressBarDropdown = document.getElementById('addressBarDropdown');
  let loggedInUser = localStorage.getItem('loggedInUser');

  // If no user is logged in, show the "Please Login or Sign Up" message
  if (!loggedInUser) {
    if (addressBarDropdown) {
      addressBarDropdown.innerHTML = `
        <li>
          <a href="../HTML/login.html"><span class="dropdown-item text-danger">Please Login or Sign Up</span></a>
        </li>
      `;
    }
    return null;
  }

  // Parse the logged-in user object
  return JSON.parse(loggedInUser);
}

// Synchronize loggedInUser with userDetails
function synchronizeData(user) {
  let userDetails = JSON.parse(localStorage.getItem('userDetails') || '[]');

  // Find the user in the userDetails array
  const userIndex = userDetails.findIndex((u) => u.username === user.username);

  if (userIndex !== -1) {
    // Update the user's information
    userDetails[userIndex] = { ...userDetails[userIndex], ...user };
    console.log(`User details updated for username: ${user.username}`);
  } else {
    console.warn(`User with username "${user.username}" not found in userDetails.`);
  }

  // Save updated userDetails and loggedInUser
  localStorage.setItem('userDetails', JSON.stringify(userDetails));
  localStorage.setItem('loggedInUser', JSON.stringify(user));

  console.log("Synchronization complete!");
}

// Update logged-in user and synchronize with userDetails
function updateUserDetails(userDetails) {
  const loggedInUser = getLoggedInUser();

  if (loggedInUser && loggedInUser.username === userDetails.username) {
    if (!loggedInUser.addresses) loggedInUser.addresses = [];
    if (!userDetails.addresses) userDetails.addresses = [];

    const index = loggedInUser.addresses.findIndex((address) => address.type === userDetails.addressType);

    if (index !== -1) {
      // Update existing address
      loggedInUser.addresses[index] = { ...loggedInUser.addresses[index], ...userDetails };
    } else {
      // Add a new address
      loggedInUser.addresses.push({ ...userDetails });
    }

    synchronizeData(loggedInUser);

    console.log("User details updated successfully!");
  } else {
    console.error("Usernames do not match. Update failed.");
  }
}


// Initialize dropdown and functionality on page load
document.addEventListener('DOMContentLoaded', () => {
  const loggedInUser = getLoggedInUser();

  if (loggedInUser) {
    const showModalButton = document.getElementById('showModal');
    if (showModalButton) {
      showModalButton.addEventListener('click', () => {
        populateModal(loggedInUser);
        const modal = new bootstrap.Modal(document.getElementById('addressModal'));
        modal.show();
      });
    }
  }
});

// Add new address or save edited address
document.getElementById('addAddressForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const loggedInUser = getLoggedInUser();

  if (loggedInUser) {
    const newAddress = {
      street: document.getElementById('newStreet').value,
      city: document.getElementById('newCity').value,
      postalCode: document.getElementById('newPostalCode').value,
      country: document.getElementById('newCountry').value,
      location: document.getElementById('newLocation').value,
      type: document.getElementById('newType').value
    };

    const addressIndex = document.getElementById('addressIndex').value;

    if (addressIndex === "") {
      // Add a new address
      if (!loggedInUser.addresses) {
        loggedInUser.addresses = [];
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        loggedInUser.addresses.push(newAddress);
      }

    } else {

      loggedInUser.addresses[addressIndex] = newAddress;
    }

    synchronizeData(loggedInUser);

    document.getElementById('addAddressForm').reset();
    const addAddressModal = bootstrap.Modal.getInstance(document.getElementById('addAddressModal'));
    addAddressModal.hide();

    populateModal(loggedInUser);
  }
});

// Delete address
function deleteAddress(event, user) {
  const index = event.target.getAttribute('data-index');
  if (confirm('Are you sure you want to delete this address?')) {
    user.addresses.splice(index, 1);

    // Synchronize with userDetails
    synchronizeData(user);

    // Refresh modal content
    populateModal(user);
  }
}

// Populate modal with addresses
function populateModal(user) {
  const addresses = user.addresses || [];
  const addressList = document.getElementById('addressList');
  const noAddressesMessage = document.getElementById('noAddressesMessage');

  addressList.innerHTML = '';
  noAddressesMessage.style.display = addresses.length === 0 ? 'block' : 'none';

  if (addresses.length > 0) {
    addresses.forEach((address, index) => {
      const addressDiv = document.createElement('div');
      addressDiv.className = 'address-item mb-3';
      addressDiv.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Address ${index + 1} (${address.type})</h5>
            <p class="card-text">Street: ${address.street}</p>
            <p class="card-text">City: ${address.city}</p>
            <p class="card-text">Postal Code: ${address.postalCode}</p>
            <p class="card-text">Country: ${address.country}</p>
            <p class="card-text">Location: ${address.location}</p>
            <button class="btn btn-warning btn-sm edit-button" data-index="${index}">Edit</button>
            <button class="btn btn-danger btn-sm delete-button" data-index="${index}">Delete</button>
          </div>
        </div>
      `;
      addressList.appendChild(addressDiv);
    });

    // Attach event listeners
    document.querySelectorAll('.edit-button').forEach((btn) => {
      btn.addEventListener('click', (e) => editAddress(e, user));
    });
    document.querySelectorAll('.delete-button').forEach((btn) => {
      btn.addEventListener('click', (e) => deleteAddress(e, user));
    });
  }
}

// Edit an existing address
function editAddress(event, user) {
  const index = event.target.getAttribute('data-index');
  const address = user.addresses[index];

  if (address) {
    // Populate the form with the existing address details
    document.getElementById('newStreet').value = address.street;
    document.getElementById('newCity').value = address.city;
    document.getElementById('newPostalCode').value = address.postalCode;
    document.getElementById('newCountry').value = address.country;
    document.getElementById('newLocation').value = address.location;
    document.getElementById('newType').value = address.type;

    // Set the index in a hidden input field
    document.getElementById('addressIndex').value = index;

    // Show the modal for editing
    const addAddressModal = new bootstrap.Modal(document.getElementById('addAddressModal'));
    addAddressModal.show();
  } else {
    console.error('Address not found for editing.');
  }
}


function getLoggedInUser() {
  return JSON.parse(localStorage.getItem('loggedInUser'));
}

function getUserDetails() {
  return JSON.parse(localStorage.getItem('userDetails')) || [];
}

function updateUserCart(loggedInUser, product) {
  let userDetails = getUserDetails();

  let userIndex = userDetails.findIndex(user => user.username === loggedInUser.username);

  if (userIndex !== -1) {
    if (!userDetails[userIndex].cart) {
      userDetails[userIndex].cart = [];
    }

    if (!loggedInUser.cart) {
      loggedInUser.cart = [];
    }

    const existingProductIndex = userDetails[userIndex].cart.findIndex(item => item.id === product.id);

    if (existingProductIndex > -1) {

      userDetails[userIndex].cart[existingProductIndex].quantity += 1;
      console.log('Updated quantity:', userDetails[userIndex].cart[existingProductIndex].quantity);  // Debugging the updated quantity
    } else {

      userDetails[userIndex].cart.push({ ...product, quantity: 1 });
      console.log('Product added to cart:', product);
    }


    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    loggedInUser.cart = userDetails[userIndex].cart;
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

    displayCartMessage(`✅ ${product.name} added to your cart!`);
  }
}

function displayCartMessage(message) {
  var modal = document.getElementById("cartModal");
  var modalMessage = document.getElementById("cart-message");
  modalMessage.textContent = message;
  modal.style.display = "block";
  setTimeout(function () {
    modal.style.display = "none";
  }, 1500);
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}





document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function () {


    const productId = this.getAttribute('data-id');
    const productName = this.getAttribute('data-name');
    const productPrice = parseInt(this.getAttribute('data-price'));

    let loggedInUser = getLoggedInUser();


    if (!loggedInUser) {

      showModal();
      return;
    }

    let products = JSON.parse(localStorage.getItem('products')) || [];
    let product = products.find(p => p.id == productId);

    console.log('Product found:', product);

    if (product) {

      updateUserCart(loggedInUser, product);
    }
  });
});


function showModal() {
  const modal = document.getElementById('loginModal');
  const modalBackdrop = document.createElement('div');
  modalBackdrop.classList.add('modal-backdrop', 'fade', 'show');
  document.body.appendChild(modalBackdrop);
  modal.classList.add('show');
  modal.style.display = 'block';

  const closeButton = modal.querySelector('.btn-close');
  closeButton.addEventListener('click', hideModal);
  modalBackdrop.addEventListener('click', hideModal);
}

function hideModal() {
  const modal = document.getElementById('loginModal');
  const modalBackdrop = document.querySelector('.modal-backdrop');
  modal.classList.remove('show');
  modal.style.display = 'none';
  document.body.removeChild(modalBackdrop);
}

document.getElementById('loginBtn').addEventListener('click', function () {
  window.location.href = './HTML/login.html';
});

document.addEventListener('DOMContentLoaded', () => {
  // Retrieve products from localStorage
  const productsJSON = localStorage.getItem('products');
  let products = [];

  if (productsJSON) {
      // Parse the JSON data
      products = JSON.parse(productsJSON);
  } else {
      console.warn("No products found in localStorage.");
  }

  // Get the container to append products
  const productsContainer = document.querySelector('.products-container');

  // Generate product cards dynamically
  products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product';
      productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}" class="image">
          <h3>${product.name}</h3>
          <p class="price">₹${product.price.toLocaleString()}</p>
          <div class="rating">
              ⭐⭐⭐⭐☆<span> ${Math.floor(Math.random() * 500)}</span>
          </div>
          <p class="description">${product.description}</p>
          <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
      `;

      // Append to the container
      productsContainer.appendChild(productCard);
  });
});

function isUserLoggedIn(){
  let loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) {
    showModal();
    return;
  }else{
    window.location.href="../HTML/orders.html";
  }

}

fetch('./localStorageData.json')
  .then(response => response.json())
  .then(products => {
    localStorage.setItem('products', JSON.stringify(products));
    console.log('Product data has been saved to localStorage');
  })
  .catch(error => console.error('Error loading product data:', error));
