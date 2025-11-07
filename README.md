# 💬 Groq Chatbot Admin 

Sistem **Chatbot Admin** sederhana yang terintegrasi dengan **Groq API (Llama 3.1 8B Instant)**.  
Dibangun menggunakan **Node.js + Express.js + EJS + MySQL (XAMPP)**, dengan tampilan **Tailwind CSS (CDN)**.

---

## 🚀 Fitur Utama

- 💬 Chatbot cerdas menggunakan **Groq API** (`llama-3.1-8b-instant`)
- 🗄️ Database MySQL untuk menyimpan riwayat pesan
- 🎨 UI minimalis, dinamis, responsif tanpa gradient
- 🧑‍💼 Admin panel menggunakan EJS templating
- 🔐 File `.env` untuk menyimpan API key dengan aman
- ⚡ Server menggunakan Express.js
- 🧰 Terintegrasi penuh dengan XAMPP (localhost MySQL)

---

## 🛠️ Teknologi yang Digunakan

| Komponen | Teknologi |
|-----------|------------|
| Backend | Node.js, Express.js |
| Frontend | EJS, Tailwind CSS (CDN) |
| Database | MySQL (via XAMPP) |
| API AI | Groq API (Llama 3.1 8B Instant) |
| Environment | dotenv |

---

## ⚙️ Instalasi & Konfigurasi

1. Clone Repositori
   git clone https://github.com/fachriramdhan/groq-chatbot-admin.git
   cd groq-chatbot-admin

2. Install Dependency
   npm install

3. Setup Database (MySQL via XAMPP)
   Buka phpMyAdmin → Jalankan query ini:

   CREATE DATABASE chatbot_db;
   USE chatbot_db;
   CREATE TABLE messages (id INT AUTO_INCREMENT PRIMARY KEY, user_message TEXT NOT NULL, bot_response TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

5. Konfigurasi File .env
   Buat file .env di root proyek:

   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=chatbot_db
   PORT=3000

   # Groq API
   GROQ_API_KEY=ISI_API_KEY_KAMU
   GROQ_MODEL=llama-3.1-8b-instant

6. Menjalankan Aplikasi
   node app.js

   Akses di browser:
   👉 http://localhost:3000/chat

---

🧩 Contoh Interaksi Chatbot
1. Ketik pesan kamu di kolom input
2. Tekan tombol kirim
3. Chatbot akan memberikan respon cerdas menggunakan model Llama 3.1 - 8B Instant (Groq)
4. Semua riwayat tersimpan di MySQL

🧱 Desain UI
Dibangun dengan Tailwind CSS (CDN) tanpa gradient.
Desain minimalis, modern, dan interaktif dengan animasi transisi halus.

