async function onLoad(event){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const selfUser = urlParams.get("user");
    document.getElementById("new-post-mini").href = `crear_post.html?user=${selfUser}`

    const postArray = [];
    const repostIds = [];

    let userPosts = await GetPostsByUser(selfUser);
    userPosts.forEach(post => {
        postArray.push(post);
    });

    const followedUsers = await GetUserFollowed(selfUser);
    for (let i = 0; i < followedUsers.size; i++) {
        const user = followedUsers.docs[i];
        const posts = await GetPostsByUser(user.id);

        posts.forEach(post => {
            postArray.push(post);
        });
    }

    for (let i = 0; i < followedUsers.size; i++) {
        const user = followedUsers.docs[i];
        const repostPosts = await GetRepostsPerUser(user.id);

        for (let o = 0; o < repostPosts.size; o++) {
            const repostPostId = repostPosts.docs[o];

            let isIncluded = false;
            postArray.forEach(x => {
                if(x.id === repostPostId.id){
                    isIncluded = true;
                }
            });
    
            if(isIncluded){ continue; }
    
            const post = await GetPostById(repostPostId.id);
            repostIds.push(new repostAndUser(repostPostId.id, user.id));
            postArray.push(post);
        }
    }

    postArray.sort((a, b) => b.data().postDate - a.data().postDate);

    renderPosts(postArray, repostIds);
}
addEventListener("DOMContentLoaded", onLoad);