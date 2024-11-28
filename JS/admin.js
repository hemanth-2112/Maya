
function openModal(title, formContent, primaryButtonLabel, onSubmit) {
    document.getElementById('generalModalLabel').innerText = title;
    document.getElementById('modalFormContainer').innerHTML = formContent;
    const primaryButton = document.getElementById('modalPrimaryButton');
    primaryButton.innerText = primaryButtonLabel;
    primaryButton.onclick = onSubmit;
    const modal = new bootstrap.Modal(document.getElementById('generalModal'));
    modal.show();
    const modalElement = document.getElementById('generalModal');
    modalElement.addEventListener('hidden.bs.modal', function () {
        modalElement.classList.remove('show');
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
            backdrop.remove();
        }
    });
}

function generateProductId() {
    return 'P' + Math.floor(Math.random() * 1000);
}
function openAddProductModal() {
    openModal(
        "Add Product",
        `<div id="errorMessages" class="alert alert-danger d-none"></div>
        <form id="addProductForm">
            <div class="mb-3">
                <label for="productId" class="form-label">Product ID:</label>
                <input type="text" id="productId" class="form-control" value="${generateProductId()}" readonly>
            </div>
            <div class="mb-3">
                <label for="productName" class="form-label">Product Name:</label>
                <input type="text" id="productName" class="form-control" placeholder="Enter product name" >
                <small id="errorProductName" class="text-danger"></small>
            </div>
            <div class="mb-3">
                <label for="productDescription" class="form-label">Description:</label>
                <textarea id="productDescription" class="form-control" placeholder="Enter product description" rows="3" ></textarea>
                <small id="errorProductDescription" class="text-danger"></small>
            </div>
            <div class="mb-3">
                <label for="productImage" class="form-label">Image URL:</label>
                <input type="url" id="productImage" class="form-control" placeholder="Enter image URL" >
                <small id="errorProductImage" class="text-danger"></small>
            </div>
            <div class="mb-3">
                <label for="productPrice" class="form-label">Price:</label>
                <input type="number" id="productPrice" class="form-control" placeholder="Enter price" step="0.01" >
                <small id="errorProductPrice" class="text-danger"></small>
            </div>
            <div class="mb-3">
                <label for="productQuantity" class="form-label">Quantity:</label>
                <input type="number" id="productQuantity" class="form-control" placeholder="Enter quantity" >
                <small id="errorProductQuantity" class="text-danger"></small>
            </div>
            <div class="mb-3">
                <label for="productBrand" class="form-label">Brand:</label>
                <input type="text" id="productBrand" class="form-control" placeholder="Enter brand" >
                <small id="errorProductBrand" class="text-danger"></small>
            </div>
            <div class="mb-3">
                <label for="productCategory" class="form-label">Category:</label>
                <input type="text" id="productCategory" class="form-control" placeholder="Enter category" >
                <small id="errorProductCategory" class="text-danger"></small>
            </div>
            <div id="successMessage" class="text-success d-none">Product added successfully!</div>
        </form>`,
        "Add Product",
        function () {
            clearErrorMessages();

            const productData = {
                id: document.getElementById('productId').value,
                name: document.getElementById('productName').value,
                description: document.getElementById('productDescription').value,
                imageUrl: document.getElementById('productImage').value,
                price: parseFloat(document.getElementById('productPrice').value),
                quantity: parseInt(document.getElementById('productQuantity').value, 10),
                brand: document.getElementById('productBrand').value,
                category: document.getElementById('productCategory').value
            };

            let isValid = true;
            const errorMessages = [];

            if (!productData.name) {
                document.getElementById('errorProductName').innerText = "Product Name is required.";
                isValid = false;
            }
            if (!productData.description) {
                document.getElementById('errorProductDescription').innerText = "Product Description is required.";
                isValid = false;
            }
            if (!productData.imageUrl) {
                document.getElementById('errorProductImage').innerText = "Product Image URL is required.";
                isValid = false;
            }
            if (isNaN(productData.price)) {
                document.getElementById('errorProductPrice').innerText = "Product Price is required and must be a valid number.";
                isValid = false;
            }
            if (isNaN(productData.quantity)) {
                document.getElementById('errorProductQuantity').innerText = "Product Quantity is required and must be a valid number.";
                isValid = false;
            }
            if (!productData.brand) {
                document.getElementById('errorProductBrand').innerText = "Product Brand is required.";
                isValid = false;
            }
            if (!productData.category) {
                document.getElementById('errorProductCategory').innerText = "Product Category is required.";
                isValid = false;
            }

            if (errorMessages.length > 0) {
                isValid = false;
                displayErrorMessages(errorMessages);
            }

            if (!isValid) {
                return;
            }

            const products = JSON.parse(localStorage.getItem('products')) || [];

            products.push(productData);

            localStorage.setItem('products', JSON.stringify(products));

            const successMessage = document.getElementById('successMessage');
            successMessage.classList.remove('d-none');

            setTimeout(() => {
                successMessage.classList.add('d-none');
                document.getElementById('addProductForm').reset();
                document.getElementById('productId').value = generateProductId(); // Reset Product ID
            }, 2000);
        }
    );
}

