import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import dotenv from "dotenv";
import CORS from "cors";
// Initialize environment variables
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(CORS());

const openai = new OpenAI({
  apiKey: "YOUR OPENAI KEY", // set your openai key
});

app.get("/", (req, res) => {
  res.send("Welcome to Custom ChatGPT...!");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
