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

    if(postArray.length === 0){
        const testPost = parseHTML(`
        <div class="card gedf-card" style="margin: 15px;">
        <div class="new-card-header" style="background-color: #003566;">
            <div class="d-flex justify-content-between align-items-center" >
                <div class="d-flex justify-content-between align-items-center" >
                    <div class="mr-2">
                        <img src="img/utilidades/logo.png" alt="imagen de perfil" class="img-fluid" style="width: 45px;height: 45px; border-radius: 10px;">
                    </div>
                    <div class="ml-2">
                        <div style="color: white;" class="h5 m-0">Pokebook</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body" style="background-color: #003566;">
            <div class="card-link"  style="text-decoration:none;">
                <h5 style="text-align: center;" class="card-title">Bienvenidx a Pokebook</h5>
                <div style="text-align: justify;" class="container">
                <p>¿Todo vacío? Tranquilo, es porque aún no sigues a nadie... Prueba a seguir a alguien e irás viendo aparecer posts en esta página (home). </p>
                <p>Aprovechamos para recordarte que puedes interactuar dando likes, comentando y haciendo repost.</p>
                <p>Y... lo más importante, ¡prueba a publicar tus equipos pokemon! Recuerda que Ibai no nació siendo influencer así que no te frustres si tus primeros equipos no tienen muchos likes </p>
                <p>Suerte en tu nueva aventura pokemon :D</p>
                </div>
            </div>
        </div>
    </div>
        `);

        document.getElementById("posts").appendChild(testPost);
    }else{
        postArray.sort((a, b) => b.data().postDate - a.data().postDate);

        renderPosts(postArray, repostIds);
    }
}
addEventListener("DOMContentLoaded", onLoad);