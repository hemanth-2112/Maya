// Function to validate the username field
function validateUsername() {
    const username = document.getElementById("username").value.trim();
    const usernameError = document.getElementById("usernameError");
    const inputField = document.getElementById("username");

    if (username === "") {
        usernameError.innerText = "Username cannot be empty.";
        updateInputStyle(inputField, false);
        return false;
    } else {
        usernameError.innerText = "";
        updateInputStyle(inputField, true);
        return true;
    }
}

// Function to validate the password field
function validatePassword() {
    const password = document.getElementById("password").value.trim();
    const passwordError = document.getElementById("passwordError");
    const inputField = document.getElementById("password");
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$&_])[A-Za-z\d@$&_]{8,16}$/;

    if (password === "") {
        passwordError.innerText = "Password cannot be empty.";
        updateInputStyle(inputField, false);
        return false;
    } else if (!regex.test(password)) {
        passwordError.innerText = 
            "Password must be 8-16 characters long, include at least one uppercase, one lowercase, one digit, and one special character (@, $, &, _).";
        updateInputStyle(inputField, false);
        return false;
    } else {
        passwordError.innerText = "";
        updateInputStyle(inputField, true);
        return true;
    }
}

// Function to validate the confirm password field
function validateConfirmPassword() {
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const inputField = document.getElementById("confirmPassword");

    if (confirmPassword === "") {
        confirmPasswordError.innerText = "Confirm password cannot be empty.";
        updateInputStyle(inputField, false);
        return false;
    } else if (password !== confirmPassword) {
        confirmPasswordError.innerText = "Passwords do not match.";
        updateInputStyle(inputField, false);
        return false;
    } else {
        confirmPasswordError.innerText = "";
        updateInputStyle(inputField, true);
        return true;
    }
}

function resetpassword(event) {
    event.preventDefault();

    // Validate all fields
    const isUsernameValid = validateUsername();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    // If all validations pass, perform password reset
    if (isUsernameValid && isPasswordValid && isConfirmPasswordValid) {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        // Simulate updating the password in localStorage or a database
        let users = JSON.parse(localStorage.getItem("userDetails")) || [];

        const user = users.find((user) => user.username === username);

        if (!user) {
            alert("No account associated with this username.");
            return;
        } else {
            const userIndex = users.findIndex((user) => user.username === username);
            users[userIndex].password = password;
            localStorage.setItem("userDetails", JSON.stringify(users));
            alert("Password has been reset successfully!");

            // Reset the form
            document.querySelector("form").reset();
            resetInputStyles();
            window.location.href="../HTML/login.html";
        }
    } else {
        alert("Failed to reset password. Please check your input.");
    }
}

// Helper function to update input styles dynamically
function updateInputStyle(inputElement, isValid) {
    const inputContainer = inputElement.closest(".input-group");
    const icon = inputContainer?.querySelector(".input-icon");

    if (isValid) {
        inputElement.style.borderColor = "green";
        if (icon) {
            icon.classList.remove("bi-exclamation-circle");
            icon.classList.add("bi-check-circle");
            icon.style.color = "green";
        }
    } else {
        inputElement.style.borderColor = "red";
        if (icon) {
            icon.classList.remove("bi-check-circle");
            icon.classList.add("bi-exclamation-circle");
            icon.style.color = "red";
        }
    }
}

// Function to reset input styles on form reset
function resetInputStyles() {
    const inputs = document.querySelectorAll(".input");
    inputs.forEach((input) => {
        input.style.borderColor = "";
        const icon = input.closest(".input-group")?.querySelector(".input-icon");
        if (icon) {
            icon.classList.remove("bi-check-circle", "bi-exclamation-circle");
            icon.style.color = "";
        }
    });

    const errorMessages = document.querySelectorAll(".small-error-message");
    errorMessages.forEach((error) => (error.innerText = ""));
}


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