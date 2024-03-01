// Get the form element
const teacherForm = document.querySelector('.teacher-form') as HTMLFormElement;

type TeacherObject = {
    name: string;
    age: number;
    email: string;
    role: string;
    password: string;
}

// Get form inputs
const teacherName = document.getElementById('teacher-name') as HTMLInputElement;
const teacherAge = document.getElementById('teacher-age') as HTMLInputElement;
const teacherEmail = document.getElementById('teacher-email') as HTMLInputElement;
const teacherPassword = document.getElementById('teacher-password') as HTMLInputElement;
const teacherConfirmPassword = document.getElementById('teacher-confirm-password') as HTMLInputElement;
const eye = document.getElementById("eye-icon");
const eye2 = document.getElementById("eye-icon2");
const requirementLists = document.querySelectorAll(".password-match-list li") as NodeListOf<HTMLElement>;
let validEmail = false;

const passwordMatchList = document.querySelectorAll(".password-match-list") as NodeListOf<HTMLElement>;
const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
const emailReg = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$";

const passRequiredList = [
    { regex: /.{8,16}/, index: 0 }, // Minimum of 8 Character
    { regex: /[0-9]/, index: 1}, // At least one number
    { regex: /[A-Z]/, index: 2}, // At least one uppercase letter
    { regex: /[a-z]/, index: 3}, // At least one lowercase letter
    { regex: /[^A-Za-z0-9]/, index: 4}, // At least one special character
];

teacherEmail.addEventListener("input", function(e:Event){
    
    let inputValue = (e.target as HTMLInputElement).value
    let isCharacter:unknown = emailReg.match(inputValue);
    const inputControl = teacherEmail.parentElement as HTMLInputElement;
    const errorDisplay = inputControl.querySelector(".error") as HTMLElement;
  
    if (!isCharacter) {
      errorDisplay.innerText = 'Please enter valid email address'
    } else {
        errorDisplay.innerText = "";
    }
});

teacherEmail.addEventListener("blur", (event:Event) => {
    
    let userMail:string = (event.target as HTMLInputElement).value;
    let emailRequired = '^[a-zA-Z0-9._%+-]+@(gmail|outlook|yahoo)\.[a-zA-Z]{2,}$';
    let isValidEmail = userMail.match(emailRequired);
    const inputControl = teacherEmail.parentElement;
    if(inputControl) {
        const errorDisplay = inputControl.querySelector(".error") as HTMLElement;
        
        if (!isValidEmail) {
            if(errorDisplay) {
                errorDisplay.innerText = 'Domain eg. gmail.com'  
            }
        } else {
            validEmail = true;
            errorDisplay.innerText = "";
            inputControl.classList.add("success");
            inputControl.classList.remove("error");
        }
    }
});

