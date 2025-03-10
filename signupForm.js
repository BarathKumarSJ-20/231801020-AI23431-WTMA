document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page reload on form submission

    let isValid = true;

    function validateField(id, regex, errorMsg) {
        const field = document.getElementById(id);
        const error = field.nextElementSibling;

        if (!regex.test(field.value.trim())) {
            field.classList.add("error");
            error.textContent = errorMsg;
            isValid = false;
        } else {
            field.classList.remove("error");
            error.textContent = "";
        }
    }

    // Validation rules
    validateField("firstName", /^[A-Za-z]{4,}$/, "First name must be at least 4 letters.");
    validateField("lastName", /^[A-Za-z]{1,}$/, "Last name must be at least 1 letter.");
    validateField("email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email.");
    validateField("phone", /^[0-9]{10}$/, "Phone must be 10 digits.");
    validateField("address", /.+/, "Address cannot be empty.");

    // Validate gender
    const genderDiv = document.querySelector("#signupForm .mb-3:nth-child(6)"); // Gender div
    const genderError = genderDiv.querySelector(".error-msg");
    const gender = document.querySelector("input[name='gender']:checked");
    if (!gender) {
        genderError.textContent = "Select a gender.";
        isValid = false;
    } else {
        genderError.textContent = "";
    }

    // Validate Date of Birth and Auto-fill Age
    const dob = document.getElementById("dob").value;
    if (!dob) {
        document.getElementById("dob").nextElementSibling.textContent = "Enter your Date of Birth.";
        isValid = false;
    } else {
        document.getElementById("dob").nextElementSibling.textContent = "";
        document.getElementById("age").value = new Date().getFullYear() - new Date(dob).getFullYear();
    }

    if (isValid) {
        const table = document.getElementById("dataTable").getElementsByTagName("tbody")[0];
        const newRow = table.insertRow();

        newRow.innerHTML = `
            <td>${document.getElementById("firstName").value}</td>
            <td>${document.getElementById("lastName").value}</td>
            <td>${document.getElementById("email").value}</td>
            <td>${dob}</td>
            <td>${document.getElementById("age").value}</td>
            <td>${gender.value}</td>
            <td>${document.getElementById("phone").value}</td>
            <td>${document.getElementById("address").value}</td>
        `;

        // Make the table visible after adding the first row
        document.getElementById("dataTable").style.display = "table";

        this.reset(); // Reset the form
    }
});

// Auto-calculate Age when Date of Birth is entered
document.getElementById("dob").addEventListener("input", function() {
    const dobValue = this.value;
    const ageField = document.getElementById("age");

    if (dobValue) {
        const birthYear = new Date(dobValue).getFullYear();
        const currentYear = new Date().getFullYear();
        const calculatedAge = currentYear - birthYear;
        ageField.value = calculatedAge;
    } else {
        ageField.value = ""; // If DOB is cleared, Age field should also be empty
    }
});