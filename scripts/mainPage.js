async function onLoad(event){
    const posts = await GetPosts();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const user = urlParams.get("user");
    document.getElementById("new-post-mini").href = `crear_post.html?user=${user}`

    let postArray = [];
    posts.forEach(post => {
        postArray.push(post);
    });

    await renderPosts(postArray);
}
addEventListener("DOMContentLoaded", onLoad);