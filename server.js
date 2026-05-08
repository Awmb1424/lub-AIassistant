const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const publicPath = __dirname;
const indexPath = path.join(publicPath, "index.html");

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use(express.static(publicPath));

app.get("/", (req, res) => {
  if (!fs.existsSync(indexPath)) {
    return res.status(404).send("index.html not found in project folder");
  }

  res.sendFile(indexPath);
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/analyze-chat", async (req, res) => {
  try {
    const { chatText, groupName } = req.body;

    if (!chatText) {
      return res.status(400).json({
        error: "No chat text provided"
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt = `
You are an AI assistant for summarizing group chats.

Analyze this chat and return ONLY valid JSON.

Format:

{
  "summary": "",
  "tasks": [
    {
      "title": "",
      "source": "",
      "deadline": ""
    }
  ],
  "deadlines": [
    {
      "title": "",
      "date": ""
    }
  ],
  "importantMessages": [
    {
      "title": "",
      "details": ""
    }
  ]
}

Rules:
- If a task has a clear deadline, put it in the task deadline field.
- If a task has no clear deadline, use an empty string "".
- Extract general deadlines into deadlines array.
- Do not invent dates.
- If the chat says today, tomorrow, or next week, convert it based on the message date if possible.
- Keep the original language exactly as it appears in the chat
- Do NOT translate Arabic into English
- If the message is Arabic, return Arabic
- If the message is English, return English
- Keep task titles and important messages close to the original wording

Group Name:
${groupName}

Chat:
${chatText}
`;

    let result;

    try {
      result = await model.generateContent(prompt);
    } catch (err) {
      if (err.status === 503) {
        console.log("Gemini busy... retrying");

        await new Promise(resolve =>
          setTimeout(resolve, 2000)
        );

        result = await model.generateContent(prompt);
      } else {
        throw err;
      }
    }

    const response = await result.response;
    const text = response.text();

    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleanText);

    console.log(parsed);

    res.json(parsed);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "AI analysis failed",
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Project folder: ${publicPath}`);
  console.log(`Index file: ${indexPath}`);
});