import { userModel } from "../models/user.model.js";

async function readAllUsers(request, response, next) {
  try {
    const data = await userModel.find().select("-password");
    return response.status(200).json({ data });

  } catch (error) {
    console.log("Error from ReadAllUser", error);
    return response.status(400).json({ message: "ReadAllUser is failed." });
  }
}

async function readUser(request, response, next) {
  try {
    const { id } = request.params;
    const data = await userModel.findOne({ _id: id }).select("-password")

    return response.status(200).json(data);
  } catch (error) {
    console.log("Error from ReadUser", error);
    return response.status(400).json({ message: "ReadUser is failed." });
  }
}

async function updateUser(request, response, next) {
  try {
    const { id } = request.params;
    const data = await userModel
      .findByIdAndUpdate(id, request.body, { new: true })
      .select("-password");
    return response.status(200).json(data);

  } catch (error) {
    console.log("Error from register", error);
    return response.status(201).json({ message: "UpdateUser is failed." });
  }
}

async function deleteUser(request, response, next) {
  try {
    const { id } = request.params;
    const data = await userModel.findByIdAndDelete(id).select("-password");
    if (!data) {
      return response
        .status(404)
        .json({ message: "User not found. " });
    }
    return response.status(200).json({ msg: "User deleted successfully." }, data);
  } catch (error) {
    console.log("Error from register", error);
    return response.status(400).json({ message: "Register is failed." });
  }
}
const getPurchasedBooks = async (req, res) => {

  // console.log("purchased user book", req.user?.userId);

  try {
    const user = await userModel.findById(req.user?.userId).populate("purchasedBooks");
    // console.log("user - ", user);

    res.json({ books: user.purchasedBooks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { readAllUsers, readUser, updateUser, deleteUser, getPurchasedBooks };
