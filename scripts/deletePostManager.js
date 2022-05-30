async function onDeletePost(event){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const userNick = urlParams.get("user");

    let deleteButton = event.target;
    if(deleteButton.tagName === "path"){
        deleteButton = deleteButton.parentElement;
    }
    if(deleteButton.tagName === "svg"){
        deleteButton = deleteButton.parentElement;
    }

    let postId = parseInt(deleteButton.id.split("-")[1]);

    const notifications = await GetNotificationsByPost(userNick, postId);
    console.log(notifications);

    for (let i = 0; i < notifications.size; i++) {
        const notification = notifications.docs[i];
        if(notification === undefined){ continue; }

        await DeleteNotification(userNick, notification.id);
    }

    const likes = await GetLikesPerPost(postId); 

    for (let i = 0; i < likes.size; i++) {
        const like = likes.docs[i];      
        if(like === undefined){ continue; }
        await UnlikePost(postId, like.id);
    }

    const reposts = await GetRepostsPerPost(postId);

    for (let i = 0; i < reposts.size; i++) {
        const repost = reposts.docs[i];
        if(repost === undefined){ continue; }

        await UnrepostPost(postId, repost.id);
    }

    await DeletePost(postId);

    window.location.href = `inicio.html?user=${userNick}`;
}