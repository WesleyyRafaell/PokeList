const $pokemonsList = document.querySelector('.pokemonsList');
const $imgSpinner = document.querySelector('#imgSpinner');
let page = 0;



function iniciar(){
    trazendoListagemPokemonAPi();
    calculandoFimDaPagina();
}

function trazendoListagemPokemonAPi(){
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${page}&limit=10`)
    .then(validandoHTTPSStatus)
    .then((response) => {
        percorrendoListaPokemon(response.results)
    })
    .catch(error => {
        console.log(error.message);
    });
}



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
            inserindoPokemonsNoDom(name, result.sprites.front_default, result.id)
        })
}

function inserindoPokemonsNoDom(name, image, id){
    const pokemonItem = `<div class="pokemonItem">
                            <p class="idPokemon">${id}</p>
                            <img class="imgPokemon" src="${image}" width="100" alt="">
                            <p class="nomePokemon">${name}</p>
                        </div>`;

    $pokemonsList.innerHTML += pokemonItem;
}

function carregandoNovosPokemons(){
    $imgSpinner.classList.add('spinnerActive');
    
    setTimeout(()=>{
        $imgSpinner.classList.remove('spinnerActive');
        page += 10;
        trazendoListagemPokemonAPi()
    }, 3000)
}

function calculandoFimDaPagina(){
    window.addEventListener('scroll', () =>{
        const {clientHeight, scrollHeight, scrollTop} = document.documentElement
        if(scrollTop + clientHeight == scrollHeight){
            carregandoNovosPokemons();
        }
    })
}

iniciar();