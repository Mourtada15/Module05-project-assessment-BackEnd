import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import UserRoutes from "./routes/userRoutes.js"
import ProductRoutes from "./routes/productRoutes.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/', UserRoutes);
app.use('/api/product', ProductRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('Connected to db & Listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log("Error connecting to the database:", error.message)
  })