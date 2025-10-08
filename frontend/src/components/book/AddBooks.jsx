import React, { useState } from "react";
import { BookPlus, FileText } from "lucide-react";

const AddBooks = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    coverImage: "",
    bookFile: null,
    bookFileUrl: "",
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
      const file = files[0];
      setFormData({
        ...formData,
        bookFile: file,
        bookFileUrl: URL.createObjectURL(file),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    console.log("Book Added:", formData);
  };

  const handleViewPdf = () => {
    if (formData.bookFileUrl) {
      window.open(formData.bookFileUrl, "_blank");
    } else {
      alert("Please upload a PDF first!");
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-50 px-4 py-6">
      {/* Container: responsive flex */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 w-full max-w-5xl">
        
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
                name="uploadBook"
                accept=".pdf"
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
              />
              {formData.bookFile && (
                <div className="mt-2 flex items-center text-sm text-gray-600">
                  <FileText className="w-4 h-4 mr-2 text-cyan-600" />
                  {formData.bookFile.name}
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

        {/* Right: Preview Section */}
        <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between">
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

          {/* Book Info */}
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {formData.title || "Book Title"}
            </h3>
            <p className="text-sm text-gray-600">
              {formData.author || "Author Name"}
            </p>
          </div>

          {/* View Book PDF Button */}
          <button
            type="button"
            onClick={handleViewPdf}
            className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition font-medium shadow-md"
          >
            View Book PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBooks;
