import { SAMPLE_BOOKS } from "./data.js";

const KEY = "lms_state_v1";

export function defaultState() {
  return {
    currentUser: null,
    books: JSON.parse(JSON.stringify(SAMPLE_BOOKS)),
    borrowedBooks: [],
    borrowingHistory: [],
    wishlist: []
  };
}

export function loadState() {
  const raw = localStorage.getItem(KEY); // persists across sessions [web:68]
  if (!raw) return defaultState();

  const data = JSON.parse(raw);
  const st = defaultState();

  st.currentUser = data.currentUser || null;
  st.borrowedBooks = data.borrowedBooks || [];
  st.borrowingHistory = data.borrowingHistory || [];
  st.wishlist = data.wishlist || [];

  // Keep catalog stable (sample books), but reapply borrowed status
  const borrowedIds = new Set(st.borrowedBooks.map(b => b.id));
  st.books.forEach(b => {
    if (borrowedIds.has(b.id)) b.status = "Borrowed";
  });

  return st;
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify({
    currentUser: state.currentUser,
    borrowedBooks: state.borrowedBooks,
    borrowingHistory: state.borrowingHistory,
    wishlist: state.wishlist
  }));
}

export function clearState() {
  localStorage.removeItem(KEY);
}
