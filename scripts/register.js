async function SubmitRegister(event) {
    event.preventDefault();

    const nick = document.getElementById("Nick").value;
    const email = document.getElementById("Email").value;
    const password = document.getElementById("Password").value;
    const password2 = document.getElementById("PasswordConfirm").value;
    const dob = document.getElementById("Birthday").value;

    if (password !== password2) {
        //TODO: Error non repeated passwords
        console.log("Passwords must match passwords");
        return;
    }

    const user = await GetUserByNick(nick);
    if (user.exists) {
        //TODO: Error nickname exists
        console.log("The nickname is repeated");
        return;
    }

    await AddUser(nick, password, email, dob);
    window.location.href = `inicio.html?user=${nick}`;
}

const form = document.getElementById("register-form");
form.addEventListener("submit", SubmitRegister);