async function SubmitRegister(event) {
    event.preventDefault();

    const nick = document.getElementById("Nick").value;
    const email = document.getElementById("Email").value;
    const password = document.getElementById("Password").value;
    const password2 = document.getElementById("PasswordConfirm").value;
    const dob = document.getElementById("Birthday").value;

    if (password !== password2) {
        //TODO: Error non repeated passwords
        console.log("repeated passwords");
    } else {
        const existsNick = await CheckNickExists(nick);
        if (existsNick) {
            //TODO: Error nickname exists
            console.log("The nickname is repeated")
        } else {
            const nextId = await GetNextUserId();
            await AddUser(nextId, nick, password, email, dob);
            //TODO: Redirect to main page
            window.location.href = `inicio.html?userid=${user.data().nextId}`
        }
    }
}

const form = document.getElementById("register-form");

form.addEventListener("submit", SubmitRegister);