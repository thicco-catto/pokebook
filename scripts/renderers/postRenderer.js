async function renderPost(post, repostUser) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const userNick = urlParams.get("user");

    const postOp = await GetUserByNick(post.data().op);

    let pokemonImgs = "";

    for(const poke in post.data().pokemon){
        const pokeId = post.data().pokemon[poke];
        const pokemonFromDB = await P.getPokemonByName(pokeId);
        pokemonImgs += `<div class="col"><img alt="Brand" width="100" height="100" src="${pokemonFromDB.sprites.front_default}"></div>\n`;
    }

    const postLikes = await GetLikesPerPost(post.id);
    const numLikes = postLikes.size;
    let likeImg = "vacio";
    const prevLike = await GetUserLikeForPost(post.id, userNick);
    if(prevLike.exists){
        likeImg = "relleno";
    }

    const postComments = await GetCommentsPerPost(post.id);
    const numComments = postComments.size;
    let commentImg = "vacio";
    const prevComment = await GetUserCommentForPost(post.id, userNick);
    if(prevComment.size > 0){
        commentImg = "relleno";
    }

    const postReposts = await GetRepostsPerPost(post.id);
    const numReposts = postReposts.size;
    let repostImg = "vacio";
    const prevRepost = await GetUserRepostForPost(post.id, userNick);
    if(prevRepost.exists){
        repostImg = "relleno";
    }

    let repost = "";
    if(repostUser !== null){
        repost = `
        <div class="new-card-header small" style="background-color: #003566;">
        <a href=Perfil.html?user=${userNick}&userProfile=${repostUser.user}>
            <p title="Reposteado por Username" style="color:lightgray;">Reposteado por ${repostUser.user}</p>
        </a>
        </div>
        `;
    }

    let deleteButton = ""
    if(userNick === post.data().op){
        deleteButton = `
        <button id="deletebutton-${post.id}" class="btn btn-link deletebutton"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-trash3" viewBox="0 0 16 16">
        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
        </svg></button>
        `;
    }

    let html = `
	<div class="card gedf-card" style="margin: 15px;">
    <div class="new-card-header" style="background-color: #003566;">
    ${repost}
        <div class="d-flex justify-content-between align-items-center" >
            <div class="d-flex justify-content-between align-items-center" >
                <div class="mr-2">
                    <img src="${postOp.data().picture}" alt="imagen de perfil" class="img-fluid" style="width: 45px;height: 45px; border-radius: 10px;">
                </div>
                <div class="ml-2">
                <a href="Perfil.html?user=${userNick}&userProfile=${post.data().op}">
                    <div style="color: white;" class="h5 m-0">@${post.data().op}</div>
                    </a>
                </div>
            </div>
            <div>
            ${deleteButton}
            
            </div>
        </div>

    </div>
    <div class="card-body" style="background-color: #003566;">
        <a class="card-link"  style="text-decoration:none" href="postgrande.html?user=${userNick}&post=${post.id}">  <!-- link a comentario -->
            <h5 class="card-title">${post.data().title}</h5>
        


        <div class="container">
            <div class="row row-cols-3">
                ${pokemonImgs}
            </div>
        </div>
        </a>
    </div>
    <div class="card-footer"  style="background-color: #003566;">
        <a title="Me gustas" id="nmegustas" style="text-decoration:none" class="card-link likebutton likebutton-${post.id}">
            <img id="likeimg-${post.id}" alt="nmegustas" width="15" height="15" src="img/utilidades/corazon${likeImg}.png">
            <label id="likenum-${post.id}" for="nmegustas">${numLikes}</label>
        </a>
        <a title="Comentarios" style="text-decoration:none"  href="crearcomentario.html?user=${userNick}&post=${post.id}" id="ncoments" class="card-link">
            
            <img id="ncoments" alt="ncomentarios" width="15" height="15" src="img/utilidades/comentario${commentImg}.png">
            <label for="ncoments">${numComments}</label>
            
        </a>
        <a title="Reposts" id="nreposts" style="text-decoration:none" class="card-link repostbutton repostbutton-${post.id}">
            <img id="repostimg-${post.id}" alt="nrepost" width="17" height="17" src="img/utilidades/retweet${repostImg}.png">
            <label id="repostnum-${post.id}" for="nreposts">${numReposts}</label>
            </i>
        </a>
    </div>
</div>
	`;
    let postHTML = parseHTML(html);
    return postHTML
}