type Question = {
  question: string;
}

const questionsJSON = localStorage.getItem("questionData");
var displayData = document.querySelector(".questions-table-body") as HTMLTableElement;
const questionViewForm = document.querySelector(".questions-data-view") as HTMLElement;
const questionTableView = document.querySelector(".questions-table-container") as HTMLTableElement;
const searchQuestion = document.querySelector("#questions-search") as HTMLInputElement;
var allAnswers = document.querySelectorAll<HTMLInputElement>(".all-answers");
var submit = document.getElementById('questions-submit');
// var refreshButton = document.querySelector(".fa-arrows-rotate") as HTMLButtonElement;

// refreshButton.addEventListener("click", ()=> {
//   window.location.reload();
// })

getQuestions();

// searchQuestion.addEventListener("keypress", (event:Event) => {
//   // debugger
//   const searchValue:string = (event.target as HTMLInputElement).value;
//   let questionData = questionsJSON ? JSON.parse(questionsJSON) : [];
//   console.log(questionData);
  
//   displayData.innerHTML = ""; // Clear previous results

//   if (searchValue) {
//     questionData = questionData.filter((questions:Question) => {
      
//       return (
//         questions.author.toLowerCase().includes(searchValue.toLowerCase()) ||
//         questions.question.toLowerCase().includes(searchValue.toLowerCase())
//       )
//     })
//   }

//   if (questionData.length > 0) {
//     questionData.forEach((question:Question, index:number) => {

//       displayData.innerHTML += `
//         <tr>

//             <td>${question.author}</td>
//             <td>${question.question}</td>
//             <td><i class="fa-solid fa-calendar-minus" onclick="deleteQuestion()" data-index="${index}"></i></td>
//         </tr>`;
//     });
//   } else {
//     // If no records found, display "No Record" in the <td>
//     displayData.innerHTML = `
//       <tr>
//           <td colspan="4">No Record</td>
//       </tr>`; // Clear total hours display
//   }

// });

function getQuestions() {

    // displayData.innerHTML = ''; 
  
    let questionData:Question[] = questionsJSON ? JSON.parse(questionsJSON) : [];
    
    if(questionData.length > 0) {
      // displayTotalHours.innerText = ''
      
        if(questionData.length > 0) {
            questionData.forEach((questions, index) => {

                displayData.innerHTML += `
                <tr>
                  <td>${questions.question}</td>
                  <td><input type="text" class="all-answers" placeholder="Type your answer" /></td>
                </tr>`
            })
        }
      
    } else {
        questionTableView.innerHTML = `<h2>No Data Available...</h2><br/>`;
        questionViewForm.classList.remove("data_table");
    }
}

if(submit) {
  submit.addEventListener('click',()=>{
    // debugger
    let user = JSON.parse(sessionStorage.getItem("currentUser") || "{}");
    let questions = JSON.parse(localStorage.getItem("questionData") || "[]");
    let allAnswers = document.querySelectorAll<HTMLInputElement>(".all-answers");
    let quizeAnswerData = JSON.parse(localStorage.getItem("quizAnswers") || "[]");
    let submittedAnswers:any[] = [];

    allAnswers.forEach((ans) => {
      console.log(ans.value);
            
      const answers = {
        questions: questions.question,
        answer: ans.value
      }

      submittedAnswers.push(answers);
    })

    console.log("Submitted Answers",submittedAnswers);
    

    const quizeAnswer = {
      submitBy: user.name,
      answer: submittedAnswers,
    }

    quizeAnswerData.push(quizeAnswer);
    localStorage.setItem("quizAnswers",JSON.stringify(quizeAnswerData));
    alert("Submitted Successfully");
    allAnswers.forEach((ans) => { ans.value = ""; });
    window.location.href = "../html/student.html";
  })
}