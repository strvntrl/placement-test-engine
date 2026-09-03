# PathFinder-Dev — Placement Test Engine

> 🔗 **GitHub Repository:** https://github.com/strvntrl/placement-test-engine
> 🚀 **Live Deployment:** https://pathfinder-dev.vercel.app/

---

## 📖 Tentang Proyek

**PathFinder-Dev** adalah aplikasi *placement test* berbasis web yang membantu calon peserta menemukan tingkat kemampuan (level) dan program belajar yang paling sesuai di bidang web development, sebelum mereka mendaftar ke program pembelajaran.

Alur penggunaannya:

1. **Landing Page** — Peserta mengisi data diri (nama lengkap, email, nomor WhatsApp, domisili, dan target program).
2. **Test Page** — Peserta mengerjakan 15 soal pilihan ganda seputar HTML, CSS, JavaScript, React, Responsive Design, Git, dan Web Fundamentals. Progres pengerjaan (soal saat ini & jawaban) otomatis tersimpan di browser, sehingga tidak hilang jika halaman di-refresh.
3. **Result Page** — Setelah submit, sistem menghitung skor (0–100), menentukan level (**Beginner**, **Intermediate**, **Advanced**), lalu menampilkan rekomendasi program belajar yang sesuai. Peserta juga bisa langsung menghubungi admin lewat WhatsApp dengan pesan yang sudah otomatis terisi (nama, level, skor, dan program rekomendasi).

### ✨ Fitur Utama

- Form pendaftaran dengan validasi (nama, email, nomor WhatsApp format Indonesia, domisili, target program).
- Placement test interaktif dengan navigasi antar soal, progress bar, dan question navigator.
- Penyimpanan progres otomatis ke `localStorage` (bisa lanjut walau refresh, sebelum submit).
- Perhitungan skor & penentuan level otomatis berdasarkan jawaban benar.
- Rekomendasi program belajar sesuai level hasil tes.
- Integrasi WhatsApp untuk follow-up langsung ke admin.
- Desain responsif (mobile, tablet, desktop) dengan aksen gradasi teal/orange dan efek glassmorphism.
- Animasi transisi halaman dan elemen (fade-in/fade-out) menggunakan CSS murni.

### 🧮 Logika Penilaian

| Skor      | Level        |
|-----------|--------------|
| 0 – 40    | Beginner     |
| 41 – 75   | Intermediate |
| 76 – 100  | Advanced     |

Skor dihitung dengan rumus:

```
skor = (jumlah jawaban benar / total soal) × 100
```

---

## 🛠️ Tech Stack

| Kategori         | Teknologi                          |
|-------------------|-------------------------------------|
| Framework         | React 19 (Vite)                    |
| Routing           | React Router DOM v7                |
| Styling           | Tailwind CSS v4                    |
| State management  | React Hooks (`useState`, custom hook `useQuiz`) |
| Persistensi data  | Browser `localStorage`             |
| Linting           | ESLint                             |

---

## 📁 Struktur Proyek

```
placement-test-engine/
├── public/                 # Aset statis (favicon, logo, icons)
├── src/
│   ├── assets/              # Gambar/asset lokal
│   ├── components/          # Komponen UI (Button, Input, Select, QuestionCard, dll.)
│   ├── data/
│   │   ├── questions.json   # Bank soal placement test
│   │   └── programs.json    # Data program belajar per level
│   ├── hooks/
│   │   └── useQuiz.js       # Logic utama pengerjaan & submit quiz
│   ├── pages/
│   │   ├── LandingPage.jsx  # Halaman form pendaftaran
│   │   ├── TestPage.jsx     # Halaman pengerjaan soal
│   │   └── ResultPage.jsx   # Halaman hasil tes
│   ├── utils/
│   │   ├── storage.js       # Wrapper localStorage (user, progress, result)
│   │   ├── quizUtils.js     # Perhitungan skor, level, rekomendasi
│   │   └── whatsapp.js      # Generator link WhatsApp
│   ├── App.jsx               # Routing utama
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles & animasi CSS
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Cara Menjalankan Aplikasi

### Prasyarat

- [Node.js](https://nodejs.org/) versi 18 ke atas
- npm (sudah termasuk saat instal Node.js)

### Langkah-langkah

1. **Clone repository**

   ```bash
   git clone https://github.com/strvntrl/placement-test-engine.git
   cd placement-test-engine
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **(Opsional) Konfigurasi environment variable**

   Aplikasi ini mendukung nomor WhatsApp admin yang bisa dikustomisasi lewat environment variable. Buat file `.env` di root proyek:

   ```env
   VITE_WHATSAPP_NUMBER=6281234567890
   ```

   Jika tidak diatur, aplikasi akan menggunakan nomor default yang sudah ditentukan di kode.

4. **Jalankan development server**

   ```bash
   npm run dev
   ```

   Aplikasi akan berjalan di `http://localhost:5173` (port dapat berbeda tergantung ketersediaan).

5. **Build untuk production**

   ```bash
   npm run build
   ```

   Hasil build akan tersimpan di folder `dist/`.

6. **Preview hasil build**

   ```bash
   npm run preview
   ```

