import { requireAuth } from "./auth.js";
import { mountSidebar, mountTopbar, showToast, addWishlist } from "./ui.js";
import { loadState } from "./store.js";
import { coverUrl } from "./data.js";

requireAuth();
mountSidebar("search.html");
mountTopbar("Library Management System", "Search & Filter");

const qEl = document.getElementById("q");
const catEl = document.getElementById("cat");
const stEl = document.getElementById("st");
const grid = document.getElementById("grid");

function card(book){
  const badgeClass = book.status === "Available" ? "available" : "borrowed";
  return `
    <div class="book-card" data-id="${book.id}">
      <div class="cover-wrap">
        <img src="${coverUrl(book.isbn,"L")}" alt="${book.title} cover" loading="lazy" onerror="this.style.display='none';"/>
      </div>
      <div class="book-info">
        <div class="book-title">${book.title}</div>
        <div class="book-author">by ${book.author}</div>
        <div class="book-meta">
          <span class="badge">${book.category}</span>
          <span class="badge ${badgeClass}">${book.status}</span>
        </div>
        <div class="book-actions">
          <button class="btn btn-small btn-secondary" data-action="wish">Wishlist</button>
          <a class="btn btn-small btn-ghost" href="catalog.html" style="text-decoration:none;display:inline-flex;align-items:center;justify-content:center;">Catalog</a>
        </div>
      </div>
    </div>
  `;
}

function render(){
  const st = loadState();
  const q = (qEl.value || "").toLowerCase().trim();
  const cat = catEl.value || "";
  const status = stEl.value || "";

  const results = st.books.filter(b => {
    const matchQ = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
    const matchC = !cat || b.category === cat;
    const matchS = !status || b.status === status;
    return matchQ && matchC && matchS;
  });

  if (results.length === 0){
    grid.innerHTML = `<div class="panel">No results found.</div>`;
    return;
  }

  grid.innerHTML = results.map(card).join("");

  grid.querySelectorAll("[data-action='wish']").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.closest(".book-card").getAttribute("data-id");
      const res = addWishlist(id);
      if (!res.ok) return showToast(res.msg || "Could not add.", "error");
      showToast("Added to wishlist.", "success");
    });
  });
}

[qEl, catEl, stEl].forEach(el => el.addEventListener("input", render));
[qEl, catEl, stEl].forEach(el => el.addEventListener("change", render));
render();
