async function onLoad(event){
    const headerDiv = document.getElementById("header");

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const userNick = urlParams.get("user");
    const user = await GetUserByNick(userNick);

    const navbarStr = `
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #003566;">
    <div class="container-fluid">
        <a class="navbar-brand" href="inicio.html?user=${userNick}" style="color: white;"> <h1 style="font-size: 20px; padding: 10px 0 0 0;">PokeBook
            <img alt="logo" width="30" height="30" src="img/utilidades/logo.png"> </h1>
        </a>
        <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" style="color: white;">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
            <div class="d-none d-sm-none d-md-block">
                <a href="inicio.html?user=${userNick}" class="nav-link active" aria-current="page" style="color: white;">Home</a>
            </div>
            <form class="d-flex">
                <br>
                <div class="input-group">
                <br>
                    <input title="buscador de personas" type="text" class="form-control" placeholder="Buscar usuario">
                    <button type="button" class="btn btn-secondary"><i class="bi-search"></i></button>
                </div>  
            </form>

            <div class="d-block d-sm-block d-md-none">
                <br>
                <a class="btn btn-outline-light" href="inicio.html?user=${userNick}" role="button" id="dropdownMenuLink" style='width:100%;' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img alt="pagina principa" width="30" height="30" src="img/utilidades/home.png"> Home
                  </a> <br> <br>
                  <a class="btn btn-outline-light" href="Perfil.html?user=${userNick}&userProfile=${userNick}" role="button"  style='width:100%;' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img alt="mi perfil" width="30" height="30" src="img/utilidades/perfil.png"> Mi perfil
                  </a> <br> <br>
                <a class="btn btn-outline-light" href="notificaciones.html?user=${userNick}" role="button"  style='width:100%;' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img alt="notificaciones" width="30" height="30" src="img/utilidades/notificaciones.png"> Notificaciones
                  </a> <br> <br>
                <a class="btn btn-outline-light" href="ajustes.html?user=${userNick}" role="button"  style='width:100%;' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img alt="ajustes" width="30" height="30" src="img/utilidades/conf.png"> Ajustes
                </a> <br> <br>
                <a class="btn btn-warning" href="crear_post.html?user=${userNick}" role="button"  data-toggle="dropdown" style='width:100%;' aria-haspopup="true" aria-expanded="false">
                    <img alt="nuevo post" width="30" height="30" src="img/utilidades/add (2).png"> Nuevo Post
                  </a> <br> <br>
            </div>

            <div class="d-none d-sm-none d-md-block">
                <a href="Perfil.html?user=${userNick}&userProfile=${userNick}" class="nav-link active" aria-current="page" style="color: white;">Mi perfil
                    <img alt="imagen perfil" width="30" height="30" src="${user.data().picture}">
                </a>
            </div>
        </div>
    </div>
</nav>
    `;

    let navbar = parseHTML(navbarStr);
    headerDiv.appendChild(navbar);
}
addEventListener("DOMContentLoaded", onLoad);