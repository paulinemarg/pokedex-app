// wrapping the global variables within an IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; // API link

  // Add a pokemon
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  // Get all pokemons from pokemonList
  function getAll() {
    return pokemonList;
  }
  // Create button fr each pokemon in the pokemonList
  function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list"); // variable assigned to <ul>
    let listpokemon = document.createElement("li"); // variable creating a list item
    let button = document.createElement("button"); // variable creating a button
    button.innerText = pokemon.name; // assigning the button text to be the pokemon name
    button.classList.add("button-class"); // adding class to the button
    listpokemon.appendChild(button); // appending  the button to the list item
    pokemonList.appendChild(listpokemon); // appending the list item to the unordered list
    button.addEventListener('click', function (event) { //adding event listener to the button
            showDetails(pokemon);
          });
  }

  //Load pokemon list from API
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      hideLoadingMessage();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    })
  }
  // Load pokemon details from API
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      hideLoadingMessage();
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    });
  }
  // Show pokemon details
  function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    console.log(pokemon);
  });
}

  function showLoadingMessage() {
    console.log("loading");
  }

  function hideLoadingMessage() {
    console.log();
  }


  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function () {
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
});
