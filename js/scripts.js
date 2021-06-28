// wrapping the global variables within an IIFE
let pokemonRepository = (function () {
  let modalContainer = document.querySelector('#modal-container');
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
    button.classList.add("pokemon-button"); // adding class to the button
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
      item.types = details.types[0].type.name;
      item.abilities = details.abilities[0].ability.name;
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    });
  }

  // Show pokemon details
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      pokeName.innerHTML = pokemon.name;
      pokeHeight.innerHTML = 'Height: ' + pokemon.height;
      pokeType.innerHTML = 'Type: ' + pokemon.types;
      pokeAbility.innerHTML = 'Ability: ' + pokemon.abilities;
      pokeImage.src = pokemon.imageUrl;
      modalClose.innerHTML = "X";
      showModal();
    });
  }

  function showLoadingMessage() {
    console.log("loading");
  }

  function hideLoadingMessage() {
    console.log();
  }

  // create modal
  let modal = document.querySelector('.modal');
  let modalClose = document.createElement('button');
  modalClose.classList.add('modal-close');
  let pokeName = document.createElement('h1');
  pokeName.classList.add('pokename');
  let pokeHeight = document.createElement('p');
  pokeHeight.classList.add('pokeheight');
  let imageContainer = document.createElement('div');
  imageContainer.classList.add('img-container');
  let pokeImage = document.createElement('img');
  pokeImage.classList.add('pokeImage');
  let pokeType = document.createElement('p');
  pokeType.classList.add('poketype');
  let pokeAbility = document.createElement('p');
  pokeAbility.classList.add('pokeability');

  modal.appendChild(modalClose);
  modal.appendChild(pokeName);
  modal.appendChild(pokeHeight);
  modal.appendChild(pokeType);
  modal.appendChild(pokeAbility);
  modal.appendChild(imageContainer);
  imageContainer.appendChild(pokeImage);

  function showModal() {
    modalContainer.classList.add('is-visible')
  }

  // hide modal
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  modalClose.addEventListener('click' , hideModal);

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });


  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