teacherPassword.addEventListener("keyup", (e: Event) => {

    passwordMatchList.forEach(list => list.style.display = "block");

    if(!isEmptyData(teacherPassword)) {
    
        passRequiredList.forEach(item => {
            const isValid = item.regex.test(teacherPassword.value);
            const requirementItem = requirementLists[item.index];
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
        const passwordMatchList = teacherForm.querySelector(".password-match-list") as HTMLElement;
        if (passwordMatchList) {
            passwordMatchList.style.display = "none";
        }
    }
})

teacherPassword.addEventListener("blur", (e:Event) => {
    const passwordMatchList = teacherForm.querySelector(".password-match-list") as HTMLElement;
    if (passwordMatchList) {
        passwordMatchList.style.display = "none";
    }
})

if(eye) {
    
    eye.addEventListener("click", ()=> {
        teacherPassword.type = teacherPassword.type === "password" ? "text" : "password";
        
        eye.className = `fa-solid fa-eye${teacherPassword.type !== "password" ? '-slash':""}`
    })
}

if(eye2) {

    eye2.addEventListener("click", ()=> {
        teacherConfirmPassword.type = teacherConfirmPassword.type === "password" ? "text" : "password";
        
        eye2.className = `fa-solid fa-eye${teacherConfirmPassword.type !== "password" ? '-slash':""}`
    })
}

// Function to handle form submission
teacherForm.addEventListener('submit',(event: Event) => {
    event.preventDefault(); 

    let data = localStorage.getItem('teacherData');
    let teacherData:TeacherObject[] = data ? JSON.parse(data) : [];
    let emailExists:boolean = false;

    if(!isEmptyData(teacherName)) {
        setSuccessMsg(teacherName);
    } else {
        setErrors(teacherName, "Good Name should be there");
    }

    if(!isEmptyData(teacherAge)) {
        if(parseInt(teacherAge.value) >= 25 && parseInt(teacherAge.value) <= 50) {
            setSuccessMsg(teacherAge)
        } else {
            setErrors(teacherAge, 'Please Check Your Age')
        }  
    } else {
        setErrors(teacherAge, 'Please Enter Age')
    }

    if (!isEmptyData(teacherEmail)) {
        let list:Function = isExistEmail(teacherEmail.value, teacherData);

        if(!(teacherEmail.value).match(emailReg)){
            setErrors(teacherEmail, "Sorry Your Email Does Not Match the Guidlines");
        }
        else if(list()){
            setErrors(teacherEmail, "Sorry Your Email Should Be Unique");
        }
        else if((teacherEmail.value).match(emailReg)){
            emailExists = true;
            setSuccessMsg(teacherEmail);
        }
        
    } else {
        setErrors(teacherEmail, 'Email cannot be blank');
    }

    if(!isEmptyData(teacherPassword)) {
        if (!passwordReg.test(teacherPassword.value) && teacherPassword.value.trim().length < 8) {
            setErrors(teacherPassword, 'Password must be strong');
        } else {
            setSuccessMsg(teacherPassword)
        }
    } else {
        setErrors(teacherPassword, 'Hey, Buddy Password cannot be empty');
    }

    if(!isEmptyData(teacherConfirmPassword)) {
        if (!passwordReg.test(teacherConfirmPassword.value)) {
            setErrors(teacherConfirmPassword, 'Password must contain at least 8 characters, including at least one number, one lowercase letter, and one uppercase letter.');
        } else {
            setSuccessMsg(teacherConfirmPassword)
        }
    } else {
        setErrors(teacherConfirmPassword, 'Look Your Password Again');
    }

    if(!isEmptyData(teacherConfirmPassword) && !isEmptyData(teacherConfirmPassword)) {
        if(teacherPassword.value.trim() !== teacherConfirmPassword.value.trim()) {
            alert('Password and Confirm Password should be Twining');
        }
    } 

    if(!isEmptyData(teacherName) && !isEmptyData(teacherAge) && !isEmptyData(teacherEmail) && !isEmptyData(teacherPassword) && !isEmptyData(teacherConfirmPassword) && emailExists) {
        console.log("User is Creating");
        createTeacher(teacherName.value, parseInt(teacherAge.value), teacherEmail.value, teacherPassword.value);
    }
})

function isExistEmail(emailValue:string, teacher:TeacherObject[]):Function {
    const isInList = (): boolean => {
        for (const index of teacher) {
            if (index.email === emailValue) {
                return true; // Return true if email is found
            }
        }
        return false;
    }

    return isInList;
}

function createTeacher(name: string, age:number, email: string, password: string) {
    const teacher:TeacherObject = {
        name: name,
        age: age,
        role: 'teacher',
        email: email,
        password: password
    } 
    
    saveTeacher(teacher);    
}

function saveTeacher(teacherData:TeacherObject) {

    let localData = localStorage.getItem("teacherData");
   
    let dataPresent: any[] = localData ? JSON.parse(localData) : [];
    if(dataPresent) {
        dataPresent.push(teacherData);
        localStorage.setItem("teacherData", JSON.stringify(dataPresent));
        console.log("User Data Saved Successfully");
        
    } else {
        dataPresent=[]
        dataPresent.push(teacherData);
        localStorage.setItem("teacherData", JSON.stringify(dataPresent));
        console.log('Teacher Added Successfully');
    }

    teacherForm.reset();
    setTimeout(() => {
        let inputs = document.querySelectorAll(".input-control");
        inputs.forEach(input => {
            input.classList.remove("success");
        })
    }, 1000)
}

function isEmptyData(data:HTMLInputElement):boolean {
    return data.value.trim() === '';
}
  
const setErrors = (element:HTMLInputElement, message:string) => {
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
  
const setSuccessMsg = (element:HTMLInputElement) => {
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