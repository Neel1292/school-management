// Get the form element
const questionForm = document.querySelector('.question-form') as HTMLFormElement;

interface Question{
    email:string;
    question: string;
    author: string;
}

// Get Question form inputs
const question = document.getElementById('question-name') as HTMLInputElement;
var sessionData = sessionStorage.getItem('currentUser');

// Function to save question
questionForm.addEventListener('submit',(event: Event) => {
    event.preventDefault(); 
    saveQues();
    
})

function saveQues() {
    let data = localStorage.getItem('questionData');
    let questionData:Question = data ? JSON.parse(data) : [];

    if(!isValueValid(question)) {
        console.log("User is Creating");
        createQuestion(question.value);
    }
}


function createQuestion(question: string) {
    let currrentData = sessionData ? JSON.parse(sessionData) : [];
    const quesObj:Question = {
        email: currrentData.email,
        question: question,
        author: currrentData.name
    } 
    
    saveQuestion(quesObj);    
}

function saveQuestion(quesObj:Question) {

    let localData = localStorage.getItem("questionData");
    let dataPresent: any[] = localData ? JSON.parse(localData) : [];

    if(dataPresent) {
        dataPresent.push(quesObj);
        localStorage.setItem("questionData", JSON.stringify(dataPresent));
        console.log("User Data Saved Successfully");
        
    } else {
        dataPresent=[]
        dataPresent.push(quesObj);
        localStorage.setItem("questionData", JSON.stringify(dataPresent));
        console.log('Student Added Successfully');
    }

    // questionForm.reset();
    setTimeout(() => {
        let inputs = document.querySelectorAll(".input-control");
        inputs.forEach(input => {
            input.classList.remove("success");
        })
    }, 1000)
}

function isValueValid(data:HTMLInputElement):boolean {
    return data.value.trim() === '';
}
  
const setInputError = (element:HTMLInputElement, message:string) => {
      const inputControl = element.parentElement;
      if(inputControl) {
          const errorDisplay = inputControl.querySelector(".error")  as HTMLElement;
        if(errorDisplay) {
          errorDisplay.innerText = message;   
          if (message) {
            inputControl.classList.add("error");
            inputControl.classList.remove("success");
        } else {
            inputControl.classList.remove("error");
        }          
        }
    }
};
  
const setInputSuccess = (element:HTMLInputElement) => {
    const inputControl = element.parentElement;
    if(inputControl) {
        const successDisplay = inputControl.querySelector(".error") as HTMLElement;
        if(successDisplay) {
            successDisplay.innerText = "";
            inputControl.classList.add("success");
            inputControl.classList.remove("error");         
        }
  }

  

};