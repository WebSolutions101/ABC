/*
 * ABC Ambulance LLC — static site behavior
 * Injects the shared header + footer, handles the mobile menu,
 * active nav state, contact form, and footer year.
 */

// --- Inline icon set (lucide-style) ---
const icons = {
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  mapPin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>',
  award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  siren: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 18v-6a5 5 0 1 1 10 0v6"/><path d="M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1z"/><path d="M21 12h1"/><path d="M18.5 4.5 18 5"/><path d="M2 12h1"/><path d="M12 2v1"/><path d="m4.929 4.929.707.707"/><path d="M12 12v6"/></svg>',
  activity: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg>',
  heartPulse: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/></svg>',
  stethoscope: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 2v2"/><path d="M5 2v2"/><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/></svg>',
  hospital: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6v4"/><path d="M14 14h-4"/><path d="M14 18h-4"/><path d="M14 8h-4"/><path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h2"/><path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18"/></svg>',
  calendarClock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h5"/><path d="M17.5 17.5 16 16.3V14"/><circle cx="16" cy="16" r="6"/></svg>',
  baby: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/></svg>',
  ambulance: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 10H6"/><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14"/><path d="M8 8v4"/><path d="M9 18h6"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>',
};

const navLinks = [
  { href: "index.html", label: "Home" },
  { href: "about.html", label: "About" },
  { href: "services.html", label: "Services" },
  { href: "contact.html", label: "Contact" },
];

function currentPage() {
  const path = window.location.pathname.split("/").pop();
  return path && path.length ? path : "index.html";
}

function logoMarkup(reverse) {
  return `
    <span class="logo${reverse ? " reverse" : ""}">
      <img src="assets/star-of-life.png" alt="Star of Life" />
      <span class="logo-word">ABC<span class="sub">AMBULANCE</span></span>
    </span>`;
}

function renderHeader() {
  const el = document.getElementById("site-header");
  if (!el) return;
  const page = currentPage();
  const links = navLinks
    .map(
      (l) =>
        `<a class="nav-link${l.href === page ? " active" : ""}" href="${l.href}">${l.label}</a>`
    )
    .join("");
  const mobileLinks = navLinks
    .map(
      (l) =>
        `<a class="nav-link${l.href === page ? " active" : ""}" href="${l.href}">${l.label}</a>`
    )
    .join("");

  el.innerHTML = `
    <div class="utility-bar">
      <div class="container">
        <a class="utility-emergency" href="tel:911">${icons.phone} Emergency: Call 9-1-1</a>
        <a class="utility-dispatch" href="tel:18005550199">${icons.phone} Dispatch: 1-800-555-0199</a>
      </div>
    </div>
    <div class="main-nav">
      <div class="container">
        <a href="index.html" aria-label="ABC Ambulance home">${logoMarkup(false)}</a>
        <nav class="nav-links">
          ${links}
          <a class="btn btn-accent btn-lg" href="contact.html">Contact Us ${icons.chevronRight}</a>
        </nav>
        <button class="menu-toggle" id="menu-toggle" aria-label="Open menu" aria-expanded="false">${icons.menu}</button>
      </div>
    </div>
    <div class="mobile-nav" id="mobile-nav">
      <div class="container">
        <nav>
          ${mobileLinks}
          <a class="btn btn-accent btn-lg" href="contact.html">Contact Us</a>
        </nav>
      </div>
    </div>`;

  const toggle = document.getElementById("menu-toggle");
  const mobile = document.getElementById("mobile-nav");
  toggle.addEventListener("click", () => {
    const isOpen = mobile.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function renderFooter() {
  const el = document.getElementById("site-footer");
  if (!el) return;
  el.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-about">
          <a href="index.html" aria-label="ABC Ambulance home">${logoMarkup(true)}</a>
          <p>Reliable emergency and non-emergency medical transportation, delivered with compassion and clinical excellence.</p>
          <div class="footer-social">
            <a href="#" aria-label="Facebook">${icons.facebook}</a>
            <a href="#" aria-label="Instagram">${icons.instagram}</a>
          </div>
        </div>
        <div class="footer-col">
          <h3>Company</h3>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h3>Contact</h3>
          <ul class="footer-contact">
            <li>${icons.phone}<span>Dispatch (24h): <a href="tel:18005550199">1-800-555-0199</a></span></li>
            <li>${icons.mail}<a href="mailto:info@abcambulance.com">info@abcambulance.com</a></li>
            <li>${icons.mapPin}<span>1200 Lifeline Drive, Suite 100<br>Phoenix, AZ 85001</span></li>
          </ul>
        </div>
        <div class="footer-col">
          <h3>In an Emergency</h3>
          <p style="margin-top:1rem;font-size:0.9rem;color:rgba(247,249,252,0.8)">For a life-threatening emergency, always call 9-1-1 first.</p>
          <a class="footer-emergency-btn" href="tel:911">${icons.phone} Call 9-1-1</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; <span id="footer-year"></span> ABC Ambulance LLC. All rights reserved.</p>
        <p>HIPAA Privacy Practices &middot; Notice of Privacy</p>
      </div>
    </div>`;
  const year = document.getElementById("footer-year");
  if (year) year.textContent = new Date().getFullYear();
}

// --- Data-driven service cards ---
const services = [
  { icon: "siren", title: "Emergency 9-1-1 Response", description: "Rapid, around-the-clock 9-1-1 emergency response staffed by certified paramedics and EMTs ready to deliver life-saving pre-hospital care." },
  { icon: "activity", title: "Advanced Life Support (ALS)", description: "Paramedic-level care with cardiac monitoring, advanced airway management, and medication administration for critically ill or injured patients." },
  { icon: "heartPulse", title: "Basic Life Support (BLS)", description: "Compassionate EMT-led transport and monitoring for patients who need stable, professional medical care during transit." },
  { icon: "stethoscope", title: "Specialty & Critical Care Transport", description: "Specialized teams and equipment for high-acuity patients requiring intensive monitoring between hospitals and facilities." },
  { icon: "hospital", title: "Interfacility Transport", description: "Safe, coordinated transfers between hospitals, skilled nursing centers, dialysis, and rehabilitation facilities." },
  { icon: "calendarClock", title: "Event Standby Services", description: "On-site medical coverage for concerts, sporting events, festivals, and community gatherings of any size." },
  { icon: "baby", title: "Pediatric Services", description: "Specially trained crews and pediatric-sized equipment to care for our youngest patients with gentle expertise." },
  { icon: "ambulance", title: "Non-Emergency Transport", description: "Scheduled, comfortable medical transportation for appointments, discharges, and routine care needs." },
];

function serviceCard(s, hoverAccent) {
  return `
    <div class="card${hoverAccent ? "" : " bordered"}">
      <div class="icon-box${hoverAccent ? " hover-accent" : ""}">${icons[s.icon]}</div>
      <h3>${s.title}</h3>
      <p>${s.description}</p>
    </div>`;
}

function renderServices() {
  const homeGrid = document.getElementById("services-grid-home");
  if (homeGrid) homeGrid.innerHTML = services.slice(0, 4).map((s) => serviceCard(s, true)).join("");
  const allGrid = document.getElementById("services-grid-all");
  if (allGrid) allGrid.innerHTML = services.map((s) => serviceCard(s, false)).join("");
}

// --- Contact form ---
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.classList.add("hidden");
    const success = document.getElementById("form-success");
    if (success) success.classList.remove("hidden");
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  renderServices();
  initContactForm();
});
