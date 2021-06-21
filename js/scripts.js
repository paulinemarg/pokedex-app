let pokemonList = [
  {
    name: 'Butterfree',
    height: 1.1,
    types: ['bug', 'flying'],
    abilities: ['compoundeyes', 'tinted-lens'],
  },
  {
    name: 'Steelix',
    height: 9.2,
    types: ['steel', 'ground'],
    abilities: ['rock-head', 'sheer-force'],
  },
  {
    name: 'Jumpluff',
    height: 0.8,
    types: ['grass', 'flying'],
    abiities: ['chlorophyll', 'infiltrator'],
  },
  {
    name: 'Gligar',
    height: 1.1,
    types: ['ground', 'flying'],
    abilities: ['hyper-cutter', 'immunity'],
  },
]

pokemonList.forEach(function(pokemon) {
  document.write('<p>' + pokemon.name + ' , ' + pokemon.height + ' , ' +  pokemon.types + ' , ' + pokemon.abilities + '</p>')
})
/*for (let i=0; i < pokemonList.length; i++) {
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
