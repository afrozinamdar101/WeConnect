import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

const app = express();

dotenv.config();

//db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("DB connection error => ", err));

//middleware
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

// autoload routes
// readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));
app.use("/api", authRoutes);

app.post("/api/register", (req, res) => {
  console.log("Register Endpoint =>", req.body);
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is runnning on port ${port}`));
