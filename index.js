const $pokemonsList = document.querySelector('.pokemonsList');
const url = 'http://pokeapi.co/api/v2/pokemon/';


fetch(url)
    .then(validandoHTTPSStatus)
    .then((response) => {
        percorrendoListaPokemon(response.results)
    })
    .catch(error => {
        console.log(error.message);
    });




function validandoHTTPSStatus(response){
    if(!response.ok){
        throw new Error(`HTTP error, status ${response.status}` );
    }

    return response.json();
}


function percorrendoListaPokemon(lista){
    lista.forEach(({name, url}) => {
        acessandoDetalhesDoPokemon(name, url);
    })
}

function  acessandoDetalhesDoPokemon(name, url){
    fetch(url)
        .then(validandoHTTPSStatus)
        .then((result) => {
            createPokemonIntoDom(name, result.sprites.front_default, result.id)
        })
}

function createPokemonIntoDom(name, image, id){
    const pokemonItem = `<div class="pokemonItem">
                            <p class="idPokemon">${id}</p>
                            <img class="imgPokemon" src="${image}" width="100" alt="">
                            <p class="nomePokemon">${name}</p>
                        </div>`;

    $pokemonsList.innerHTML += pokemonItem;
}