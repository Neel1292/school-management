"use strict";
const adminCredential = {
    email: "admin@study.com",
    pass: "Admin@123"
};
localStorage.setItem("admin", JSON.stringify(adminCredential));
const email = document.getElementById('email');
const password = document.getElementById("password");
const eyeIcn = document.getElementById("eye-icon");
const requireList = document.querySelectorAll(".password-match-list li");
const loginBtn = document.querySelector('.submit-btn');
const passwordRgx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
const emailR = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";
const passRequireList = [
    { regex: /.{8,16}/, index: 0 }, // Minimum of 8 Character
    { regex: /[0-9]/, index: 1 }, // At least one number
    { regex: /[A-Z]/, index: 2 }, // At least one uppercase letter
    { regex: /[a-z]/, index: 3 }, // At least one lowercase letter
    { regex: /[^A-Za-z0-9]/, index: 4 } // At least one special character
];
document.addEventListener('DOMContentLoaded', function () {
    let roleSelect = document.querySelector('.form-select');
    if (roleSelect) {
        email.disabled = true;
        password.disabled = true;
        roleSelect.addEventListener('change', () => {
            if (roleSelect && roleSelect.value !== 'Select Role') {
                email.disabled = false;
                password.disabled = false;
                if (roleSelect.value === 'principal') {
                    const adminDataString = localStorage.getItem("admin");
                    if (adminDataString) {
                        const adminCredentials = JSON.parse(adminDataString);
                        email.value = adminCredentials.email;
                        password.value = adminCredentials.pass;
                    }
                }
                else {
                    email.value = '';
                    password.value = '';
                }
            }
        });
    }
    if (eyeIcn && password) {
        eyeIcn.addEventListener("click", () => {
            password.type = password.type === "password" ? "text" : "password";
            eyeIcn.className = `fa-solid fa-eye${password.type !== "password" ? '-slash' : ""}`;
        });
    }
    if (password) {
        password.addEventListener("keypress", (e) => {
            const target = e.target;
            requireList.forEach((item, index) => {
                var _a, _b;
                const isValid = passRequireList[index].regex.test(target.value);
                const requirementItem = item;
                if (isValid) {
                    (_a = requirementItem.firstElementChild) === null || _a === void 0 ? void 0 : _a.classList.add('fa-check');
                    requirementItem.classList.add('valid');
                }
                else {
                    (_b = requirementItem.firstElementChild) === null || _b === void 0 ? void 0 : _b.classList.add('fa-xmark');
                    requirementItem.classList.remove('valid');
                }
            });
        });
        password.addEventListener("blur", () => {
            var _a;
            (_a = document.querySelector(".password-match-list")) === null || _a === void 0 ? void 0 : _a.classList.remove('valid');
        });
    }
    // Event listener for form submission
    const loginForm = document.querySelector('form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission behavior
            login(); // Call the login function
        });
    }
});
function login() {
    let roleSelect = document.querySelector('.form-select');
    const selectedRole = roleSelect.value;
    if (selectedRole === 'principal') {
        window.location.href = '../html/admin.html';
    }
    else if (selectedRole === 'teacher') {
        window.location.href = '../html/teacher.html';
    }
    else if (selectedRole === 'student') {
        window.location.href = '../html/student.html';
    }
    else {
        alert('Please select a valid role before logging in.');
        roleSelect.value = 'Select Role';
    }
}
function isEmpty(data) {
    return data.value.trim() === '';
}
const setOnError = (element, message) => {
    const inputControl = element.parentElement;
    if (inputControl) {
        const errorDisplay = inputControl.querySelector(".error");
        errorDisplay.innerText = message;
        inputControl.classList.add("error");
        inputControl.classList.remove("success");
    }
};
const setOnSuccess = (element) => {
    const inputControl = element.parentElement;
    if (inputControl) {
        const successDisplay = inputControl.querySelector(".error");
        successDisplay.innerText = "";
        inputControl.classList.add("success");
        inputControl.classList.remove("error");
    }
};
