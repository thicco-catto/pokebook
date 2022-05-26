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
    }

    isLoadingPostList = false;

    const likebuttons = document.getElementsByClassName("likebutton");

    for (let i = 0; i < likebuttons.length; i++) {
        const button = likebuttons[i];
        button.onclick = onLike;
    }

    const repostbuttons = document.getElementsByClassName("repostbutton");

    for (let i = 0; i < repostbuttons.length; i++) {
        const button = repostbuttons[i];
        button.onclick = onRepost;
    }
}