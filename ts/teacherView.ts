type Teacher = {
    name: string;
    age:number;
    role: string;
    email: string;
    password: string;
} 

const teacherDataJSON = localStorage.getItem("teacherData");
var displayData = document.querySelector(".teacher-table-body") as HTMLTableElement;
const viewForm = document.querySelector(".teacher-data-view") as HTMLElement;
const tableView = document.querySelector(".teacher-table-conatienr") as HTMLTableElement;
const searchInput = document.querySelector("#teacher-search") as HTMLInputElement;
var refreshButton = document.querySelector(".fa-arrows-rotate") as HTMLButtonElement;

refreshButton.addEventListener("click", ()=> {
  window.location.reload();
})

getDataView();

searchInput.addEventListener("keyup", (event:Event) => {
  // debugger
  const searchValue:string = (event.target as HTMLInputElement).value;
  let teacherData = teacherDataJSON ? JSON.parse(teacherDataJSON) : [];
  displayData.innerHTML = ""; // Clear previous results

  if (searchValue) {
    teacherData = teacherData.filter((teacher:Teacher) => {
      console.log(teacher.name.toLowerCase().includes(searchValue.toLowerCase()));
      
      return (
        teacher.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchValue.toLowerCase())
      )
    })
  }

  if (teacherData.length > 0) {
    teacherData.forEach((teacher:Teacher, index:number) => {

      displayData.innerHTML += `
        <tr>
            <td>${index+1}</td>
            <td>${teacher.name}</td>
            <td>${teacher.email}</td>
            <td><i class="fa-solid fa-calendar-minus" onclick="deleteUser()" data-index="${index}"></i></td>
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

function getDataView() {
  
    let teacherData:Teacher[] = teacherDataJSON ? JSON.parse(teacherDataJSON) : [];
  
    if(teacherData.length > 0) {
      // displayTotalHours.innerText = ''
      teacherData.forEach((teacher, index) => {
        
        displayData.innerHTML += `
            <tr>
              <td>${index+1}</td>
              <td>${teacher.name}</td>
              <td>${teacher.email}</td>
              <td><i class="fa-solid fa-calendar-minus" onclick="deleteUser(${index})" data-index="${index}"></i></td>
            </tr>`
      });
    } else {
        tableView.innerHTML = `<h2>No Data Available...</h2><br/>`;
        viewForm.classList.remove("data_table");
    }
}

function deleteUser(index:number):void {
    let teacher:Teacher[] = teacherDataJSON ? JSON.parse(teacherDataJSON) : [];
    // Display confirmation block
    if (confirm("Are you sure you want to delete this user's data?")) {
      // If user confirms, perform the deletion
      teacher.splice(index, 1);
      localStorage.setItem("teacherData", JSON.stringify(teacher));
      displayData.innerHTML = "";
      getDataView();
    }
  }