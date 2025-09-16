import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Background Image */}
            <img
                src="https://res.cloudinary.com/dgbymqjtk/image/upload/v1757854368/BannerDashboard_uj4tpr.jpg"
                alt="Library background"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                    Get better read on the world
                </h1>
                <p className="text-xl sm:text-2xl md:text-3xl text-white max-w-3xl mb-8 italic font-light">
                    "Libraries change lives for the better. A library is not a luxury but one of the necessities of life."
                </p>
                <Link to="/signup"
                    className="mt-8 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105">
                    Explore Our Collection
                </Link>
            </div>
            {/* Global style to remove scrollbar */}
            <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
      `}</style>
        </div>
    )
}

export default Home;
