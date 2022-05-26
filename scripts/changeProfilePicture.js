let hasUpdatedPicture = false

function OnUpdatePreview(event){
    hasUpdatedPicture = true;
    document.getElementById("picture-preview").src = document.getElementById("fotoperfil").value;
}
document.getElementById("send-picture").onclick = OnUpdatePreview;

async function OnSubmitPicture(event){
    event.preventDefault();
    if(!hasUpdatedPicture){ return; }
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const user = urlParams.get("user");
    await ChangeProfilePicture(user, document.getElementById("fotoperfil").value);
    window.location.href = `Perfil.html?user=${user}&userProfile=${user}`
}
document.getElementById("update-profile-picture").onsubmit = OnSubmitPicture;