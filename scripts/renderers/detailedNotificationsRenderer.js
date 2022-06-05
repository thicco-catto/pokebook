let isDeletingPost = false
async function deleteNotif(event){
    if(isDeletingPost){ return; }

    isDeletingPost = true;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const selfUserNick = urlParams.get("user");

    const notificationId = event.target.id.split("-")[1];

    await DeleteNotification(selfUserNick, notificationId);

    window.location.href = `notificaciones.html?user=${selfUserNick}`;
}

async function onLoad(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const selfUserNick = urlParams.get("user");

    const notifications = await GetNotificationsByUser(selfUserNick);

    const notificationsTable = document.getElementById("notifications-table");

    for (let i = 0; i < notifications.size || i < 5; i++) {
        const notification = notifications.docs[i];
        if(notification === undefined){ continue; }

        let notificationUser = await GetUserByNick(notification.data().user);

        let newRow = notificationsTable.insertRow();

        let imgCell = newRow.insertCell();
        let imgHTML = parseHTML(`
        <div class="mr-2">
            <img class="rounded-circle" style="width: 45px;height: 45px; border-radius: 10px;" src="${notificationUser.data().picture}" alt="">
        </div>
        `);
        imgCell.appendChild(imgHTML);

        let nickCell = newRow.insertCell();
        let nickLink = document.createElement("a");
        nickLink.href = `Perfil.html?user=${selfUserNick}&profileUser=${notification.data().user}`
        nickLink.role = `button`;
        nickLink.textContent = `@${notification.data().user}`
        nickCell.appendChild(nickLink);

        let descriptionCell = newRow.insertCell();
        let descriptionLink = document.createElement("a");
        descriptionLink.href = `postgrande.html?user=${selfUserNick}&post=${notification.data().post}`
        if(notification.data().type === "like"){
            descriptionLink.textContent = "ha dado like a tu post";
        }else if(notification.data().type === "repost"){
            descriptionLink.textContent = "ha dado repost a tu post";
        }else if(notification.data().type === "comment"){
            descriptionLink.textContent = "ha comentado en tu post";
        }else if(notification.data().type === "follow"){
            descriptionLink.textContent = "te ha empezado a seguir";
            descriptionLink.href = `Perfil.html?user=${selfUserNick}&userProfile=${notification.data().user}`;
        }else{
            descriptionLink.textContent = `ERROR: ${notification.type}`
        }
        descriptionCell.appendChild(descriptionLink);

        let deleteButtonCell = newRow.insertCell();
        let deleteButton = parseHTML(`
        <button id="deletebutton-${notification.id}" type="button" class="btn btn-outline-light btn-sm">X</button>
        `);
        deleteButton.onclick = deleteNotif;
        deleteButtonCell.appendChild(deleteButton);
    }
}
addEventListener("DOMContentLoaded", onLoad);