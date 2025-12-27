import { requireAuth } from "./auth.js";
import { mountSidebar, mountTopbar, showToast, removeWishlist, addWishlist } from "./ui.js";
import { loadState } from "./store.js";
import { coverUrl } from "./data.js";

requireAuth();
mountSidebar("wishlist.html");
mountTopbar("Library Management System", "Wishlist");

const grid = document.getElementById("grid");

function render(){
  const st = loadState();

  if (st.wishlist.length === 0){
    grid.innerHTML = `<div class="panel">Your wishlist is empty. Go to Catalog and add books.</div>`;
    return;
  }

  grid.innerHTML = st.wishlist.map(b => `
    <div class="book-card" data-id="${b.id}">
      <div class="cover-wrap">
        <img src="${coverUrl(b.isbn,"L")}" alt="${b.title} cover" loading="lazy" onerror="this.style.display='none';"/>
      </div>
      <div class="book-info">
        <div class="book-title">${b.title}</div>
        <div class="book-author">by ${b.author}</div>
        <div class="book-meta">
          <span class="badge">${b.category}</span>
          <span class="badge ${b.status === "Available" ? "available" : "borrowed"}">${b.status}</span>
        </div>
        <div class="book-actions">
          <button class="btn btn-small btn-danger" data-action="remove">Remove</button>
          <button class="btn btn-small btn-secondary" data-action="add" style="display:none;"></button>
        </div>
      </div>
    </div>
  `).join("");

  grid.querySelectorAll("[data-action='remove']").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.closest(".book-card").getAttribute("data-id");
      removeWishlist(id);
      showToast("Removed from wishlist.", "info");
      render();
    });
  });
}
render();
