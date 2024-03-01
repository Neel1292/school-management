type Student = {
    name: string;
    age:number;
    role: string;
    email: string;
    password: string;
} 

const studentDataJSON = localStorage.getItem("studentData");
var displayData = document.querySelector(".student-table-body") as HTMLTableElement;
const viewStudentForm = document.querySelector(".student-data-view") as HTMLElement;
const studentTableView = document.querySelector(".student-table-conatienr") as HTMLTableElement;
const searchStudentInput = document.querySelector("#student-search") as HTMLInputElement;
var refreshButton = document.querySelector(".fa-arrows-rotate") as HTMLButtonElement;

refreshButton.addEventListener("click", ()=> {
  window.location.reload();
})

getStudentDataView();

searchStudentInput.addEventListener("keyup", (event:Event) => {
  // debugger
  const searchValue:string = (event.target as HTMLInputElement).value;
  let studentData = studentDataJSON ? JSON.parse(studentDataJSON) : [];
  displayData.innerHTML = ""; // Clear previous results

  if (searchValue) {
    studentData = studentData.filter((student:Student) => {
      console.log(student.name.toLowerCase().includes(searchValue.toLowerCase()));
      
      return (
        student.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        student.email.toLowerCase().includes(searchValue.toLowerCase())
      )
    })
  }

  if (studentData.length > 0) {
    studentData.forEach((student:Student, index:number) => {

      displayData.innerHTML += `
        <tr>
            <td>${index+1}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td><i class="fa-solid fa-user-xmark" onclick="deleteStudent()" data-index="${index}"></i></td>
        </tr>`;
    });
  } else {
    // If no records found, display "No Record" in the <td>
    displayData.innerHTML = `
      <tr>
          <td colspan="4">No Record</td>
      </tr>`; // Clear total hours display
  }

});

function getStudentDataView() {
  
    let studentData:Student[] = studentDataJSON ? JSON.parse(studentDataJSON) : [];
  
    if(studentData.length > 0) {
      // displayTotalHours.innerText = ''
      studentData.forEach((student, index) => {
        
        displayData.innerHTML += `
            <tr>
              <td>${index+1}</td>
              <td>${student.name}</td>
              <td>${student.email}</td>
              <td><i class="fa-solid fa-user-xmark" onclick="deleteStudent(${index})" data-index="${index}"></i></td>
            </tr>`
      });
    } else {
        studentTableView.innerHTML = `<h2>No Data Available...</h2><br/>`;
        viewStudentForm.classList.remove("student_data_table");
    }
}

function deleteStudent(index:number):void {
    let student:Student[] = studentDataJSON ? JSON.parse(studentDataJSON) : [];
    // Display confirmation block
    if (confirm("Are you sure you want to delete this user's data?")) {
      // If user confirms, perform the deletion
      student.splice(index, 1);
      localStorage.setItem("studentData", JSON.stringify(student));
      displayData.innerHTML = "";
      getStudentDataView();
    }
}