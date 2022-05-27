let isLoadingPostList = true;
let shouldStopLoading = false;
let isFinishedWithPost = false;

async function renderPosts(posts){
    const postsDiv = document.getElementById("posts");

    for(const i in posts){
        isLoadingPostList = true;
        const post = posts[i];
        let postDiv = parseHTML(`<div class="post"></div><br><br>`);
        let postHTML = await renderPost(post);
        postDiv.appendChild(postHTML);
        postsDiv.appendChild(postDiv);

        if(shouldStopLoading){
            isFinishedWithPost = true;
            return;
        }

        const likeButtons = document.getElementsByClassName("likebutton");
        const likeButton = likeButtons[i];
        likeButton.onclick = onLike;

        const repostButtons = document.getElementsByClassName("repostbutton");
        const repostButton = repostButtons[i];
        repostButton.onclick = onRepost;
    }

    isLoadingPostList = false;
}