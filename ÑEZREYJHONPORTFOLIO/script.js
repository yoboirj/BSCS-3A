/**
 * Portfolio Hub Directory
 * Edit PORTFOLIOS below to add/remove/update card content.
 */

const PORTFOLIOS = [
  {
    name: "Ñez Reyjhon — Main Portfolio",
    description:
      "Personal portfolio featuring selected front-end work, UI builds, and project case studies.",
    category: "Personal",
    tech: ["HTML", "CSS", "JavaScript"],
    url: "https://example.com",
  },
  {
    name: "UI Case Studies",
    description:
      "A focused portfolio of UI/UX experiments, components, and responsive layout explorations.",
    category: "UI/UX",
    tech: ["Figma", "Design Systems", "Accessibility"],
    url: "https://example.com",
  },
  {
    name: "Full-Stack Showcase",
    description:
      "End-to-end apps with authentication, APIs, and deployment—built for real-world use cases.",
    category: "Full-Stack",
    tech: ["React", "Node.js", "PostgreSQL"],
    url: "https://example.com",
  },
  {
    name: "Freelance Collection",
    description:
      "A curated set of client projects across landing pages, business sites, and ecommerce.",
    category: "Client Work",
    tech: ["WordPress", "SEO", "Performance"],
    url: "https://example.com",
  },
  {
    name: "Mobile & Cross-Platform",
    description:
      "Apps and prototypes designed for mobile-first experiences and cross-platform builds.",
    category: "Mobile",
    tech: ["React Native", "Expo", "TypeScript"],
    url: "https://example.com",
  },
  {
    name: "Data Visualization Lab",
    description:
      "Interactive dashboards, charts, and data-driven storytelling projects for the web.",
    category: "Data Viz",
    tech: ["D3.js", "Charts", "APIs"],
    url: "https://example.com",
  },
];

function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

function matchesSearch(item, query) {
  if (!query) return true;
  const haystack = normalize(
    [
      item.name,
      item.description,
      item.category,
      ...(Array.isArray(item.tech) ? item.tech : []),
    ].join(" ")
  );
  return haystack.includes(query);
}

function createChip(text, { accent = false } = {}) {
  const chip = document.createElement("span");
  chip.className = accent ? "chip chip--accent" : "chip";
  chip.textContent = text;
  return chip;
}

function createCard(item) {
  const card = document.createElement("article");
  card.className = "card";

  const top = document.createElement("div");
  top.className = "card-top";

  const titleWrap = document.createElement("div");

  const title = document.createElement("h3");
  title.className = "card-title";
  title.textContent = item.name;

  const kicker = document.createElement("div");
  kicker.className = "card-kicker";
  kicker.textContent = item.category || "Portfolio";

  titleWrap.appendChild(title);
  titleWrap.appendChild(kicker);

  top.appendChild(titleWrap);

  const desc = document.createElement("p");
  desc.className = "card-desc";
  desc.textContent = item.description || "";

  const chips = document.createElement("div");
  chips.className = "chips";

  if (item.category) chips.appendChild(createChip(item.category, { accent: true }));
  (Array.isArray(item.tech) ? item.tech : []).slice(0, 6).forEach((t) => {
    chips.appendChild(createChip(t));
  });

  const actions = document.createElement("div");
  actions.className = "card-actions";

  const link = document.createElement("a");
  link.className = "card-link";
  link.href = item.url || "#";
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Visit portfolio";
  link.setAttribute("aria-label", `Visit ${item.name}`);

  const meta = document.createElement("div");
  meta.className = "card-meta";
  const techCount = Array.isArray(item.tech) ? item.tech.length : 0;
  meta.textContent = techCount ? `${techCount} tech tags` : "External link";

  actions.appendChild(link);
  actions.appendChild(meta);

  card.appendChild(top);
  card.appendChild(desc);
  card.appendChild(chips);
  card.appendChild(actions);

  return card;
}

function renderDirectory(list) {
  const cardsEl = document.getElementById("cards");
  const emptyEl = document.getElementById("empty");
  if (!cardsEl || !emptyEl) return;

  cardsEl.innerHTML = "";

  if (!list.length) {
    emptyEl.hidden = false;
    return;
  }

  emptyEl.hidden = true;
  const frag = document.createDocumentFragment();
  list.forEach((item) => frag.appendChild(createCard(item)));
  cardsEl.appendChild(frag);
}

function updateMetrics(list) {
  const el = document.getElementById("metric-count");
  if (el) el.textContent = String(list.length);
}

function init() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const searchEl = document.getElementById("search");
  const queryFromUrl = new URLSearchParams(window.location.search).get("q") || "";
  if (searchEl) searchEl.value = queryFromUrl;

  const query = normalize(searchEl?.value || "");
  const filtered = PORTFOLIOS.filter((p) => matchesSearch(p, query));
  updateMetrics(PORTFOLIOS);
  renderDirectory(filtered);

  searchEl?.addEventListener("input", () => {
    const q = normalize(searchEl.value);
    const next = PORTFOLIOS.filter((p) => matchesSearch(p, q));
    renderDirectory(next);

    const url = new URL(window.location.href);
    if (q) url.searchParams.set("q", q);
    else url.searchParams.delete("q");
    window.history.replaceState({}, "", url);
  });
}

document.addEventListener("DOMContentLoaded", init);

