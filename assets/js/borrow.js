import { requireAuth } from "./auth.js";
import { mountSidebar, mountTopbar, showToast, borrowBookById } from "./ui.js";
import { loadState } from "./store.js";
import { coverUrl } from "./data.js";

requireAuth();
mountSidebar("borrow.html");
mountTopbar("Library Management System", "Borrow a Book");

const grid = document.getElementById("grid");

function card(book){
  const badgeClass = "available";
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
          <span class="badge ${badgeClass}">Available</span>
        </div>
        <div class="book-actions">
          <button class="btn btn-small btn-success" data-action="borrow">Borrow</button>
          <a class="btn btn-small btn-secondary" href="wishlist.html" style="text-decoration:none;display:inline-flex;align-items:center;justify-content:center;">Wishlist</a>
        </div>
      </div>
    </div>
  `;
}

function render(){
  const st = loadState();
  const avail = st.books.filter(b => b.status === "Available");
  if (avail.length === 0){
    grid.innerHTML = `<div class="panel">No available books right now. Return a book to make it available.</div>`;
    return;
  }

  grid.innerHTML = avail.map(card).join("");

  grid.querySelectorAll(".book-card").forEach(el => {
    el.querySelector("[data-action='borrow']").addEventListener("click", (e) => {
      e.stopPropagation();
      const id = el.getAttribute("data-id");
      const res = borrowBookById(id);
      if (!res.ok) return showToast(res.msg || "Borrow failed.", "error");
      showToast(`Borrowed! Due: ${res.record.dueDate}`, "success");
      render();
    });
  });
}

render();
