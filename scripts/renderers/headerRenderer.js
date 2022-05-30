async function onLoad(event){
    const headerDiv = document.getElementById("header");

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const userNick = urlParams.get("user");
    const user = await GetUserByNick(userNick);

    const navbarStr = `
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #003566;">
    <div class="container-fluid">
        <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" style="color: white;">
        <span class="navbar-toggler-icon"></span>
    </button>
        <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
            <div style="padding: 15px 0px 0px 0px; height: 55px;" class="d-none d-sm-none d-md-block">
                <a class="navbar-brand" href="inicio.html?user=${userNick}" style="color: white;"> <h1 style="font-size: 17px;">PokeBook
                <img alt="logo" width="30" height="30" src="img/utilidades/logo.png"> </h1>
                </a>
            </div>
            <div class="d-flex justify-content-center">
            <form id="user-search-form">
                <div style="width:100%;" class="input-group">
                    <input id="user-search-text" style="width: auto;" title="buscador de personas" type="text" class="form-control" placeholder="Buscar usuario">
                    <button type="submit" class="btn btn-secondary"><i class="bi-search"></i></button>
                </div>  
            </form>
            <br>
            </div>

            <div class="d-block d-sm-block d-md-none"> <!-- MOVIL -->
                <br>
                <a class="btn btn-outline-light" href="inicio.html?user=${userNick}" role="button" id="dropdownMenuLink" style='width:100%;' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                    <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
                    </svg> Home
                  </a> <br> <br>
                  <a class="btn btn-outline-light" href="Perfil.html?user=${userNick}&userProfile=${userNick}" role="button"  style='width:100%;' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img alt="mi perfil"  style="width: 30px;height: 30px; border-radius: 10px;" src="${user.data().picture}"> Mi perfil
                  </a> <br> <br>
                <a class="btn btn-outline-light" href="notificaciones.html?user=${userNick}" role="button"  style='width:100%;' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                    </svg> Notificaciones
                  </a> <br> <br>
                <a class="btn btn-outline-light" href="ajustes.html?user=${userNick}" role="button"  style='width:100%;' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-gear-wide-connected" viewBox="0 0 16 16">
                    <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434l.071-.286zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5zm0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78h4.723zM5.048 3.967c-.03.021-.058.043-.087.065l.087-.065zm-.431.355A4.984 4.984 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8 4.617 4.322zm.344 7.646.087.065-.087-.065z"/>
                    </svg> Ajustes
                </a> <br> <br>
                <a class="btn btn-outline-light" href="index.html" role="button"  style='width:100%;' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                    <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                    </svg> Cerrar sesión
                </a> <br> <br>
                <a class="btn btn-warning" href="crear_post.html?user=${userNick}" role="button"  data-toggle="dropdown" style='width:100%;' aria-haspopup="true" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg> Nuevo Post
                  </a> <br> <br>
            </div>
        
            <div class="d-none d-sm-none d-md-block">
                <div style="padding: 0px 15px 0px 0px;" class="btn-group dropstart">
                    <button style="background-color:#001D3D; border:none;" class="btn btn-primary dropdown-toggle" type="button" id="dropdownCenterBtn" data-bs-toggle="dropdown" aria-expanded="false">
                    <img alt="imagen" perfil" style="width: 47px;height: 47px; border-radius: 10px;" src="${user.data().picture}">
                    </button>
                    
                    <ul class="dropdown-menu" aria-labelledby="dropdownCenterBtn">
                        <li><a class="dropdown-item" href="Perfil.html?user=${userNick}&userProfile=${userNick}">Mi perfil</a></li>
                        <li><a class="dropdown-item" href="index.html">Cerrar sesion</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    </nav>
    `;

    let navbar = parseHTML(navbarStr);
    headerDiv.appendChild(navbar);

    const form = document.getElementById("user-search-form");
    form.addEventListener("submit", onSubmit);
}
addEventListener("DOMContentLoaded", onLoad);