// ===============================
// VISIT LANKA LOGIN
// Spring Boot Ready
// ===============================

const loginForm = document.getElementById("loginForm");
const password = document.getElementById("password");
const username = document.getElementById("username");
const togglePassword = document.getElementById("togglePassword");

// ===============================
// SHOW / HIDE PASSWORD
// ===============================

togglePassword.addEventListener("click", () => {

    const type = password.getAttribute("type") === "password"
        ? "text"
        : "password";

    password.setAttribute("type", type);

    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");

});

// ===============================
// LOGIN
// ===============================

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const user = username.value.trim();
    const pass = password.value.trim();

    // Validation

    if(user === "" || pass === ""){

        alert("Please fill in all fields.");

        return;

    }

    try{

        // Spring Boot API

        const response = await fetch("http://localhost:8080/api/auth/login",{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                username:user,

                password:pass

            })

        });

        // Login Success

        if(response.ok){

            const data = await response.json();

            // Save Logged User

            localStorage.setItem(
                "loggedUser",
                JSON.stringify(data)
            );

            alert("Welcome " + data.name + "!");

            // Redirect

            window.location.href="questionnaire.html";

        }

        else{

            alert("Invalid Username or Password.");

        }

    }

    catch(error){

        console.error(error);

        alert("Cannot connect to server.");

    }

});