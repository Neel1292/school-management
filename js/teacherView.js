"use strict";
const teacherDataJSON = localStorage.getItem("teacherData");
var displayData = document.querySelector(".teacher-table-body");
const viewForm = document.querySelector(".teacher-data-view");
const tableView = document.querySelector(".teacher-table-conatienr");
const searchInput = document.querySelector("#teacher-search");
var refreshButton = document.querySelector(".fa-arrows-rotate");
refreshButton.addEventListener("click", () => {
    window.location.reload();
});
getDataView();
searchInput.addEventListener("keyup", (event) => {
    // debugger
    const searchValue = event.target.value;
    let teacherData = teacherDataJSON ? JSON.parse(teacherDataJSON) : [];
    displayData.innerHTML = ""; // Clear previous results
    if (searchValue) {
        teacherData = teacherData.filter((teacher) => {
            console.log(teacher.name.toLowerCase().includes(searchValue.toLowerCase()));
            return (teacher.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                teacher.email.toLowerCase().includes(searchValue.toLowerCase()));
        });
    }
    if (teacherData.length > 0) {
        teacherData.forEach((teacher, index) => {
            displayData.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${teacher.name}</td>
            <td>${teacher.email}</td>
            <td><i class="fa-solid fa-calendar-minus" onclick="deleteUser()" data-index="${index}"></i></td>
        </tr>`;
        });
    }
    else {
        // If no records found, display "No Record" in the <td>
        displayData.innerHTML = `
      <tr>
          <td colspan="4">No Record</td>
      </tr>`; // Clear total hours display
    }
});
function getDataView() {
    let teacherData = teacherDataJSON ? JSON.parse(teacherDataJSON) : [];
    if (teacherData.length > 0) {
        // displayTotalHours.innerText = ''
        teacherData.forEach((teacher, index) => {
            displayData.innerHTML += `
            <tr>
              <td>${index + 1}</td>
              <td>${teacher.name}</td>
              <td>${teacher.email}</td>
              <td><i class="fa-solid fa-calendar-minus" onclick="deleteUser(${index})" data-index="${index}"></i></td>
            </tr>`;
        });
    }
    else {
        tableView.innerHTML = `<h2>No Data Available...</h2><br/>`;
        viewForm.classList.remove("data_table");
    }
}
function deleteUser(index) {
    let teacher = teacherDataJSON ? JSON.parse(teacherDataJSON) : [];
    // Display confirmation block
    if (confirm("Are you sure you want to delete this user's data?")) {
        // If user confirms, perform the deletion
        teacher.splice(index, 1);
        localStorage.setItem("teacherData", JSON.stringify(teacher));
        displayData.innerHTML = "";
        getDataView();
    }
}
