import express from "express";
import multer from "multer";
import {
  addBook,
  listBook,
  removeBook,
} from "../controllers/bookController.js";

const bookRouter = express.Router();
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

bookRouter.post("/add", upload.single("image"), addBook);
bookRouter.get("/list", listBook);
bookRouter.post("/remove", removeBook);

export default bookRouter;
