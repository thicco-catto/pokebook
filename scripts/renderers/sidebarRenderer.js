async function onLoad(event){
    const sidebarDiv = document.getElementById("sidebar");
    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const userNick = urlParams.get("user");
    const user = await GetUserByNick(userNick);

    const sidebarStr = `
    <div class="d-none d-sm-none d-md-block">
    <div class="new-card">
        <div class="card-body">
            <a class="btn btn-outline-light " href="inicio.html?user=${userNick}" role="button" id="dropdownMenuLink1" style='width:100%;' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img alt="inicio" width="30" height="30" src="img/utilidades/home.png"> Home
            </a> <br> <br>
            <a class="btn btn-outline-light" href="ajustes.html?user=${userNick}" role="button"  style='width:100%;' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img alt="ajustes" width="30" height="30" src="img/utilidades/conf.png"> Ajustes
            </a><br> <br>
            <a class="btn btn-outline-light" href="Perfil.html?user=${userNick}&userProfile=${userNick}" role="button"  style='width:100%;' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img alt="perfil" style="width: 30px;height: 30px; border-radius: 10px;" src="${user.data().picture}"> Perfil
            </a> <br> <br>
            <div class="d-block d-sm-block d-md-none">
                <a class="btn btn-outline-light" href="#" role="button" style='width:100%;' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img alt="notificaciones" width="30" height="30" src="img/utilidades/notificaciones.png"> Notificaciones
                </a> <br> <br>
            </div>
            <a class="btn btn-warning" href="crear_post.html?user=${userNick}" role="button" data-toggle="dropdown" style='width:100%;' aria-haspopup="true" aria-expanded="false">
                <img alt="nuevo post" width="30" height="30" src="img/utilidades/add (2).png"> Nuevo Post
            </a> <br>
        </div>
    </div>
</div>
    `;

    let sidebar = parseHTML(sidebarStr);
    sidebarDiv.appendChild(sidebar);
}
addEventListener("DOMContentLoaded", onLoad);