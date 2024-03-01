// Get the form element
const studentForm = document.querySelector('.student-form') as HTMLFormElement;

type StudentObject = {
    name: string;
    age: number;
    email: string;
    role: string;
    password: string;
}

// Get form inputs
const studentName = document.getElementById('student-name') as HTMLInputElement;
const studentAge = document.getElementById('student-age') as HTMLInputElement;
const studentEmail = document.getElementById('student-email') as HTMLInputElement;
const studentPassword = document.getElementById('student-password') as HTMLInputElement;
const studentConfirmPassword = document.getElementById('student-confirm-password') as HTMLInputElement;
const eyeIcon = document.getElementById("stud-eye-icon");
const eyeIcon2 = document.getElementById("stud-eye-icon2");
const requirementList = document.querySelectorAll("password-match-list-2 li") as NodeListOf<HTMLElement>;
let emailValid = false;

const passwordMatchLists = document.querySelectorAll("password-match-list-2") as NodeListOf<HTMLElement>;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
const emailRegex = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$";

const passRequire = [
    { regex: /.{8,16}/, index: 0 }, // Minimum of 8 Character
    { regex: /[0-9]/, index: 1}, // At least one number
    { regex: /[A-Z]/, index: 2}, // At least one uppercase letter
    { regex: /[a-z]/, index: 3}, // At least one lowercase letter
    { regex: /[^A-Za-z0-9]/, index: 4}, // At least one special character
];

studentEmail.addEventListener("input", function(e:Event){
    
    let inputValue = (e.target as HTMLInputElement).value
    let isCharacter:unknown = emailRegex.match(inputValue);
    const inputControl = studentEmail.parentElement as HTMLInputElement;
    const errorDisplay = inputControl.querySelector(".error") as HTMLElement;
  
    if (!isCharacter) {
      errorDisplay.innerText = 'Please enter valid email address'
    } else {
        errorDisplay.innerText = "";
    }
});

studentEmail.addEventListener("blur", (event:Event) => {
    // debugger
    let userMail:string = (event.target as HTMLInputElement).value;
    let emailRequired = '^[a-zA-Z0-9._%+-]+@(gmail|outlook|yahoo)\.[a-zA-Z]{2,}$';
    let isValidEmail = userMail.match(emailRequired);
    const inputControl = studentEmail.parentElement;
    if(inputControl) {
        const errorDisplay = inputControl.querySelector(".error") as HTMLElement;
        
        if (!isValidEmail) {
            if(errorDisplay) {
                errorDisplay.innerText = 'Domain eg. gmail.com'  
            }
        } else {
            emailValid = true;
            errorDisplay.innerText = "";
            inputControl.classList.add("success");
            inputControl.classList.remove("error");
        }
    }
});

studentPassword.addEventListener("keyup", (e: Event) => {
    passwordMatchLists.forEach(list => list.style.display = "block");
    if(!isEmptyValue(studentPassword)) {
    
        passRequire.forEach(item => {
            const isValid = item.regex.test(studentPassword.value);
            const requirementItem = requirementList[item.index];
            if (requirementItem) {
            if(isValid) {
                requirementItem.firstElementChild?.classList.replace('fa-xmark', 'fa-check'); // Use classList.replace to swap classes
                requirementItem.classList.add('valid'); 
            } else {
                requirementItem.firstElementChild?.classList.replace('fa-check', 'fa-xmark'); // Use classList.replace to swap classes
            requirementItem.classList.remove('valid');
            }
        }
        })
    } else {
        const passwordMatchList = studentForm.querySelector("password-match-list-2") as HTMLElement;
        if (passwordMatchList) {
            passwordMatchList.style.display = "none";
        }
    }
})

studentPassword.addEventListener("blur", (e:Event) => {
    const passwordMatchList = studentForm.querySelector("password-match-list-2") as HTMLElement;
    if (passwordMatchList) {
        passwordMatchList.style.display = "none";
    }
})

if(eyeIcon) {
    
    eyeIcon.addEventListener("click", ()=> {
        studentPassword.type = studentPassword.type === "password" ? "text" : "password";
        
        eyeIcon.className = `fa-solid fa-eye${studentPassword.type !== "password" ? '-slash':""}`
    })
}

if(eyeIcon2) {
   
    eyeIcon2.addEventListener("click", ()=> {
        studentConfirmPassword.type = studentConfirmPassword.type === "password" ? "text" : "password";
        
        eyeIcon2.className = `fa-solid fa-eye${studentConfirmPassword.type !== "password" ? '-slash':""}`
    })
}

