async function onLoad(event){
    const posts = await GetPosts();

    let postArray = [];
    console.log(posts.size);
    posts.forEach(post => {
        postArray.push(post);
    });

    renderPosts(postArray)
}
addEventListener("DOMContentLoaded", onLoad);