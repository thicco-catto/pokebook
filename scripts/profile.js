let isLikePosts = false;

async function RenderNormalPosts(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const userNick = urlParams.get("userProfile");

    isLoadingPostList = true;
    shouldStopLoading = false;
    isFinishedWithPost = false;

    isLikePosts = false;

    document.getElementById("posts").innerHTML = "";
    document.getElementById("posts-button").classList.remove("btn-outline-light");
    document.getElementById("likes-button").classList.add("btn-outline-light");

    const posts = await GetPostsByUser(userNick);

    let postArray = [];
    posts.forEach(post => {
        postArray.push(post);
    });

    postArray.sort((a, b) => b.data().postDate - a.data().postDate);

    renderPosts(postArray);
}

async function onNormalPosts(event){
    if(!isLikePosts){ return; }

    if(isLoadingPostList){
        shouldStopLoading = true;

        if(!isFinishedWithPost){
            window.setTimeout(onLikePosts, 100);
        }else{
            RenderNormalPosts();
        }
    }else{
        RenderNormalPosts();
    }
}

async function RenderLikePosts(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const userNick = urlParams.get("userProfile");

    isLoadingPostList = true;
    shouldStopLoading = false;
    isFinishedWithPost = false;

    isLikePosts = true;

    document.getElementById("posts").innerHTML = "";
    document.getElementById("posts-button").classList.add("btn-outline-light");
    document.getElementById("likes-button").classList.remove("btn-outline-light");

    const postIds = await GetLikedPostsByUser(userNick);
    let postIdArray = [];

    postIds.forEach(post => {
        postIdArray.push(post);
    });

    let postArray = [];
    for (let i = 0; i < postIdArray.length; i++) {
        const postId = postIdArray[i];
        const post = await GetPostById(postId.id);
        postArray.push(post);
    }

    let repostIds = [];
    let reposts = await GetRepostsPerUser(userNick);
    for (let i = 0; i < reposts.size; i++) {
        const repostPostId = reposts.docs[i];

        let isIncluded = false;
        postArray.forEach(x => {
            if(x.id === repostPostId.id){
                isIncluded = true;
            }
        });

        if(isIncluded){ continue; }

        const post = await GetPostById(repostPostId.id);
        repostIds.push(new repostAndUser(repostPostId.id, userNick));
        postArray.push(post);
    }

    postArray.sort((a, b) => b.data().postDate - a.data().postDate);

    renderPosts(postArray, repostIds);
}

async function onLikePosts(event){
    if(isLikePosts){ return; }

    if(isLoadingPostList){
        shouldStopLoading = true;

        if(!isFinishedWithPost){
            window.setTimeout(onLikePosts, 100);
        }else{
            RenderLikePosts();
        }
    }else{
        RenderLikePosts();
    }
}

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
            followButton.classList.add("btn-danger");
        }else{
            followButton.textContent = "Seguir";
            followButton.classList.add("btn-primary");
        }
        followButton.onclick = OnFollow;
    }

    const followers = await GetUserFollowers(userNick);
    const followed = await GetUserFollowed(userNick);
    document.getElementById("followers-num").textContent = followers.size;
    document.getElementById("followed-num").textContent = followed.size;

    document.getElementById("posts-button").onclick = onNormalPosts;
    document.getElementById("likes-button").onclick = onLikePosts;

    const posts = await GetPostsByUser(userNick);

    let postArray = [];
    posts.forEach(post => {
        postArray.push(post);
    });

    let repostIds = [];
    let reposts = await GetRepostsPerUser(userNick);
    for (let i = 0; i < reposts.size; i++) {
        const repostPostId = reposts.docs[i];

        let isIncluded = false;
        postArray.forEach(x => {
            if(x.id === repostPostId.id){
                isIncluded = true;
            }
        });

        if(isIncluded){ continue; }

        const post = await GetPostById(repostPostId.id);
        repostIds.push(new repostAndUser(repostPostId.id, userNick));
        postArray.push(post);
    }

    postArray.sort((a, b) => b.data().postDate - a.data().postDate);

    renderPosts(postArray, repostIds);
}
addEventListener("DOMContentLoaded", onLoad);