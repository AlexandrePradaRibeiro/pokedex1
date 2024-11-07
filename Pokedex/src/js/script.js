const pokemonName = document.querySelector(".pokemon__name");

const pokemonNumber = document.querySelector(".pokemon__number")

const pokemonImage = document.querySelector(".pokemon__image")

const form = document.querySelector(".form");

const input = document.querySelector(".input__search");

const buttonPrev = document.querySelector(".btn-prev")

const buttonNext = document.querySelector(".btn-next")

let searchPokemon = 1;

//CONECTAR E CAPTURAR AS INFORMAÇÕES DA API
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    };

}

pokemonName.textContent = "loading..."
pokemonNumber.textContent = ""
pokemonImage.src  = "https://i.pinimg.com/736x/80/b5/81/80b5813d8ad81a765ca47ebc59a65ac3.jpg"
    const renderPokemon = async (pokemon) => {
        const data = await fetchPokemon(pokemon);
        console.log(data);
        if (data) {
            //Quabdo der tudo certo
            pokemonImage.style.width = "25%"
            pokemonImage.src = data.sprites.versions["generation-v"]["black-white"].animated.front_default
            pokemonNumber.innerHTML = data.id;
            pokemonName.innerHTML = data.name;
            input.value = "";
            searchPokemon = data.id;
        } else {
            //Quando houver erro
            pokemonNumber.textContent = "";
            pokemonName.textContent = "não encontrado 😥";
            pokemonImage.src = "https://thumbs.dreamstime.com/z/sinal-do-erro-21759953.jpg"
            pokemonImage.style.width = "35%"
        }




    }
 
    form.addEventListener("submit", (event) => {

        event.preventDefault();

        renderPokemon(input.value.toLowerCase());

    })

    buttonPrev.addEventListener("click", () => {
      
            if (searchPokemon > 1 ) {
                  searchPokemon -=1;
        renderPokemon(searchPokemon)

            }
          
    })

    buttonNext.addEventListener("click", () => {
        searchPokemon += 1;
        renderPokemon(searchPokemon)
    })


    renderPokemon(searchPokemon)
