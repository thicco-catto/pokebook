async function onLoad(event){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const postId = urlParams.get("post");
    const post = await GetPostById(postId);

    const opNick = document.getElementById("op-nick");
    opNick.textContent = post.data().op;

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
}
addEventListener("DOMContentLoaded", onLoad);