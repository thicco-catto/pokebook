async function SubmitLogin(event){
    event.preventDefault();

    const nick = document.getElementById("Nick").value;
    const password = document.getElementById("Password").value;
    console.log("login");

    const user = await CheckUserPass(nick, password);
    if(user == null){
        //TODO: Error wrong pass
        console.log("Wrong password");
    }else{
        //TODO: Redirect
        console.log(`logged in as ${user.data().nick}`)
        window.location.href = `inicio.html?userid=${user.data().userID}`
    }
}

const form = document.getElementById("login-form");

form.addEventListener("submit", SubmitLogin);