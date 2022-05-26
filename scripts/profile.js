async function onLoad(event){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const selfUserNick = urlParams.get("user");
    const userNick = urlParams.get("userProfile");

    const user = await GetUserByNick(userNick);

    document.getElementById("profile-pic").src = user.data().picture;

    const nickText = document.getElementById("user-nick");
    nickText.textContent = user.id;

    const emailText = document.getElementById("user-email");
    emailText.textContent = user.data().email;

    const followButton = document.getElementById("follow-button");
    if(selfUserNick === userNick){
        followButton.textContent = "Editar";
        followButton.onclick = () => window.location.href = `ajustes.html?user=${selfUserNick}\#profilepic`;
    }else{
        const isUserFollowed = await GetUserFollowsUser(selfUserNick, userNick);
        if(isUserFollowed.exists){
            followButton.textContent = "Dejar de seguir";
        }else{
            followButton.textContent = "Seguir";
        }
        followButton.onclick = OnFollow;
    }

    const followers = await GetUserFollowers(userNick);
    const followed = await GetUserFollowed(userNick);
    document.getElementById("followers-num").textContent = followers.size;
    document.getElementById("followed-num").textContent = followed.size;

    const posts = await GetPostsByUser(userNick);

    let postArray = [];
    posts.forEach(post => {
        postArray.push(post);
    });

    renderPosts(postArray)
}
addEventListener("DOMContentLoaded", onLoad);