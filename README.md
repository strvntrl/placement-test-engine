# PathFinder-Dev — Placement Test Engine

> 🔗 **GitHub Repository:** https://github.com/strvntrl/placement-test-engine
> 🚀 **Live Deployment:** _[isi dengan URL Vercel/Netlify/GitHub Pages setelah deploy]_

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

Dalam proses pengembangan proyek ini, saya menggunakan bantuan AI (Claude, Anthropic) untuk membantu debugging, styling, dan penambahan fitur animasi. Seluruh prompt yang digunakan dicantumkan secara lengkap di bawah ini, sesuai urutan penggunaan:

1. `ini kenapa pada saar ukuran mobile gabisa discroll ya` *(disertai lampiran kode `LandingPage.jsx`)*
2. `berikan langsung full kode nya`
3. `ini kenapa tiap isi form autofill lalu stay disitu warna teks nya malah jadi hitam, tapi kalo dilepas dia balik ke warna putih` *(disertai lampiran screenshot)*
4. `ini punya saya tadi` *(disertai lampiran kode CSS autofill)*
5. `tetap aja sama`
6. `: buka DevTools → klik kanan pada input yang lagi terisi (state hitam itu) → Inspect → di panel Computed atau Styles / tidak nemu panel nya`
7. `ini` *(disertai lampiran kode `Input.jsx`)*
8. `desktop`
9. `ini` *(disertai lampiran screenshot DevTools)* / `masalahnya ini di semua kolom`
10. `untuk bagian score nya bisa diindikasikan beda warna untuk range nilai tertentu gitu, trus pesannya juga bedakan`
11. `ini kode nya` *(disertai lampiran kode `ResultCard.jsx`)*
12. `tambahkan animasi keluar masuk pakai css animation` *(disertai lampiran kode `LandingPage.jsx`)*
13. `ini juga` *(disertai lampiran kode `TestPage.jsx`)*
14. `ini juga` *(disertai lampiran kode `ResultPage.jsx`)*
15. `kok pada saat masuk dan keluar itu ada animasi putih nya, hialngkan`
16. `masih ada putih2nya pas transisi`
17. *(disertai lampiran isi file `index.html`)*
18. `oke sudah aman, sekarang animasi untuk ini` *(disertai lampiran kode `ResultPage.jsx`)*
19. `nah sekarang buatkan dokumentasi format markdown` beserta ketentuan dokumentasi sebagai berikut:
    > 1. Apabila peserta menggunakan bantuan Artificial Intelligence (AI) dalam proses pengerjaan, seluruh prompt yang digunakan wajib dicantumkan secara lengkap dalam dokumentasi proyek.
    > 2. Peserta diwajibkan untuk menyusun dokumentasi proyek dalam format Markdown yang mencakup penjelasan mengenai proyek, cara menjalankan aplikasi, serta informasi relevan lainnya.
    > 3. Peserta diwajibkan menyimpan source code secara publik di GitHub DAN melakukan live deployment aplikasi menggunakan layanan seperti Vercel, Netlify, atau GitHub Pages. Tautan repositori GitHub dan URL Live Deployment wajib dicantumkan dengan jelas di bagian paling atas pada file README.md.

**Ringkasan hasil bantuan AI yang diterapkan pada proyek:**

- Perbaikan bug scroll yang terkunci di tampilan mobile (`h-screen overflow-hidden` → dibuat kondisional per breakpoint).
- Diagnosis & penjelasan perilaku warna teks input saat autofill browser (dikonfirmasi merupakan keterbatasan preview UI internal Chrome, bukan bug kode).
- Penambahan indikator warna & pesan dinamis pada `ResultCard.jsx` berdasarkan rentang skor.
- Penambahan animasi *entrance/exit* (fade-in-up, page-in, page-out) menggunakan native CSS `@keyframes` pada `LandingPage.jsx`, `TestPage.jsx`, dan `ResultPage.jsx`.
- Perbaikan bug *flash* warna putih saat transisi antar halaman, dengan menambahkan background gelap pada `html`, `body`, `#root`, serta inline style di `index.html` untuk mencegah *Flash of Unstyled Content* (FOUC).
- Penyusunan dokumentasi proyek ini (`README.md`).

---

## 👤 Kontak

Untuk pertanyaan lebih lanjut terkait proyek ini, silakan hubungi melalui tautan repository di atas.