function clearErrorMessages() {
    const errorMessages = document.querySelectorAll("small.text-danger");
    errorMessages.forEach((message) => message.innerText = "");
}

function displayErrorMessages(errors) {
    const errorMessagesContainer = document.getElementById('errorMessages');
    errorMessagesContainer.innerHTML = errors.map(error => `<p>${error}</p>`).join("");
    errorMessagesContainer.classList.remove('d-none');
}

function openViewProductModal() {
    openModal(
        "View Product",
        `<form id="viewProductForm">
            <div class="mb-3">
                <label for="productIdView" class="form-label">Product ID:</label>
                <input type="text" id="productIdView" class="form-control" placeholder="Enter Product ID" required>
                <div id="productIdError" class="text-danger" style="display: none;">Please enter a valid Product ID.</div>
            </div>
        </form>`,
        "View Product",
        function () {
            const productId = document.getElementById('productIdView').value;
            const errorDiv = document.getElementById('productIdError');

            if (!productId.trim()) {
                errorDiv.textContent = "Product ID cannot be empty!";
                errorDiv.style.display = "block";
                return;
            }

            const products = JSON.parse(localStorage.getItem('products')) || [];

            const productData = products.find(product => product.id == productId);

            if (productData) {
                openModal(
                    "Product Details",
                    `
                    <div class="mb-3">
                        <strong>Product ID:</strong> ${productData.id}
                    </div>
                    <div class="mb-3">
                        <strong>Name:</strong> ${productData.name}
                    </div>
                    <div class="mb-3">
                        <strong>Description:</strong> ${productData.description}
                    </div>
                    <div class="mb-3">
                        <strong>Price:</strong> ${productData.price}
                    </div>
                    <div class="mb-3">
                        <strong>Quantity:</strong> ${productData.quantity}
                    </div>
                    <div class="mb-3">
                        <strong>Brand:</strong> ${productData.brand}
                    </div>
                    <div class="mb-3">
                        <strong>Category:</strong> ${productData.category}
                    </div>
                    <div class="mb-3">
                        <strong>Image:</strong> <img src="${productData.image}" alt="${productData.name}" width="100">
                    </div>
                    `,
                    "close",
                    function () {
                        const modal = bootstrap.Modal.getInstance(document.getElementById('generalModal'));
                        modal.hide();
                    }
                );
            } else {
                errorDiv.textContent = "Product not found. Please check the Product ID.";
                errorDiv.style.display = "block";
            }
        }
    );
}
// Function to open the Product ID modal
function openProductIdModal() {
    const productIdModal = new bootstrap.Modal(document.getElementById('productIdModal'));
    productIdModal.show();

    // Handle submit button click in Product ID modal
    document.getElementById('submitProductIdButton').onclick = function () {
        const productIdInput = document.getElementById('productIdInput').value.trim();

        // Check for empty input
        if (!productIdInput) {
            document.getElementById('productIdError').style.display = 'block';
            return;
        }

        // Get the product based on the entered ID
        const product = getProductById(productIdInput);
        if (!product) {
            document.getElementById('productIdError').innerHTML = "Product ID not found!";
            document.getElementById('productIdError').style.display = 'block';
        } else {
            // Proceed to update the product
            openUpdateForm(product);
            const productIdModal = bootstrap.Modal.getInstance(document.getElementById('productIdModal'));
            productIdModal.hide(); // Close the Product ID modal
        }
    };
}