7. **(Opsional) Menjalankan linter**

   ```bash
   npm run lint
   ```

---

## 🌐 Deployment

Proyek ini dapat di-deploy menggunakan layanan static hosting seperti **Vercel**, **Netlify**, atau **GitHub Pages**, karena aplikasi ini murni client-side (React + Vite) tanpa backend server.

Contoh deploy ke Vercel:

1. Import repository ini ke [Vercel](https://vercel.com/).
2. Framework preset: **Vite**.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. (Opsional) Tambahkan environment variable `VITE_WHATSAPP_NUMBER` di pengaturan project Vercel.

---

## 🤖 Penggunaan Artificial Intelligence (AI)

Dalam proses pengembangan proyek ini, saya menggunakan bantuan AI (Claude, Anthropic) untuk membantu debugging, styling, dan penambahan fitur animasi. Seluruh prompt yang digunakan dicantumkan secara lengkap di bawah ini:

`Bantu saya membangun sebuah aplikasi web **Multi-Step Placement Test Engine** untuk mini project seleksi Front-End Developer. Aplikasi ini harus dibuat menggunakan **React + Vite dan Tailwind CSS**, tanpa Next.js, Remix, shadcn/ui, DaisyUI, Material UI, Bootstrap, atau library UI component lainnya. Semua tampilan dibuat sendiri menggunakan React dan Tailwind CSS. Konsep aplikasinya adalah placement test yang terdiri dari tiga tahap, yaitu pengisian biodata, pengerjaan quiz, dan halaman hasil. Buat landing page yang modern, clean, profesional, dan responsive dengan nuansa aplikasi edtech. Pada halaman awal, user dapat mengisi nama, email, nomor WhatsApp, domisili, dan target program. Form harus memiliki validasi yang baik dan mudah dipahami. Setelah data valid, simpan biodata ke localStorage dan arahkan user ke halaman `/test`. Pada halaman `/test`, tampilkan 15 soal pilihan ganda yang berasal dari mock data JSON lokal. Setiap soal memiliki pertanyaan, empat pilihan jawaban, jawaban benar, dan kategori. User harus bisa berpindah antar soal menggunakan tombol Previous/Next maupun nomor soal. Tampilkan progress bar yang menunjukkan progress pengerjaan secara real-time serta indikator soal yang sudah dan belum dijawab. Jawaban user dan posisi terakhir harus otomatis tersimpan di localStorage sehingga ketika browser di-refresh, progress quiz tidak hilang. Gunakan React Context atau custom hook seperti `useQuiz` untuk mengelola state quiz agar logic tidak bercampur dengan tampilan. Buat komponen React yang modular dan reusable seperti QuestionCard, OptionButton, ProgressBar, QuestionNavigator, Input, Button, ConfirmationModal, ResultCard, dan RecommendationCard. Struktur folder juga dibuat rapi dan mudah dikembangkan. Setelah semua soal selesai, user dapat melakukan submit. Sebelum submit, tampilkan confirmation modal. Jika masih ada soal yang belum dijawab, berikan informasi kepada user tetapi tetap izinkan untuk submit. Setelah submit, hitung skor berdasarkan jumlah jawaban benar dari 15 soal. Gunakan pembagian level 0–40% sebagai Beginner, 41–75% sebagai Intermediate, dan 76–100% sebagai Advanced. Buat halaman `/result` yang menampilkan nama user, skor, level, deskripsi hasil, serta rekomendasi program belajar yang sesuai dengan levelnya. Data rekomendasi disimpan dalam file JSON terpisah dan minimal memiliki program untuk Beginner, Intermediate, dan Advanced. Tambahkan tombol WhatsApp CTA yang membuat pesan otomatis berdasarkan nama, skor, level, dan program yang direkomendasikan. Nomor WhatsApp sebaiknya disimpan melalui environment variable agar mudah diganti. Perhatikan juga UX dan edge cases. Aplikasi harus responsive terutama untuk mobile, memiliki loading dan error state yang sesuai, validasi form yang intuitif, transition sederhana, focus state, serta menangani kondisi seperti user membuka `/test` tanpa mengisi biodata atau membuka `/result` tanpa menyelesaikan test. Hindari unnecessary re-render dan buat state management seefisien mungkin. Tampilan harus terasa seperti aplikasi yang benar-benar siap digunakan, bukan sekadar prototype tugas seleksi. Buat juga README.md yang menjelaskan project, fitur, teknologi yang digunakan, struktur project, cara menjalankan aplikasi, scoring logic, penggunaan localStorage, deployment, dan bagian **AI Assistance** untuk mencantumkan prompt yang digunakan selama proses development. Pada bagian paling atas README, sediakan tempat untuk `Live Demo URL` dan `GitHub Repository URL`, tetapi jangan membuat URL palsu. Terakhir, pastikan aplikasi benar-benar runnable dan siap di-push ke GitHub serta di-deploy ke Vercel atau Netlify. Pastikan `npm install`, `npm run dev`, dan `npm run build` berjalan tanpa error. Flow utama harus berjalan dengan baik dari **Landing → Biodata → Quiz → Submit → Result → WhatsApp CTA**. Fokus pada clean code, reusable components, responsive design, dan UX yang polished.`
