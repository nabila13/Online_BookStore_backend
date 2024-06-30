import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import bookRouter from "./routes/bookRoute.js";
import orderRouter from "./routes/orderRoute.js";
import cartRouter from "./routes/cartRoute.js";

const app = express();
const PORT = process.env.PORT | 3000;

app.use(express.json());
app.use(cors());

connectDB();

app.use("/user", userRouter);
app.use("/images", express.static("uploads"));
app.use("/book", bookRouter);
app.use("/order", orderRouter);
app.use("/cart", cartRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(PORT, () => {
  console.log(`Server Started on http://localhost:${PORT}`);
});
