document.addEventListener('click', (event) => {
  document.querySelectorAll('.user-menu[open]').forEach((menu) => {
    if (!menu.contains(event.target)) {
      menu.removeAttribute('open');
    }
  });
});

const partnerSearch = document.querySelector('#partner-search');

if (partnerSearch) {
  const filterToggle = document.querySelector('#filter-toggle');
  const advancedFilters = document.querySelector('#advanced-filters');
  const resultCards = [...document.querySelectorAll('[data-session-card]')];
  const resultCount = document.querySelector('#results-count');
  const emptyResults = document.querySelector('#empty-results');
  const filterFields = [...document.querySelectorAll('[data-filter]')];

  const updateResults = () => {
    const searchTerm = partnerSearch.value.trim().toLowerCase();
    let visibleCount = 0;

    resultCards.forEach((card) => {
      const matchesSearch = !searchTerm || card.dataset.course.includes(searchTerm) || card.dataset.subject.includes(searchTerm);
      const matchesFilters = filterFields.every((field) => !field.value || card.dataset[field.dataset.filter] === field.value);
      const isVisible = matchesSearch && matchesFilters;
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    resultCount.textContent = `${visibleCount} session${visibleCount === 1 ? '' : 's'} found`;
    emptyResults.classList.toggle('is-visible', visibleCount === 0);
  };

  filterToggle.addEventListener('click', () => {
    const isExpanded = filterToggle.getAttribute('aria-expanded') === 'true';
    filterToggle.setAttribute('aria-expanded', String(!isExpanded));
    advancedFilters.classList.toggle('is-visible', !isExpanded);
  });

  partnerSearch.addEventListener('input', updateResults);
  filterFields.forEach((field) => field.addEventListener('change', updateResults));
  document.querySelectorAll('[data-join-button]').forEach((button) => {
    button.addEventListener('click', () => {
      button.textContent = 'Joined';
      button.classList.remove('button-primary');
      button.classList.add('button-light');
      button.disabled = true;
      button.closest('[data-session-card]').querySelector('.join-confirmation').classList.add('is-visible');
    });
  });
}