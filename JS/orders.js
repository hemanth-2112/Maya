window.onload = function () {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderListContainer = document.getElementById('order-list');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')); // Check if user is logged in
    const loginMessageContainer = document.getElementById('login-message'); // Element to display login/signup message

    if (!loggedInUser) {
        // If not logged in, show the login/signup message and hide the order list
       showLoginModal();
        return;
    }

    // Filter orders for the logged-in user
    const userOrders = orders.filter(order => order.username === loggedInUser.username);

    if (userOrders.length === 0) {
        orderListContainer.innerHTML = '<div class="col-12 text-center"><p>No orders found.</p></div>';
    } else {
        userOrders.forEach(order => {
            const orderCard = document.createElement('div');
            orderCard.classList.add('col-md-4', 'mb-4');
            orderCard.innerHTML = `
                <div class="card shadow-sm">
                    <div class="card-header bg-primary text-white">
                        <h5>Order ID: ${order.orderId}</h5>
                    </div>
                    <div class="card-body">
                        <p><strong>Shipping Address:</strong> ${order.address.street}, ${order.address.city}, ${order.address.country}, ${order.address.postalCode}</p>
                        <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
                        <p><strong>Order Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
                        <p><strong>Total:</strong> ₹${order.total.toFixed(2)}</p>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-info btn-sm" onclick="viewOrderDetails('${order.orderId}')">View Details</button>
                        <button class="btn btn-danger btn-sm" onclick="confirmCancelOrder('${order.orderId}')">Cancel Order</button>
                    </div>
                </div>
            `;
            orderListContainer.appendChild(orderCard);
        });
    }
};

// View Order Details (Optional, you can replace this with a modal or a separate page)
function viewOrderDetails(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(order => order.orderId === orderId);

    if (!order) return;

    // Show order details in a modal or navigate to a new page
    alert(`Order ID: ${order.orderId}\nTotal: ₹${order.total.toFixed(2)}\nItems: ${order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}`);
}

// Show the Cancel Order Modal
function confirmCancelOrder(orderId) {
    const modal = document.getElementById('cancel-order-modal');
    const confirmButton = document.getElementById('confirm-cancel');
    const cancelButton = document.getElementById('cancel-cancel');

    modal.style.display = 'flex'; // Show the modal

    // When Confirm button is clicked, cancel the order
    confirmButton.onclick = function () {
        cancelOrder(orderId);
        modal.style.display = 'none';
    };

    // When Cancel button is clicked, close the modal
    cancelButton.onclick = function () {
        modal.style.display = 'none'; // Close the modal
    };
}

// Cancel the order by removing it from localStorage
function cancelOrder(orderId) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders = orders.filter(order => order.orderId !== orderId); // Remove the order with the matching orderId

    // Update the localStorage with the updated orders list
    localStorage.setItem('orders', JSON.stringify(orders));

    // Reload the page to update the order list
    window.location.reload();
}

function showLoginModal() {
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'), {
        keyboard: false
    });

    loginModal.show();

    document.getElementById("cancel-login").addEventListener('click', () => {
        window.location.href = "../index.html";
    });
    document.getElementById('confirmLogin').addEventListener('click', () => {
        window.location.href = "../HTML/login.html";
    });

}
