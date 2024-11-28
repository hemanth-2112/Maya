function generateProductId() {
    return 'P' + Math.floor(Math.random() * 1000);
}

function getProducts() {
    return JSON.parse(localStorage.getItem("products")) || [];
}

function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
}
function addProductRow() {
    const tableBody = document.getElementById("productTableBody");

    const newRow = document.createElement("tr");
    newRow.classList.add("unsaved-row");
    newRow.innerHTML = `
<td>N/A</td>
<td><input type="text" class="form-control" placeholder="Product Name"></td>
<td><input type="text" class="form-control" placeholder="Category"></td>
<td><input type="number" class="form-control" placeholder="Price"></td>
<td><input type="file" class="form-control"></td>
<td><input type="text" class="form-control" placeholder="Description"></td>
<td><input type="text" class="form-control" placeholder="Brand"></td>
<td><input type="number" class="form-control" placeholder="Stock Availability"></td>
<td>
    <div class="buttons">
        <button class="btn btn-success m-1" onclick="saveProduct(this, null)">Save</button>
        <button class="btn btn-danger m-1" onclick="cancelUnsavedRow(this)">Cancel</button>
    </div>
</td>`;

    tableBody.appendChild(newRow);
}

function saveProduct(button, index) {
    const row = button.closest("tr"); // Use closest to get the row
    const inputs = row.querySelectorAll("input");
    const fileInput = inputs[3]; // The file input for image upload
    const products = getProducts();
    let imageUrl = '';
    if (fileInput.files[0]) {
        imageUrl = URL.createObjectURL(fileInput.files[0]); // Generate a URL for the image
    } else if (index !== null) {
        // If editing, keep the existing image
        imageUrl = products[index].image;
    }
    const name = inputs[0].value.trim();
    const category = inputs[1].value.trim();
    const price = parseFloat(inputs[2].value);
    const description = inputs[4].value.trim();
    const brand = inputs[5].value.trim();
    const quantity = parseInt(inputs[6].value, 10);

    if (!name || !category || isNaN(price) || !description || !brand || isNaN(quantity)) {
        alert("Please fill out all fields correctly.");
        return;
    }

    const product = {
        id: index !== null ? products[index].id : generateProductId(),
        name,
        category,
        price,
        image: imageUrl, // Store the image URL
        description,
        brand,
        quantity,
    };

    if (index === null) {
        products.push(product);
    } else {
        products[index] = product;
    }

    saveProducts(products);
    renderProducts();
}

function cancelUnsavedRow(button) {
    const row = button.closest("tr"); // Locate the row containing the cancel button
    row.remove(); // Remove the row from the table
}


function renderProducts() {
    const products = getProducts();
    const tableBody = document.getElementById("productTableBody");
    const noProductsMessage = document.getElementById("noProductsMessage");

    tableBody.innerHTML = "";
    if (products.length === 0) {
        noProductsMessage.style.display = "block";
        return;
    }

    noProductsMessage.style.display = "none";

    products.forEach((product, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
    <td>${product.id}</td>
    <td>${product.name}</td>
    <td>${product.category}</td>
    <td>${product.price.toFixed(2)}</td>
    <td><img src="${"."+product.image || ''}" alt="${product.name}" class="product-image"></td>
    <td>${product.description}</td>
    <td>${product.brand}</td>
    <td>${product.quantity}</td>
    <td>
        <button class="btn btn-warning m-1" onclick="editProduct(${index})">Edit</button>
        <button class="btn btn-danger m-1" onclick="deleteProduct(${index})">Delete</button>
    </td>
`;
        tableBody.appendChild(row);
    });
}

// Edit Product Function
function editProduct(index) {
    const products = getProducts();
    const product = products[index];
    const row = document.querySelectorAll("#productTableBody tr")[index];

    row.innerHTML = `
<td>${product.id}</td> <!-- Keep Product ID static -->
<td><input type="text" class="form-control" value="${product.name}"></td>
<td><input type="text" class="form-control" value="${product.category}"></td>
<td><input type="number" class="form-control" value="${product.price}"></td>
<td><input type="file" class="form-control"></td>
<td><input type="text" class="form-control" value="${product.description}"></td>
<td><input type="text" class="form-control" value="${product.brand}"></td>
<td><input type="number" class="form-control" value="${product.quantity}"></td>
<td>
    <button class="btn btn-success m-1" onclick="saveProduct(this, ${index})">Save</button>
    <button class="btn btn-danger m-1" onclick="renderProducts()">Cancel</button>
</td>`;
}

let productToDeleteIndex = null;

function deleteProduct(index) {
    productToDeleteIndex = index;
    const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
    confirmModal.show();
}

document.getElementById('confirmDeleteBtn').addEventListener('click', function () {
    if (productToDeleteIndex !== null) {
        const products = getProducts();
        products.splice(productToDeleteIndex, 1);
        saveProducts(products);
        renderProducts();
    }
    productToDeleteIndex = null;
    const confirmModal = bootstrap.Modal.getInstance(document.getElementById('confirmModal'));
    confirmModal.hide();
});

document.addEventListener("DOMContentLoaded", renderProducts);
