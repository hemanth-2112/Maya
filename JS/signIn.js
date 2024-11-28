document.body.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && event.target.tagName === 'INPUT') {
        event.preventDefault(); // Prevent form submission or default behavior

        // Get all inputs in the document
        const inputs = Array.from(document.querySelectorAll('input'));
        const currentIndex = inputs.indexOf(event.target);

        // Navigate to the next input, or blur if it's the last one
        if (currentIndex !== -1 && currentIndex < inputs.length - 1) {
            inputs[currentIndex + 1].focus();
        } else {
            event.target.blur(); // Blur if it's the last input
        }
    }
});


window.addEventListener("load", function() {
    document.getElementById("name").value = "";
    document.getElementById("username").value = "";
    // document.getElementById("password").value = "";
    // document.getElementById("confirmPassword").value = "";
    // document.getElementById("mobile").value = "";
    // document.getElementById("email").value = "";
});



function updateInputStyle(inputElement, isValid) {
    const inputContainer = inputElement.closest(".input-group");
    const icon = inputContainer.querySelector(".input-icon");

    if (isValid) {
        inputElement.style.borderColor = "green";
        icon.classList.remove("bi-exclamation-circle");
        icon.classList.add("bi-check-circle");
        icon.style.color = "green";
    } else {
        inputElement.style.borderColor = "red";
        icon.classList.remove("bi-check-circle");
        icon.classList.add("bi-exclamation-circle");
        icon.style.color = "red";
    }
}

function validateName() {
    const nameInput = document.getElementById("name");
    const nameError = document.getElementById("nameError");
    const nameValue = nameInput.value.trim();

    const regex = /^[A-Za-z\s]{3,20}$/;

    if (nameValue === "") {
        nameError.innerText = "First Name cannot be empty";
        updateInputStyle(nameInput, false); 
        return false;
    } else if (!regex.test(nameValue)) {
        nameError.innerText = "First Name should only contain letters and spaces (min 3, max 20 characters)";
        updateInputStyle(nameInput, false); 
        return false;
    } else {
        nameError.innerText = ""; 
        updateInputStyle(nameInput, true); 
        return true;
    }
}

function clearMessages() {
    document.getElementById("validationError").innerText = "";
    document.getElementById("result").innerText = "";
}


