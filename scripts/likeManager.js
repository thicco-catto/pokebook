let isLoadingLike = false;

async function onLike(event){
    if(isLoadingLike){ return; }

    isLoadingLike = true;
    let htmlElement = event.target;

    if(htmlElement.tagName === "LABEL" || htmlElement.tagName === "IMG"){
        htmlElement = htmlElement.parentElement;
    }

    let classList = htmlElement.classList;
    let postId;

    for (let i = 0; i < classList.length; i++) {
        const element = classList[i];
        if(element.startsWith("likebutton-")){
            postId = parseInt(element.split("-")[1]);
        }
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const user = urlParams.get("user");

    const prevLike = await GetUserLikeForPost(postId, user);
    let likeImg = "";
    
    if(prevLike.exists){
        //Delete like
        await UnlikePost(postId, user);
        likeImg = "img/utilidades/corazonvacio.png";
    }else{
        //Add like
        await LikePost(postId, user);
        likeImg = "img/utilidades/corazonrelleno.png";
    }

    const newLikeNum = await GetLikesPerPost(postId);
    document.getElementById(`likenum-${postId}`).textContent = newLikeNum.size;
    document.getElementById(`likeimg-${postId}`).src = likeImg;

    isLoadingLike = false;
}