function typeToSpanish(type){
    switch(type){
        case "normal":
            return "Normal";
        case "fighting":
            return "Lucha";
        case "flying":
            return "Volador";
        case "poison":
            return "Veneno";
        case "ground":
            return "Tierra";
        case "rock":
            return "Roca";
        case "bug":
            return "Bicho";
        case "ghost":
            return "Fantasma";
        case "steel":
            return "Acero";
        case "fire":
            return "Fuego";
        case "water":
            return "Agua";
        case "grass":
            return "Planta";
        case "electric":
            return "Electrico";
        case "psychic":
            return "Psiquico";
        case "ice":
            return "Hielo";
        case "dragon":
            return "Dragon";
        case "dark":
            return "Siniestro";
        case "fairy":
            return "Hada";
        default:
            return "ERROR" + type;
    }
}

let isLoading = false;
let pokemonList = [];

function fillTable(pokemonList){
    const tableBody = document.getElementById("pokemonList");

    for (let i = 0; i < pokemonList.length; i++) {
        const pokemon = pokemonList[i];
        
        let newRow = tableBody.insertRow()

        let inputCell = newRow.insertCell()
        let input = document.createElement("input");
        input.type = "checkbox";
        inputCell.appendChild(input);

        let imgCell = newRow.insertCell()
        let img = document.createElement("img");
        img.src = pokemon.sprites.front_default;
        img.alt = pokemon.name
        img.style = "width: 65px; height: 65px";
        img.class = "rounded-circle";
        imgCell.appendChild(img);

        const lower = pokemon.name.toLowerCase();
        const capitalizedName = pokemon.name.charAt(0).toUpperCase() + lower.slice(1);
        const finalName = capitalizedName.split("-")[0];

        let nameCell = newRow.insertCell();
        let name = document.createTextNode(finalName);
        nameCell.appendChild(name);

        let type1Cell = newRow.insertCell();
        let type1 = document.createTextNode(typeToSpanish(pokemon.types[0].type.name));
        type1Cell.appendChild(type1);

        let secondType;
        if(pokemon.types[1] === undefined){
            secondType = "";
        }else{
            secondType = typeToSpanish(pokemon.types[1].type.name);
        }
        let type2Cell = newRow.insertCell();
        let type2 = document.createTextNode(secondType);
        type2Cell.appendChild(type2);
    }
}


async function onLoad(event) {
    isLoading = true;

    const interval = {
        offset: 0,
        limit: 898,
    }
    const pokemonListRaw = await P.getPokemonsList(interval);

    for (let i = 0; i < pokemonListRaw.count; i++) {
        if(pokemonListRaw.results[i] === undefined){continue;}
        const pokemon = await P.getPokemonByName(pokemonListRaw.results[i].name);
        pokemonList.push(pokemon);
    }

    document.getElementById("loading-gif").style.visibility = "hidden";

    console.log("finished loading");
    isLoading = false;

    fillTable(pokemonList);
}
addEventListener("DOMContentLoaded", onLoad);


async function onSubmit(event){
    event.preventDefault();   
    if(isLoading){
        //TODO: make it clear it is loading
        console.log("loading");
        return;
    }

    let filteredPokemonList = [];

    const nameFilter = document.getElementById("name-filter").value;
    const type1Filter = document.getElementById("type1-filter").value;
    const type2Filter = document.getElementById("type2-filter").value;
    const typesFilter = []
    if(type1Filter.length !== 0){ typesFilter.push(type1Filter); }
    if(type2Filter.length !== 0){ typesFilter.push(type2Filter); }

    for (let i = 0; i < pokemonList.length; i++) {
        const pokemon = pokemonList[i];

        const regex = new RegExp(`${nameFilter}.*`);
        if(!pokemon.name.match(regex)){
            continue;
        }

        let numTypesMatch = 0
        if(typesFilter.length > 0){
            if(typesFilter.includes(pokemon.types[0].type.name)){
                numTypesMatch++;
            }

            if(pokemon.types[1] !== undefined && typesFilter.includes(pokemon.types[1].type.name)){
                numTypesMatch++;
            }
        }

        if(numTypesMatch < typesFilter.length){ continue; }

        filteredPokemonList.push(pokemon);
    }

    const table = document.getElementById("pokemonList");
    table.innerHTML = "";
    fillTable(filteredPokemonList);
}

const form = document.getElementById("filter-form");
form.addEventListener("submit", onSubmit);