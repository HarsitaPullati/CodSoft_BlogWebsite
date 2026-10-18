const posts = [
  {
    id: 1,
    title: "Getting Started with HTML",
    category: "HTML",
    tags: ["beginner", "web"],
    date: "2026-10-01",
    image: "images/post1",
    featured: true,
    excerpt: "HTML is the skeleton of every web page. Learn the basic tags.",
    content: [
      "HTML stands for HyperText Markup Language. It describes the structure of a page using tags like headings, paragraphs, links and images.",
      "Start with a simple page: add a title, a heading and a paragraph, then open it in your browser."
    ]
  },
  {
    id: 2,
    title: "CSS Flexbox Made Simple",
    category: "CSS",
    tags: ["layout", "beginner"],
    date: "2026-10-03",
    image: "images/post2",
    featured: true,
    excerpt: "Align and space items easily with Flexbox.",
    content: [
      "Flexbox helps you arrange items in a row or column. Set display: flex on a parent and its children line up automatically.",
      "Use justify-content to space items and align-items to center them vertically."
    ]
  },
  {
    id: 3,
    title: "JavaScript Variables and Functions",
    category: "JavaScript",
    tags: ["beginner", "coding"],
    date: "2026-10-05",
    image: "images/post3",
    featured: false,
    excerpt: "Store data and reuse code with variables and functions.",
    content: [
      "Variables store values such as numbers and text. Use let for values that change and const for values that stay the same.",
      "A function is a reusable block of code. You write it once and call it whenever you need it."
    ]
  },
  {
    id: 4,
    title: "Making Websites Responsive",
    category: "CSS",
    tags: ["responsive", "layout"],
    date: "2026-10-07",
    image: "images/post4",
    featured: true,
    excerpt: "Make your site look good on phones and laptops.",
    content: [
      "A responsive site adapts to the screen size. Add the viewport meta tag and use flexible units like percentages and rem.",
      "Media queries let you change the layout at certain screen widths, for example stacking columns on a phone."
    ]
  },
  {
    id: 5,
    title: "Understanding the DOM",
    category: "JavaScript",
    tags: ["dom", "coding"],
    date: "2026-10-09",
    image: "images/post5",
    featured: false,
    excerpt: "How JavaScript reads and changes a web page.",
    content: [
      "The DOM is the page's structure as JavaScript sees it. With document.getElementById you can find any element.",
      "You can then change its text, style or content, which is how pages update without reloading."
    ]
  },
  {
    id: 6,
    title: "Git and GitHub for Beginners",
    category: "Tools",
    tags: ["git", "beginner"],
    date: "2026-10-11",
    image: "images/post6",
    featured: false,
    excerpt: "Save your code history and share projects online.",
    content: [
      "Git tracks changes to your files. GitHub stores your repositories online so others can see your work.",
      "The basic steps are git add, git commit and git push."
    ]
  },
  {
    id: 7,
    title: "Saving Data with Local Storage",
    category: "JavaScript",
    tags: ["storage", "web"],
    date: "2026-10-13",
    image: "images/post7",
    featured: false,
    excerpt: "Keep data in the browser even after a refresh.",
    content: [
      "Local Storage saves small pieces of text in the browser. Use localStorage.setItem to save and getItem to read.",
      "To store lists, convert them with JSON.stringify and read them back with JSON.parse."
    ]
  },
  {
    id: 8,
    title: "Handy VS Code Extensions",
    category: "Tools",
    tags: ["vscode", "productivity"],
    date: "2026-10-15",
    image: "images/post8",
    featured: false,
    excerpt: "Extensions that make coding faster and easier.",
    content: [
      "Live Server reloads your page every time you save. Prettier formats your code neatly.",
      "Install extensions from the Extensions icon on the left side of VS Code."
    ]
  }
];

// ---------- Image helper: tries .jpg, .jpeg, .png, .webp until one loads ----------
function imageTag(path, cls, alt) {
  const name = path.replace('images/', '').replace(/\.\w+$/, '');
  return '<img class="' + cls + '" alt="' + alt + '" data-name="' + name +
         '" data-try="0" src="images/' + name + '.jpg" onerror="nextImage(this)">';
}

function nextImage(img) {
  const types = ['jpg', 'jpeg', 'png', 'webp'];
  const next = Number(img.dataset.try) + 1;
  if (next < types.length) {
    img.dataset.try = next;
    img.src = 'images/' + img.dataset.name + '.' + types[next];
  } else {
    img.onerror = null;          // no file found: show the blue box
    img.removeAttribute('src');
    img.classList.add('missing');
  }
}