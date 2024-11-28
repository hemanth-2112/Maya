$('.message a').click(function (event) {
    event.preventDefault();
    $('.login-form, .register-form').toggle();
    $('.message a').text($('.register-form').is(':visible') ? 'Sign In' : 'Create an account');
    clearAllErrors();

});

window.addEventListener("load", function () {
    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirmPassword").value = "";
    document.getElementById("telephone").value = "";
    document.getElementById("loginUsername").value = "";
    document.getElementById("loginPassword").value = "";
});

function showPassword() {
    var passwordField = document.getElementById("password");
    var confirmPasswordField = document.getElementById("confirmPassword");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        confirmPasswordField.type = "text";
    } else {
        passwordField.type = "password";
        confirmPasswordField.type = "password";
    }
}

function showPasswordLogin() {
    var passwordField = document.getElementById("loginPassword");

    if (passwordField.type === "password") {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
}

document.body.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && event.target.tagName === 'INPUT') {
        event.preventDefault();

        const inputs = Array.from(document.querySelectorAll('input'));
        const currentIndex = inputs.indexOf(event.target);

        if (currentIndex !== -1 && currentIndex < inputs.length - 1) {
            inputs[currentIndex + 1].focus();
        } else {
            event.target.blur();
        }
    }
});

const updateInputStyle = (inputElement, isValid) => {
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
};

function validateFirstname() {
    const firstNameInput = document.getElementById("firstname");
    const firstNameError = document.getElementById("firstnameError");
    const firstNameValue = firstNameInput.value.trim();

    const regex = /^[A-Za-z\s]{3,20}$/;

    if (firstNameValue === "") {
        firstNameError.innerText = "First Name cannot be empty";
        updateInputStyle(firstNameInput, false);
        return false;
    } else if (!regex.test(firstNameValue)) {
        firstNameError.innerText = "First Name should only contain letters and spaces (min 3, max 20 characters)";
        updateInputStyle(firstNameInput, false);
        return false;
    } else {
        firstNameError.innerText = "";
        updateInputStyle(firstNameInput, true);
        return true;
    }
}

function validateLastname() {
    const lastNameInput = document.getElementById("lastname");
    const lastNameError = document.getElementById("lastnameError");
    const lastNameValue = lastNameInput.value.trim();

    const regex = /^[A-Za-z\s]{3,20}$/;

    if (lastNameValue === "") {
        // If empty, it's valid since it's optional
        lastNameError.innerText = "";
        updateInputStyle(lastNameInput, true);
        return true;
    } else if (!regex.test(lastNameValue)) {
        lastNameError.innerText = "Last Name should only contain letters and spaces (min 3, max 20 characters)";
        updateInputStyle(lastNameInput, false);
        return false;
    } else {
        lastNameError.innerText = "";
        updateInputStyle(lastNameInput, true);
        return true;
    }
}


function validateUsername() {
    var usernameInput = document.getElementById("username");
    var username = usernameInput.value.trim();
    var usernameError = document.getElementById("usernameError");

    var regex = /^[a-zA-Z0-9#$_@]{3,15}$/;

    if (!username) {
        usernameError.innerText = "Username cannot be empty";
        updateInputStyle(usernameInput, false);
        return false;
    }

    if (!regex.test(username)) {
        usernameError.innerText = "Username must be 3-15 characters long and can only contain letters, numbers, and underscores.";
        updateInputStyle(usernameInput, false);
        return false;
    }

    let users = JSON.parse(localStorage.getItem("userDetails")) || [];
    const usernameExists = users.some(user => user.username === username);

    if (usernameExists) {
        usernameError.innerText = "Username already exists.";
        updateInputStyle(usernameInput, false); // Pass the input element
        return false;
    }

    usernameError.innerText = "";
    updateInputStyle(usernameInput, true); // Pass the input element
    return true;
}

// Validate Password
function validatePassword() {
    var password = document.getElementById("password").value;
    var inputField = document.getElementById("password");
    var passwordError = document.getElementById("passwordError");

    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$&_])[A-Za-z\d@$&_]{8,16}$/;

    if (!password) {
        passwordError.innerText = "Password cannot be empty";
        updateInputStyle(inputField, false);
        return false;
    } else if (!regex.test(password)) {
        passwordError.innerText = "Password must be 8-16 characters long, include at least one uppercase, one lowercase, one digit, and one special character (@, $, &, _)";
        updateInputStyle(inputField, false);
        return false;
    } else {
        // If the username meets all criteria
        passwordError.innerText = "";
        updateInputStyle(inputField, true);
        return true;
    }
}

