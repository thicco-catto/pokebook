async function renderPosts(posts){
    const postsDiv = document.getElementById("posts");

    for(const i in posts){
        const post = posts[i];
        let postDiv = parseHTML(`<div class="post"></div><br><br>`);
        let postHTML = await renderPost(post);
        postDiv.appendChild(postHTML);
        postsDiv.appendChild(postDiv);
    }
}