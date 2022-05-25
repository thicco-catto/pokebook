async function SubmitRegister(event) {
    event.preventDefault();

    const nick = document.getElementById("Nick").value;
    const email = document.getElementById("Email").value;
    const password = document.getElementById("Password").value;
    const password2 = document.getElementById("PasswordConfirm").value;
    const dob = document.getElementById("Birthday").value;

    let nickMsg = document.getElementById("nick-error");
    let emailMsg = document.getElementById("email-error");
    let passwordMsg = document.getElementById("password-error");
    let repeatedPasswordMsg = document.getElementById("password-repeat-error");
    let tosMsg = document.getElementById("tos-error");

    nickMsg.style.visibility = "hidden";
    emailMsg.style.visibility = "hidden";
    passwordMsg.style.visibility = "hidden";
    repeatedPasswordMsg.style.visibility = "hidden";
    tosMsg.style.visibility = "hidden";

    let error = false;

    const user = await GetUserByNick(nick);
    if (user.exists) {
        nickMsg.style.visibility = "visible";
        error = true;
    }

    if (password !== password2) {
        repeatedPasswordMsg.style.visibility = "visible";
        error = true;
    }

    if (!error) {
        await AddUser(nick, password, email, dob);
        window.location.href = `inicio.html?user=${nick}`;
    }
}

const form = document.getElementById("register-form");
form.addEventListener("submit", SubmitRegister);