// Function to get product by ID from localStorage
function getProductById(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    return products.find(product => product.id === productId);
}
function openUpdateForm(product) {
    const modalElement = document.getElementById('productModal');
    const modalBody = document.getElementById('productModalBody');
    const productModal = new bootstrap.Modal(modalElement);

    // Populate modal body with pre-filled form
    modalBody.innerHTML = `
        <form id="updateProductForm">
            <div class="mb-3">
                <label for="productName" class="form-label">Product Name</label>
                <input type="text" id="productName" class="form-control" value="${product.name}" required>
            </div>
            <div class="mb-3">
                <label for="productDescription" class="form-label">Description</label>
                <input type="text" id="productDescription" class="form-control" value="${product.description}" required>
            </div>
            <div class="mb-3">
                <label for="productPrice" class="form-label">Price</label>
                <input type="number" id="productPrice" class="form-control" value="${product.price}" required>
            </div>
            <div class="mb-3">
                <label for="productQuantity" class="form-label">Quantity</label>
                <input type="number" id="productQuantity" class="form-control" value="${product.quantity}" required>
            </div>
            <div class="mb-3">
                <label for="productImageURL" class="form-label">Image URL or Path</label>
                <input type="text" id="productImageURL" class="form-control" value="${product.image}" required>
            </div>
        </form>
    `;

    productModal.show();

    // Handle submit button click
    document.getElementById('submitProductButton').onclick = function () {
        const name = document.getElementById('productName').value.trim();
        const description = document.getElementById('productDescription').value.trim();
        const price = parseFloat(document.getElementById('productPrice').value);
        const quantity = parseInt(document.getElementById('productQuantity').value);
        const imageURL = document.getElementById('productImageURL').value.trim();

        // Validate fields
        if (!name || !description || !price || !quantity || !imageURL) {
            alert('Please fill out all fields correctly.');
            return;
        }

        // Validate image URL or relative path
        const isValidURL = (url) => {
            try {
                new URL(url); // Validates absolute URLs
                return true;
            } catch {
                // Allows relative paths like '../IMAGES/pouch.jpg'
                return url.startsWith('../') || url.startsWith('./') || url.startsWith('/');
            }
        };

        if (!isValidURL(imageURL)) {
            alert('Please provide a valid URL or relative path for the product image.');
            return;
        }

        // Confirm update and process
        openConfirmationModal(() => {
            const updatedProduct = {
                id: product.id,
                name: name,
                description: description,
                price: price,
                quantity: quantity,
                image: imageURL, // Save the image as URL or relative path
            };

            // Mock update function call
            updateProduct(product.id, updatedProduct)
                .then(() => {
                    showSuccessModal();
                    productModal.hide(); // Hide modal after success
                })
                .catch((error) => {
                    alert(`Failed to update product: ${error.message}`);
                });
        });
    };

    // Cleanup modal on hide
    modalElement.addEventListener('hidden.bs.modal', function () {
        modalBody.innerHTML = ''; // Clear modal content
    });
}



// Function to open the confirmation modal
function openConfirmationModal(callback) {
    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    confirmationModal.show();

    document.getElementById('confirmUpdateButton').onclick = function () {
        confirmationModal.hide();
        callback(); // Proceed with the update after confirmation
    };
}

// Function to update the product in localStorage
function updateProduct(productId, updatedProduct) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productIndex = products.findIndex(product => product.id === productId);

    if (productIndex !== -1) {
        products[productIndex] = { ...products[productIndex], ...updatedProduct };
        localStorage.setItem('products', JSON.stringify(products));
    }
}

