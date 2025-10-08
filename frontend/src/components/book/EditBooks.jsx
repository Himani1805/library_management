import React, { useState, useEffect } from "react";
import { BookOpenCheck } from "lucide-react";
import { useParams } from "react-router-dom";

const EditBooks = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    coverImage: "",
    bookFile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "coverImage" && files.length > 0) {
      const file = files[0];
      setFormData({
        ...formData,
        coverImage: URL.createObjectURL(file),
      });
    } else if (name === "uploadBook" && files.length > 0) {
      setFormData({
        ...formData,
        bookFile: files[0],
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("Updated Book:", formData.coverImage);
    console.log("Title:", formData.title);
    console.log("Author:", formData.author);
    console.log("Cover Image Preview:", formData.coverImage);
    console.log("Book PDF File:", formData.bookFile?.name);

  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <BookOpenCheck className="w-8 h-8 text-cyan-600 mr-2" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Edit Book
          </h2>
        </div>

        {/* Book Cover Preview */}
        <div className="flex justify-center mb-4">
          {formData.coverImage ? (
            <img
              src={formData.coverImage}
              alt="Book Cover"
              className="w-28 h-36 object-cover rounded-lg shadow-md"
            />
          ) : (
            <div className="w-28 h-36 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleUpdate} className="space-y-4">
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

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cover Image URL
            </label>
            <input
              type="text"
              name="coverImage"
              accept="image/*"
              onChange={handleChange}
              placeholder="Paste image link"
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            />
          </div>

          {/* Upload Book PDF*/}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Book (PDF)
            </label>
            <input
              type="file"
              name="uploadBook"
              accept=".pdf"
              onChange={handleChange}
              placeholder="Upload Book Pdf"
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            />
             {formData.bookFile && (
              <div className="mt-2 flex items-center text-sm text-gray-600">
                <FileText className="w-4 h-4 mr-2 text-cyan-600" />
                {formData.bookFile.name}
              </div>
            )}
          </div>
          {/* Update Button */}
          <button
            type="submit"
            className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition font-medium shadow-md"
          >
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBooks;
