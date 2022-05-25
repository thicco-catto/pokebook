async function onLoad(event){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const user = urlParams.get("user");

    const posts = await GetPostsByUser(user);

    let postArray = [];
    console.log(posts.size);
    posts.forEach(post => {
        console.log(post);
        postArray.push(post);
    });

    renderPosts(postArray)
}
addEventListener("DOMContentLoaded", onLoad);