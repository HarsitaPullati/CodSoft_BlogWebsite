// ---------- Safety check: is posts.js loaded? ----------
if (typeof posts === 'undefined') {
  alert('posts.js was not found. Check that it is in the same folder as index.html and has no typing mistakes.');
}

// ---------- Settings ----------
const PAGE_SIZE = 4;           // articles shown at first and after each "Load more"
let visibleCount = PAGE_SIZE;
const filters = { category: 'All', tag: '', query: '' };

function $(id) {
  return document.getElementById(id);
}

// ---------- Mobile menu ----------
$('menuBtn').addEventListener('click', function () {
  $('nav').classList.toggle('open');
});

// ---------- Build one blog card ----------
function cardHTML(post) {
  const tagButtons = post.tags.map(function (t) {
    return '<button class="tag" data-tag="' + t + '">#' + t + '</button>';
  }).join('');

  return '<div class="card">' +
    '<a href="post.html?id=' + post.id + '">' +
      imageTag(post.image, 'thumb', post.title) +
    '</a>' +
    '<div class="body">' +
      '<span class="cat">' + post.category + '</span>' +
      '<h3><a href="post.html?id=' + post.id + '">' + post.title + '</a></h3>' +
      '<p>' + post.excerpt + '</p>' +
      '<small>' + post.date + '</small>' +
      '<div class="tags">' + tagButtons + '</div>' +
    '</div>' +
  '</div>';
}

// ---------- Featured posts ----------
$('featured').innerHTML = posts
  .filter(function (p) { return p.featured; })
  .map(cardHTML)
  .join('');

// ---------- Category buttons ----------
const categories = ['All'];
posts.forEach(function (p) {
  if (!categories.includes(p.category)) {
    categories.push(p.category);
  }
});

function drawCategories() {
  $('categories').innerHTML = categories.map(function (c) {
    const active = (c === filters.category) ? ' active' : '';
    return '<button class="chip' + active + '" data-cat="' + c + '">' + c + '</button>';
  }).join('');
}

// ---------- Show the filtered list ----------
function render() {
  const query = filters.query.toLowerCase();

  const matches = posts.filter(function (p) {
    const okCategory = filters.category === 'All' || p.category === filters.category;
    const okTag = filters.tag === '' || p.tags.includes(filters.tag);
    const okSearch = p.title.toLowerCase().includes(query) ||
                     p.excerpt.toLowerCase().includes(query);
    return okCategory && okTag && okSearch;
  });

  $('grid').innerHTML = matches.slice(0, visibleCount).map(cardHTML).join('');
  $('empty').hidden = matches.length > 0;
  $('loadMore').hidden = visibleCount >= matches.length;   // hide when nothing more to load

  // Message shown while a tag filter is active
  $('tagInfo').hidden = (filters.tag === '');
  $('tagInfo').innerHTML = 'Showing tag: #' + filters.tag +
                           ' <button class="tag" id="clearTag">Clear</button>';

  drawCategories();
}

// ---------- Events ----------
$('search').addEventListener('input', function () {
  filters.query = $('search').value;
  visibleCount = PAGE_SIZE;
  render();
});

$('categories').addEventListener('click', function (e) {
  if (e.target.dataset.cat) {
    filters.category = e.target.dataset.cat;
    visibleCount = PAGE_SIZE;
    render();
  }
});

// Clicking a #tag on any card (featured or list) filters by that tag
function handleTagClick(e) {
  if (e.target.dataset.tag) {
    filters.tag = e.target.dataset.tag;
    visibleCount = PAGE_SIZE;
    render();
    $('posts').scrollIntoView({ behavior: 'smooth' });
  }
}
$('grid').addEventListener('click', handleTagClick);
$('featured').addEventListener('click', handleTagClick);

$('tagInfo').addEventListener('click', function (e) {
  if (e.target.id === 'clearTag') {
    filters.tag = '';
    render();
  }
});

$('loadMore').addEventListener('click', function () {
  visibleCount += PAGE_SIZE;
  render();
});

// ---------- First draw ----------
render();