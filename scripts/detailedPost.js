async function onLoad(event){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const user = urlParams.get("user");

    const postId = urlParams.get("post");
    const post = await GetPostById(postId);

    const opUser = await GetUserByNick(post.data().op);
    document.getElementById("op-profile-picture").src = opUser.data().picture;

    const opProfileLink = document.getElementById("profile-link");
    opProfileLink.href = `Perfil.html?user=${user}&userProfile=${post.data().op}`;

    const opNick = document.getElementById("op-nick");
    opNick.textContent = "@" + post.data().op;

    const title = document.getElementById("post-title");
    title.textContent = post.data().title;

    const description = document.getElementById("post-description");
    description.textContent = post.data().description;

    const pokemonTeamDiv = document.getElementById("pokemon-team");
    for (let i = 0; i < post.data().pokemon.length; i++) {
        const pokemonId = post.data().pokemon[i];
        const pokemon = await P.getPokemonByName(pokemonId);
        let pokemonStr = `
        <div class="col-6 col-md-4">
            <img alt="${pokemon.name}" class="rounded mx-auto d-block" width="80" height="80" src="${pokemon.sprites.front_default}">
        </div>
        `;
        let pokemonHTML = parseHTML(pokemonStr);
        pokemonTeamDiv.appendChild(pokemonHTML);
    }

    const likeButton = document.getElementById("nmegustas");
    likeButton.classList.add(`likebutton-${post.id}`);
    likeButton.onclick = onLike
    const likesImg = likeButton.children[0];
    likesImg.id = `likeimg-${post.id}`;
    const prevLike = await GetUserLikeForPost(post.id, user);
    if(prevLike.exists){
        likesImg.src = "img/utilidades/corazonrelleno.png";
    }else{
        likesImg.src = "img/utilidades/corazonvacio.png";
    }
    const likesMsg = likeButton.children[1];
    likesMsg.id = `likenum-${post.id}`;
    const postLikes = await GetLikesPerPost(post.id);
    const numLikes = postLikes.size;
    likesMsg.textContent = numLikes;

    document.getElementById("ncomments").href = `crearcomentario.html?user=${user}&post=${postId}`;
    const comments = await GetCommentsPerPost(post.id);
    document.getElementById("comments-number").textContent = comments.size;
    const commentsImg = document.getElementById("comments-img");
    const prevComment = await GetUserCommentForPost(post.id, user);
    if(prevComment.size > 0){
        commentsImg.src = "img/utilidades/comentariorelleno.png";
    }else{
        commentsImg.src = "img/utilidades/comentariovacio.png";
    }

    const repostButton = document.getElementById("nreposts");
    repostButton.classList.add(`repostbutton-${post.id}`);
    repostButton.onclick = onRepost
    const repostsImg = repostButton.children[0];
    repostsImg.id = `repostimg-${post.id}`;
    const prevRepost = await GetUserRepostForPost(post.id, user);
    if(prevRepost.exists){
        repostsImg.src = "img/utilidades/retweetrelleno.png";
    }else{
        repostsImg.src = "img/utilidades/retweetvacio.png";
    }
    const repostsMsg = repostButton.children[1];
    repostsMsg.id = `repostnum-${post.id}`;
    const postReposts = await GetRepostsPerPost(post.id);
    const numReposts = postReposts.size;
    repostsMsg.textContent = numReposts;

    if(post.data().op === user){
        const deleteButtonHTML = parseHTML(`
        <button id="deletebutton-${post.id}" class="btn btn-link deletebutton"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-trash3" viewBox="0 0 16 16">
        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
    </svg></button>
        `);

        deleteButtonHTML.onclick = onDeletePost

        document.getElementById("deletebutton-container").appendChild(deleteButtonHTML);
    }
}
addEventListener("DOMContentLoaded", onLoad);