// Validate Confirm Password
function validateConfirmPassword() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    var confirmPasswordError = document.getElementById("confirmPasswordError");
    const inputField = document.getElementById("confirmPassword");
    if (confirmPassword === "") {
        confirmPasswordError.innerText = "Confirm password cannot be empty";
        updateInputStyle(inputField, false);
        return false;
    } else if (password !== confirmPassword) {
        confirmPasswordError.innerText = "Passwords do not match";
        updateInputStyle(inputField, false);
        return false;
    } else {
        confirmPasswordError.innerText = "";
        updateInputStyle(inputField, true);
        return true;
    }
}

// Validate Mobile
function validateMobile() {
    var mobile = document.getElementById("telephone").value;
    var mobileError = document.getElementById("telephoneError");
    var inputField = document.getElementById("telephone");

    if (mobile === "") {
        mobileError.innerText = "Mobile Number cannot be empty";
        updateInputStyle(inputField, false);
        return false;
    } else if (mobile.length < 10 || mobile.length > 14) {
        // Check if the length is between 10 and 14
        mobileError.innerText = "Mobile number must be between 10 and 14 characters";
        updateInputStyle(inputField, false);
        return false;
    } else if (!validateMobilePattern(mobile)) {
        document.getElementById("telephoneError").innerText =
            "Please enter a valid mobile number. Valid formats: \n1) 10 digits starting with 6-9\n2) 11 digits starting with 0 followed by 6-9\n3) +91 with or without space/hyphen, followed by 6-9";
        updateInputStyle(inputField, false);
        return false;
    } else {
        document.getElementById("telephoneError").innerText = "";
        updateInputStyle(inputField, true);
        return true;
    }
}

// Mobile number validation function
function validateMobilePattern(mobile) {
    // Format I: 10 digits, first digit between 6 and 9
    const formatI = /^[6-9]\d{9}$/;

    // Format II: 11 digits, first digit is 0, second digit between 6 and 9
    const formatII = /^0[6-9]\d{9}$/;

    // Format III: 13-14 characters, starts with +91, followed by space, hyphen, or no space
    const formatIIIWithSpace = /^\+91[- ]?[6-9]\d{9}$/;
    const formatIIIWithoutSpace = /^\+91[6-9]\d{9}$/;

    // Return true if any of the formats match
    return formatI.test(mobile) || formatII.test(mobile) || formatIIIWithSpace.test(mobile) || formatIIIWithoutSpace.test(mobile);
}

// Validate Email
function validateEmail() {
    var email = document.getElementById("email").value;
    var inputField = document.getElementById("email");
    var emailError = document.getElementById("emailError");

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email === "") {
        emailError.innerText = "E-mail Id cannot be empty";
        updateInputStyle(inputField, false);
        return false;
    } else if (!regex.test(email)) {
        emailError.innerText = "Please enter a valid email address";
        updateInputStyle(inputField, false);
        return false;
    } else {
        emailError.innerText = "";
        updateInputStyle(inputField, true);
        return true;
    }
}

// Validate Email
function validateLoginUsername() {
    var username = document.getElementById("loginUsername").value;
    var inputField = document.getElementById("loginUsername");
    var usernameError = document.getElementById("loginUsernameError");

    // Regex to validate the username: 8-16 characters with at least one uppercase, one lowercase, one digit, and one special character (#, $, &, _)
    var regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#\$&_.])[A-Za-z\d#$&_.]{8,16}$/;

    // Check if the username is empty
    if (!username) {
        usernameError.innerText = "Username cannot be empty";
        updateInputStyle(inputField, false);
        return false;
    } else if (!regex.test(username)) {
        usernameError.innerText = "Username must be 8-16 characters long, include at least one uppercase, one lowercase, one digit, and one special character (#, $, &, _)";
        updateInputStyle(inputField, false);
        return false;
    } else {
        // If the username meets all criteria
        usernameError.innerText = "";
        updateInputStyle(inputField, true);
        return true;
    }
}

// Validate Password
function validateLoginPassword() {
    var password = document.getElementById("loginPassword").value;
    var inputField = document.getElementById("loginPassword");
    var passwordError = document.getElementById("loginPasswordError");

    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$&_])[A-Za-z\d@$&_]{8,16}$/;

    if (!password) {
        passwordError.innerText = "Password cannot be empty";
        updateInputStyle(inputField, false);
        return false;
    } else if (!regex.test(password)) {
        passwordError.innerText = "Password must be 8-16 characters long, include at least one uppercase, one lowercase, one digit, and one special character (@, $, &, _)";
        updateInputStyle(inputField, false);
        return false;
    } else {
        // If the username meets all criteria
        passwordError.innerText = "";
        updateInputStyle(inputField, true);
        return true;
    }
}

