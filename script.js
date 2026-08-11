const bakeryItems = [

    "Sourdough Bread",

    "Chocolate Croissants",

    "Blueberry Muffins",

    "Custom Birthday Cake",

    "Seasonal Fruit Pastries"

];

function saveSelectedItem() {

    const itemSelect = document.getElementById("bakery-item");

    const message = document.getElementById("selection-message");

    if (!itemSelect || !message) {

        return;

    }

    const selectedItem = itemSelect.value;

    if (selectedItem === "") {

        message.textContent = "Please select a bakery item before saving.";

        return;

    }

    if (!bakeryItems.includes(selectedItem)) {

        message.textContent = "Please select a valid bakery item.";

        return;

    }

    localStorage.setItem("selectedBakeryItem", selectedItem);

    message.textContent =

        "Your selection has been saved: " + selectedItem;

}

function loadSelectedItem() {

    const itemSelect = document.getElementById("bakery-item");

    const message = document.getElementById("selection-message");

    const itemDetails = document.getElementById("item-details");

    const requestType = document.getElementById("request-type");

    const savedItem = localStorage.getItem("selectedBakeryItem");

    if (!savedItem || !bakeryItems.includes(savedItem)) {

        return;

    }

    if (itemSelect) {

        itemSelect.value = savedItem;

    }

    if (message) {

        message.textContent = "Saved selection: " + savedItem;

    }

    if (itemDetails && itemDetails.value.trim() === "") {

        itemDetails.value =

            "I am interested in pre-ordering: " + savedItem;

    }

    if (requestType) {

        requestType.value = "preorder";

    }

}

function createErrorMessage(field, message) {

    clearErrorMessage(field);

    const error = document.createElement("span");

    error.className = "error-message";

    error.textContent = message;

    error.setAttribute("role", "alert");

    field.insertAdjacentElement("afterend", error);

}

function clearErrorMessage(field) {

    const nextElement = field.nextElementSibling;

    if (

        nextElement &&

        nextElement.classList.contains("error-message")

    ) {

        nextElement.remove();

    }

}

function validateName() {

    const nameField = document.getElementById("full-name");

    if (!nameField) {

        return true;

    }

    const name = nameField.value.trim();

    if (name === "") {

        createErrorMessage(nameField, "Please enter your name.");

        return false;

    }

    if (name.length < 2) {

        createErrorMessage(

            nameField,

            "Name must contain at least 2 characters."

        );

        return false;

    }

    clearErrorMessage(nameField);

    return true;

}

function validateEmail() {

    const emailField = document.getElementById("email");

    if (!emailField) {

        return true;

    }

    const email = emailField.value.trim();

    const emailPattern =

        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {

        createErrorMessage(

            emailField,

            "Please enter your email address."

        );

        return false;

    }

    if (!emailPattern.test(email)) {

        createErrorMessage(

            emailField,

            "Please enter a valid email address."

        );

        return false;

    }

    clearErrorMessage(emailField);

    return true;

}

function validatePickupDate() {

    const pickupDate = document.getElementById("pickup-date");

    if (!pickupDate) {

        return true;

    }

    if (pickupDate.value === "") {

        createErrorMessage(

            pickupDate,

            "Please select a pickup date."

        );

        return false;

    }

    clearErrorMessage(pickupDate);

    return true;

}

function validateRequestType() {

    const requestType = document.getElementById("request-type");

    if (!requestType) {

        return true;

    }

    if (requestType.value === "") {

        createErrorMessage(

            requestType,

            "Please select a request type."

        );

        return false;

    }

    clearErrorMessage(requestType);

    return true;

}

function validateItemDetails() {

    const itemDetails = document.getElementById("item-details");

    if (!itemDetails) {

        return true;

    }

    const details = itemDetails.value.trim();

    if (details === "") {

        createErrorMessage(

            itemDetails,

            "Please enter the item details."

        );

        return false;

    }

    if (details.length < 10) {

        createErrorMessage(

            itemDetails,

            "Item details must contain at least 10 characters."

        );

        return false;

    }

    clearErrorMessage(itemDetails);

    return true;

}

function validateForm(event) {

    const isNameValid = validateName();

    const isEmailValid = validateEmail();

    const isPickupValid = validatePickupDate();

    const isRequestValid = validateRequestType();

    const areDetailsValid = validateItemDetails();

    if (

        !isNameValid ||

        !isEmailValid ||

        !isPickupValid ||

        !isRequestValid ||

        !areDetailsValid

    ) {

        event.preventDefault();

    }

}

document.addEventListener("DOMContentLoaded", function () {

    const saveButton = document.getElementById("save-item");

    const contactForm = document.querySelector("form");

    if (saveButton) {

        saveButton.addEventListener("click", saveSelectedItem);

    }

    loadSelectedItem();

    if (contactForm) {

        contactForm.addEventListener("submit", validateForm);

    }

});