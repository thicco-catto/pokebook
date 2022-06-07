async function onLoad(event){
    const notificationsDiv = document.getElementById("notifications");

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const selfUserNick = urlParams.get("user");

    notificationsDiv.appendChild(parseHTML(`
    <a class="btn btn-outline-light " href="notificaciones.html?user=${selfUserNick}" role="button" id="dropdownMenuLink1" style='width:100%;' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
    </svg> Notificaciones </a>
    `));

    const notifications = await GetNotificationsByUser(selfUserNick);

    for (let i = 0; i < notifications.size && i < 5; i++) {
        const notification = notifications.docs[i];
        if(notification === undefined){ continue; }

        let msg = "";
        let link = `postgrande.html?user=${selfUserNick}&post=${notification.data().post}`

        if(notification.data().type === "like"){
            msg = "ha dado like a tu post";
        }else if(notification.data().type === "repost"){
            msg = "ha dado repost a tu post";
        }else if(notification.data().type === "comment"){
            msg = "ha comentado en tu post";
        }else if(notification.data().type === "follow"){
            msg = "te ha empezado a seguir";
            link = `Perfil.html?user=${selfUserNick}&userProfile=${notification.data().user}`;
        }else{
            msg = `ERROR = ${notification.data().type}`
        }

        let notificationHTML = parseHTML(`
        <p class="card-text"><a href="Perfil.html?user=${selfUserNick}&userProfile=${notification.data().user}" role="button">@${notification.data().user}</a> <a href="${link}">${msg}</a></p>
        `);

        notificationsDiv.appendChild(notificationHTML);
    }
}
addEventListener("DOMContentLoaded", onLoad);