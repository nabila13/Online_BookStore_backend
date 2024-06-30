import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://salimanabu13:wgu8ydmewjbLQwpD@cluster0.nimprq0.mongodb.net/bookshelf"
    )
    .then(() => {
      console.log("DB connected to backend");
    });
};

// mongodb + srv://salimanabu13:wgu8ydmewjbLQwpD@cluster0.nimprq0.mongodb.net/bookshelf

// wgu8ydmewjbLQwpD
