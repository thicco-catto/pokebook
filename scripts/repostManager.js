let isLoadingRepost = false;

async function onRepost(event){
    if(isLoadingRepost){ return; }

    isLoadingRepost = true;
    let htmlElement = event.target;

    if(htmlElement.tagName === "LABEL" || htmlElement.tagName === "IMG"){
        htmlElement = htmlElement.parentElement;
    }

    let classList = htmlElement.classList;
    let postId;

    for (let i = 0; i < classList.length; i++) {
        const element = classList[i];
        if(element.startsWith("repostbutton-")){
            postId = parseInt(element.split("-")[1]);
        }
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const user = urlParams.get("user");

    const prevLike = await GetUserRepostForPost(postId, user);
    let repostImg = "";

    if(prevLike.exists){
        //Delete repost
        await UnrepostPost(postId, user);
        repostImg = "img/utilidades/retweetvacio.png";
    }else{
        //Add repost
        await RepostPost(postId, user);
        repostImg = "img/utilidades/retweetrelleno.png";
    }

    const newLikeNum = await GetRepostsPerPost(postId);
    document.getElementById(`repostnum-${postId}`).textContent = newLikeNum.size;
    document.getElementById(`repostimg-${postId}`).src = repostImg;

    isLoadingRepost = false;
}