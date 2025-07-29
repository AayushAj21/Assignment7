// WikiLite - Minimal Wikipedia-style JS

const articles = [
  {
    id: 'html-basics',
    title: 'HTML Basics',
    sections: [
      {
        heading: 'Introduction',
        content: `HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a webpage using a system of elements and tags.`
      },
      {
        heading: 'Basic Structure',
        content: `<pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Title&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    Content here
  &lt;/body&gt;
&lt;/html&gt;</code></pre>`
      },
      {
        heading: 'Common Tags',
        content: `<ul><li>&lt;h1&gt; to &lt;h6&gt;: Headings</li><li>&lt;p&gt;: Paragraph</li><li>&lt;a&gt;: Link</li><li>&lt;img&gt;: Image</li><li>&lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;: Lists</li></ul>`
      }
    ]
  },
  {
    id: 'css-styling',
    title: 'CSS Styling',
    sections: [
      {
        heading: 'Introduction',
        content: `CSS (Cascading Style Sheets) is used to style and layout web pages. It controls colors, fonts, spacing, and positioning of elements.`
      },
      {
        heading: 'Selectors',
        content: `<ul><li><b>Element selector:</b> <code>p { color: red; }</code></li><li><b>Class selector:</b> <code>.myclass { ... }</code></li><li><b>ID selector:</b> <code>#myid { ... }</code></li></ul>`
      },
      {
        heading: 'Box Model',
        content: `Every element is a rectangle. The box model consists of <b>content</b>, <b>padding</b>, <b>border</b>, and <b>margin</b>.` 
      }
    ]
  },
  {
    id: 'js-functions',
    title: 'JavaScript Functions',
    sections: [
      {
        heading: 'Introduction',
        content: `Functions are blocks of code designed to perform a particular task. They are executed when called.`
      },
      {
        heading: 'Function Declaration',
        content: `<pre><code>function greet(name) {
  return 'Hello, ' + name + '!';
}</code></pre>`
      },
      {
        heading: 'Arrow Functions',
        content: `<pre><code>const add = (a, b) => a + b;</code></pre>`
      }
    ]
  },
  {
    id: 'web-accessibility',
    title: 'Web Accessibility',
    sections: [
      {
        heading: 'Introduction',
        content: `Web accessibility means making websites usable by people of all abilities and disabilities.`
      },
      {
        heading: 'ARIA Roles',
        content: `Accessible Rich Internet Applications (ARIA) roles help assistive technologies understand web content.`
      }
    ]
  }
];

const articleListEl = document.getElementById('article-list');
const mainArticleEl = document.getElementById('main-article');
const tocEl = document.getElementById('toc');
const searchInput = document.getElementById('search-input');

function renderArticleList(filter = '') {
  articleListEl.innerHTML = '';
  const filtered = articles.filter(a => a.title.toLowerCase().includes(filter.toLowerCase()));
  if (filtered.length === 0) {
    articleListEl.innerHTML = '<p>No articles found.</p>';
    return;
  }
  filtered.forEach(article => {
    const div = document.createElement('div');
    div.className = 'collapsible';
    div.innerHTML = `<div class="collapsible-header">${article.title}</div><div class="collapsible-content"><button class="view-full-btn" data-id="${article.id}">View Full Article</button></div>`;
    articleListEl.appendChild(div);
  });
  addCollapsibleEvents();
  addViewFullEvents();
}

function addCollapsibleEvents() {
  document.querySelectorAll('.collapsible-header').forEach(header => {
    header.onclick = function () {
      const parent = header.parentElement;
      parent.classList.toggle('active');
    };
  });
}

function addViewFullEvents() {
  document.querySelectorAll('.view-full-btn').forEach(btn => {
    btn.onclick = function () {
      const id = btn.getAttribute('data-id');
      showArticle(id);
    };
  });
}

function showArticle(id) {
  const article = articles.find(a => a.id === id);
  if (!article) return;
  mainArticleEl.innerHTML = `<h1>${article.title}</h1>`;
  let toc = '<b>Table of Contents</b><ul>';
  article.sections.forEach((section, idx) => {
    mainArticleEl.innerHTML += `<section id="sec-${idx}"><h2>${section.heading}</h2><div>${section.content}</div></section>`;
    toc += `<li><a href="#sec-${idx}">${section.heading}</a></li>`;
  });
  toc += '</ul>';
  tocEl.innerHTML = toc;
  tocEl.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById('home-link').onclick = function() {
  mainArticleEl.innerHTML = '';
  tocEl.classList.remove('active');
  renderArticleList(searchInput.value);
};
document.getElementById('random-link').onclick = function() {
  const idx = Math.floor(Math.random() * articles.length);
  showArticle(articles[idx].id);
};
document.getElementById('categories-link').onclick = function() {
  mainArticleEl.innerHTML = '<h1>Categories</h1><ul><li>HTML</li><li>CSS</li><li>JavaScript</li><li>Accessibility</li></ul>';
  tocEl.classList.remove('active');
};

searchInput.oninput = function() {
  renderArticleList(searchInput.value);
};

// On load
renderArticleList();
