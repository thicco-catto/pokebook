async function onLoad(event){
    const notificationsDiv = document.getElementById("notifications");

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const selfUserNick = urlParams.get("user");

    notificationsDiv.appendChild(parseHTML(`
    <a href="notificaciones.html?user=${selfUserNick}"><h5 class="card-title">NOTIFICACIONES</h5></a>
    `));

    const notifications = await GetNotificationsByUser(selfUserNick);

    for (let i = 0; i < notifications.size || i < 10; i++) {
        const notification = notifications.docs[i];
        if(notification === undefined){ continue; }

        let msg = "";

        if(notification.data().type === "like"){
            msg = "ha dado like a tu post";
        }else if(notification.data().type === "repost"){
            msg = "ha dado repost a tu post";
        }else if(notification.data().type === "comment"){
            msg = "ha comentado en tu post";
        }

        let notificationHTML = parseHTML(`
        <p class="card-text"><a href="Perfil.html?user=${selfUserNick}&userProfile=${notification.data().user}" role="button">@${notification.data().user}</a> <a href="postgrande.html?user=${selfUserNick}&post=${notification.data().post}">${msg}</a></p>
        `);

        notificationsDiv.appendChild(notificationHTML);
    }
}
addEventListener("DOMContentLoaded", onLoad);