# This is Library Management System project

## Authors of the project: 
Lavish Mittal
Oskar Prusinowski 
Mehul Sinha
Ngoc Phuong TRAN
Sunil Kumar


# Library Management System (HTML/CSS/JS)

A modern, multi-page **Library Management System** built using only **HTML, CSS, and Vanilla JavaScript**.  
It includes authentication, dashboard stats, book catalog with cover images, search & filters, borrowing/return flow, borrowing history, and a wishlist.

## Features

- **Login & Sign-up**
  - Simple client-side authentication (demo style).
  - Session stored in browser storage.

- **Dashboard**
  - Total books, available books, borrowed count, wishlist count.

- **Book Catalog**
  - Displays all books in the library with cover images.

- **Search & Filter Books**
  - Search by title/author
  - Filter by category and availability status

- **Borrow a Book**
  - Borrow available books
  - Auto due date = 14 days from borrow date

- **Return a Borrowed Book**
  - Return borrowed books and make them available again

- **Borrowing History**
  - Tracks borrowing events with borrow date and due date

- **Wishlist**
  - Add/remove books you want to borrow later

## Tech Stack

- HTML5
- CSS3 (modern responsive UI)
- Vanilla JavaScript (ES Modules)

No backend. No frameworks.

## Book Cover Images

Book covers are fetched using the **Open Library Covers API** with ISBN-based URLs:  
`https://covers.openlibrary.org/b/isbn/{ISBN}-{size}.jpg` (sizes: S, M, L).  
See Open Library Covers API docs for details.  

> Note: Some ISBNs may not have covers available, so the image can fail to load depending on Open Library.

## Data Storage

This project uses the browser’s `localStorage` to store:
- current logged-in user (session)
- borrowed books
- borrowing history
- wishlist

Because it uses `localStorage`, data persists even after refresh/close/reopen of the browser (until cleared).  

## Project Structure

library-management-system/
├─ index.html # Login
├─ signup.html # Sign-up
├─ dashboard.html # Dashboard
├─ catalog.html # Book Catalog
├─ search.html # Search & Filter
├─ borrow.html # Borrow a Book
├─ return.html # Return Book
├─ history.html # Borrowing History
├─ wishlist.html # Wishlist
└─ assets/
├─ css/
│ └─ style.css # Shared UI styles
└─ js/
├─ data.js # Sample book data + cover URL helper
├─ store.js # localStorage state manager
├─ auth.js # login/signup/logout + route protection
├─ ui.js # sidebar/topbar/toasts + actions
├─ dashboard.js
├─ catalog.js
├─ search.js
├─ borrow.js
├─ return.js
├─ history.js
└─ wishlist.js


## How to Run Locally

### Option 1 (recommended): Use a local server
Because this project uses ES Modules (`type="module"`), it works best via a local server.

**Using VS Code**
1. Install “Live Server”
2. Right click `index.html` → “Open with Live Server”


Then open:
- http://localhost:5500/index.html

### Option 2: Open the HTML file directly
Some browsers restrict ES modules when opening files directly (file://).  
If something doesn’t load, use Option 1.

## Usage

1. Open `index.html`
2. Login or go to **Sign Up**
3. Navigate using the sidebar:
   - Dashboard
   - Catalog
   - Search & Filter
   - Borrow
   - Return
   - History
   - Wishlist

## Reset / Clear App Data

To reset the app:
- Open DevTools → Application → Local Storage → clear, or
- Run in console:
localStorage.clear()


## Roadmap / Improvements (optional)

- Add “Book details” modal on every page
- Add admin page to add/edit/remove books
- Add pagination and sorting
- Add real authentication + backend database

## License

This project is open-source. 
