let pokemonList = [
    { 
    name: "Charmeleon", 
    height: 3.07,
    types: ["Fire"] 
    },
    { 
    name: "Charizard", 
    height: 5.07,
    types: ["Fire","Flying"] 
    },
    { 
    name: "Charmander", 
    height: 2.00, 
    types: ["Fire"] }
];

for (let i = 0; i < pokemonList[i].length; i++) {
    if (pokemonList[i].height <5) {
        console.log(pokemonList[i].name + " WOW Thats huge");
    } 
}