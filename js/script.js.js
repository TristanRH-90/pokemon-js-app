let pokemonRepository = (function () {
    
    let repository = [
      { name: 'Charmeleon', height: 3.07,types: ['Fire'] },
      { name: 'Charizard', height: 5.07,types: ['Fire","Flying'] },
      { name: 'Charmander', height: 2.00, types: ['Fire'] }
  ];
  
    function add(pokemon) {
      repository.push(pokemon);
    }
  
    function getAll() {
      return repository;
    }
  
    return {
      add: add,
      getAll: getAll
    };
  })();
  
  
  console.log(pokemonRepository.getAll()); 
  pokemonRepository.add({ name: 'Pikachu', height:0.3, types:["electric"] });
 

  pokemonRepository.getAll().forEach(function(pokemon) {
    console.log(pokemon.name + ' is ' + pokemon.height + ' Feet Tall.');
    });
  
    pokemonRepository.getAll().forEach(function(pokemon) {
      let pokemonList = document.querySelector(".pokemon-list");
      let listpokemon = document.createElement("li");
      let button = document.createElement("button");
      button.innerHTML = pokemon.name;
      button.classList.add("button-class");
      listpokemon.appendChild(button);
      pokemonList.appendChild(listpokemon);

      });
    