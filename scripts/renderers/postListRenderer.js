class repostAndUser {
    constructor(id, user) {
        this.id = id;
        this.user = user;
    }
}

let isLoadingPostList = true;
let shouldStopLoading = false;
let isFinishedWithPost = false;

async function renderPosts(posts, repostIds = []) {
    const postsDiv = document.getElementById("posts");

    let deleteButtonsNum = 0;
    for (const i in posts) {
        isLoadingPostList = true;
        const post = posts[i];
        let postDiv = parseHTML(`<div class="post"></div><br>`);

        let repostUser = null
        repostIds.forEach(x => {
            if (post.id === x.id) {
                repostUser = x;
            }
        });

        let postHTML = await renderPost(post, repostUser);
        postDiv.appendChild(postHTML);
        postsDiv.appendChild(postDiv);

        if (shouldStopLoading) {
            isFinishedWithPost = true;
            return;
        }

        const likeButtons = document.getElementsByClassName("likebutton");
        const likeButton = likeButtons[i];
        likeButton.onclick = onLike;

        const repostButtons = document.getElementsByClassName("repostbutton");
        const repostButton = repostButtons[i];
        repostButton.onclick = onRepost;

        const deleteButtons = document.getElementsByClassName("deletebutton");
        if(deleteButtons.length > deleteButtonsNum){
            deleteButtons[deleteButtonsNum].onclick = onDeletePost;
            deleteButtonsNum++;
        }
    }

    isLoadingPostList = false;
}