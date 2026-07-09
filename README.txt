ABC Ambulance LLC — Static HTML Website
========================================

This is a plain HTML / CSS / JavaScript version of the site. No build step or
server is required — just open the files in a browser or host the folder on any
static web host.

FOLDER STRUCTURE
----------------
  index.html        Home page
  about.html        About page
  services.html     Services page
  contact.html      Contact page (with working demo form)
  css/
    styles.css      All styling (red / white / blue theme)
  js/
    main.js         Shared header + footer, mobile menu, service cards, form
  assets/           <-- ALL IMAGES ARE HERE
    star-of-life.png     Star of Life logo symbol
    logo-abc.png         ABC wordmark (color)
    logo-abc-white.png   ABC wordmark (white / reversed)
    hero-crew.jpg        Home hero + About story photo
    emt-portrait.jpg     EMT portrait (home page)
    ambulance.jpg        Ambulance photo (services page)

HOW TO VIEW
-----------
Simplest: double-click index.html to open it in your browser.

Note: the pages fetch nothing external except Google Fonts and the map embed,
but because the header/footer are injected by JavaScript, some browsers block
file:// pages from loading js/main.js. If the header/footer don't appear, run a
tiny local server instead:

  cd abc-ambulance-html
  python3 -m http.server 8000

Then open http://localhost:8000 in your browser.

EDITING
-------
- Colors / fonts / spacing: css/styles.css (see the :root block at the top).
- Navigation, footer, service list: js/main.js (edit the navLinks / services arrays).
- Page text: the individual .html files.
- Images: drop replacements into the assets/ folder using the same file names.
