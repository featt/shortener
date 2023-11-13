import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { getById, shortUrl } from "./controllers/url.controller.js";
import connectDB from "./db/index.js";
import "dotenv/config";

const PORT = process.env.PORT || 3000;
const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);
connectDB();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.post("/short", shortUrl);

app.get("/s/:id", getById);

app.listen(PORT, () => {
  console.log(`Server start on ${PORT} port`);
});
