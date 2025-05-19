console.log("✅ scripts.js chargé — début de l’exécution");

(() => {
  const API_BASE = "/api/v1";

  document.addEventListener('DOMContentLoaded', init);
  //ici une tentative de debug sur le modal qui se referme pas
  document.addEventListener('DOMContentLoaded', () => {
  const modalEl = document.getElementById('movieModal');
  modalEl.addEventListener('hidden.bs.modal', () => {
    document.body.classList.remove('modal-open');
    document.querySelectorAll('.modal-backdrop').forEach(b => b.remove());
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.dispose();
    document.body.style.overflow = 'auto';
  });
});

  async function init() {
    try {
      // 1. Récupérer et afficher le meilleur film
      const best = await fetchBestFilm();
      console.log("Meilleur film :", best);
      renderBestFilm(best);

      // 2. Récupérer et afficher les top rated (6 premiers)
      const topRated = await fetchTopRated(6);
      console.log("Top Rated :", topRated);
      displayCards(document.getElementById('rated-grid'), topRated);

      // 3. Charger les catégories initiales “Mystery” et “Fantasy”
      await loadCategory('Mystery', 'cat1');
      await loadCategory('Fantasy', 'cat3');

      // 4. Injection statique des 7 catégories “Autres”
      (function populateOtherSelectStatic() {
        const select = document.getElementById('other-select');
        select.innerHTML = '';
        const categories = [
          { value: 'action',          label: "Films d'action" },
          { value: 'comedy',        label: 'Comédies' },
          { value: 'family',         label: 'Famille' },
          { value: 'fantasy',         label: 'Films de fantasy' },
          { value: 'horror',         label: "Films d'horreur" },
          { value: 'science fiction', label: 'Science fiction' },
          { value: 'western',         label: 'Westerns' },
        ];
        categories.forEach(cat => {
          const opt = document.createElement('option');
          opt.value = cat.value;
          opt.textContent = cat.label;
          select.appendChild(opt);
        });
    })();

    // 5. Listener “Charger” pour la section “Autres”
    document.getElementById('other-load').addEventListener('click', async () => {
      const cat = document.getElementById('other-select').value;
      const container = document.getElementById('other-grid');
      container.innerHTML = '';
      const list = await fetchByCategory(cat, 6);
      displayCards(container, list);
    });

    // 6. Boutons “Voir plus” pour chaque grille
      attachShowMore('rated-show-more', 'rated-grid');
      attachShowMore('cat1-show-more', 'cat1-grid', 'Mystery');
      attachShowMore('cat3-show-more', 'cat3-grid', 'Fantasy');
      attachShowMore('other-show-more', 'other-grid');

  } catch (err) {
    console.error('Init error:', err);
    alert('Une erreur est survenue lors du chargement des données.');
  }
}


  async function loadCategory(category, prefix) {
  const grid = document.getElementById(`${prefix}-grid`);
  const list = await fetchByCategory(category, 6);
  displayCards(grid, list);
}

function attachShowMore(buttonId, gridId, category=null) {
  const btn  = document.getElementById(buttonId);
  const grid = document.getElementById(gridId);
  let currentPage = 1;

  if (!btn || !grid) return;

  btn.addEventListener('click', async () => {
    currentPage++;
    try {
      let newMovies;
      if (category) {
        newMovies = await fetchByCategory(category, 6, currentPage);
      } else {
        newMovies = await fetchTopRated(6, currentPage);
      }
      
      if (newMovies.length === 0) {
        btn.disabled = true;
        return;
      }

      grid.classList.add('expanded');
      
      // Filtre les films déjà affichés
      const existingIds = [...grid.children].map(card => card.dataset.movieId);
      newMovies = newMovies.filter(movie => !existingIds.includes(movie.id));
      
      displayCards(grid, newMovies, true);

    } catch (err) {
      console.error('Show more error:', err);
    }
  });
}


  async function fetchBestFilm() {
    const bestfilm = await fetch(`${API_BASE}/titles/?sort_by=-votes,-imdb_score&limit=1`);
    const data = await bestfilm.json();
    const bestid = data.results?.[0]?.id;
      if (!bestid) return null;
      const detailbestfilm = await fetch(`${API_BASE}/titles/${bestid}`);
      return await detailbestfilm.json();
}

  async function fetchTopRated(limit, page = 1) {
    const toprated = await fetch(`${API_BASE}/titles/?sort_by=-votes,-imdb_score&limit=${limit}&page=${page}`);
    const data = await toprated.json();
    return data.results || [];
 }

  async function fetchByCategory(category, limit, page = 1) {
    const response = await fetch(
    `${API_BASE}/titles/?genre_contains=${category}&sort_by=-votes,-imdb_score&limit=${limit}&page=${page}`);
  const data = await response.json();
  return data.results || [];
}


  function renderBestFilm(film) {
    const bestfilmcard = document.getElementById('best-film-card');
    bestfilmcard.innerHTML = '';
    if (!film) {
      bestfilmcard.textContent = "Pas de film disponible.";
      return;
    }

    const tpl = document.getElementById('best-film-template').content;
    const clone = tpl.cloneNode(true);

    
    clone.querySelector('img').src = film.image_url;
    clone.querySelector('img').alt = film.title;
    clone.querySelector('h3').textContent = film.title;
    clone.querySelector('p').textContent = film.long_description || "Description non disponible";

    const btn = clone.querySelector('.btn-details');
    btn.dataset.id = film.id; 
    btn.addEventListener('click', () => showDetails(film.id));
    bestfilmcard.appendChild(clone);
  }

  function displayCards(container, list, append = false) {
    if (!append)container.innerHTML = '';
    const tpl = document.getElementById('rated-card-template').content;
    list.forEach(movie => {
      const clone = tpl.cloneNode(true);
      const img = clone.querySelector('img');
      const btn = clone.querySelector('button');
      img.src = movie.image_url;
      img.alt = movie.title;
      clone.querySelector('.title').textContent = movie.title;
      btn.addEventListener('click', () => showDetails(movie.id));
      container.appendChild(clone);
    });
  }

  async function showDetails(id) {
    const details = await fetch(`${API_BASE}/titles/${id}`);
    if (!details.ok) return;
    const movie = await details.json();
    fillModal(movie);
  }

  function fillModal(movie) {
    const modalEl = document.getElementById('movieModal');
    const modal = new bootstrap.Modal(modalEl);
    modalEl.querySelector('.modal-title').textContent = movie.title;
    modalEl.querySelector('.modal-body').innerHTML = `
      <img src="${movie.image_url}" class="img-fluid mb-3">
      <p><strong>Genres :</strong> ${movie.genres.join(', ')}</p>
      <p><strong>Date de sortie :</strong> ${movie.release_date}</p>
      <p><strong>Classification :</strong> ${movie.age_certification}</p>
      <p><strong>Score IMDB :</strong> ${movie.imdb_score}</p>
      <p><strong>Réalisateur :</strong> ${movie.director}</p>
      <p><strong>Acteurs :</strong> ${movie.actors.join(', ')}</p>
      <p><strong>Durée :</strong> ${movie.duration} min</p>
      <p><strong>Pays :</strong> ${movie.country}</p>
      <p><strong>Box Office :</strong> $${movie.worldwide_gross_income.toLocaleString()}</p>
      <p>${movie.description}</p>
    `;
    modal.show();
  }
})();
