function onSearchSubmit(event){
    event.preventDefault();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const user = urlParams.get("user");

    const search = document.getElementById("user-search-text").value;

    window.location.href = `buscar.html?user=${user}&search=${search}`;
}