import { requireAuth } from "./auth.js";
import { mountSidebar, mountTopbar } from "./ui.js";
import { loadState } from "./store.js";

requireAuth();
mountSidebar("dashboard.html");
mountTopbar("Library Management System", "Dashboard");

const st = loadState();
document.getElementById("total").textContent = st.books.length;
document.getElementById("available").textContent = st.books.filter(b => b.status === "Available").length;
document.getElementById("borrowed").textContent = st.borrowedBooks.length;
document.getElementById("wish").textContent = st.wishlist.length;
