let pokemonRepository = (function () {
    
    let pokemonList = [
      { name: 'Charmeleon', height: 3.07,types: ['Fire'] },
      { name: 'Charizard', height: 5.07,types: ['Fire","Flying'] },
      { name: 'Charmander', height: 2.00, types: ['Fire'] }
  ];
  
    function add(pokemon) {
      pokemonList.push(pokemon);
    }
  
    function getAll() {
      return pokemonList;
    }
  
    return {
      add: add,
      getAll: getAll
    };
  })();
  
  
  console.log(pokemonRepository.getAll()); 
  pokemonRepository.add({ name: 'Pikachu' });
  console.log(pokemonRepository.getAll()); 

  pokemonRepository.getAll().forEach(function(pokemon) {
    document.write(pokemon.name + ' is ' + pokemon.height + ' Feet Tall.');
    });
  