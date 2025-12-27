import { requireAuth } from "./auth.js";
import { mountSidebar, mountTopbar, showToast, addWishlist } from "./ui.js";
import { loadState } from "./store.js";
import { coverUrl } from "./data.js";

requireAuth();
mountSidebar("catalog.html");
mountTopbar("Library Management System", "Book Catalog");

const st = loadState();
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
          <a class="btn btn-small btn-ghost" href="borrow.html" style="text-decoration:none;display:inline-flex;align-items:center;justify-content:center;">Borrow page</a>
        </div>
      </div>
    </div>
  `;
}

grid.innerHTML = st.books.map(card).join("");

grid.querySelectorAll("[data-action='wish']").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const id = btn.closest(".book-card").getAttribute("data-id");
    const res = addWishlist(id);
    if (!res.ok) return showToast(res.msg || "Could not add.", "error");
    showToast("Added to wishlist.", "success");
  });
});
