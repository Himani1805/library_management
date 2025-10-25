import React, { useState, useEffect, useContext } from "react";
import { BookPlus } from "lucide-react";
import apiClient from "../../utils/apiClient";
import { BookContext } from "../../context/BookProvider";
const AddBooks = () => {
  const { books, setBooks } = useContext(BookContext);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    coverImage: null,
    price: "",
    availability: true,
    content: null,
  });

  // title, author, coverImage, availability

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  async function handleAdd(event) {
    event.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("isbn", formData.isbn);
    data.append("price", formData.price);
    data.append("availability", formData.availability);
    data.append("coverImage", formData.coverImage);
    data.append("content", formData.content);

    try {
      const response = await apiClient.post("/books", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = response.data;

      console.log("response", response);
      console.log("result", result);

      if (response.status === 201) {
        console.log("Book added successfully:", result.data);
        setBooks([...books, result?.data]);
        console.log("Add Book Success - ", result.message);
        console.log("****");
        window.alert("Book added successfully!");

      }
      console.log("Book Added form data:", formData);

    } catch (error) {
      console.error("Error adding book:", error);
    }
  }

  return (
    <div className="w-full min-h-screen/2 flex justify-center items-center bg-gray-50 px-4 py-6">
      {/* Container: responsive flex */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 w-full max-w-xl">
        {/* Left: Add Book Form */}
        <div className="flex-1 bg-white shadow-lg rounded-2xl p-6">
          {/* Header */}
          <div className="w-full flex items-center justify-center mb-6">
            <BookPlus className="w-7 h-7 text-cyan-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">
              Add New Book
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleAdd} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter book title"
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Author
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author's name"
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
              />
            </div>

            {/* ISBN */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ISBN
              </label>
              <input
                type="text"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                placeholder="Enter ISBN's number"
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price (Rs.)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price of the book"
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
              />
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cover Image
              </label>
              <input
                type="file"
                name="coverImage"
                accept="image/*"
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
              />
            </div>

            {/* Upload Book PDF */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Book (PDF)
              </label>
              <input
                type="file"
                name="content"
                accept=".pdf"
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
              />
              {formData.content && (
                <div className="mt-2 flex items-center text-sm text-gray-600">
                  {formData.content.name}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition font-medium shadow-md"
            >
              Add Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBooks;
