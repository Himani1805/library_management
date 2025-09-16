import { bookModel } from "../models/books.model.js";

async function addBook(request, response, next) {
  try {
    const { title, author, coverImage, availability } = request.body;

    if(!title || !author || !coverImage || !availability) {
      return response.status(400).json({
        message: "title, author, coverImage and availability is required. ",
      });
    }

    const book = await bookModel.findOne({ title });

    if(book) {
      return response.status(400).json({ message: "book is already exist. " });
    }

    const newBook = new bookModel({ title, author, coverImage, availability });

    await newBook.save();

    return response.status(201).json({ message: "Book added successfully." });
  } catch (error) {
    console.log("error from addBook", error);
    return response.status(400).json({ message: "Book could not be added." });
  }
}

async function books(request, response, next) {
  try {
    const data = await bookModel.find()
    if(!data){
      return response.status(404).json({ message: "Books not found. "});
    }
    return response.status(200).json({ data });
    
  } catch (error) {
    console.log("error from books", error);
    return response.status(400).json({ message: "Error in book controller" });
  }
}

async function updateBook(request, response, next) {
  try {
    const { id } = request.params;
    if(!id){
      return response.status(400).json({ message: "Book id is required. " });
    }
    const data = await bookModel.findByIdAndUpdate(id, request.body, { new: true });
    return response.status(200).json(data);
  } catch (error){
    console.log("error from updateBok", error);
    return response.status(400).json({ message: "book is not updated" });
  }
}

async function deleteBook(request, response, next) {
  try {
    const { id } = request.params;
    if(!id){
      return response.status(400).json({ message: "Book id is required. " });
    }
    const data = await bookModel.findByIdAndDelete(id);
    if (!data) {
      return response.status(404).json({ message: "Delete operation is failed. " });
    }
    return response
      .status(200)
      .json({ msg: "User deleted successfully." }, data);
  } catch (error) {
    console.log("error from deletebook", error);
    return response.status(400).json({ message: "book is not deleted" });
  }
}

export { addBook, books, updateBook, deleteBook };
