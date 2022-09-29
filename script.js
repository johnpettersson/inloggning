/**
 * @author John Pettersson
// The HTML consists of 3 forms, login, logout and a "return to login" form.
 * This code handles login/logout and swapping visibility between the forms
 */

const USER_LOCAL_STORAGE_KEY = "User";

const VALID_USERNAME = "Sara";
const VALID_PASSWORD = "qwe123"

// Below i find the forms and add eventhandlers for onsubmit
const loginForm = document.getElementById("loginform");
loginForm.addEventListener("submit", onLoginSubmit);


const logoutForm = document.getElementById("logoutform");
logoutForm.addEventListener("submit", onLogoutSubmit);

const invalidloginform = document.getElementById("invalidloginform");
invalidloginform.addEventListener("submit", returnToLoginForm);

const statusText = document.getElementById("status");


function isLoggedIn() {
    return localStorage.getItem(USER_LOCAL_STORAGE_KEY) !== null;
}

// if user is logged in -> swap to logoutform
if(isLoggedIn()) {
    statusText.innerText = "Du är inloggad som: " + VALID_USERNAME;
    swapForms();
}

//swap visibility between login/logout forms
function swapForms() {
    loginForm.classList.toggle("hidden");
    logoutForm.classList.toggle("hidden");
}


function onLogoutSubmit(e) {
    //remove user form localStorage and swap back to loginForm
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
    swapForms();

    //prevents form from being sent to backend
    e.preventDefault();
    return false;
}


function onLoginSubmit(e) {
    //gets data from the loginform
    let formData = new FormData(loginForm);
    let user = formData.get("username");
    let password = formData.get("password");
    
    if(user == VALID_USERNAME && password == VALID_PASSWORD) { //save user in localStorage
        localStorage.setItem(USER_LOCAL_STORAGE_KEY, VALID_USERNAME);
        statusText.innerText = "Du är inloggad som: " + VALID_USERNAME;
        swapForms();
    } else { // swap to invalidLoginForm
        loginForm.reset();
        loginForm.classList.add("hidden");
        invalidloginform.classList.remove("hidden");
    }

    //prevents form from being sent to backend
    e.preventDefault();
    return false;
}

function returnToLoginForm(e) {
    //swap visibility back to loginForm
    loginForm.classList.remove("hidden");
    invalidloginform.classList.add("hidden");

    //prevents form from being sent to backend
    e.preventDefault();
    return false;
}


