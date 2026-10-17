/* ===================================================================
   DR. SILEYE BA - PORTFOLIO INTERACTIVITY ENGINE
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initScrollSpy();
  initPublicationsEngine();
  initSupervisionTabs();
});

/* ===================================================================
   THEME TOGGLE (Obsidian Dark / Clean Light)
   =================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('sileyeba_theme') || 'dark';
  
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('sileyeba_theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme} theme`);
    });
  }
}

function updateThemeIcon(theme) {
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');
  if (sunIcon && moonIcon) {
    if (theme === 'dark') {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    } else {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    }
  }
}

/* ===================================================================
   MOBILE NAVIGATION
   =================================================================== */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close when clicking link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
}

/* ===================================================================
   SCROLL SPY FOR NAVBAR LINKS
   =================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ===================================================================
   PUBLICATIONS ENGINE (Search, Filter, BibTeX, Sort)
   =================================================================== */
let currentFilter = 'All';
let searchQuery = '';

function initPublicationsEngine() {
  const pubsContainer = document.getElementById('publicationsList');
  const searchInput = document.getElementById('pubsSearchInput');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const pubsCountDisplay = document.getElementById('pubsCount');

  if (!pubsContainer || typeof PUBLICATIONS_DATA === 'undefined') return;

  function renderPublications() {
    let filtered = PUBLICATIONS_DATA.filter(pub => {
      // Type filter
      if (currentFilter !== 'All' && pub.type !== currentFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTitle = pub.title && pub.title.toLowerCase().includes(q);
        const matchesAuthors = pub.authors && pub.authors.toLowerCase().includes(q);
        const matchesVenue = pub.venue && pub.venue.toLowerCase().includes(q);
        const matchesYear = pub.year && pub.year.toString().includes(q);
        return matchesTitle || matchesAuthors || matchesVenue || matchesYear;
      }
      return true;
    });

    // Update count
    if (pubsCountDisplay) {
      pubsCountDisplay.textContent = `Showing ${filtered.length} of ${PUBLICATIONS_DATA.length} publications`;
    }

    if (filtered.length === 0) {
      pubsContainer.innerHTML = `
        <div style="text-align: center; padding: 48px; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <p style="color: var(--text-secondary); font-size: 1.1rem; margin-bottom: 8px;">No publications found matching "${escapeHtml(searchQuery)}"</p>
          <button class="btn btn-secondary" onclick="resetPubFilters()" style="margin-top: 12px;">Clear search & filters</button>
        </div>
      `;
      return;
    }

    pubsContainer.innerHTML = filtered.map(pub => {
      // Highlight Sileye Ba in authors
      let authorsHtml = escapeHtml(pub.authors);
      authorsHtml = authorsHtml.replace(/S\.(\s*)O\.(\s*)Ba/gi, '<mark>S. O. Ba</mark>');
      authorsHtml = authorsHtml.replace(/S\.(\s*)Ba/gi, '<mark>S. Ba</mark>');
      authorsHtml = authorsHtml.replace(/Sileye(\s*)Ba/gi, '<mark>Sileye Ba</mark>');

      const typeClass = `pub-type-${pub.type.toLowerCase()}`;
      const scholarSearchUrl = `https://scholar.google.com/scholar?q=${encodeURIComponent(pub.title)}`;

      return `
        <article class="publication-item" data-id="${pub.id}">
          <div class="pub-meta-row">
            <span class="pub-type-badge ${typeClass}">${pub.type}</span>
            <span class="pub-year">${pub.year || ''}</span>
          </div>
          <h3 class="pub-title">${escapeHtml(pub.title)}</h3>
          <div class="pub-authors">${authorsHtml}</div>
          ${pub.venue ? `<div class="pub-venue">${escapeHtml(pub.venue)}</div>` : ''}
          <div class="pub-actions">
            <button class="pub-btn" onclick="toggleBibtex(${pub.id})">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span>BibTeX</span>
            </button>
            <a href="${scholarSearchUrl}" target="_blank" rel="noopener noreferrer" class="pub-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <span>Google Scholar</span>
            </a>
          </div>
          <div class="bibtex-drawer" id="bibtex-${pub.id}">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--gold-primary); font-weight: 700;">BibTeX Citation</span>
              <button class="pub-btn" onclick="copyBibtex(${pub.id})" style="padding: 2px 8px; font-size: 0.75rem;">Copy</button>
            </div>
            <pre id="bibtex-code-${pub.id}">${escapeHtml(pub.bibtex)}</pre>
          </div>
        </article>
      `;
    }).join('');
  }

  // Filter tab events
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.getAttribute('data-filter');
      renderPublications();
    });
  });

  // Search input events
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderPublications();
    });
  }

  window.resetPubFilters = () => {
    searchQuery = '';
    currentFilter = 'All';
    if (searchInput) searchInput.value = '';
    filterTabs.forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-filter') === 'All');
    });
    renderPublications();
  };

  window.toggleBibtex = (id) => {
    const drawer = document.getElementById(`bibtex-${id}`);
    if (drawer) {
      drawer.classList.toggle('open');
    }
  };

  window.copyBibtex = (id) => {
    const code = document.getElementById(`bibtex-code-${id}`);
    if (code) {
      navigator.clipboard.writeText(code.innerText).then(() => {
        showToast('BibTeX copied to clipboard!');
      }).catch(() => {
        showToast('Citation ready');
      });
    }
  };

  // Initial render
  renderPublications();
}

/* ===================================================================
   SUPERVISION TABS
   =================================================================== */
function initSupervisionTabs() {
  const tabs = document.querySelectorAll('.sup-tab');
  const panels = document.querySelectorAll('.sup-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.style.display = 'none');

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.style.display = 'grid';
      }
    });
  });
}

/* ===================================================================
   TOAST NOTIFICATION
   =================================================================== */
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* Expose copyEmail globally */
window.copyEmail = (email) => {
  navigator.clipboard.writeText(email).then(() => {
    showToast(`Copied ${email} to clipboard!`);
  }).catch(() => {
    showToast(`Email: ${email}`);
  });
};
