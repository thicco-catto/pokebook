async function SubmitLogin(event){
    event.preventDefault();

    const nick = document.getElementById("Nick").value;
    const password = document.getElementById("Password").value;

    const user = await GetUserByNick(nick);

    if(!user.exists){
        //TODO: Error wrong username
        console.log("Username doesnt exist")
        return;
    }

    if(user.data().password !== password){
        //TODO: Error wrong pass
        console.log("Wrong password");
        return;
    }

    console.log(`logged in as ${user.id}`)
    window.location.href = `inicio.html?user=${user.id}`
}

const form = document.getElementById("login-form");
form.addEventListener("submit", SubmitLogin);