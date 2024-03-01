"use strict";
const loginButton = document.querySelector('#login-btn');
document.addEventListener('DOMContentLoaded', function () {
    // Event listener for form submission
    const loginForm = document.querySelector('form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission behavior
            loginUser(); // Call the login function
        });
    }
});
function loginUser() {
    const userEmail = document.querySelector('#email');
    const userPassword = document.querySelector('#password');
    let roleSelect = document.querySelector('.form-select');
    const selectedRole = roleSelect.value;
    switch (selectedRole) {
        case 'principal':
            window.location.href = '../html/admin.html';
            break;
        case 'teacher':
            if (getTeacherLogin(userEmail.value, userPassword.value)) {
                window.location.href = '../html/teacher.html';
            }
            else {
                alert("Please Try Again !!!");
                window.location.href = '../index.html';
            }
            break;
        case 'student':
            if (getStudentLogin(userEmail.value, userPassword.value)) {
                window.location.href = '../html/student.html';
            }
            else {
                alert("Please Try Again !!!");
                window.location.href = '../html/index.html';
            }
            break;
        default:
            alert('Please select a valid role before logging in.');
            roleSelect.value = 'Select Role';
            break;
    }
}
function getTeacherLogin(email, password) {
    const teacher = localStorage.getItem('teacherData');
    let teacherCred = teacher ? JSON.parse(teacher) : [];
    let name;
    let matchResult = teacherCred.filter((teacher) => {
        if (teacher.email === email)
            name = teacher.name;
        return teacher.email === email && teacher.password === password;
    });
    if (teacherCred) {
        if (matchResult.length > 0 && matchResult) {
            alert(`Welcome ${name}`);
            sessionStorage.setItem('currentUser', JSON.stringify({ email, name }));
            return true;
        }
        else {
            return false;
        }
    }
    else {
        alert("Inform admin to Register Yourself");
        return false;
    }
}
function getStudentLogin(email, password) {
    const students = localStorage.getItem('studentData');
    let studentCred = students ? JSON.parse(students) : [];
    let name;
    let matchResult = studentCred.filter((student) => {
        if (student.email === email)
            name = student.name;
        return student.email === email && student.password === password;
    });
    if (studentCred) {
        if (matchResult.length > 0 && matchResult) {
            alert(`Welcome ${name}`);
            sessionStorage.setItem('currentUser', JSON.stringify({ email, name }));
            return true;
        }
        else {
            return false;
        }
    }
    else {
        alert("Inform admin to Register Yourself");
        return false;
    }
}
