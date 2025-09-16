import { myBookModel } from "../models/mybooks.model.js";
// import { bookModel } from "../models/book.model.js"; 

async function getuserBook(request, response, next) {
  try {
    // const { userId } = request.user;
    const userId = "689c891ecec586fdc0442d41"
    // console.log("user id", userId)
    const data = await myBookModel.find({ userId }).populate("bookId");
    console.log("my book controller data", data)
    return response.status(200).json({ data });
  } catch (error) {
    console.log("error from userBook", error);
    return response.status(400).json({ message: "Book not found. " });
  }
}

async function addUserBook(request, response, next) {
  try {
    const { bookId } = request.params;
    // const { userId } = request.user;
    const userId = "689c891ecec586fdc0442d41"
    const { status, rating } = request.body;

    if (!userId) {
      return response.status(400).json({
        message: "userId is not aauthenticated. please login first!.... ",
      });
    }
    if (!bookId) {
      return response.status(400).json({
        message: "BookId is required. Kindly pass through URL. ",
      });
    }

    if (!status || !rating) {
      return response.status(400).json({
        message: "status and rating is required. ",
      });
    }

    const book = await myBookModel.findOne({ userId, bookId });
    console.log("add user book", book);

    if (book) {
      return response.status(400).json({ message: "book is already exist. " });
    }

    const newBook = new myBookModel({ userId, bookId, status, rating });

    await newBook.save();

    return response.status(201).json({ message: "Book added successfully." });
  } catch (error) {
    console.log("error from books", error);
    return response.status(400).json({ message: "Error in book controller" });
  }
}

async function updateBookStatus(request, response, next) {
  try {
    const { bookId } = request.params;
    const { status } = request.body;
    // console.log(" bookid", bookId);
    // const validStatuses = ["Want to Read", "Currently Reading", "Read"];
    // if (!validStatuses.includes(status)) {
    //   return response.status(400).json({ message: "Invalid status value" });
    // }

    if (!status) {
      return response.status(400).json({ message: "Status is required" });
    }

    // const exists = await myBookModel.exists({ bookId });
    // console.log("exists", exists);
    // if (!exists) {
    //   return response.status(400).json({ message: "Book  is not exists. " });
    // }

    const data = await myBookModel.findByIdAndUpdate(
      bookId ,
      { status },
      { new: true }
    ).populate("bookId");
    // console.log("data", data);
    if (!data) {
      return response.status(404).json({ message: "Book status is not updated. " });
    }

    return response.status(200).json(data);
  } catch (error) {
    console.log("error from updateBookStatus", error);
    return response.status(400).json({ message: "Error while upadted status" });
  }
}

async function updateBookRating(request, response, next) {
  try {
    const { bookId } = request.params;
    const { rating } = request.body;
    // console.log("rating", request.body)
    if (!rating) {
      return response.status(400).json({ message: "Rating is required" });
    }
    const data = await myBookModel.findByIdAndUpdate(
       bookId ,
      { rating },
      { new: true }
    ).populate("bookId");

    if (!data) {
      return response.status(404).json({ message: "Book rating is not updated. " });
    }

    return response.status(200).json(data);
  } catch (error) {
    console.log("error from deletebook", error);
    return response.status(400).json({ message: "Error while updated status" });
  }
}

export { getuserBook, addUserBook, updateBookStatus, updateBookRating };
