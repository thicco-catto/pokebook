async function onLoad(event){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const postId = urlParams.get("post");
    const post = await GetPostById(postId);

    document.getElementById("post-op-nick").textContent = `En respuesta a @${post.data().op}:`
}
addEventListener("DOMContentLoaded", onLoad);

async function onSubmit(event){
    event.preventDefault();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const post = urlParams.get("post");
    const user = urlParams.get("user");
    const commentText = document.getElementById("comment-text").value;

    await AddCommentToPost(post, user, commentText);

    window.location.href = `postgrande.html?user=${user}&post=${post}`;
}

const form = document.getElementById("comment-form");
form.addEventListener("submit", onSubmit);