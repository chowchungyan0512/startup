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
}

document.querySelectorAll('[data-join-button]').forEach((button) => {
  button.addEventListener('click', () => {
    button.textContent = 'Joined';
    button.classList.remove('button-primary');
    button.classList.add('button-light');
    button.disabled = true;
    const sessionCard = button.closest('[data-session-card]');
    sessionCard.querySelector('.join-confirmation').classList.add('is-visible');
    const chatLink = document.createElement('a');
    chatLink.className = 'button button-light mt-2';
    chatLink.href = `chat.html#${sessionCard.dataset.chatTab}`;
    chatLink.textContent = 'Open chat';
    button.parentElement.appendChild(chatLink);
  });
});

const chatPage = document.querySelector('#chat-page');

if (chatPage) {
  const tabs = [...document.querySelectorAll('[data-chat-tab]')];
  const conversations = [...document.querySelectorAll('[data-conversation]')];
  const messageInput = document.querySelector('#message-input');
  const sendButton = document.querySelector('#send-message');
  let activeTab = 'cs260';

  const showConversation = (tabName) => {
    activeTab = tabName;
    tabs.forEach((tab) => {
      const isActive = tab.dataset.chatTab === tabName;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });
    conversations.forEach((conversation) => {
      conversation.hidden = conversation.dataset.conversation !== tabName;
    });
  };

  tabs.forEach((tab) => tab.addEventListener('click', () => showConversation(tab.dataset.chatTab)));

  const updateSendState = () => {
    sendButton.disabled = !messageInput.value.trim();
  };

  messageInput.addEventListener('input', updateSendState);
  sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (!message) return;

    const messageBubble = document.createElement('div');
    messageBubble.className = 'chat-message chat-message-you';
    messageBubble.innerHTML = `<span class="chat-author">You · just now</span><p></p>`;
    messageBubble.querySelector('p').textContent = message;
    document.querySelector(`[data-conversation="${activeTab}"] .chat-messages`).appendChild(messageBubble);
    messageInput.value = '';
    updateSendState();
    messageInput.focus();
  });

  const requestedTab = window.location.hash.slice(1);
  if (requestedTab === 'biology180') showConversation('biology180');
  updateSendState();
}