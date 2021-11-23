// wrapping the global variables within an IIFE
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; // API link

  // Add a pokemon
  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
    } else alert('not possible!');
  }

  // Get all pokemons from pokemonList
  function getAll() {
    return pokemonList;
  }
  // Create button for each pokemon in the pokemonList
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.list-group'); // variable assigned to <ul>
    let listItem = document.createElement('li'); // variable creating a list item
    listItem.setAttribute('id', pokemon.name); // add id for each pokemon
    listItem.classList.add('group-list-item'); // add class to the list item

    let button = document.createElement('button'); // variable creating a button
    button.innerText = pokemon.name; // assigning the button text to be the pokemon name
    button.classList.add('button'); // adding class to the button
    button.setAttribute('data-target', '#exampleModal');
    button.setAttribute('data-toggle', 'modal');

    listItem.appendChild(button); // appending  the button to the list item
    pokemonList.appendChild(listItem); // appending the list item to the unordered list
    button.addEventListener('click', function() {
      //adding event listener to the button
      showDetails(pokemon);
    });
  }

  //Load pokemon list from API
  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  // Load pokemon details from API
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        // Add the details to the item
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types[0].type.name;
        item.abilities = details.abilities[0].ability.name;
        item.abilities.push(details.abilities[i].ability.name);
      })
      .catch(function(e) {
        console.error(e);
      });
  }
  // search for pokemon
  function search() {
    let searchInput = document.querySelector('#search-bar');

    searchInput.addEventListener('input', function() {
      // Adds a Bootstrap class.
      let pokemonList = document.querySelectorAll('.group-list-item');
      let searchText = searchInput.value.toLowerCase();

      pokemonList.forEach(function(pokemon) {
        if (pokemon.innerText.toLowerCase().indexOf(searchText) > -1) {
          pokemon.style.display = '';
        } else {
          pokemon.style.display = 'none';
        }
      });
    });
  }

  // Show pokemon details
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
      showModal(item);
    });
  }

  // show modal
  function showModal(item) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $('<h1>' + item.name + '</h1>');
    let imageElementFront = $('<img class="modal-img">');
    imageElementFront.attr('src', item.imageUrlFront);
    let imageElementBack = $('<img class="modal-img">');
    imageElementBack.attr('src', item.imageUrlBack);
    let heightElement = $('<p>' + 'height : ' + item.height + '</p>');
    let weightElement = $('<p>' + 'weight : ' + item.weight + '</p>');
    let typesElement = $('<p>' + 'type : ' + item.types + '</p>');
    let abilitiesElement = $('<p>' + 'ability : ' + item.abilities + '</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    search: search,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
pokemonRepository.search();

//Go to top button
let mybutton = document.getElementById('myBtn'); // get the button
window.onscroll = function() {
  scrollFunction();
}; // When the user scrolls down 20px from the top of the document, show the button

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = 'block';
  } else {
    mybutton.style.display = 'none';
  }
}
function topFunction() {
  // When the user clicks on the button, scroll to the top of the document
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Dark and light theme
function myFunction() {
   var element = document.body;
   element.classList.toggle("dark-mode");
}

// loader
document.onreadystatechange = function() {
  setTimeout(function(){
  if (document.readyState !== "complete") {
    document.querySelector("body").style.visibility = "hidden";
    document.querySelector(
      "#loader").style.visibility = "visible";
  } else {
      document.querySelector(
        "#loader").style.display = "none";
      document.querySelector("body").style.visibility = "visible";
    }
  }, 3000);
};