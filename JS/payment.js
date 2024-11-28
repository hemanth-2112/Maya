// Load Data on Page Load
window.onload = function () {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};
    const userDetails = JSON.parse(localStorage.getItem('userDetails')) || [];
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    // Check if Cart is Empty, Redirect if True
    if (!loggedInUser.cart || loggedInUser.cart.length === 0) {
        // Redirect to the Cart Page if empty
        window.location.href = '../HTML/cart.html';  // or '../HTML/orders.html' if you want to go to orders page
        return;  // Exit to prevent the rest of the script from running
    }

    // Display User Info
    document.getElementById('user-name').textContent = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
    document.getElementById('user-email').textContent = `Email: ${loggedInUser.email}`;

    // Render Cart and Shipping Address
    renderCartSummary(loggedInUser.cart);
    renderShippingAddress(loggedInUser.addresses);

    // Add Event Listeners
    setupEventListeners(loggedInUser, userDetails, orders);
};

// Render Cart Summary as Table
function renderCartSummary(cart) {
    const cartSummary = document.getElementById('cart-summary');
    if (!cart || cart.length === 0) {
        cartSummary.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    let tableHTML = `
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Amount (₹)</th>
                </tr>
            </thead>
            <tbody>
    `;
    cart.forEach(item => {
        tableHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${(item.quantity * item.price).toFixed(2)}</td>
            </tr>
        `;
    });

    const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
    tableHTML += `
            </tbody>
        </table>
        <p><strong>Total: ₹${total.toFixed(2)}</strong></p>
    `;

    cartSummary.innerHTML = tableHTML;
}

// Render Existing Shipping Addresses
function renderShippingAddress(addresses) {
    const addressContainer = document.getElementById('existing-addresses');
    addressContainer.innerHTML = '';

    addresses.forEach((address, index) => {
        addressContainer.innerHTML += `
            <div class="address-card">
                <input type="radio" name="shipping-address" value="${index}" id="address-${index}">
                <label for="address-${index}">
                    ${address.street}, ${address.city}, ${address.country} (${address.postalCode})
                </label>
            </div>
        `;
    });
}

// Add Event Listeners
function setupEventListeners(loggedInUser, userDetails, orders) {
    const addAddressForm = document.getElementById('new-address-form');
    const addNewAddressButton = document.getElementById('add-new-address');
    const saveAddressButton = document.getElementById('save-address');
    const paymentMethodSelect = document.getElementById('payment-method');
    const paymentDetails = document.getElementById('payment-details');

    // Show/Hide Add Address Form
    addNewAddressButton.addEventListener('click', () => {
        addAddressForm.classList.toggle('hidden');
    });

    // Save New Address
    saveAddressButton.addEventListener('click', () => {
        const newStreet = document.getElementById('new-street').value;
        const newCity = document.getElementById('new-city').value;
        const newPostalCode = document.getElementById('new-postalCode').value;
        const newCountry = document.getElementById('new-country').value;

        if (!newStreet || !newCity || !newPostalCode || !newCountry) {
            alert('All fields are required.');
            return;
        }

        const newAddress = { street: newStreet, city: newCity, postalCode: newPostalCode, country: newCountry };
        loggedInUser.addresses.push(newAddress);

        const userIndex = userDetails.findIndex(user => user.username === loggedInUser.username);
        if (userIndex !== -1) {
            userDetails[userIndex].addresses = loggedInUser.addresses;
        }

        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        renderShippingAddress(loggedInUser.addresses);
        alert('Address added successfully!');
        addAddressForm.classList.add('hidden');
        addAddressForm.reset();
    });

    // Render Payment Fields Based on Method
    paymentMethodSelect.addEventListener('change', () => {
        const method = paymentMethodSelect.value;

        paymentDetails.innerHTML = ''; // Clear previous fields
        if (method === 'credit-card') {
            paymentDetails.innerHTML = `
                <div class="mb-2">
                    <input type="text" id="card-number" class="form-control" placeholder="Card Number" required>
                </div>
                <div class="mb-2">
                    <input type="text" id="expiry-date" class="form-control" placeholder="Expiry Date (MM/YY)" required>
                </div>
                <div class="mb-2">
                    <input type="text" id="cvv" class="form-control" placeholder="CVV" required>
                </div>
            `;
        } else if (method === 'paypal') {
            paymentDetails.innerHTML = `
                <div class="mb-2">
                    <input type="email" id="paypal-email" class="form-control" placeholder="PayPal Email" required>
                </div>
            `;
        } else if (method === 'upi') {
            paymentDetails.innerHTML = `
                <div class="mb-2">
                    <input type="text" id="upi-id" class="form-control" placeholder="UPI ID" required>
                </div>
            `;
        }
        // No fields needed for COD
    });

    // Place Order
    document.getElementById('place-order').addEventListener('click', () => {
        const selectedAddressIndex = document.querySelector('input[name="shipping-address"]:checked');
        const paymentMethod = paymentMethodSelect.value;

        if (!loggedInUser.cart || loggedInUser.cart.length === 0) {
            alert('Your cart is empty.');
            return;
        }

        if (!selectedAddressIndex) {
            alert('Please select a shipping address.');
            return;
        }

        if (!paymentMethod) {
            alert('Please select a payment method.');
            return;
        }

        // Validate Payment Details
        if (paymentMethod === 'credit-card') {
            const cardNumber = document.getElementById('card-number').value;
            const expiryDate = document.getElementById('expiry-date').value;
            const cvv = document.getElementById('cvv').value;

            if (!cardNumber || !expiryDate || !cvv) {
                alert('Please enter all required credit card details.');
                return;
            }
        } else if (paymentMethod === 'paypal') {
            const paypalEmail = document.getElementById('paypal-email').value;
            if (!paypalEmail) {
                alert('Please enter your PayPal email.');
                return;
            }
        } else if (paymentMethod === 'upi') {
            const upiId = document.getElementById('upi-id').value;
            if (!upiId) {
                alert('Please enter your UPI ID.');
                return;
            }
        }
        // Open Confirmation Modal
        const modal = document.getElementById('confirmation-modal');
        document.getElementById('modal-cart-summary').innerHTML = document.getElementById('cart-summary').innerHTML;
        modal.style.display = 'block';

        // Confirm Order
        document.getElementById('confirm-order').onclick = () => {
            const selectedAddress = loggedInUser.addresses[selectedAddressIndex.value];
            const orderId = `ORD-${Date.now()}`;

            const newOrder = {
                username: loggedInUser.username,
                orderId,
                items: [...loggedInUser.cart],
                address: selectedAddress,
                paymentMethod,
                total: loggedInUser.cart.reduce((sum, item) => sum + item.quantity * item.price, 0),
                date: new Date().toISOString(),
            };

            orders.push(newOrder);

            // Clear Cart and Update UserDetails
            loggedInUser.cart = [];
            const userIndex = userDetails.findIndex(user => user.username === loggedInUser.username);
            if (userIndex !== -1) {
                userDetails[userIndex].cart = [];
            }

            localStorage.setItem('orders', JSON.stringify(orders));
            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
            localStorage.setItem('userDetails', JSON.stringify(userDetails));

            showOrderSuccessModal();
            window.location.href = '../HTML/orders.html';  
        };

        // Cancel Order
        document.getElementById('cancel-order').onclick = () => {
            modal.style.display = 'none';
        };
    });
}

// Show the Order Success Modal
function showOrderSuccessModal() {
    const modal = document.getElementById('order-success-modal');
    modal.style.display = 'block'; // Show the modal

    // Close the modal when the "OK" buttonl is cicked
    
    setTimeout(function() {
        document.getElementById('close-modal').onclick = function () {
            modal.style.display = 'none'; // Hide the modal
            window.location.href = '../HTML/orders.html'; 
        };
        modal.style.display = 'none'; // Hide the modal after timeout
        window.location.href = '../HTML/orders.html'; // Redirect to orders page
    }, 3000);
}



