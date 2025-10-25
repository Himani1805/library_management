import React, { useState } from "react";
// import AddBooks from "../components/book/AddBooks";
import ViewBooks from "../components/book/ViewBooks";
import useAuth from "../utils/hooks/useAuth";

const Books = () => {
  const { authData } = useAuth();
  const isAdmin = authData?.user?.role === "admin";
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="w-full px-6 py-4 relative">
      {/* <div className="flex justify-between items-center mb-6">
        {isAdmin && (
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition"
          >
            + Add Book
          </button>
        )}
      </div> */}

      <ViewBooks />
      {/* 
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
      )} */}
    </div>
  );
};

export default Books;