// Function to handle form submission
studentForm.addEventListener('submit',(event: Event) => {
    event.preventDefault(); 
    studentValidate();
    console.log("-----You Subitted-----");
    
})
    // debugger
function studentValidate() {

    let data = localStorage.getItem('studentData');
    let studentData:StudentObject[] = data ? JSON.parse(data) : [];
    let emailExists:boolean = false;

    if(!isEmptyValue(studentName)) {
        setSuccess(studentName);
    } else {
        setError(studentName, "Good Name should be there");
    }

    if(!isEmptyValue(studentAge)) {
        if(parseInt(studentAge.value) >= 25 && parseInt(studentAge.value) <= 50) {
            setSuccess(studentAge)
        } else {
            setError(studentAge, 'Please Check Your Age')
        }  
    } else {
        setError(studentAge, 'Please Enter Age')
    }

    if (!isEmptyValue(studentEmail)) {
        let list:Function = isEmailExist(studentEmail.value, studentData);

        if(!(studentEmail.value).match(emailRegex)){
            setError(studentEmail, "Sorry Your Email Does Not Match the Guidlines");
        }
        else if(list()){
            setError(studentEmail, "Sorry Your Email Should Be Unique");
        }
        else if((studentEmail.value).match(emailRegex)){
            emailExists = true;
            setSuccess(studentEmail);
        }
        
    } else {
        setError(studentEmail, 'Email cannot be blank');
    }

    if(!isEmptyValue(studentPassword)) {
        if (!passwordRegex.test(studentPassword.value) && studentPassword.value.trim().length < 8) {
            setError(studentPassword, 'Password must be strong');
        } else {
            setSuccess(studentPassword)
        }
    } else {
        setError(studentPassword, 'Hey, Buddy Password cannot be empty');
    }

    if(!isEmptyValue(studentConfirmPassword)) {
        if (!passwordRegex.test(studentConfirmPassword.value)) {
            setError(studentConfirmPassword, 'Password must contain at least 8 characters, including at least one number, one lowercase letter, and one uppercase letter.');
        } else {
            setSuccess(studentConfirmPassword)
        }
    } else {
        setError(studentConfirmPassword, 'Look Your Password Again');
    }

    if(!isEmptyValue(studentConfirmPassword) && !isEmptyValue(studentConfirmPassword)) {
        if(studentPassword.value.trim() !== studentConfirmPassword.value.trim()) {
            alert('Password and Confirm Password should be Twining');
        }
    } 

    if(!isEmptyValue(studentName) && !isEmptyValue(studentAge) && !isEmptyValue(studentEmail) && !isEmptyValue(studentPassword) && !isEmptyValue(studentConfirmPassword) && emailExists) {
        console.log("User is Creating");
        createStudent(studentName.value, parseInt(studentAge.value), studentEmail.value, studentPassword.value);
    }
}

function isEmailExist(emailValue:string, student:StudentObject[]):Function {
    const isInList = (): boolean => {
        for (const index of student) {
            if (index.email === emailValue) {
                return true; // Return true if email is found
            }
        }
        return false;
    }

    return isInList;
}

function createStudent(name: string, age:number, email: string, password: string) {
    const student:StudentObject = {
        name: name,
        age: age,
        role: 'student',
        email: email,
        password: password
    } 
    
    saveStudent(student);    
}

function saveStudent(studentData:StudentObject) {

    let localData = localStorage.getItem("studentData");
   
    let dataPresent: any[] = localData ? JSON.parse(localData) : [];
    if(dataPresent) {
        dataPresent.push(studentData);
        localStorage.setItem("studentData", JSON.stringify(dataPresent));
        console.log("User Data Saved Successfully");
        
    } else {
        dataPresent=[]
        dataPresent.push(studentData);
        localStorage.setItem("studentData", JSON.stringify(dataPresent));
        console.log('Student Added Successfully');
    }

    studentForm.reset();
    setTimeout(() => {
        let inputs = document.querySelectorAll(".input-control");
        inputs.forEach(input => {
            input.classList.remove("success");
        })
    }, 1000)
}

function isEmptyValue(data:HTMLInputElement):boolean {
    return data.value.trim() === '';
}
  
const setError = (element:HTMLInputElement, message:string) => {
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
  
const setSuccess = (element:HTMLInputElement) => {
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