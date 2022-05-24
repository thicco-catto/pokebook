function onLoad(event){
    const headerDiv = document.getElementById("header");

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const user = urlParams.get("user");

    const navbarStr = `
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #003566;">
    <div class="container-fluid">
        <a class="navbar-brand" href="inicio.html?user=${user}" style="color: white;"> PokeBook
            <img alt="Brand" width="30" height="30" src="img/utilidades/logo.png">
        </a>
        <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" style="color: white;">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
            <div class="d-none d-sm-none d-md-block">
                <a href="inicio.html?user=${user}" class="nav-link active" aria-current="page" style="color: white;">Home</a>
            </div>
            <form class="d-flex">
                <br>
                <div class="input-group">
                    <br>
                    <input type="text" class="form-control" placeholder="Buscar usuario">
                    <button type="button" class="btn btn-secondary"><i class="bi-search"></i></button>
                </div> 
            </form>

            <div class="d-block d-sm-block d-md-none">
                <br>
                <a class="btn btn-outline-light" href="inicio.html?user=${user}" role="button" id="dropdownMenuLink" style='width:100%;' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img alt="Brand" width="30" height="30" src="img/utilidades/home.png"> Home
                  </a> <br> <br>
                  <a class="btn btn-outline-light" href="Perfil.html?user=${user}" role="button" id="dropdownMenuLink" style='width:100%;' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img alt="Brand" width="30" height="30" src="img/utilidades/perfil.png"> Mi perfil
                  </a> <br> <br>
                <a class="btn btn-outline-light" href="notificaciones.html?user=${user}" role="button" id="dropdownMenuLink" style='width:100%;' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img alt="Brand" width="30" height="30" src="img/utilidades/notificaciones.png"> Notificaciones
                  </a> <br> <br>
                <a class="btn btn-outline-light" href="#" role="button" id="dropdownMenuLink" style='width:100%;' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img alt="Brand" width="30" height="30" src="img/utilidades/conf.png"> Ajustes
                </a> <br> <br>
                <a class="btn btn-warning" href="crear_post.html?user=${user}" role="button" id="dropdownMenuLink" data-toggle="dropdown" style='width:100%;' aria-haspopup="true" aria-expanded="false">
                    <img alt="Brand" width="30" height="30" src="img/utilidades/add (2).png"> Nuevo Post
                  </a> <br> <br>
            </div>

            <div class="d-none d-sm-none d-md-block">
                <a href="#" class="nav-link active" aria-current="page" style="color: white;">Mi perfil
                    <img alt="Brand" width="30" height="30" src="img/utilidades/perfil.png">
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