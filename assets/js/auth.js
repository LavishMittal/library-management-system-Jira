import { loadState, saveState, clearState } from "./store.js";

export function requireAuth() {
  const st = loadState();
  if (!st.currentUser) {
    window.location.href = "index.html";
    return null;
  }
  return st;
}

export function login(email, password) {
  if (!email || !password) return { ok: false, msg: "Email and password required." };

  const st = loadState();
  st.currentUser = { email, name: email.split("@")[0] };
  saveState(st);
  return { ok: true };
}

export function signup(name, email, password, confirm) {
  if (!name || !email || !password) return { ok: false, msg: "All fields are required." };
  if (password !== confirm) return { ok: false, msg: "Passwords do not match." };

  const st = loadState();
  st.currentUser = { email, name };
  saveState(st);
  return { ok: true };
}

export function logout() {
  clearState();
  window.location.href = "index.html";
}
