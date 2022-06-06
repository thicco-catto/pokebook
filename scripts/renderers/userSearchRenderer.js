async function onLoad(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const selfUserNick = urlParams.get("user");
    const search = urlParams.get("search");

    const searchResultsDiv = document.getElementById("search-results");

    const users = await GetUsers();

    for (let i = 0; i < users.size; i++) {
        const user = users.docs[i];
        if(user === undefined){ continue; }
        
        const regex = new RegExp(`${search.toLowerCase()}.*`);
        if (!user.id.toLowerCase().match(regex)) {
            continue;
        }

        const htmlStr = `
        <div class="card gedf-card user-result">
						<div class="new-card-header" style="background-color: #003566;">
							<a href="Perfil.html?user=${selfUserNick}&userProfile=${user.id}">
								<div class="d-flex justify-content-between align-items-center">

									<div class="d-flex justify-content-between align-items-center">
										<div class="mr-2 mx-2">
											<img src="${user.data().picture}" alt="imagen de perfil"
												class="img-fluid" style="width: 45px;height: 45px; border-radius:
												10px;">
										</div>
										<div class="ml-2">
											<div style="color: white;" class="h5 m-0">@${user.id}</div>
										</div>
									</div>
								</div>
							</a>
						</div>
					</div>
        `;

        searchResultsDiv.appendChild(parseHTML(htmlStr));
    }

    if(document.getElementsByClassName("user-result").length === 0){
        document.getElementById("loading-msg").textContent = "No se encontraron usuarios";
    }else{
        document.getElementById("loading-msg").textContent = "Resultados:";
    }
}

addEventListener("DOMContentLoaded", onLoad);