// Function to show the success modal
function showSuccessModal() {
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();
}


// Open Delete Product Modal
function openDeleteProductModal() {
    openModal(
        "Delete Product",
        `<form id="deleteProductForm">
            <div class="mb-3">
                <label for="productIdDelete" class="form-label">Product ID:</label>
                <input type="text" id="productIdDelete" class="form-control" placeholder="Enter Product ID" required>
                <div id="deleteProductError" class="text-danger" style="display: none;">Please enter a valid Product ID.</div>
            </div>
        </form>`,
        "Delete Product",
        function () {
            const productId = document.getElementById('productIdDelete').value;
            const errorDiv = document.getElementById('deleteProductError');

            if (!productId.trim()) {
                errorDiv.textContent = "Product ID cannot be empty!";
                errorDiv.style.display = "block";
                return; // Prevent further execution if the product ID is invalid
            }

            // Get the products from localStorage
            const products = JSON.parse(localStorage.getItem('products')) || [];
            const productIndex = products.findIndex(product => product.id == productId);

            if (productIndex !== -1) {
                // Product found, show confirmation modal
                openModal(
                    "Confirm Deletion",
                    `
                    <div class="mb-3">
                        <strong>Are you sure you want to delete the following product?</strong>
                    </div>
                    <div class="mb-3">
                        <strong>Product ID:</strong> ${products[productIndex].id}
                    </div>
                    <div class="mb-3">
                        <strong>Name:</strong> ${products[productIndex].name}
                    </div>
                    `,
                    "Yes, Delete",
                    function () {
                        // Delete product from localStorage
                        products.splice(productIndex, 1);
                        localStorage.setItem('products', JSON.stringify(products));

                        // Close the modal after deletion
                        const modal = bootstrap.Modal.getInstance(document.getElementById('generalModal'));
                        modal.hide();

                        // Provide feedback
                        alert("Product deleted successfully!");
                    }
                );
            } else {
                // Show error if product not found
                errorDiv.textContent = "Product not found. Please check the Product ID.";
                errorDiv.style.display = "block";
            }
        }
    );
}


// Function to open the Customer ID modal
function openCustomerIdModal() {
    const customerIdModal = new bootstrap.Modal(document.getElementById('customerIdModal'));
    customerIdModal.show();

    // Handle submit button click
    document.getElementById('submitCustomerIdButton').onclick = function () {
        const customerIdInput = document.getElementById('customerIdInput').value.trim();

        // Clear previous error messages
        document.getElementById('customerIdError').style.display = 'none';

        // Validate customer ID
        if (!customerIdInput) {
            document.getElementById('customerIdError').style.display = 'block';
            document.getElementById('customerIdError').innerHTML = "Please enter a customer ID.";
        } else {
            // Check if the customer exists
            const customer = getCustomerById(customerIdInput);
            if (!customer) {
                // Show error message if customer not found
                document.getElementById('customerIdError').style.display = 'block';
                document.getElementById('customerIdError').innerHTML = "Customer ID not found!";
            } else {
                // Proceed with viewing the customer
                openCustomerDetailsModal(customer);
                customerIdModal.hide(); // Close the Customer ID modal
            }
        }
    };
}

// Function to get a customer by ID (simulating with localStorage or array)
function getCustomerById(customerId) {
    const customers = JSON.parse(localStorage.getItem('customers')) || []; // You can replace this with a real data source
    return customers.find(customer => customer.id === customerId);
}

// Function to open the customer details modal
function openCustomerDetailsModal(customer) {
    const customerDetailsBody = document.getElementById('customerDetailsBody');
    customerDetailsBody.innerHTML = `
        <p><strong>ID:</strong> ${customer.id}</p>
        <p><strong>Name:</strong> ${customer.name}</p>
        <p><strong>Email:</strong> ${customer.email}</p>
        <p><strong>Phone:</strong> ${customer.phone}</p>
        <p><strong>Address:</strong> ${customer.address}</p>
    `;

    const customerDetailsModal = new bootstrap.Modal(document.getElementById('customerDetailsModal'));
    customerDetailsModal.show();
}
