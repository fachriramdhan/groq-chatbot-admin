const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./db");
require("dotenv").config();
const fetch = (...args) =>
  import("node-fetch").then(({ default: f }) => f(...args));

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, "public")));

// ===== ROUTES =====
app.get("/", (req, res) => res.redirect("/chat"));

// Chat UI
app.get("/chat", async (req, res) => {
  // Hapus semua pesan agar setiap refresh halaman kosong
  await db.query("DELETE FROM messages");

  // Setelah kosong, kirim halaman dengan messages kosong
  const [messages] = await db.query(
    "SELECT * FROM messages ORDER BY created_at ASC"
  );

  res.render("chat", { messages });
});

// Chatbot API
app.post("/chat", async (req, res) => {
  const { message } = req.body;
  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  const MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant";

  if (!GROQ_API_KEY)
    return res.status(500).json({ error: "GROQ_API_KEY belum diisi di .env" });

  try {
    // Request ke Groq API
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            {
              role: "system",
              content: "Kamu adalah chatbot toko yang membantu admin.",
            },
            { role: "user", content: message },
          ],
          max_tokens: 200,
        }),
      }
    );

    const data = await response.json();
    const reply =
      data.choices?.[0]?.message?.content || "Tidak ada balasan dari model";

    // Simpan ke database
    await db.query(
      "INSERT INTO messages (user_message, bot_response) VALUES (?, ?)",
      [message, reply]
    );

    res.json({ ok: true, reply });
  } catch (err) {
    console.error("Groq API error:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
