class Pokemon {
    constructor(id, sprite, name, type1, type2, gen) {
        this.id = id;
        this.sprite = sprite;
        this.name = name;
        this.type1 = type1;
        this.type2 = type2;
        this.gen = gen;
    }
}

function getGenerationFromId(id) {
    if (id > 0 && id <= 151) {
        return "1";
    } else if (id > 151 && id <= 251) {
        return "2";
    } else if (id > 251 && id <= 386) {
        return "3";
    } else if (id > 386 && id <= 493) {
        return "4";
    } else if (id > 493 && id <= 649) {
        return "5";
    } else if (id > 649 && id <= 721) {
        return "6";
    } else if (id > 721 && id <= 809) {
        return "7";
    } else if (id > 809 && id <= 898) {
        return "8";
    }
}

function typeToSpanish(type) {
    switch (type) {
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
let pokemonTeam = [];

function reloadTeam(){
    for (var i = 0; i < 6; i++) {
        let img = "img/utilidades/pokeballabierta.png";

        if(i < pokemonTeam.length){
            let pokemonIndex = pokemonTeam[i];
            img = pokemonList[pokemonIndex].sprite;
        }

        let imgHTML = document.getElementById(`pokemon-team-${i+1}`);
        imgHTML.src = img;
    }
}

function addPokemon(event) {
    if (pokemonTeam.length == 6) { return; }
    pokemonTeam.push(parseInt(event.target.id));
    reloadTeam();
}

function removePokemon(event) {
    for (var i = 0; i < pokemonTeam.length; i++) {
        if (pokemonTeam[i] === parseInt(event.target.id)) {
            pokemonTeam.splice(i, 1);
            reloadTeam();
            break;
        }
    }
}

function fillTable(pokemonList) {
    const tableBody = document.getElementById("pokemonList");

    for (let i = 0; i < pokemonList.length; i++) {
        const pokemon = pokemonList[i];

        let newRow = tableBody.insertRow()

        let inputCell = newRow.insertCell()
        let plusButton = parseHTML(`<button id="${pokemon.id}" style="width: auto;" type="button" class="btn btn-light btn-sm"><img id="${pokemon.id}" alt="Brand" width="15" height="15" src="img/utilidades/add.png"></button>`);
        let minusButton = parseHTML(`<button id="${pokemon.id}" style="width: auto;" type="button" class="btn btn-light btn-sm"><img id="${pokemon.id}" alt="Brand" width="15" height="15" src="img/utilidades/del.png"></button>`);
        plusButton.onclick = addPokemon;
        minusButton.onclick = removePokemon;
        let input = parseHTML(`<div></div>`);
        input.appendChild(plusButton);
        input.appendChild(minusButton);
        inputCell.appendChild(input);

        let imgCell = newRow.insertCell()
        let img = document.createElement("img");
        img.src = pokemon.sprite;
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
        let type1 = document.createTextNode(typeToSpanish(pokemon.type1));
        type1Cell.appendChild(type1);

        let secondType;
        if (pokemon.type2 === undefined) {
            secondType = "";
        } else {
            secondType = typeToSpanish(pokemon.type2);
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
        if (pokemonListRaw.results[i] === undefined) { continue; }
        const pokemon = await P.getPokemonByName(pokemonListRaw.results[i].name);
        console.log(i);

        let type2 = undefined;
        if (pokemon.types[1] !== undefined) { type2 = pokemon.types[1].type.name; }

        let generation = getGenerationFromId(i + 1);

        const pokemonClass = new Pokemon(i, pokemon.sprites.front_default, pokemon.name, pokemon.types[0].type.name, type2, generation);

        pokemonList.push(pokemonClass);
    }

    document.getElementById("loading-gif").style.visibility = "hidden";

    console.log("finished loading");
    isLoading = false;

    fillTable(pokemonList);
}
addEventListener("DOMContentLoaded", onLoad);


function onFilterSubmit(event) {
    event.preventDefault();
    if (isLoading) {
        return;
    }

    let filteredPokemonList = [];

    const nameFilter = document.getElementById("name-filter").value;
    const genFilter = document.getElementById("gen-filter").value;
    const type1Filter = document.getElementById("type1-filter").value;
    const type2Filter = document.getElementById("type2-filter").value;
    const typesFilter = []
    if (type1Filter.length !== 0) { typesFilter.push(type1Filter); }
    if (type2Filter.length !== 0) { typesFilter.push(type2Filter); }

    for (let i = 0; i < pokemonList.length; i++) {
        const pokemon = pokemonList[i];

        const regex = new RegExp(`${nameFilter}.*`);
        if (!pokemon.name.match(regex)) {
            continue;
        }

        if (genFilter.length !== 0 && genFilter !== pokemon.gen) {
            continue;
        }

        let numTypesMatch = 0
        if (typesFilter.length > 0) {
            if (typesFilter.includes(pokemon.type1)) {
                numTypesMatch++;
            }

            if (pokemon.type2 !== undefined && typesFilter.includes(pokemon.type2)) {
                numTypesMatch++;
            }
        }

        if (numTypesMatch < typesFilter.length) { continue; }

        filteredPokemonList.push(pokemon);
    }

    const table = document.getElementById("pokemonList");
    table.innerHTML = "";
    fillTable(filteredPokemonList);
}

const filterForm = document.getElementById("filter-form");
filterForm.addEventListener("submit", onFilterSubmit);

async function onTeamSubmit(event){
    event.preventDefault();

    if(pokemonTeam.length === 0){
        //TODO: Add proper warning
        console.log("Add at least 1 pokemon");
        return;
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const user = urlParams.get("user");

    const postId = await GetNextPostId();

    const title = document.getElementById("Title").value;
    const description = document.getElementById("Description").value;

    let pokemonTeamFix = [];
    for (let i = 0; i < pokemonTeam.length; i++) {
        const element = pokemonTeam[i];
        pokemonTeamFix.push(element + 1)
    }

    await AddPost(postId, user, title, description, pokemonTeamFix);
    window.location.href = `postgrande.html?user=${user}&post=${postId}`;
}

const teamForm = document.getElementById("team-form");
teamForm.addEventListener("submit", onTeamSubmit);