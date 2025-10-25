import React, { useState, useEffect, useRef, useCallback, useContext } from "react";
import {
  BookOpenText,
  Star,
  FileSearch2,
  SquarePen,
  Trash,
  DollarSign,
} from "lucide-react";
import apiClient from "../../utils/apiClient";
import { useNavigate } from "react-router-dom";
import useAuth from "../../utils/hooks/useAuth";
import AddBooks from "./AddBooks";
import { BookContext } from "../../context/BookProvider";

/**
 * ViewBooks.jsx
 * - Debounced search (500ms)
 * - Paginated fetch with limit
 * - Throttle "Load More" to 1s between clicks
 * - Loader while fetching
 */

const DEFAULT_LIMIT = 12;

const Spinner = () => (
  <div className="flex items-center justify-center py-6">
    <svg className="animate-spin h-8 w-8 text-cyan-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  </div>
);

const ViewBooks = () => {
  const { books, setBooks } = useContext(BookContext);
  // const [books, setBooks] = useState([]);
  const { authData } = useAuth();
  const isAdmin = authData?.user?.role === "admin";
  // const userId = authData?.user?._id;
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(DEFAULT_LIMIT);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const lastLoadMoreTs = useRef(0);
  const navigate = useNavigate();

  // Keep track of purchased book ids in local state so UI updates quickly.
  const [purchasedIds, setPurchasedIds] = useState(new Set());

  // Debounce searchTerm → debouncedSearch (500ms)
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 500);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setBooks([]);
    fetchBooks({ page: 1, replace: true, search: debouncedSearch });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // fetch when page changes (except initial page change handled by above effect)
  useEffect(() => {
    if (page === 1) return;
    fetchBooks({ page, replace: false, search: debouncedSearch });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // fetchBooks function
  const fetchBooks = useCallback(
    async ({ page = 1, replace = false, search = "" } = {}) => {
      // set appropriate loader
      if (page === 1 && replace) setLoading(true);
      else setLoadingMore(true);

      try {
        const res = await apiClient.get("/books", {
          params: { page, limit, search },
        });

        console.log("response purchase ID - ", res.data?.purchasedBookIds);


        const result = res.data?.data ?? [];
        // if first page and replace true -> replace list
        setBooks(prev => (page === 1 ? result : [...prev, ...result]));

        // if fewer items than limit => no more pages
        if (!result || result.length < limit) setHasMore(false);
        else setHasMore(true);

        // if server returns user's purchased books as well, update purchasedIds
        // (Optional) If API returns purchasedIds inside payload, map them.
        if (res.data?.purchasedBookIds) {
          setPurchasedIds(new Set(res.data.purchasedBookIds));
        }
      } catch (err) {
        console.error("Error fetching books:", err?.response?.data ?? err.message);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [limit]
  );

  // Throttled load more (1s throttle)
  const handleLoadMore = () => {
    const now = Date.now();
    if (now - lastLoadMoreTs.current < 1000) return; // throttle 1s
    lastLoadMoreTs.current = now;
    if (!hasMore) return;
    setPage(prev => prev + 1);
  };

  // Delete book (admin)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await apiClient.delete(`/books/${id}`);
      setBooks(prev => prev.filter(b => b._id !== id));
    } catch (err) {
      console.error("Delete error:", err?.response?.data ?? err.message);
      alert(err?.response?.data?.message || "Could not delete book");
    }
  };

  // Navigate to view page (for all users) - backend will control access to PDF
  const handleView = (book) => {
    navigate(`/books/view/${book._id}`);
  };

  // Edit (admin)
  const handleEdit = (book) => {
    navigate(`/books/edit/${book._id}`);
  };

  // Buy → navigate to payment page
  const handlePayment = (book) => {
    navigate(`/books/payment/${book._id}`);
  };

  // After dummy payment, backend will add book to user's purchasedBooks
  // We provide PaymentDummy component (see separate file) that calls /books/purchase/:id
  console.log("Render Books State - ", books);

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 justify-between">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-md w-full sm:max-w-md border focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        <div className="flex items-center gap-3">
          {!isAdmin && (
            <button
              onClick={() => navigate("/mybooks")}
              className="px-4 py-2 rounded-md bg-cyan-600 text-white hover:bg-cyan-700"
            >
              My Books
            </button>
          )}
          {isAdmin && (
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition"
            >
              + Add Book
            </button>
          )}
        </div>
      </div>
      {/* Add Book Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <AddBooks onClose={() => setShowAddModal(false)} />
          </div>
        </div>
      )}

      {loading && <Spinner />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => {
          console.log("Book.id - ", book._id);
          const isPurchased = purchasedIds.has(book._id) || book.isPurchasedByCurrentUser; // backend-friendly flag
          return (
            <div key={book._id} className="bg-white rounded-xl shadow p-4 flex flex-col">
              <img
                src={book?.coverImage ?? "/src/assets/book-icon.png"}
                alt={book.title}
                className="w-full h-40 object-cover rounded"
              />

              <div className="mt-3 flex-1">
                <h3 className="font-semibold text-md text-gray-900">{book.title}</h3>
                <p className="text-sm text-gray-600">{book.author}</p>

                <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{(book.rating ?? (Math.random() * (5 - 3.5) + 3.5)).toFixed(1)}</span>
                  <span className="mx-1">/</span>
                  <span>{book.reviews ?? 5}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                {!isAdmin && (
                  <>
                    {!isPurchased ? (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleView(book)}
                          className="text-cyan-600 font-medium"
                        >
                          {"₹" + parseFloat(book.price).toFixed(2)}
                        </button>
                        <button
                          onClick={() => handlePayment(book)}
                          className="px-3 py-2 rounded-md text-white bg-black shadow"
                        >
                          Buy Now
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleView(book)}
                        className="px-3 py-2 rounded-md text-white bg-black shadow"
                      >
                        View PDF
                      </button>
                    )}
                  </>
                )}

                {isAdmin && (
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleView(book)} title="View" className="text-cyan-600">
                      <FileSearch2 />
                    </button>

                    <button onClick={() => handleEdit(book)} title="Edit" className="text-gray-600">
                      <SquarePen />
                    </button>

                    <button onClick={() => handleDelete(book._id)} title="Delete" className="text-red-600">
                      <Trash />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {loadingMore && <Spinner />}

      {hasMore && !loading && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition disabled:opacity-60"
            disabled={loadingMore}
          >
            Load More
          </button>
        </div>
      )}

      {!loading && books.length === 0 && (
        <div className="text-center py-12 text-gray-500">No books found.</div>
      )}
    </div>
  );
};

export default ViewBooks;
