async function renderPost(post) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const user = urlParams.get("user");

    let pokemonImgs = "";

    for(const poke in post.data().pokemon){
        const pokeId = post.data().pokemon[poke];
        const pokemonFromDB = await P.getPokemonByName(pokeId);
        pokemonImgs += `<div class="col"><img alt="Brand" width="100" height="100" src="${pokemonFromDB.sprites.front_default}"></div>\n`;
    }

    let html = `
	<div class="card gedf-card">
    <div class="new-card-header" style="background-color: #003566;">
        <div class="d-flex justify-content-between align-items-center" >
            <div class="d-flex justify-content-between align-items-center" >
                <div class="mr-2">
                    <img class="rounded-circle" width="45" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="imagen de perfil">
                </div>
                <div class="ml-2">
                <a href="Perfil.html?user=${user}&userProfile=${post.data().op}">
                    <div style="color: white;" class="h5 m-0">@${post.data().op}</div>
                    </a>
                </div>
            </div>
            <div>
                <div class="dropdown">
                    <button class="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color: white;">
                        <i class="fa fa-ellipsis-h"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                        <div class="h6 dropdown-header">Configuration</div>
                        <a class="dropdown-item" href="#">Eliminar post</a>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class="card-body" style="background-color: #003566;">
        <a class="card-link" href="postgrande.html?user=${user}&post=${post.id}">  <!-- link a comentario -->
            <h5 class="card-title">${post.data().title}</h5>
        </a>


        <div class="container">
            <div class="row row-cols-3">
                ${pokemonImgs}
            </div>
        </div>
    </div>
    <div class="card-footer"  style="background-color: #003566;">
        <a title="numero de me gustas" href="#" class="card-link">
            <i title="numero de me gustas" class="fa fa-gittip"> 
                <label>XX</label><!---NUMERO->
            </i>
        </a>
        <a title="numero de comentarios" href="crearcomentario.html" class="card-link">
            <i title="numero de comentarios" class="fa fa-comment"> 
                <label>XX</label>
            </i>
        </a>
        <a title="numero de reposts" href="#" class="card-link">
            <i title="numero de repost"class="fa fa-mail-forward"> 
                <label>XX</label>
            </i>
        </a>
    </div>
</div>
	`;
    let postHTML = parseHTML(html);
    return postHTML
}