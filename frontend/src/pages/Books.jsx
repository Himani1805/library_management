import React from 'react'
import AddBooks from '../components/book/AddBooks';
import ViewBooks from '../components/book/ViewBooks';
import EditBooks from '../components/book/EditBooks';
import { Routes, Route } from 'react-router-dom';

const Books = () => {
  return (
    <div className='w-full flex flex-col'>
      <Routes>
        <Route path="/addbooks" element={<AddBooks />} />
        <Route path="/viewbooks" element={<ViewBooks />} />
        <Route path="/editbooks" element={<EditBooks />} />
      </Routes>
    </div>
  )
}

export default Books;
