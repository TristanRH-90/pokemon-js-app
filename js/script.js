let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=15';
    
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
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");

    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  }

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

    (function() {
        let modalContainer = document.querySelector('#modal-container');
        
        
        function showModal(title, text) {
          // Clear all existing modal content
          modalContainer.innerHTML = '';
          
          let modal = document.createElement('div');
          modal.classList.add('modal');
          
          // Add the new modal content
          let closeButtonElement = document.createElement('button');
          closeButtonElement.classList.add('modal-close');
          closeButtonElement.innerText = 'Close';
          closeButtonElement.addEventListener('click', hideModal);
          
          let titleElement = document.createElement('h1');
          titleElement.innerText = title;
          
          let contentElement = document.createElement('p');
          contentElement.innerText = text;
          
          modal.appendChild(closeButtonElement);
          modal.appendChild(titleElement);
          modal.appendChild(contentElement);
          modalContainer.appendChild(modal);
          
          modalContainer.classList.add('is-visible');
        }
        
        function hideModal() {
          modalContainer.classList.remove('is-visible');
        }
        
        document.querySelector('#show-modal').addEventListener('click', () => {
          showModal('Modal title', 'This is the modal content!');
        });
        
        
        window.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();  
          }
        });
        
        modalContainer.addEventListener('click', (e) => {
          // Since this is also triggered when clicking INSIDE the modal container,
          // We only want to close if the user clicks directly on the overlay
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
      showModal: showModal
    };
  
})();

  pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
});

