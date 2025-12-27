import { requireAuth } from "./auth.js";
import { mountSidebar, mountTopbar } from "./ui.js";
import { loadState } from "./store.js";

requireAuth();
mountSidebar("history.html");
mountTopbar("Library Management System", "Borrowing History");

const tbody = document.getElementById("tbody");
const st = loadState();

if (st.borrowingHistory.length === 0){
  tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--muted);">No borrowing history yet</td></tr>`;
} else {
  tbody.innerHTML = st.borrowingHistory.slice().reverse().map(r => `
    <tr>
      <td>${r.title}</td>
      <td>${r.author}</td>
      <td>${r.borrowDate}</td>
      <td>${r.dueDate}</td>
      <td><span class="badge borrowed">Borrowed</span></td>
    </tr>
  `).join("");
}