function registerUser(event) {
    event.preventDefault();

    const firstName = document.getElementById("firstname").value.trim();
    const lastName = document.getElementById("lastname").value.trim();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const telephone = document.getElementById("telephone").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    document.getElementById("validationError").innerText = "";

    let isValid = true;

    if (!validateFirstname()) isValid = false;
    if (!validateLastname()) isValid = false;
    if (!validateUsername()) isValid = false;
    if (!validateEmail()) isValid = false;
    if (!validatePassword()) isValid = false;
    if (!validateConfirmPassword()) isValid = false;
    if (!validateMobile()) isValid = false;

    if (!isValid) {
        document.getElementById("validationError").innerText = "Please fix the errors above.";
        return false;
    }

    const users = JSON.parse(localStorage.getItem("userDetails")) || [];
    const userData = { firstName, lastName, username, email, telephone, password };
    users.push(userData);
    localStorage.setItem("userDetails", JSON.stringify(users));

    setTimeout(() => {
        showModal("Registration successful! You can now log in.", "success");
        location.reload();
    }, 2000); 
    resetForm();
    return true;
}

function loginValidation(event) {
    event.preventDefault();

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const validationError = document.getElementById("validationError");

    // Clear previous validation errors
    validationError.innerText = "";

    let isValid = true;

    if (!validateLoginUsername()) isValid = false;
    if (!validateLoginPassword()) isValid = false;

    if (!isValid) {
        validationError.innerText = "Please correct the errors above.";
        return false;
    }
    const admin={
        username:"Hema#123",
        password:"Hema@_2112",
        firstName:"hemanth",
        lastName:"kumar",
        telephone:"9807654312",
        image:"",
        email:"admin@gmail.com"
    }
    if (username === "Hema#123" && password === "Hema@_2112") {
        window.location.href = "../HTML/admin.html";  
        localStorage.setItem("loggedInUser", JSON.stringify(admin));
        return;
    }

    const storedUserData = JSON.parse(localStorage.getItem('userDetails')) || [];
    const userFound = storedUserData.find(user => user.username === username && user.password === password);

    if (userFound) {
        localStorage.setItem("loggedInUser", JSON.stringify(userFound));
        showModal("Login successful!", "success");
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 1000);
    } else {
        validationError.innerText = "Invalid username or password!";
    }
}

function resetForm() {
    const inputGroups = document.querySelectorAll(".input-group");
    inputGroups.forEach((group) => {
        const input = group.querySelector("input");
        const icon = group.querySelector(".input-icon");

        if (input) {
            input.style.borderColor = ""; // Reset border color
        }

        if (icon) {
            icon.classList.remove("bi-check-circle", "bi-exclamation-circle"); // Remove icon classes
            icon.style.color = ""; // Reset icon color
            icon.style.visibility = "hidden"; // Hide the icon completely
        }
    });

    // Clear error messages
    const errorElements = document.querySelectorAll(".small-error-message");
    errorElements.forEach((element) => element.innerText = "");
}

function clearAllErrors() {

    const errorMessages = document.querySelectorAll(".small-error-message");
    errorMessages.forEach((error) => (error.innerText = ""));

    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
        input.style.borderColor = "";
        const icon = input.closest(".input-group")?.querySelector(".input-icon");
        if (icon) {
            icon.classList.remove("bi-check-circle", "bi-exclamation-circle"); // Remove validation icons
            icon.style.visibility = "hidden"; // Hide the icon
        }
    });

    document.getElementById("validationError").innerText = "";
}

function showModal(message, type = "success") {
    const modal = document.getElementById("modalBox");
    const modalMessage = document.getElementById("modalMessage");
    const modalIcon = document.getElementById("modalIcon");
  
    // Set the message
    modalMessage.innerText = message;
  
    // Add class for success or error
    if (type === "success") {
      modal.classList.add("success");
      modal.classList.remove("error");
      modalIcon.innerHTML = "✔️"; // Green tick mark
    } else {
      modal.classList.add("error");
      modal.classList.remove("success");
      modalIcon.innerHTML = "❌"; // Red cross mark
    }
  
    // Display the modal
    modal.style.display = "block";
  
    const closeBtn = document.querySelector(".modal .close");
    closeBtn.onclick = function () {
      modal.style.display = "none";
    };
  
    // Close the modal if the user clicks anywhere outside of it
    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  }

document.querySelector('input[type="reset"]').addEventListener("click", resetForm);


function togglePassword() {
    const passwordField = document.getElementById("loginPassword");
    const eyeIcon = document.getElementById("eyeIcon");
    const warningIcon = document.getElementById("warningIcon");
    
    // Toggle password visibility
    if (passwordField.type === "password") {
        passwordField.type = "text"; // Change password input to text (visible)
        eyeIcon.classList.remove("bi-eye-slash");
        eyeIcon.classList.add("bi-eye"); // Change the icon to open eye
    } else {
        passwordField.type = "password"; // Change text input back to password (hidden)
        eyeIcon.classList.remove("bi-eye");
        eyeIcon.classList.add("bi-eye-slash"); // Change the icon to closed eye
    }

    // Hide warning icon when password visibility is toggled
    warningIcon.style.display = "none"; // Hide warning icon when toggling
}
