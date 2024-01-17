import express from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";

import { Readable } from "stream";
import CORS from "cors";
const app = express();
app.use(bodyParser.json());

let currentThread;
let assistantId;
app.use(CORS);

app.get("/", (req, res) => {
  res.send("Welcome to Custom ChatGPT...!");
});

let openai = null;

function initializeOpenAI(apiKey) {
  openai = new OpenAI(apiKey);
}

app.post("/sendMessage", async (req, res) => {
  const { messageContent, fileData } = req.body;
  console.log("Message Recieved", messageContent);
  const message = await openai.beta.threads.messages.create(currentThread.id, {
    role: "user",
    content: messageContent,
    // fileData: fileData, // Optional file upload handling
  });

  const run = await openai.beta.threads.runs.create(currentThread.id, {
    assistant_id: assistantId,
    instructions:
      req.body.additionalInstructions || "Provide detailed and rich responses",
  });

  res.send({ runId: run.id });
});

app.get("/getResponse/:runId", async (req, res) => {
  const runId = req.params.runId;
  console.log("Run ID : ", runId);
  const response = await openai.beta.threads.runs.retrieve(
    currentThread.id,
    runId
  );

  if (response.status === "completed") {
    const messages = await openai.beta.threads.messages.list(currentThread.id);
    res.send(messages);
    console.log("Messages :", messages);
  } else {
    res.send({ status: response.status });
  }
});

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
