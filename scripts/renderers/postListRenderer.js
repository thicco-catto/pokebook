async function onLoad(event){
    const posts = await GetPosts();

    const postsDiv = document.getElementById("posts");
    let postArray = [];
    posts.forEach(post => {
        postArray.push(post);
    });

    for(const i in postArray){
        const post = postArray[i];
        let postDiv = parseHTML(`<div class="post"></div><br>`);
        let postHTML = await renderPost(post);
        postDiv.appendChild(postHTML);
        postsDiv.appendChild(postDiv);
    }
}

addEventListener("DOMContentLoaded", onLoad)