import { requireAuth } from "./auth.js";
import { mountSidebar, mountTopbar, showToast, returnBookById } from "./ui.js";
import { loadState } from "./store.js";

requireAuth();
mountSidebar("return.html");
mountTopbar("Library Management System", "Return Book");

const tbody = document.getElementById("tbody");

function render(){
  const st = loadState();
  if (st.borrowedBooks.length === 0){
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--muted);">No borrowed books to return</td></tr>`;
    return;
  }

  tbody.innerHTML = st.borrowedBooks.map(b => `
    <tr>
      <td>${b.title}</td>
      <td>${b.author}</td>
      <td>${b.borrowDate}</td>
      <td>${b.dueDate}</td>
      <td><button class="btn btn-small btn-success" data-id="${b.id}">Return</button></td>
    </tr>
  `).join("");

  tbody.querySelectorAll("button[data-id]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const res = returnBookById(id);
      if (!res.ok) return showToast(res.msg || "Return failed.", "error");
      showToast(`Returned "${res.returned.title}"`, "success");
      render();
    });
  });
}
render();
