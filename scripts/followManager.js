let isLoadingFollow = false;

async function OnFollow(event){
    if(isLoadingFollow){ return; }
    isLoadingFollow = true;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const selfUserNick = urlParams.get("user");
    const userNick = urlParams.get("userProfile");

    const followButton = document.getElementById("follow-button");
    const isUserFollowed = await GetUserFollowsUser(selfUserNick, userNick);

    if(isUserFollowed.exists){
        await UnfollowUser(selfUserNick, userNick);
        followButton.textContent = "Seguir";
        followButton.classList.add("btn-primary");
        followButton.classList.remove("btn-danger");
    }else{
        await FollowUser(selfUserNick, userNick);
        followButton.textContent = "Dejar de seguir";
        followButton.classList.remove("btn-primary");
        followButton.classList.add("btn-danger");
    }
    
    const followers = await GetUserFollowers(userNick);
    const followed = await GetUserFollowed(userNick);

    document.getElementById("followers-num").textContent = followers.size;
    document.getElementById("followed-num").textContent = followed.size;

    isLoadingFollow = false;
}