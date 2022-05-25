async function onLoad(event){
    const posts = await GetPosts();

    let postArray = [];
    posts.forEach(post => {
        postArray.push(post);
    });

    await renderPosts(postArray);
}
addEventListener("DOMContentLoaded", onLoad);