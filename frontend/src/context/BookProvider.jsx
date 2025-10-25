import React, { useState } from 'react'
import { createContext } from 'react';

export const BookContext = createContext(null);

function BookProvider({ children }) {
    const [books, setBooks] = useState([]);
    return <BookContext.Provider value={{ books, setBooks }}>{children}</BookContext.Provider>;
}

export default BookProvider;
