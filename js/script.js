let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
});


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
  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon) {
    let uPokemonList = $(".pokemon-list");
    let listItem = $('<li class="group-list-item"></li>');
    let button = $(`<button type="button" class="pokemon-button btn btn-primary" 
        data-toggle="modal" data-target="#pokeModal">${pokemon.name}</button>`);

    listItem.append(button);
    uPokemonList.append(listItem);

    button.on("click", function() {
        showDetails(pokemon);
    });
}

function loadAll() {
  loadList().then(function() {
      getAll().forEach(function(pokemon) {
          addListItem(pokemon);
      });
  });
}


  let searchButton = $(".btn-warning");
  searchButton.on("click", function() {
      let uPokemonList = $(".pokemon-list");
      uPokemonList.empty();
      getByName($(".form-control").val()).forEach(function(pokemon) {
          addListItem(pokemon);
      });
  })

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);

      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    let types = "";
    pokemon.types.forEach(function(type) {
        types += type.type.name + " ";
    });

    let modalTitile = $(".modal-title");
    let modalBody = $(".modal-body");

    modalTitile.empty();
    modalBody.empty();

    modalTitile.append(pokemon.name);
    modalBody.append(`<img class="modal-img" src="${pokemon.imageUrl}">`);
    modalBody.append(`<p>Height: ${pokemon.height}</p>`);
    modalBody.append(`<p>Weight: ${pokemon.weight}</p>`);
    modalBody.append(`<p>Types: ${types}</p>`);
}

loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});


return {
  getAll: getAll,
  add: add,
  getByName: getByName,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails,
  showModal: showModal,
  loadAll: loadAll
};
})();



