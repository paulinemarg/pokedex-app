// wrapping the global variables within an IIFE //
let pokemonRepository = (function (){

  pokemonList = [
    {
      name: 'Butterfree',
      height: 1.1,
      types: ['bug'],
      abilities: ['compoundeyes']
    },
    {
      name: 'Steelix',
      height: 9.2,
      types: ['steel'],
      abilities: ['sheer-force']
    },
    {
      name: 'Jumpluff',
      height: 0.8,
      types: ['grass'],
      abilities: ['infiltrator']
    },
    {
      name: 'Gligar',
      height: 1.1,
      types: ['ground'],
      abilities: ['hyper-cutter']
    },
];

    function add(pokemon){
      pokemonList.push(pokemon);
    }

    function getAll(){
      return pokemonList;
    }

//everything returned from the IIFE is accessible from the outside//
   return{
   getAll: getAll,
   add: add
   }
})();

// Bonus Task: typeof parameter //
    function add(pokemon) {
      if (
        typeof pokemon === "object"
      ) {
        pokemonList.push(pokemon);
      } else {
        console.log("pokemon is not correct");
      }
    }
//Bonus Task: validate whether all Object.keys() of the parameter are equal to the specific keys//
  console.log(Object.keys(pokemonList));
  
  console.log(pokemonRepository.getAll());
  pokemonRepository.add({name:'Arbok', height:'3.5', types:'poison', abilities:'unnerve'});
  console.log(pokemonRepository.getAll());
  // forEach loop to iterate over an array of objects //
  pokemonRepository.getAll().forEach(function(pokemon){
  document.write('<p>' + pokemon.name + ' , ' + pokemon.height + ' , ' +  pokemon.types + ' , ' + pokemon.abilities + '</p>')
  })

/* pokemonList.forEach(function(pokemon) {
  document.write('<p>' + pokemon.name + ' , ' + pokemon.height + ' , ' +  pokemon.types + ' , ' + pokemon.abilities + '</p>')
})
for (let i=0; i < pokemonList.length; i++) {
//Writes Pokemon name to the DOM
  document.write(pokemonList[i].name + " (height :" + pokemonList[i].height + ")");
//Checks if pokemon height is greater than 2
if (pokemonList[i].height > 2) {
//if pokemon height is greater than 2, writes "Wow that's big!"
  document.write(" - Wow, that's big!");
}
//Adds line breaks after each pokemon name
document.write("<br><br>");
}*/
