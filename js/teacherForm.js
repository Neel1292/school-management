"use strict";
// Get the form element
const teacherForm = document.querySelector('.teacher-form');
// Get form inputs
const teacherName = document.getElementById('teacher-name');
const teacherAge = document.getElementById('teacher-age');
const teacherEmail = document.getElementById('teacher-email');
const teacherPassword = document.getElementById('teacher-password');
const teacherConfirmPassword = document.getElementById('teacher-confirm-password');
const eye = document.getElementById("eye-icon");
const eye2 = document.getElementById("eye-icon2");
const requirementLists = document.querySelectorAll(".password-match-list li");
let validEmail = false;
const passwordMatchList = document.querySelectorAll(".password-match-list");
const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
const emailReg = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$";
const passRequiredList = [
    { regex: /.{8,16}/, index: 0 }, // Minimum of 8 Character
    { regex: /[0-9]/, index: 1 }, // At least one number
    { regex: /[A-Z]/, index: 2 }, // At least one uppercase letter
    { regex: /[a-z]/, index: 3 }, // At least one lowercase letter
    { regex: /[^A-Za-z0-9]/, index: 4 }, // At least one special character
];
teacherEmail.addEventListener("input", function (e) {
    let inputValue = e.target.value;
    let isCharacter = emailReg.match(inputValue);
    const inputControl = teacherEmail.parentElement;
    const errorDisplay = inputControl.querySelector(".error");
    if (!isCharacter) {
        errorDisplay.innerText = 'Please enter valid email address';
    }
    else {
        errorDisplay.innerText = "";
    }
});
teacherEmail.addEventListener("blur", (event) => {
    // debugger
    let userMail = event.target.value;
    let emailRequired = '^[a-zA-Z0-9._%+-]+@(gmail|outlook|yahoo)\.[a-zA-Z]{2,}$';
    let isValidEmail = userMail.match(emailRequired);
    const inputControl = teacherEmail.parentElement;
    if (inputControl) {
        const errorDisplay = inputControl.querySelector(".error");
        if (!isValidEmail) {
            if (errorDisplay) {
                errorDisplay.innerText = 'Domain eg. gmail.com';
            }
        }
        else {
            validEmail = true;
            errorDisplay.innerText = "";
            inputControl.classList.add("success");
            inputControl.classList.remove("error");
        }
    }
});
teacherPassword.addEventListener("keyup", (e) => {
    passwordMatchList.forEach(list => list.style.display = "block");
    if (!isEmptyData(teacherPassword)) {
        passRequiredList.forEach(item => {
            var _a, _b;
            const isValid = item.regex.test(teacherPassword.value);
            const requirementItem = requirementLists[item.index];
            if (requirementItem) {
                if (isValid) {
                    (_a = requirementItem.firstElementChild) === null || _a === void 0 ? void 0 : _a.classList.replace('fa-xmark', 'fa-check'); // Use classList.replace to swap classes
                    requirementItem.classList.add('valid');
                }
                else {
                    (_b = requirementItem.firstElementChild) === null || _b === void 0 ? void 0 : _b.classList.replace('fa-check', 'fa-xmark'); // Use classList.replace to swap classes
                    requirementItem.classList.remove('valid');
                }
            }
        });
    }
    else {
        const passwordMatchList = teacherForm.querySelector(".password-match-list");
        if (passwordMatchList) {
            passwordMatchList.style.display = "none";
        }
    }
});
teacherPassword.addEventListener("blur", (e) => {
    const passwordMatchList = teacherForm.querySelector(".password-match-list");
    if (passwordMatchList) {
        passwordMatchList.style.display = "none";
    }
});
if (eye) {
    eye.addEventListener("click", () => {
        teacherPassword.type = teacherPassword.type === "password" ? "text" : "password";
        eye.className = `fa-solid fa-eye${teacherPassword.type !== "password" ? '-slash' : ""}`;
    });
}
if (eye2) {
    eye2.addEventListener("click", () => {
        teacherConfirmPassword.type = teacherConfirmPassword.type === "password" ? "text" : "password";
        eye2.className = `fa-solid fa-eye${teacherConfirmPassword.type !== "password" ? '-slash' : ""}`;
    });
}
// Function to handle form submission
teacherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // debugger
    let data = localStorage.getItem('teacherData');
    let teacherData = data ? JSON.parse(data) : [];
    let emailExists = false;
    if (!isEmptyData(teacherName)) {
        setSuccessMsg(teacherName);
    }
    else {
        setErrors(teacherName, "Good Name should be there");
    }
    if (!isEmptyData(teacherAge)) {
        if (parseInt(teacherAge.value) >= 25 && parseInt(teacherAge.value) <= 50) {
            setSuccessMsg(teacherAge);
        }
        else {
            setErrors(teacherAge, 'Please Check Your Age');
        }
    }
    else {
        setErrors(teacherAge, 'Please Enter Age');
    }
    if (!isEmptyData(teacherEmail)) {
        let list = isExistEmail(teacherEmail.value, teacherData);
        if (!(teacherEmail.value).match(emailReg)) {
            setErrors(teacherEmail, "Sorry Your Email Does Not Match the Guidlines");
        }
        else if (list()) {
            setErrors(teacherEmail, "Sorry Your Email Should Be Unique");
        }
        else if ((teacherEmail.value).match(emailReg)) {
            emailExists = true;
            setSuccessMsg(teacherEmail);
        }
    }
    else {
        setErrors(teacherEmail, 'Email cannot be blank');
    }
    if (!isEmptyData(teacherPassword)) {
        if (!passwordReg.test(teacherPassword.value) && teacherPassword.value.trim().length < 8) {
            setErrors(teacherPassword, 'Password must be strong');
        }
        else {
            setSuccessMsg(teacherPassword);
        }
    }
    else {
        setErrors(teacherPassword, 'Hey, Buddy Password cannot be empty');
    }
    if (!isEmptyData(teacherConfirmPassword)) {
        if (!passwordReg.test(teacherConfirmPassword.value)) {
            setErrors(teacherConfirmPassword, 'Password must contain at least 8 characters, including at least one number, one lowercase letter, and one uppercase letter.');
        }
        else {
            setSuccessMsg(teacherConfirmPassword);
        }
    }
    else {
        setErrors(teacherConfirmPassword, 'Look Your Password Again');
    }
    if (!isEmptyData(teacherConfirmPassword) && !isEmptyData(teacherConfirmPassword)) {
        if (teacherPassword.value.trim() !== teacherConfirmPassword.value.trim()) {
            alert('Password and Confirm Password should be Twining');
        }
    }
    if (!isEmptyData(teacherName) && !isEmptyData(teacherAge) && !isEmptyData(teacherEmail) && !isEmptyData(teacherPassword) && !isEmptyData(teacherConfirmPassword) && emailExists) {
        console.log("User is Creating");
        createTeacher(teacherName.value, parseInt(teacherAge.value), teacherEmail.value, teacherPassword.value);
    }
});
function isExistEmail(emailValue, teacher) {
    const isInList = () => {
        for (const index of teacher) {
            if (index.email === emailValue) {
                return true; // Return true if email is found
            }
        }
        return false;
    };
    return isInList;
}
function createTeacher(name, age, email, password) {
    const teacher = {
        name: name,
        age: age,
        role: 'teacher',
        email: email,
        password: password
    };
    saveTeacher(teacher);
}
function saveTeacher(teacherData) {
    let localData = localStorage.getItem("teacherData");
    let dataPresent = localData ? JSON.parse(localData) : [];
    if (dataPresent) {
        dataPresent.push(teacherData);
        localStorage.setItem("teacherData", JSON.stringify(dataPresent));
        console.log("User Data Saved Successfully");
    }
    else {
        dataPresent = [];
        dataPresent.push(teacherData);
        localStorage.setItem("teacherData", JSON.stringify(dataPresent));
        console.log('Teacher Added Successfully');
    }
    teacherForm.reset();
    setTimeout(() => {
        let inputs = document.querySelectorAll(".input-control");
        inputs.forEach(input => {
            input.classList.remove("success");
        });
    }, 1000);
}
function isEmptyData(data) {
    return data.value.trim() === '';
}
const setErrors = (element, message) => {
    const inputControl = element.parentElement;
    if (inputControl) {
        const errorDisplay = inputControl.querySelector(".error");
        if (errorDisplay) {
            errorDisplay.innerText = message;
            if (message) {
                inputControl.classList.add("error");
                inputControl.classList.remove("success");
            }
            else {
                inputControl.classList.remove("error");
            }
        }
    }
};
const setSuccessMsg = (element) => {
    const inputControl = element.parentElement;
    if (inputControl) {
        const successDisplay = inputControl.querySelector(".error");
        if (successDisplay) {
            successDisplay.innerText = "";
            inputControl.classList.add("success");
            inputControl.classList.remove("error");
        }
    }
};
