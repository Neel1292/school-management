"use strict";
// document.addEventListener("DOMContentLoaded", ()=> {
var logout = document.querySelector('#logOut');
const teacherNavLinks = document.querySelectorAll('nav a');
const teacherContentDivs = document.querySelectorAll('.content div');
var welcome = document.getElementById('welcome-text');
var userName = sessionStorage.getItem('currentUser');
userName = JSON.parse(userName);
welcome.innerHTML = `Welcome ${userName.name} Guruji 👋`;
logout.addEventListener('click', () => {
    sessionStorage.clear();
    window.location.href = "../index.html";
});
teacherNavLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        // Remove active class from all nav links
        teacherNavLinks.forEach(navLink => navLink.classList.remove('active'));
        // Add active class to clicked nav link
        link.classList.add('active');
        // Hide all content divs
        teacherContentDivs.forEach(div => div.classList.remove('active'));
        // Show content div with matching ID
        const target = link.getAttribute('data-target');
        if (target) {
            const targetDiv = document.getElementById(target);
            if (targetDiv) {
                targetDiv.classList.add('active');
            }
        }
    });
});
