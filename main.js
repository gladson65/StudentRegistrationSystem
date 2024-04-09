window.onload = function() {
    
    const button = document.querySelector("#btn");


    button.addEventListener("click", function(e) {
        e.preventDefault();
        let form = document.querySelector("#studentForm")

        // Taking input values in variables
        let studentName = document.querySelector("#student-name").value;
        let studentId = document.querySelector("#student-Id").value;
        let email = document.querySelector("#email-Id").value;
        let contact = document.querySelector("#contact").value;
        
        
        // data preparation to store local storage
        const student = [{
            name: studentName, 
            emailID: email, 
            phone: contact,
        }];

         

        // regEX for validation 
        let regex = /^[a-zA-Z]+$/;
        let regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let regexNumber = /^[1-9][0-9]*$/; //leading zero not allowed
        let sName = studentName.replaceAll(/\s/g, '');
        let err = document.querySelector(".error");
        
       
            // checking for valid character
        if (sName === null || sName === "" || regex.test(sName) === false) {
            err.style.display = "block";
            document.querySelector(".username-error").innerHTML ="Please enter Valid Characters";
        }
            // Checking for student ID
        else if (studentId === null || studentId === "" || regexNumber.test(studentId) === false || studentId.length > 3 || studentId.length < 3) {
            document.querySelector(".id-error").style.display = "block";
            document.querySelector(".id-error").innerHTML = "Enter Valid ID: leading zero not allowed, should be 3 digit";
        }
            // checking for valid mail
        else if (email === null || email === "" || regexMail.test(email) === false) {
            document.querySelector(".email-error").style.display = "block";
            document.querySelector(".email-error").innerHTML = "Please enter Valid Email: abc@gmail.com";
        }
            // checking for valid contact contact-error
        else if (contact === null || contact === "" || regexNumber.test(contact) === false || contact.length !== 10) {
            document.querySelector(".contact-error").style.display = "block";
            document.querySelector(".contact-error").innerHTML = "Leading Zero not allowed, input 10 digits";
        }

        else{

            if (localStorage.getItem(studentId)) {
                let msg = document.querySelector(".msg");
                msg.style.display = "block";
                msg.innerHTML = "<span style='color: red'>Student ID already exists. Try Again</span><i style='color: yellow'><b>!</b></i>"
            }
            else {
                localStorage.setItem(studentId, JSON.stringify(student));
                let msg = document.querySelector(".msg");
                msg.style.display = "block";
                msg.innerHTML = "Student Registration Successfull<i style='color: yellow'><b>!</b></i>"
                let err = document.querySelector(".error");
                err.style.display = 'none';
                document.querySelector(".id-error").style.display = "none";
                document.querySelector(".email-error").style.display = "none";
                document.querySelector(".contact-error").style.display = "none";
                form.reset();
            }
        }

        // hide msg after 2.5s
        let flag = 0;
        const interval = setInterval(function() {
            flag++;

            if (flag === 1) {
                let msg = document.querySelector(".msg");
                msg.style.display = "none";
                clearInterval(interval);
                
            }
        }, 2500);

        

        
        
    })

    // form reset 
    let reset = document.querySelector(".resetIcon");
    reset.addEventListener("click", function(e) {
        e.preventDefault();
        
        let form = document.querySelector("#studentForm");

        let err = document.querySelector(".error");
        err.style.display = 'none';
        document.querySelector(".id-error").style.display = "none";
        document.querySelector(".email-error").style.display = "none";
        document.querySelector(".contact-error").style.display = "none";
        form.reset();

    })

    
    // slide bar open 
    const icon = document.querySelector(".slide");
    icon.addEventListener("click", function(e) {
        e.preventDefault();

        let sidebar = document.querySelector(".sidebar");
        sidebar.style.display = "flex";
        this.style.opacity = "0";
    })

    // slide bar close 
    const hideButton = document.querySelector(".hide-bar");
    hideButton.addEventListener("click", function(e) {
        e.preventDefault();

        let sidebar = document.querySelector(".sidebar");
        sidebar.style.display = "none";
        icon.style.opacity = "1";
    })
}