// Covers: Open Library supports ISBN cover URLs like:
// https://covers.openlibrary.org/b/isbn/{ISBN}-{size}.jpg  [web:26]
export const COVER_SIZE = "L";

export function coverUrl(isbn, size = COVER_SIZE) {
  if (!isbn) return "";
  return `https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg`;
}

export const SAMPLE_BOOKS = [
  { id: 1,  title: "The Great Gatsby",         author: "F. Scott Fitzgerald", category: "Fiction",    isbn: "9780743273565", status: "Available", year: 1925 },
  { id: 2,  title: "To Kill a Mockingbird",    author: "Harper Lee",          category: "Fiction",    isbn: "9780061120084", status: "Available", year: 1960 },
  { id: 3,  title: "A Brief History of Time",  author: "Stephen Hawking",     category: "Science",    isbn: "9780553380163", status: "Available", year: 1988 },
  { id: 4,  title: "1984",                     author: "George Orwell",       category: "Fiction",    isbn: "9780451524935", status: "Available", year: 1949 },
  { id: 5,  title: "The Selfish Gene",         author: "Richard Dawkins",     category: "Science",    isbn: "9780192860927", status: "Available", year: 1976 },
  { id: 6,  title: "Sapiens",                  author: "Yuval Noah Harari",   category: "History",    isbn: "9780062316097", status: "Available", year: 2011 },
  { id: 7,  title: "Thinking, Fast and Slow",  author: "Daniel Kahneman",     category: "Self-Help",  isbn: "9780374275631", status: "Available", year: 2011 },
  { id: 8,  title: "The Code Breaker",         author: "Walter Isaacson",     category: "History",    isbn: "9781982115852", status: "Available", year: 2021 },
  { id: 9,  title: "Clean Code",               author: "Robert C. Martin",    category: "Technology", isbn: "9780132350884", status: "Available", year: 2008 },
  { id: 10, title: "The Pragmatic Programmer", author: "Andrew Hunt",         category: "Technology", isbn: "9780135957059", status: "Available", year: 1999 }
];
