const $pokemonsList = document.querySelector('.pokemonsList');
const url = 'http://pokeapi.co/api/v2/pokemon/';


function validateHTTPSStatus(response){
    if(!response.ok){
        throw new Error(`HTTP error, status ${dogData.status}` );
    }

    return response.json();
}

fetch(url)
    .then(validateHTTPSStatus)
    .then(({results}) => {
        results.forEach(({name, url}) => {
            accessingPokemonDetails(name, url);
        })
    })
    .catch(error => {
        console.log(error.message);
    })



function  accessingPokemonDetails(name, url){
    fetch(url)
        .then(validateHTTPSStatus)
        .then((result) => {
            createPokemonIntoDom(name, result.sprites.front_default, result.id)
        })
}

function createPokemonIntoDom(name, image, id){
    const pokemonItem = `<div class="pokemonItem">
                            <p class="idPokemon">${id}</p>
                            <img class="imgPokemon" src="${image}" width="100" alt="">
                            <p class="nomePokemon">${name}</p>
                        </div>`

    $pokemonsList.innerHTML += pokemonItem;
}