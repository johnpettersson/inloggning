
const USER_LOCAL_STORAGE_KEY = "User";

const VALID_USERNAME = "Sara";
const VALID_PASSWORD = "qwe123"

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

if(isLoggedIn()) {
    statusText.innerText = "Du är inloggad som: " + VALID_USERNAME;
    swapForms();
}

function swapForms() {
    loginForm.classList.toggle("hidden");
    logoutForm.classList.toggle("hidden");
}


function onLogoutSubmit(e) {
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
    swapForms();

    e.preventDefault();
    return false;
}


function onLoginSubmit(e) {
    let formData = new FormData(loginForm);
    let user = formData.get("username");    
    let password = formData.get("password");
    loginForm.reset(); 
    
    if(user == VALID_USERNAME && password == VALID_PASSWORD) { 
        localStorage.setItem(USER_LOCAL_STORAGE_KEY, VALID_USERNAME);
        statusText.innerText = "Du är inloggad som: " + VALID_USERNAME;
        swapForms();
    } else { 
        loginForm.classList.add("hidden");
        invalidloginform.classList.remove("hidden");
    }

    e.preventDefault();
    return false;
}

function returnToLoginForm(e) {
    loginForm.classList.remove("hidden");
    invalidloginform.classList.add("hidden");

    e.preventDefault();
    return false;
}


