import UrlModel from "../db/schema.js";
import shortid from "shortid";
import { isValidUrl } from "../utils/validate-url.js";

const BASE_SHORT_URL = "http://localhost:3000/s/"

export async function shortUrl(req, res) {
  const { url } = req.body;

  if (!isValidUrl(url)) {
    return res.status(400).send({ message: "Некорректная ссылка" });
  }

  try {
    const existUrl = await UrlModel.findOne({ longUrl: url });

    if (existUrl) {
      const shortUrl = BASE_SHORT_URL + existUrl.id;
      res.send({ shortUrl });
    } else {
      const id = shortid.generate();
      const shortUrl = BASE_SHORT_URL + id;
      const newUrl = new UrlModel({ longUrl: url, id, shortUrl });
      await newUrl.save();
      res.send({ shortUrl });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
}

export async function getById(req, res) {
  const { id } = req.params;
  try {
    const url = await UrlModel.findOne({ id });

    if (url) {
      res.redirect(url.longUrl);
    } else {
      res.send({ message: "Ссылка не найдена" });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
}
