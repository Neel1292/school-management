"use strict";
// Get the form element
const questionForm = document.querySelector('.question-form');
// Get Question form inputs
const question = document.getElementById('question-name');
var sessionData = sessionStorage.getItem('currentUser');
// Function to save question
questionForm.addEventListener('submit', (event) => {
    event.preventDefault();
    saveQues();
});
function saveQues() {
    let data = localStorage.getItem('questionData');
    let questionData = data ? JSON.parse(data) : [];
    if (!isValueValid(question)) {
        console.log("User is Creating");
        createQuestion(question.value);
    }
}
function createQuestion(question) {
    let currrentData = sessionData ? JSON.parse(sessionData) : [];
    const quesObj = {
        email: currrentData.email,
        question: question,
        author: currrentData.name
    };
    saveQuestion(quesObj);
}
function saveQuestion(quesObj) {
    let localData = localStorage.getItem("questionData");
    let dataPresent = localData ? JSON.parse(localData) : [];
    if (dataPresent) {
        dataPresent.push(quesObj);
        localStorage.setItem("questionData", JSON.stringify(dataPresent));
        console.log("User Data Saved Successfully");
    }
    else {
        dataPresent = [];
        dataPresent.push(quesObj);
        localStorage.setItem("questionData", JSON.stringify(dataPresent));
        console.log('Student Added Successfully');
    }
    // questionForm.reset();
    setTimeout(() => {
        let inputs = document.querySelectorAll(".input-control");
        inputs.forEach(input => {
            input.classList.remove("success");
        });
    }, 1000);
}
function isValueValid(data) {
    return data.value.trim() === '';
}
const setInputError = (element, message) => {
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
const setInputSuccess = (element) => {
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
