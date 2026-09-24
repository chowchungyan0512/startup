document.querySelectorAll('form[method="post"]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    window.location.href = form.getAttribute('action');
  });
});

const closeUserMenu = (menu) => {
  menu.classList.remove('is-open');
  menu.querySelector('.user-menu-trigger').setAttribute('aria-expanded', 'false');
};

document.querySelectorAll('.user-menu-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const menu = trigger.closest('.user-menu');
    const isOpen = menu.classList.toggle('is-open');
    trigger.setAttribute('aria-expanded', String(isOpen));
  });
});

document.addEventListener('click', (event) => {
  document.querySelectorAll('.user-menu.is-open').forEach((menu) => {
    if (!menu.contains(event.target)) {
      closeUserMenu(menu);
    }
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  document.querySelectorAll('.user-menu.is-open').forEach(closeUserMenu);
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

const joinedSessionList = document.querySelector('#joined-title')?.closest('section').querySelector('.session-list');

const flipAnimate = (elements, mutate) => {
  const firstRects = new Map(elements.map((el) => [el, el.getBoundingClientRect()]));
  mutate();
  elements.forEach((el) => {
    if (!el.isConnected) return;
    const deltaY = firstRects.get(el).top - el.getBoundingClientRect().top;
    if (!deltaY) return;
    el.style.transition = 'none';
    el.style.transform = `translateY(${deltaY}px)`;
    requestAnimationFrame(() => {
      el.style.transition = 'transform 0.3s ease';
      el.style.transform = '';
    });
    el.addEventListener('transitionend', () => {
      el.style.transition = '';
    }, { once: true });
  });
};

document.querySelectorAll('[data-join-button]').forEach((button) => {
  button.addEventListener('click', () => {
    const sessionCard = button.closest('[data-session-card]');
    const openSessionsList = sessionCard.closest('#sessions .session-list');

    if (openSessionsList && joinedSessionList) {
      const title = sessionCard.querySelector('h3').textContent;
      const details = sessionCard.querySelector('p').textContent;
      const chatTab = sessionCard.dataset.chatTab;
      const pageSections = [...document.querySelectorAll('main > section')];

      const joinedCard = document.createElement('article');
      joinedCard.className = 'session-card joined-card is-entering';
      joinedCard.innerHTML = `
        <div class="session-details">
          <h3>${title}</h3>
          <p>${details}</p>
          <p class="session-host">You joined this session</p>
        </div>
        <a class="button button-light" href="chat.html#${chatTab}">Open chat</a>
      `;

      flipAnimate(pageSections, () => {
        joinedSessionList.appendChild(joinedCard);
        sessionCard.classList.add('is-leaving');
      });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => joinedCard.classList.remove('is-entering'));
      });

      setTimeout(() => {
        const siblings = [...openSessionsList.children].filter((el) => el !== sessionCard);
        flipAnimate([...pageSections, ...siblings], () => sessionCard.remove());
      }, 300);
      return;
    }

    sessionCard.querySelector('.join-confirmation').classList.add('is-visible');
    const statusBadge = sessionCard.querySelector('.status');
    statusBadge.textContent = `Joined · ${statusBadge.textContent}`;
    const chatLink = document.createElement('a');
    chatLink.className = 'button button-light';
    chatLink.href = `chat.html#${sessionCard.dataset.chatTab}`;
    chatLink.textContent = 'Open chat';
    button.replaceWith(chatLink);
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