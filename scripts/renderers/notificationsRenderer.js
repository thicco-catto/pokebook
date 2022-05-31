async function onLoad(event){
    const notificationsDiv = document.getElementById("notifications");

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const selfUserNick = urlParams.get("user");

    notificationsDiv.appendChild(parseHTML(`
    <a href="notificaciones.html?user=${selfUserNick}"><h5 class="card-title">NOTIFICACIONES</h5></a>
    `));

    const notifications = await GetNotificationsByUser(selfUserNick);

    for (let i = 0; i < notifications.size || i < 5; i++) {
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