import React from "react";
import Footer from "../components/common/Footer";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">

      {/* About Section */}
      <main className="flex-grow bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Heading */}
          <h1 className="text-4xl font-bold text-center text-cyan-800 mb-6">
            📖 About Tranzo
          </h1>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Welcome to our Library Management System! Our mission is to make
            reading, learning, and accessing knowledge easier for everyone.  
            From managing books to keeping track of your reading journey, we
            bring everything at your fingertips.
          </p>

          {/* 3-Column Highlights */}
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
              <h2 className="text-xl font-semibold text-cyan-700 mb-3">
                📚 Huge Collection
              </h2>
              <p className="text-gray-600">
                Thousands of books across genres including science, history,
                fiction, non-fiction, and academic resources.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
              <h2 className="text-xl font-semibold text-cyan-700 mb-3">
                👩‍🎓 Student Friendly
              </h2>
              <p className="text-gray-600">
                Easy to borrow, track, and manage your reading list anytime.
                Designed for students, by students.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
              <h2 className="text-xl font-semibold text-cyan-700 mb-3">
                🌐 Digital Access
              </h2>
              <p className="text-gray-600">
                Access resources and manage your library account online anytime,
                anywhere.
              </p>
            </div>
          </div>

          {/* Our Mission */}
          <div className="mt-16 bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-cyan-800 mb-4 text-center">
              🎯 Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
              Our mission is to create a hub of knowledge where students and
              book lovers can discover, learn, and grow. We aim to bridge the
              gap between traditional libraries and modern digital tools by
              offering a seamless library management experience.  
              We believe books are not just resources—they are gateways to
              imagination, creativity, and lifelong learning.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;

