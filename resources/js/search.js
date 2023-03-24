// Wait for the DOM to finish loading before running the code
document.addEventListener('DOMContentLoaded', function() {

    // Find the search bar element in the DOM
    const searchBar = document.querySelector('#search-bar');
  
    // Find the search form element in the DOM
    const searchForm = document.querySelector('#search-form');
  
    // Find the search results element in the DOM
    const searchResults = document.querySelector('#search-results');
  
    // Add an event listener to the search form
    searchForm.addEventListener('submit', function(event) {
  
      // Prevent the form from submitting normally
      event.preventDefault();
  
      // Get the value of the search bar
      const searchQuery = searchBar.value.trim();
  
      // Send an AJAX request to the server to search for links
      fetch(`/search?q=${searchQuery}`)
        .then(response => response.json())
        .then(data => {
          // Clear the search results element
          searchResults.innerHTML = '';
  
          // If there are no links, display a message saying so
          if (data.links.length === 0) {
            searchResults.innerHTML = '<p>No results found</p>';
            return;
          }
  
          // For each link, create a new <a> element and append it to the search results
          data.links.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.textContent = link.title;
            searchResults.appendChild(linkElement);
          });
        });
    });
  });
  