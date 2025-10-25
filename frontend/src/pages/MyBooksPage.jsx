import React, { useEffect, useState } from "react";
import apiClient from "../utils/apiClient";
import { useNavigate } from "react-router-dom";

const MyBooksPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPurchasedBooks = async () => {
            try {
                const res = await apiClient.get("/user/me/purchased");
                setBooks(res.data.books);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPurchasedBooks();
    }, []);

    if (loading) return <p className="text-center mt-10">Loading your books...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">My Purchased Books</h2>
            {books.length === 0 ? (
                <p>No books purchased yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {books.map((book) => (
                        <div key={book._id} className="bg-white p-4 shadow rounded">
                            <img
                                src={book.coverImage}
                                alt={book.title}
                                className="w-full h-48 object-cover rounded"
                            />
                            <h3 className="font-semibold mt-2">{book.title}</h3>
                            <button
                                // onClick={() => navigate(`/books/view/${book._id}`)}
                                onClick={() => window.open(`/books/view/${book._id}`, '_new')} // 'rel=noopener noreferrer'
                                className="mt-3 px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
                            >
                                Read PDF
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBooksPage;
