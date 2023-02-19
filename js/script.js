let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let loadBar = document.querySelector(".spinner-grow");

  let searchButton = $(".btn btn-secondary");
  searchButton.on("click", function () {
    let pokemonList = $(".pokemon-list");
    pokemonList.empty();
    getByName($(".form-control").val()).forEach(function (pokemon) {
      addListItem(pokemon);
    });
  });

  let searchBar = $(".form-control");
  searchBar.on("keypress", function () {
    let pokemonList = $(".pokemon-list");
    pokemonList.empty();
    getByName($(".form-control").val()).forEach(function (pokemon) {
      addListItem(pokemon);
    });
  });
  
  //This function gets all Pokemon from the API
  function getAll() {
    return pokemonList;
  }

  // This function returns all Pokemon and pushes them to the Array..
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    }
  }

  // This function adds all pokemon details from the API.
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      })
      .finally(function () {
        hideLoadingMessage();
      });
  }

  // This Function Creates a button by Pokemon name.
  function addListItem(pokemon) {
    let uPokemonList = $(".pokemon-list");
    let listItem = $('<li class="group-list-item"></li>');
    let button =
      $(`<button type="button" class="pokemon-button btn btn-primary" 
        data-toggle="modal" data-target="#pokeModal">${pokemon.name}</button>`);

    listItem.append(button);
    uPokemonList.append(listItem);

    button.on("click", function () {
      showDetails(pokemon);
    });
  }

  function getByName(search) {
    return pokemonList.filter(function (pokemon) {
      return pokemon.name.toLowerCase().includes(search.toLowerCase());
    });
  }


  // This function loads pokemon details from the API.
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        item.weight = details.weight;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // This function shows the Pokemon Model on the Websitwe.
  function showModal(pokemon) {
    let types = "";
    pokemon.types.forEach(function (type) {
      types += type.type.name + " ";
    });

    let modalTitile = $(".modal-title");
    let modalBody = $(".modal-body");

    modalTitile.empty();
    modalBody.empty();

    let image = $('<img class="pokemon-img" src="' + pokemon.imageUrl + '" />');

    modalTitile.append(pokemon.name);
    modalBody.append(`<img class="modal-img" src="${pokemon.imageUrl}">`);
    modalBody.append(`<p>Weight: ${pokemon.weight}</p>`);
    modalBody.append(`<p>Height: ${pokemon.height}</p>`);
    modalBody.append(`<p>Types: ${types}</p>`);
  }

  // This function logs the pokemon details to the Console.
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  // This following functions create a loading spinner to website.
  function showLoadingMessage() {
    loadBar.classList.remove("spinner-grow-hidden");
    loadBar.classList.add("spinner-grow-visible");
  }

  function hideLoadingMessage() {
    loadBar.classList.remove("spinner-grow-visible");
    loadBar.classList.add("spinner-grow-hidden");
  }

  // This funtion load the Pokemon from the API to the Website.
  function loadAll() {
    loadList().then(function () {
      getAll().forEach(function (pokemon) {
        addListItem(pokemon);
      });
    });
  }

  function searchPokemon() {
    let input= document.querySelector(".search-input");
    let pokemonList2= document.querySelector(".pokemon-list2")
    let pokemonElements= pokemonList2.getElementsByTagName("li")
    for (let i=0; i< pokemonElements.length; i++) {
        pokemonElements[i].classList.remove("hide")
    }

    for (let i=0; i< pokemonElements.length; i++) {
        if(input.value=== ''){
        } else if (pokemonElements[i].innerText.indexOf(input.value)) {
            pokemonElements[i].classList.add("hide")
        }
    }        
}



  return {
    getAll: getAll,
    add: add,
    getByName: getByName,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    loadAll: loadAll,
    searchPokemon: searchPokemon
   
    
  };
})();

pokemonRepository.loadAll();
