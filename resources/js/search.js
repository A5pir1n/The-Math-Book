function searchLinks(links, query) {
  // Split the search query into individual words
  const words = query.toLowerCase().split(' ');

  // Filter the links based on whether they contain all of the words in the search query
  return links.filter(link => {
    const title = link.title.toLowerCase();
    const url = link.url.toLowerCase();
    return words.every(word => title.includes(word) || url.includes(word));
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const searchBar = document.querySelector('#search-bar');
  const searchButton = document.querySelector('#search-button');
  const searchForm = document.querySelector('#search-form');
  const searchResults = document.querySelector('#search-results');

  searchForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const query = searchBar.value.trim();

    fetch(`/search?q=${query}`)
      .then(response => response.json())
      .then(data => {
        const filteredLinks = searchLinks(data.links, query);

        searchResults.innerHTML = '';

        if (filteredLinks.length === 0) {
          searchResults.innerHTML = '<p>No results found</p>';
          return;
        }

        filteredLinks.forEach(link => {
          const linkElement = document.createElement('a');
          linkElement.href = link.url;
          linkElement.textContent = link.title;
          searchResults.appendChild(linkElement);
        });
      });
  });
});
