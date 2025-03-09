import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Define Schema & Model
const SubmissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  aiResponse: String,
});

const Submission = mongoose.model("Submission", SubmissionSchema);

// AI Processing Function
const analyzeMessage = async (message) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Analyze the sentiment of this message: "${message}"` }],
        max_tokens: 50,
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return "Analysis unavailable";
  }
};

// POST Endpoint - Save Form Submission with AI Analysis
app.post("/api/submit", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const aiResponse = await analyzeMessage(message);

    const newSubmission = new Submission({ name, email, message, aiResponse });
    await newSubmission.save();

    res.status(201).json({ success: true, message: "Form submitted", data: newSubmission });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// GET Endpoint - Retrieve All Submissions
app.get("/api/submissions", async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
