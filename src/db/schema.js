import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  id: String,
  longUrl: String,
  shortUrl: String,
});

const UrlModel = mongoose.model("urls", urlSchema);

export default UrlModel;
