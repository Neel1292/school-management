type TeacherQuestion = {
    email:string;
    question: string;
    author: string;
}

const questionDataJSON = localStorage.getItem("questionData");
var displayData = document.querySelector(".question-table-body") as HTMLTableElement;
const questionsViewForm = document.querySelector(".question-data-view") as HTMLElement;
const questionsTableView = document.querySelector(".question-table-container") as HTMLTableElement;
const searchQuestions = document.querySelector("#question-search") as HTMLInputElement;
var refreshButton = document.querySelector(".fa-arrows-rotate") as HTMLButtonElement;

refreshButton.addEventListener("click", ()=> {
  window.location.reload();
})

getQuestionView();

searchQuestions.addEventListener("keypress", (event:Event) => {
  // debugger
  const searchValue:string = (event.target as HTMLInputElement).value;
  let questionData = questionDataJSON ? JSON.parse(questionDataJSON) : [];
  console.log(questionData);
  
  displayData.innerHTML = ""; // Clear previous results

  if (searchValue) {
    questionData = questionData.filter((questions:TeacherQuestion) => {
      
      return (
        questions.author.toLowerCase().includes(searchValue.toLowerCase()) ||
        questions.question.toLowerCase().includes(searchValue.toLowerCase())
      )
    })
  }

  if (questionData.length > 0) {
    questionData.forEach((question:TeacherQuestion, index:number) => {

      displayData.innerHTML += `
        <tr>
            <td>${index+1}</td>
            <td>${question.author}</td>
            <td>${question.question}</td>
            <td><i class="fa-solid fa-calendar-minus" onclick="deleteQuestion()" data-index="${index}"></i></td>
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

function getQuestionView() {
    // displayData.innerHTML = ''; 
  
    let questionData:TeacherQuestion[] = questionDataJSON ? JSON.parse(questionDataJSON) : [];
    
    if(questionData.length > 0) {
      // displayTotalHours.innerText = ''
      
        if(questionData.length > 0) {
            questionData.forEach((questions, index) => {

                displayData.innerHTML += `
                <tr>
                  <td>${index+1}</td>
                  <td>${questions.question}</td>
                  <td>${questions.author}</td>
                  <td><i class="fa-solid fa-eraser" onclick="deleteQuestion(${index})" data-index="${index}"></i></td>
                </tr>`
            })
        }
      
    } else {
        questionsTableView.innerHTML = `<h2>No Data Available...</h2><br/>`;
        questionsViewForm.classList.remove("data_table");
    }
}

function deleteQuestion(index:number) {
    let teacher:TeacherQuestion[] = questionDataJSON ? JSON.parse(questionDataJSON) : [];
    // Display confirmation block
    if (confirm("Are you sure you want to delete this user's data?")) {
      // If user confirms, perform the deletion
      teacher.splice(index, 1);
      localStorage.setItem("questionData", JSON.stringify(teacher));
      displayData.innerHTML = "";
      getQuestionView();
    }
}