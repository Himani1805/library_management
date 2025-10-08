import express from 'express';
import {getAllSettings, updateLibrary, updateLoan, updateNotification } from '../controllers/settings.controller.js'

const settingsRouter = express.Router()

settingsRouter.use("/", getAllSettings);
settingsRouter.patch("/library", updateLibrary )
settingsRouter.patch("/loan", updateLoan )
settingsRouter.patch("/:bookId/rating", updateNotification )

export { settingsRouter };
