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
}
addEventListener("DOMContentLoaded", onLoad);