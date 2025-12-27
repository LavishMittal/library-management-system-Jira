import { coverUrl } from "./data.js";
import { loadState, saveState } from "./store.js";
import { logout } from "./auth.js";

export function mountSidebar(activePage) {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;

  sidebar.innerHTML = `
    <div class="brand">
      <div class="brand-mark">📚</div>
      <div>
        <div class="brand-title">Modern Library</div>
        <div class="brand-sub">Multi-page LMS</div>
      </div>
    </div>

    <ul class="nav-menu">
      ${navItem("dashboard.html", "📊", "Dashboard", activePage)}
      ${navItem("catalog.html", "📖", "Book Catalog", activePage)}
      ${navItem("search.html", "🔍", "Search & Filter", activePage)}
      ${navItem("borrow.html", "🎯", "Borrow a Book", activePage)}
      ${navItem("history.html", "📋", "Borrowing History", activePage)}
      ${navItem("return.html", "↩️", "Return Book", activePage)}
      ${navItem("wishlist.html", "⭐", "Wishlist", activePage)}
      <li class="nav-item"><a class="nav-link" id="logoutLink">🚪 Logout</a></li>
    </ul>
  `;

  document.getElementById("logoutLink").addEventListener("click", () => logout());
}

function navItem(href, icon, label, activePage) {
  const active = activePage === href ? "active" : "";
  return `<li class="nav-item"><a class="nav-link ${active}" href="${href}">${icon} ${label}</a></li>`;
}

export function mountTopbar(title, crumb) {
  const st = loadState();
  const top = document.getElementById("topbar");
  if (!top) return;

  const initials = (st.currentUser?.name || "U")
    .split(" ").filter(Boolean).map(s => s[0]).join("").toUpperCase().slice(0,2);

  top.innerHTML = `
    <div>
      <h1>${escapeHtml(title)}</h1>
      <div class="crumb">${escapeHtml(crumb)}</div>
    </div>
    <div class="user-profile">
      <div class="user-avatar">${escapeHtml(initials || "U")}</div>
      <div>
        <div style="font-weight:900;">${escapeHtml(st.currentUser?.name || "User")}</div>
        <div class="user-email">${escapeHtml(st.currentUser?.email || "")}</div>
      </div>
    </div>
  `;
}

export function showToast(msg, type="info") {
  let wrap = document.querySelector(".toast-wrap");
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.className = "toast-wrap";
    document.body.appendChild(wrap);
  }

  const t = document.createElement("div");
  t.className = `toast ${type}`;
  t.innerHTML = `
    <div class="dot"></div>
    <div style="font-size:13px">${escapeHtml(msg)}</div>
    <button class="close" title="Close">&times;</button>
  `;
  t.querySelector(".close").addEventListener("click", () => t.remove());
  wrap.appendChild(t);

  setTimeout(() => { if (t.parentElement) t.remove(); }, 3500);
}

export function bookCard(book) {
  const badgeClass = book.status === "Available" ? "available" : "borrowed";
  const img = coverUrl(book.isbn, "L");

  return `
    <div class="book-card" data-id="${book.id}">
      <div class="cover-wrap">
        <img src="${img}" alt="${escapeHtml(book.title)} cover" loading="lazy"
             onerror="this.style.display='none';" />
      </div>
      <div class="book-info">
        <div class="book-title">${escapeHtml(book.title)}</div>
        <div class="book-author">by ${escapeHtml(book.author)}</div>
        <div class="book-meta">
          <span class="badge">${escapeHtml(book.category)}</span>
          <span class="badge ${badgeClass}">${escapeHtml(book.status)}</span>
        </div>
      </div>
    </div>
  `;
}

export function borrowBookById(bookId) {
  const st = loadState();
  const book = st.books.find(b => b.id == bookId);
  if (!book) return { ok:false, msg:"Book not found." };
  if (book.status === "Borrowed") return { ok:false, msg:"Already borrowed." };

  const borrowDate = new Date();
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14);

  const record = {
    ...book,
    borrowDate: borrowDate.toLocaleDateString(),
    dueDate: dueDate.toLocaleDateString(),
    status: "Borrowed"
  };

  st.borrowedBooks.push(record);
  st.borrowingHistory.push(record);

  const idx = st.books.findIndex(b => b.id == bookId);
  if (idx !== -1) st.books[idx].status = "Borrowed";

  saveState(st);
  return { ok:true, record };
}

export function returnBookById(bookId) {
  const st = loadState();
  const i = st.borrowedBooks.findIndex(b => b.id == bookId);
  if (i === -1) return { ok:false, msg:"Not currently borrowed." };

  const returned = st.borrowedBooks[i];
  st.borrowedBooks.splice(i, 1);

  const idx = st.books.findIndex(b => b.id == bookId);
  if (idx !== -1) st.books[idx].status = "Available";

  saveState(st);
  return { ok:true, returned };
}

export function addWishlist(bookId) {
  const st = loadState();
  const book = st.books.find(b => b.id == bookId);
  if (!book) return { ok:false, msg:"Book not found." };
  if (st.wishlist.some(b => b.id == bookId)) return { ok:false, msg:"Already in wishlist." };

  st.wishlist.push(book);
  saveState(st);
  return { ok:true };
}

export function removeWishlist(bookId) {
  const st = loadState();
  st.wishlist = st.wishlist.filter(b => b.id != bookId);
  saveState(st);
  return { ok:true };
}

export function escapeHtml(str) {
  return String(str)
    .replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")
    .replaceAll('"',"&quot;").replaceAll("'","&#039;");
}
