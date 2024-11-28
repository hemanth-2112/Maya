
function showLoginModal() {
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'), {
        keyboard: false
    });

    loginModal.show();

    document.getElementById("cancel-login").addEventListener('click', () => {
        window.location.href = "../HTML/admin.html";
    });
    document.getElementById('confirmLogin').addEventListener('click', () => {
        window.location.href = "../HTML/login.html";
    });

}

document.getElementById("close-profile-card").addEventListener("click", () => {
    window.location.href = "../HTML/admin.html";
});

document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
        showLoginModal();
        return;
    }

    // Populate profile page with user details
    document.getElementById("first-name").textContent = loggedInUser.firstName;
    document.getElementById("last-name").textContent = loggedInUser.lastName;
    document.getElementById("username").textContent = loggedInUser.username;
    document.getElementById("email").textContent = loggedInUser.email;
    document.getElementById("telephone").textContent = loggedInUser.telephone;
    document.getElementById("profile-picture").src = loggedInUser.profilePicture || "https://via.placeholder.com/150";

    const editButton = document.getElementById("edit-button");
    const saveButton = document.getElementById("save-button");
    const cancelButton = document.getElementById("cancel-button");
   
    const editForm = document.getElementById("edit-form");
    const profileDiv = document.getElementById("profile");

    // Show edit form with current data when "Edit" button is clicked
    editButton.addEventListener("click", () => {
        document.getElementById("edit-first-name").value = loggedInUser.firstName;
        document.getElementById("edit-last-name").value = loggedInUser.lastName;
        document.getElementById("edit-username").value = loggedInUser.username;
        document.getElementById("edit-email").value = loggedInUser.email;
        document.getElementById("edit-telephone").value = loggedInUser.telephone;
        profileDiv.classList.add("hidden");
        editForm.classList.remove("hidden");
    });

    // Cancel the edit and show the profile again
    cancelButton.addEventListener("click", () => {
        editForm.classList.add("hidden");
        profileDiv.classList.remove("hidden");
    });

    // Save changes made in the edit form
    saveButton.addEventListener("click", () => {
        loggedInUser.firstName = document.getElementById("edit-first-name").value;
        loggedInUser.lastName = document.getElementById("edit-last-name").value;
        loggedInUser.username = document.getElementById("edit-username").value;
        loggedInUser.email = document.getElementById("edit-email").value;
        loggedInUser.telephone = document.getElementById("edit-telephone").value;

        // Handle profile picture change
        const profilePictureInput = document.getElementById("upload-picture");
        if (profilePictureInput.files && profilePictureInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                loggedInUser.profilePicture = e.target.result; // Set the new profile picture
                updateUserDetailsInStorage(loggedInUser);
                updateLoggedInUser(loggedInUser);
                updateProfileDisplay(loggedInUser);
            };
            reader.readAsDataURL(profilePictureInput.files[0]); // Read the uploaded image
        } else {
            updateUserDetailsInStorage(loggedInUser); // Update user details without profile picture change
            updateLoggedInUser(loggedInUser);
            updateProfileDisplay(loggedInUser);
        }

        // Hide the edit form and show the updated profile
        editForm.classList.add("hidden");
        profileDiv.classList.remove("hidden");
    });

    // Listen for profile picture changes and store the image right away
    document.getElementById('upload-picture').addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const profilePicture = document.getElementById('profile-picture');
                profilePicture.src = e.target.result; // Update the profile picture preview
                
                // Save the profile picture immediately in localStorage
                loggedInUser.profilePicture = e.target.result;
                updateUserDetailsInStorage(loggedInUser); // Update user details in localStorage
                updateLoggedInUser(loggedInUser); // Update loggedInUser in localStorage
            };
            reader.readAsDataURL(file);
        }
    });

    function updateUserDetailsInStorage(updatedUser) {
        const storedUserData = JSON.parse(localStorage.getItem('userDetails')) || [];
        const index = storedUserData.findIndex(user => user.username === updatedUser.username);

        if (index !== -1) {
            storedUserData[index] = updatedUser;
            localStorage.setItem('userDetails', JSON.stringify(storedUserData)); // Update localStorage
        }
    }

    function updateLoggedInUser(updatedUser) {
        localStorage.setItem('loggedInUser', JSON.stringify(updatedUser)); // Update logged-in user data in localStorage
    }

    function updateProfileDisplay(updatedUser) {
        document.getElementById("first-name").textContent = updatedUser.firstName;
        document.getElementById("last-name").textContent = updatedUser.lastName;
        document.getElementById("username").textContent = updatedUser.username;
        document.getElementById("email").textContent = updatedUser.email;
        document.getElementById("telephone").textContent = updatedUser.telephone;
        document.getElementById("profile-picture").src = updatedUser.profilePicture || "https://via.placeholder.com/150";
    }
});

  // Logout functionality
  const logoutButton = document.getElementById("logout-button");
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "../HTML/login.html"; // Redirect to login page
});