import React, { useState } from "react";
import { BookOpenText, Star } from "lucide-react";

const ViewBooks = () => {
  const books = [
    {
      title: "The Invisible Life of Addie LaRue",
      author: "V.E. Schwab",
      coverImage:
        "https://m.media-amazon.com/images/I/81r3FVfNG3L._AC_UF1000,1000_QL80_.jpg",
      rating: 4.17,
      reviews: "1m",
    },
    {
      title: "Project Hail Mary",
      author: "Andy Weir",
      coverImage:
        "https://m.media-amazon.com/images/I/81r3FVfNG3L._AC_UF1000,1000_QL80_.jpg",
      rating: 4.5,
      reviews: "946k",
    },
    {
      title: "The House in the Cerulean Sea",
      author: "T.J. Klune",
      coverImage:
        "https://m.media-amazon.com/images/I/81r3FVfNG3L._AC_UF1000,1000_QL80_.jpg",
      rating: 4.37,
      reviews: "896k",
    },
    {
      title: "The Midnight Library",
      author: "Matt Haig",
      coverImage:
        "https://m.media-amazon.com/images/I/81r3FVfNG3L._AC_UF1000,1000_QL80_.jpg",
      rating: 3.98,
      reviews: "2m",
    },
    {
      title: "I’m Glad My Mom Died",
      author: "Jennette McCurdy",
      coverImage:
        "https://m.media-amazon.com/images/I/81r3FVfNG3L._AC_UF1000,1000_QL80_.jpg",
      rating: 4.44,
      reviews: "1m",
    },
  ];


  const [visibleCount, setVisibleCount] = useState(4);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <div className="w-full h-screen bg-gray-50 px-6 py-10 flex flex-col">
      {/* Heading */}
      <div className="w-full flex items-center justify-center mb-6">
        <BookOpenText className="w-8 h-8 text-cyan-600 mr-2" />
        <h2 className="text-2xl font-semibold text-gray-800">View All Books</h2>
      </div>

      {/* Scrollable Book Grid */}
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <div
              key={index}
              className="flex flex-col justify-between bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              {/* Cover Image */}
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-56 object-cover"
              />

              {/* Book Details */}
              <div className="p-3 flex flex-col flex-grow">
                <h3 className="font-medium text-gray-800 text-lg leading-tight line-clamp-2 h-12">
                  {book.title}
                </h3>
                <p className="text-gray-600 text-sm font-medium mb-2 truncate h-5">
                  {book.author}
                </p>

                {/* Rating */}
                <div className="flex items-center text-xs text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  {book.rating} · {book.reviews}
                </div>

                {/* Button aligned at bottom */}
                <div className="mt-auto">
                  <button
                    type="button"
                    className="w-full mt-4 bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition font-medium shadow-md"
                  >
                    View Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View More Button */}
      {visibleCount < books.length && (
        <div className="flex justify-center">
          <button
            onClick={handleViewMore}
            className="px-6 py-2 mt-10 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition font-medium"
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewBooks;
