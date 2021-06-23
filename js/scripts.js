// wrapping the global variables within an IIFE //
let pokemonRepository = (function () {
  let repository = [
    {
      name: 'Butterfree',
      height: 1.1,
      types: 'bug',
      abilities: 'compoundeyes'
    },
    {
      name: 'Steelix',
      height: 9.2,
      types: 'steel',
      abilities: 'sheer-force'
    },
    {
      name: 'Jumpluff',
      height: 0.8,
      types: 'grass',
      abilities: 'infiltrator'
    },
    {
      name: 'Gligar',
      height: 1.1,
      types: 'ground',
      abilities: 'hyper-cutter'
    },
];


  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    ) {
      repository.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  function getAll() {
    return repository;
  }
  function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list"); // variable assigned to <ul>
    let listpokemon = document.createElement("li"); // variable creating a list item
    let button = document.createElement("button"); // variable creating a button
    button.addEventListener('click', function (event) { //adding event listener to the button
            showDetails(pokemon);
          });
    button.innerText = pokemon.name; // assigning the button text to be the pokemon name
    button.classList.add("button-class"); // adding class to the button
    listpokemon.appendChild(button); // appending  the button to the list item
    pokemonList.appendChild(listpokemon); // appending the list item to the unordered list
  }

  function showDetails(pokemon) { //shows details of each pokemon in the console
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

pokemonRepository.add({ name:'Arbok', height: 3.5, types:'poison', abilities: 'unnerve' });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
