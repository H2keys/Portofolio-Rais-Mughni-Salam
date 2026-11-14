# Porto Portfolio — Master Action Plan Minggu Pertama

**Owner:** H2Keys, Mahasiswa Informatika UNSAP  
**Durasi:** 7 hari, sekitar 5 jam fokus per hari  
**Target minggu:** Foundation (Design System + Hooks), UI Components (Button + Responsive Image), lalu Integration & Testing.

**Kalender:** tanggal sesi saat plan dibuat adalah Sabtu, 17 Oktober 2026; besok adalah Minggu, 18 Oktober. Judul Hari 1–7 memakai urutan weekday yang diminta (Monday–Sunday). Jika mulai literal besok, jalankan task Hari 1 pada Minggu dan geser label weekday; jika ingin mulai hari Senin, mulai 19 Oktober.

## Catatan Sebelum Mulai

Di workspace `C:\Project\Porto\docs\improvement` saat rencana ini dibuat, baru tersedia `README_FIRST.md`, `SUMMARY.txt`, dan `DOWNLOAD_GUIDE.txt`. `ACTION_PLAN.md`, `READY_TO_USE_CONFIGS.md`, `PORTO_IMPROVEMENT_GUIDE.md`, `VSCODE_PROMPTS.md`, dan `INDEX.md` belum ditemukan di workspace maupun folder Downloads yang diperiksa.

Nama section referensi di bawah diambil dari daftar “Included” dalam `README_FIRST.md`, bukan diverifikasi terhadap isi code block `READY_TO_USE_CONFIGS.md`. **Sebelum copy-paste, pulihkan `READY_TO_USE_CONFIGS.md` dari paket unduhan dan cocokkan heading/kode. Jangan menebak atau menyalin kode dari ringkasan.** Task Hari 1 pagi menyediakan waktu khusus untuk itu.

Rencana menyesuaikan Porto yang ada: React 18, Vite 6, Tailwind CSS 4, GSAP + `@gsap/react`, Framer Motion, Lenis, i18next, dan Vitest sudah terpasang. `src/components/common/Button.jsx`, `src/hooks/useReducedMotion.js`, `src/hooks/useLenis.js`, `src/components/projects/ProjectCard.jsx`, serta `src/components/projects/ProjectGallery.jsx` sudah ada. Gunakan/perluas berkas tersebut; jangan buat duplikat.

Tailwind di proyek ini memakai plugin Vite dan `@import 'tailwindcss'` dari CSS. Jadi “Tailwind Config Update” dari dokumentasi harus diadaptasi ke `@theme` Tailwind v4 di CSS, bukan membuat `tailwind.config.js` Tailwind v3. Tidak perlu `npm install` untuk task minggu ini: SEO dapat dibuat tanpa library tambahan dan GSAP sudah ada.

**Ritme waktu:** Pagi 2 × 60 menit, Siang 2 × 60 menit, Sore 1 × 60 menit. Sisipkan jeda 10–15 menit di antara task; jeda bukan alasan memperpanjang task melewati 60 menit. Jika mentok, tulis blocker dan lanjutkan task berikutnya.

**Root project:** `C:\Project\Porto`

## HARI 1 (MONDAY) — Design Tokens dan Baseline

### PAGI — 2 jam

**Task 1 — Pulihkan dan validasi dokumentasi sumber (60 menit)**
- **File/folder:** salin file dokumentasi yang hilang; target `C:\Project\Porto\docs\improvement\READY_TO_USE_CONFIGS.md`, `ACTION_PLAN.md`, `PORTO_IMPROVEMENT_GUIDE.md`, `VSCODE_PROMPTS.md`, `INDEX.md`.
- **Lokasi:** `C:\Project\Porto\docs\improvement\`.
- **Dokumentasi:** `README_FIRST.md` → “What You Have”, “File Locations”; `DOWNLOAD_GUIDE.txt` → “Files Included”.
- **READY ref:** `READY_TO_USE_CONFIGS.md` → “Design Tokens & Theme”. Gunakan heading ini untuk memastikan file yang dipulihkan adalah sumber kode yang benar.
- **Langkah:** 1. Cari ZIP/download asli, bukan membuat ulang dokumen dari ringkasan. 2. Salin lima file yang hilang ke folder di atas. 3. Pastikan nama file, ukuran bukan 0 byte, serta heading “Design Tokens & Theme”, “SEO Hook”, “Scroll Animation Hook”, “Button Component”, dan “Responsive Image Component” ada.
- **Sukses:** tersedia delapan file paket yang disebutkan H2Keys, semua terbuka, dan heading code reference bisa dicari.
- **Troubleshooting:** jika file belum ada di Downloads, cek folder ekstraksi/riwayat unduhan. Jangan lanjut copy-paste kode sampai sumber ditemukan; task berikut tetap bisa memakai audit repo.

**Task 2 — Catat baseline proyek dan perubahan yang sudah ada (60 menit)**
- **File/folder:** buat `C:\Project\Porto\docs\improvement\WEEK_1_BASELINE.md`; simpan screenshot awal di `C:\Project\Porto\docs\improvement\evidence\` bila folder dapat dibuat.
- **Dokumentasi:** `PORTO_IMPROVEMENT_GUIDE.md` → “Prioritized Features” dan “Performance Targets” (setelah file dipulihkan); `README_FIRST.md` → “Quick Implementation Paths”.
- **READY ref:** `READY_TO_USE_CONFIGS.md` → “Design Tokens & Theme”.
- **Langkah:** 1. Catat stack/versi dengan `npm ls --depth=0`. 2. Catat kondisi CSS di `src/styles/globals.css`, import di `src/index.css`, scripts di `package.json`, dan komponen yang sudah ada. 3. Jalankan `npm run dev`, ambil screenshot Home desktop 1440px dan mobile 390px, lalu catat masalah yang terlihat tanpa mengubah kode.
- **Sukses:** baseline menyebut versi aktual, komponen reuse, ukuran viewport, dan 3–5 temuan visual yang bisa diuji.
- **Troubleshooting:** bila port 5173 sibuk, buka URL port yang Vite tampilkan (misalnya 5174); jangan membunuh proses yang tidak dikenal.

### SIANG — 2 jam

**Task 3 — Buat file design tokens terpisah (60 menit)**
- **File/folder:** buat `C:\Project\Porto\src\styles\tokens.css`.
- **Dokumentasi:** `READY_TO_USE_CONFIGS.md` → “Design Tokens & Theme”; `PORTO_IMPROVEMENT_GUIDE.md` → “Design System Components”.
- **READY ref:** `READY_TO_USE_CONFIGS.md` → “Design Tokens & Theme” (colors, typography, spacing).
- **Langkah:** 1. Salin bagian token dari dokumen yang sudah dipulihkan. 2. Pindahkan hanya nilai token ke `tokens.css`: warna brand, surface, text, border, radius, spacing, dan font yang memang dipakai. 3. Pertahankan nilai/identitas Porto yang sudah ada; jangan mengganti semua warna atau menambah font eksternal tanpa kebutuhan.
- **Sukses:** `tokens.css` menjadi satu sumber token, valid sebagai CSS, dan tidak mengandung layout seluruh section.
- **Troubleshooting:** jika nama token sumber berbeda dari CSS lama, buat mapping sebelum menghapus variable lama; jangan lakukan find/replace global yang mengubah tampilan semua halaman sekaligus.

**Task 4 — Integrasikan token dengan Tailwind v4 yang sudah dipakai (60 menit)**
- **File/folder:** ubah `C:\Project\Porto\src\styles\globals.css`; import `tokens.css` di `C:\Project\Porto\src\index.css` atau di bagian import awal `globals.css` sesuai hasil uji.
- **Dokumentasi:** `README_FIRST.md` → “Quick Start” dan “File Locations”; `READY_TO_USE_CONFIGS.md` → “Design Tokens & Theme”.
- **READY ref:** `READY_TO_USE_CONFIGS.md` → “Design Tokens & Theme”; konsep “Tailwind Config Update” di README perlu diterjemahkan ke sintaks Tailwind v4.
- **Langkah:** 1. Pertahankan `@import 'tailwindcss'` dan plugin `@tailwindcss/vite`. 2. Definisikan utility tokens memakai `@theme` (misalnya `--color-porto-accent`) dan CSS variables global yang memang dibaca CSS lama. 3. Ganti 2–3 penggunaan hard-coded yang paling aman sebagai pilot, lalu cek homepage dan project detail.
- **Sukses:** Tailwind tetap menghasilkan utility, token CSS tersedia, dan tidak ada `tailwind.config.js` v3 baru.
- **Troubleshooting:** jika utility baru tidak terdeteksi, pastikan `@theme` dimuat setelah import Tailwind dan restart Vite sekali; jika warna hilang, pulihkan variable fallback sebelum mengubah semua komponen.

### SORE — 1 jam

**Task 5 — Validasi visual token dan simpan keputusan (60 menit)**
- **File/folder:** update `C:\Project\Porto\docs\improvement\WEEK_1_BASELINE.md`; screenshot di `C:\Project\Porto\docs\improvement\evidence\day-1-desktop.png` dan `day-1-mobile.png`.
- **Dokumentasi:** `PORTO_IMPROVEMENT_GUIDE.md` → “Performance Targets” dan “Design System Components”.
- **READY ref:** `READY_TO_USE_CONFIGS.md` → “Design Tokens & Theme”.
- **Langkah:** 1. Jalankan `npm run lint` dan `npm run build`. 2. Bandingkan Home, Projects, dan Contact sebelum/sesudah; periksa kontras, warna fokus, dan tidak ada layout shift. 3. Catat token yang dipakai, keputusan, dan TODO; jangan memperluas scope ke animasi.
- **Sukses:** lint/build lulus, screenshot tiga halaman/dua ukuran viewport tersimpan, tidak ada perubahan visual tak disengaja.
- **Troubleshooting:** bila banyak warna berubah, batasi pemetaan ke satu section dan ulangi screenshot; bila build gagal karena CSS, cek urutan `@import` sebelum mengubah token.

**VERIFIKASI HARI 1**
- [ ] Lima dokumen yang hilang sudah dipulihkan atau blocker lokasinya tercatat.
- [ ] Tidak ada `tailwind.config.js` v3 yang dibuat.
- [ ] `tokens.css` diimport dan token pilot terlihat di browser.
- [ ] `npm run lint` dan `npm run build` lulus.

**DELIVERABLE HARI INI**
- `docs/improvement/WEEK_1_BASELINE.md`
- `src/styles/tokens.css`
- `src/styles/globals.css` terintegrasi dengan token Tailwind v4
- Screenshot desktop/mobile Hari 1 (jika browser tersedia)

## HARI 2 (TUESDAY) — SEO Hook

### PAGI — 2 jam

**Task 1 — Tentukan metadata per route (60 menit)**
- **File/folder:** update `C:\Project\Porto\docs\improvement\WEEK_1_BASELINE.md`; calon integrasi: `src/pages/Home.jsx`, `About.jsx`, `Projects.jsx`, `ProjectDetail.jsx`, `Contact.jsx`, `NotFound.jsx`.
- **Dokumentasi:** `READY_TO_USE_CONFIGS.md` → “SEO Hook” dan “JSON-LD Schema”; `PORTO_IMPROVEMENT_GUIDE.md` → prioritas SEO.
- **READY ref:** `READY_TO_USE_CONFIGS.md` → “SEO Hook”.
- **Langkah:** 1. Catat `<title>` dan description statis yang ada di `index.html`. 2. Petakan title/description route dari `translation.json` dan data proyek, jangan buat klaim profesional baru. 3. Putuskan API minimal hook: `title`, `description`, optional `image`; canonical/schema ditunda kecuali domain produksi sudah diketahui.
- **Sukses:** tabel route → title/description tersedia untuk enam route, dengan project detail memakai data project.
- **Troubleshooting:** jika teks lokal belum ada, gunakan key terjemahan yang tersedia; jangan menulis metadata hard-coded hanya dalam English.

**Task 2 — Implementasikan hook SEO minimal (60 menit)**
- **File/folder:** buat `C:\Project\Porto\src\hooks\useSEO.js`.
- **Dokumentasi:** `READY_TO_USE_CONFIGS.md` → “SEO Hook”.
- **READY ref:** `READY_TO_USE_CONFIGS.md` → “SEO Hook” (bandingkan signature dan cleanup dengan code block asli).
- **Langkah:** 1. Terapkan `useEffect` untuk mengatur `document.title`. 2. Update atau buat `<meta name="description">` tanpa membuat duplikat tiap route. 3. Simpan nilai sebelumnya dan pulihkan saat cleanup agar perpindahan route tidak meninggalkan metadata halaman sebelumnya.
- **Sukses:** hook tidak menambah dependency; title dan description berubah per halaman dan kembali bersih saat unmount.
- **Troubleshooting:** bila ada dua meta description, cari elemen yang sudah ada lalu update, bukan selalu `appendChild`; hindari memanggil `window` saat render.

### SIANG — 2 jam

**Task 3 — Tambahkan test hook SEO (60 menit)**
- **File/folder:** buat `C:\Project\Porto\src\hooks\useSEO.test.jsx`.
- **Dokumentasi:** `ACTION_PLAN.md` → fase testing (file belum tersedia; gunakan nama section dari dokumen setelah dipulihkan).
- **READY ref:** `READY_TO_USE_CONFIGS.md` → “SEO Hook”.
- **Langkah:** 1. Render komponen probe kecil yang memanggil hook. 2. Assert `document.title` dan meta description berubah. 3. Unmount lalu assert cleanup tidak meninggalkan nilai halaman tes.
- **Sukses:** `npx vitest run src/hooks/useSEO.test.jsx` lulus dua kasus minimum (set metadata dan cleanup).
- **Troubleshooting:** jika metadata tidak ter-reset karena efek belum dijalankan, gunakan `waitFor`; jangan memakai browser API yang tidak tersedia di JSDOM.

**Task 4 — Pasang SEO ke halaman yang sudah ada (60 menit)**
- **File/folder:** ubah enam file halaman yang disebut pada Task 1; pertahankan route di `src/app/router.jsx`.
- **Dokumentasi:** `README_FIRST.md` → “Pages/File Locations”; `READY_TO_USE_CONFIGS.md` → “SEO Hook”.
- **READY ref:** `READY_TO_USE_CONFIGS.md` → “SEO Hook”; opsional “JSON-LD Schema” hanya jika data proyek cukup.
- **Langkah:** 1. Panggil hook di setiap route component setelah memperoleh `t()`/data project. 2. Pakai metadata bilingual yang sudah tersedia atau tambahkan key `meta.*` di kedua locale. 3. Untuk slug yang tidak ada, gunakan metadata Not Found; jangan ubah routing.
- **Sukses:** setiap route menampilkan title unik, project detail mencantumkan judul proyek, dan switching bahasa memperbarui metadata tanpa reload.
- **Troubleshooting:** jika metadata tetap English setelah switch, periksa dependency `i18n.language`/hasil `t()` pada hook pemanggil; jangan menambahkan state scroll untuk metadata.

### SORE — 1 jam

**Task 5 — Verifikasi SEO di browser dan test (60 menit)**
- **File/folder:** update `C:\Project\Porto\docs\improvement\WEEK_1_BASELINE.md`; jika perlu, update `src/App.test.jsx`.
- **Dokumentasi:** `PORTO_IMPROVEMENT_GUIDE.md` → checklist SEO; `READY_TO_USE_CONFIGS.md` → “SEO Hook”.
- **READY ref:** `READY_TO_USE_CONFIGS.md` → “SEO Hook” dan “JSON-LD Schema” (JSON-LD hanya audit, bukan scope wajib minggu ini).
- **Langkah:** 1. Jalankan `npm test` dan `npm run lint`. 2. Buka `/`, `/about`, `/projects`, `/projects/atlas-identity`, `/contact`; periksa `document.title` dan description. 3. Ganti `id`/`en`, ulangi dua route, lalu gunakan browser Back/Forward.
- **Sukses:** tidak ada title/description duplikat, salah route, atau error console.
- **Troubleshooting:** bila deep link 404 di dev, pastikan Vite aktif dan route React menggunakan fallback; jangan mengedit sitemap hari ini.

**VERIFIKASI HARI 2**
- [ ] SEO hook lulus test set/cleanup.
- [ ] Lima route utama dan Not Found punya metadata sesuai bahasa.
- [ ] Back/Forward tidak meninggalkan title dari route sebelumnya.
- [ ] Tidak ada library SEO tambahan yang terpasang.

**DELIVERABLE HARI INI**
- `src/hooks/useSEO.js`
- `src/hooks/useSEO.test.jsx`
- Halaman route terintegrasi dengan SEO
- Metadata bilingual di `src/locales/en/translation.json` dan `id/translation.json` bila diperlukan

## HARI 3 (WEDNESDAY) — Scroll Animation Hook

### PAGI — 2 jam

**Task 1 — Audit motion yang sudah ada (60 menit)**
- **File/folder:** catatan di `C:\Project\Porto\docs\improvement\WEEK_1_BASELINE.md`; baca `src/hooks/useLenis.js`, `useReducedMotion.js`, dan scene di `src/sections/`.
- **Dokumentasi:** `PORTO_IMPROVEMENT_GUIDE.md` → bagian animation/accessibility; `READY_TO_USE_CONFIGS.md` → “Animation Variants” dan “Scroll Animation Hook”.
- **READY ref:** `READY_TO_USE_CONFIGS.md` → “Scroll Animation Hook”.
- **Langkah:** 1. Daftar scene yang memakai `useGSAP`/ScrollTrigger. 2. Tandai behavior reduced motion dan cleanup yang sudah ada. 3. Tentukan satu pilot kecil (`SkillsSection`) untuk memakai hook baru; jangan migrasikan seluruh website sekaligus.
- **Sukses:** ada daftar trigger/pemilik dan pilot yang tidak menganimasikan properti sama seperti Framer Motion.
- **Troubleshooting:** jika `gsap` tidak ditemukan, cek `npm ls gsap @gsap/react`; keduanya seharusnya sudah terpasang, jadi jangan install duplikat.

**Task 2 — Buat hook scroll animation yang scoped (60 menit)**
- **File/folder:** buat `C:\Project\Porto\src\hooks\useScrollAnimation.js`.
- **Dokumentasi:** `READY_TO_USE_CONFIGS.md` → “Scroll Animation Hook”; `README_FIRST.md` → stack/komponen yang dipertahankan.
- **READY ref:** `READY_TO_USE_CONFIGS.md` → “Scroll Animation Hook” dan “Animation Variants”.
- **Langkah:** 1. Adaptasikan API code block ke GSAP + `useGSAP`, bukan menambah library. 2. Terima `scopeRef`, callback/animasi, dependency, dan opsi `start/end` secara sederhana. 3. Gunakan `useReducedMotion` untuk skip/sederhanakan, dan biarkan `useGSAP` revert context saat unmount.
- **Sukses:** hook tidak menyimpan posisi scroll ke React state per frame, memiliki scope, cleanup, dan jalur reduced motion.
- **Troubleshooting:** bila `ScrollTrigger` terduplikasi, pindahkan `registerPlugin` ke modul/hook yang konsisten; jangan membuat RAF kedua karena Lenis sudah memakai GSAP ticker.

### SIANG — 2 jam

**Task 3 — Pakai hook pada satu scene pilot (60 menit)**
- **File/folder:** ubah `C:\Project\Porto\src\sections\SkillsSection.jsx` saja.
- **Dokumentasi:** `ACTION_PLAN.md` → fase animation/integration; `READY_TO_USE_CONFIGS.md` → “Scroll Animation Hook”.
- **READY ref:** `READY_TO_USE_CONFIGS.md` → “Scroll Animation Hook”.
- **Langkah:** 1. Ganti hanya timeline reveal skill yang sekarang inline. 2. Pertahankan selector/data skills dan timing yang sudah tampak baik. 3. Pastikan tidak ada Framer Motion menganimasikan `opacity/transform` pada node yang sama.
- **Sukses:** reveal Skills tetap mengikuti scroll, scrub dapat dibalik, dan tidak ada konten yang hilang saat reduced motion.
- **Troubleshooting:** bila callback tidak terukur di JSDOM, verifikasi dengan browser nyata; JSDOM tidak menghitung layout/ScrollTrigger seperti browser.

**Task 4 — Uji cleanup, refresh, dan reduced motion (60 menit)**
- **File/folder:** update `src/App.test.jsx` bila ada regression yang bisa diuji; manual checklist di `docs/improvement/WEEK_1_BASELINE.md`.
- **Dokumentasi:** `PORTO_IMPROVEMENT_GUIDE.md` → accessibility/performance; `READY_TO_USE_CONFIGS.md` → “Scroll Animation Hook”.
- **READY ref:** `READY_TO_USE_CONFIGS.md` → “Scroll Animation Hook” dan “ScrollReveal Component”.
- **Langkah:** 1. Pindah Home → Project Detail → Back. 2. Di browser, emulasikan `prefers-reduced-motion: reduce` dan scroll ke Skills. 3. Ulangi resize desktop/mobile dan cek console/duplicate pin spacer.
- **Sukses:** scene tetap tampil setelah route revisit; tidak ada trigger tertinggal; reduced motion tetap bisa dibaca.
- **Troubleshooting:** bila pin spacer tertinggal, pastikan animasi dibuat di `useGSAP` scope dan tidak dipasang di module global; lakukan hard reload untuk membedakan HMR residue.

### SORE — 1 jam

**Task 5 — Catat API dan jalankan regression checks (60 menit)**
- **File/folder:** update `C:\Project\Porto\docs\improvement\WEEK_1_BASELINE.md`; tidak ada dependency baru.
- **Dokumentasi:** `ACTION_PLAN.md` → verification/troubleshooting; `READY_TO_USE_CONFIGS.md` → “Scroll Animation Hook”.
- **READY ref:** `READY_TO_USE_CONFIGS.md` → “Scroll Animation Hook”.
- **Langkah:** 1. Tambahkan contoh pemakaian hook dan batasannya sebagai catatan singkat. 2. Jalankan `npm run lint` dan `npm test`. 3. Jalankan `npm run build` bila hook menyentuh import/plugin.
- **Sukses:** penggunaan hook terdokumentasi dan tiga checks lulus.
- **Troubleshooting:** bila build menambah chunk >500 kB, periksa import package/subpath sebelum menambah manual chunk baru.

**VERIFIKASI HARI 3**
- [ ] Hook menggunakan GSAP React integration yang sudah ada.
- [ ] Tidak ada RAF/scroll listener duplikat.
- [ ] Reduced motion dan cleanup route sudah diuji.
- [ ] Skills pilot tetap terlihat dan scrub bisa dibalik.

**DELIVERABLE HARI INI**
- `src/hooks/useScrollAnimation.js`
- `src/sections/SkillsSection.jsx` terintegrasi (pilot)
- Catatan hook/hasil cleanup di `docs/improvement/WEEK_1_BASELINE.md`

## HARI 4 (THURSDAY) — Button Component

### PAGI — 2 jam

**Task 1 — Audit dan tetapkan kontrak Button yang sekarang (60 menit)**
- **File/folder:** baca `C:\Project\Porto\src\components\common\Button.jsx` dan call site yang memakai Button; catat di baseline.
- **Dokumentasi:** `READY_TO_USE_CONFIGS.md` → “Button Component”; `PORTO_IMPROVEMENT_GUIDE.md` → component design system.
- **READY ref:** `READY_TO_USE_CONFIGS.md` → “Button Component”.
- **Langkah:** 1. Inventarisasi prop `variant`, `as`, `to`, `className`, props native, focus ring, hover/tap. 2. Bandingkan snippet READY dengan komponen existing. 3. Buat tabel keep/change; jangan membuat `src/components/ui/Button.jsx` baru.
- **Sukses:** satu API publik ditetapkan dan seluruh call site existing tetap valid.
- **Troubleshooting:** jika snippet menggunakan API berbeda, adaptasikan ke komponen Porto, jangan menimpa file sebelum memeriksa semua pemakaian.

**Task 2 — Implementasikan perbaikan minimal pada Button existing (60 menit)**
- **File/folder:** ubah `C:\Project\Porto\src\components\common\Button.jsx`.
- **Dokumentasi:** `READY_TO_USE_CONFIGS.md` → “Button Component”.
- **READY ref:** `READY_TO_USE_CONFIGS.md` → “Button Component”.
- **Langkah:** 1. Pertahankan variant `primary`, `secondary`, `ghost` dan dukungan Router Link. 2. Pastikan button native punya `type` default yang aman dan props `aria-*`/disabled diteruskan. 3. Gunakan `useReducedMotion` untuk mengurangi `whileHover/whileTap` jika animasi aktif.
- **Sukses:** tidak ada API duplikat; submit form tidak berubah tanpa sengaja; focus-visible tetap jelas.
- **Troubleshooting:** bila button dalam form berubah perilaku, cek default `type="button"` dan call site submit secara eksplisit; jangan menghapus prop spread.

### SIANG — 2 jam

**Task 3 — Tambahkan test Button untuk variant dan aksesibilitas (60 menit)**
- **File/folder:** buat `C:\Project\Porto\src\components\common\Button.test.jsx`.
- **Dokumentasi:** `READY_TO_USE_CONFIGS.md` → “Button Component”; `ACTION_PLAN.md` → testing phase.
- **READY ref:** `READY_TO_USE_CONFIGS.md` → “Button Component”.
- **Langkah:** 1. Render variant utama dan cek accessible name. 2. Assert `disabled`, `type`, dan `aria-label` diteruskan. 3. Render `as="link"` dan cek href/router target.
- **Sukses:** minimal tiga assertions lulus tanpa snapshot besar.
- **Troubleshooting:** jika React Router context dibutuhkan, bungkus test dengan `MemoryRouter`; jangan memock seluruh Link API.

**Task 4 — Audit dan migrasikan CTA yang belum konsisten (60 menit)**
- **File/folder:** target `src/sections/Hero.jsx`, `ContactCTA.jsx`, `src/pages/Contact.jsx`, serta `src/components/common/ScrollNavigation.jsx` hanya bila memang ada button custom.
- **Dokumentasi:** `READY_TO_USE_CONFIGS.md` → “Button Component”; `PORTO_IMPROVEMENT_GUIDE.md` → UI components.
- **READY ref:** `READY_TO_USE_CONFIGS.md` → “Button Component”.
- **Langkah:** 1. Cari `<button>` dan `<a>` yang berperan sebagai aksi. 2. Pakai Button existing untuk aksi umum; pertahankan anchor untuk mailto/external link. 3. Cek label dan ukuran sentuh minimal sekitar 44px di mobile.
- **Sukses:** CTA memiliki focus ring/hover konsisten tanpa mengubah perilaku link.
- **Troubleshooting:** jangan bungkus `<button>` di dalam `<Link>`; pakai prop `as="link"` atau `to` sesuai implementasi existing.

### SORE — 1 jam

**Task 5 — Uji Button dengan keyboard dan viewport kecil (60 menit)**
- **File/folder:** update test Button; screenshot di `docs/improvement/evidence/day-4-mobile.png`.
- **Dokumentasi:** `READY_TO_USE_CONFIGS.md` → “Button Component”; `PORTO_IMPROVEMENT_GUIDE.md` → accessibility checklist.
- **READY ref:** `READY_TO_USE_CONFIGS.md` → “Button Component”.
- **Langkah:** 1. Tab/Shift+Tab melalui Hero CTA, language switcher, dan contextual nav. 2. Activate dengan Enter/Space. 3. Cek 390px dan 1440px; verifikasi teks tidak terpotong.
- **Sukses:** semua CTA bisa dioperasikan keyboard/touch dan fokus terlihat.
- **Troubleshooting:** bila layout melebar, ukur label terpanjang Bahasa Indonesia; perbaiki wrapping/padding, bukan mengecilkan font secara global.

**VERIFIKASI HARI 4**
- [ ] Tidak ada Button component duplikat.
- [ ] Semua variant existing berfungsi.
- [ ] Reduced motion, focus ring, disabled, dan link semantics terjaga.
- [ ] Test Button lulus.

**DELIVERABLE HARI INI**
- `src/components/common/Button.jsx` diperkuat
- `src/components/common/Button.test.jsx`
- Audit call site tercatat

## HARI 5 (FRIDAY) — Responsive Image Component

### PAGI — 2 jam

**Task 1 — Audit kebutuhan gambar dan sumber data (60 menit)**
- **File/folder:** baca `src/data/projects.js`, `src/components/projects/ProjectCard.jsx`, `ProjectGallery.jsx`, `src/pages/ProjectDetail.jsx`, `src/sections/ScrollGallery.jsx`.
- **Dokumentasi:** `READY_TO_USE_CONFIGS.md` → “Responsive Image Component” dan “Project Card Component”.
- **READY ref:** `READY_TO_USE_CONFIGS.md` → “Responsive Image Component”.
- **Langkah:** 1. Catat sumber remote/local yang benar-benar dipakai, alt text, lazy/eager, dan rasio gambar. 2. Bedakan gambar Hero (priority tinggi) dari gallery bawah fold (lazy). 3. Pastikan tidak membuat path aset fiktif.
- **Sukses:** tabel call site → props image tersedia, tanpa mengubah isi project data.
- **Troubleshooting:** jika `srcSet` tidak tersedia di data, jangan generate URL transform sembarang; gunakan `src`, `sizes`, dan `loading` yang valid.

**Task 2 — Buat ResponsiveImage reusable (60 menit)**
- **File/folder:** buat `C:\Project\Porto\src\components\common\ResponsiveImage.jsx`.
- **Dokumentasi:** `READY_TO_USE_CONFIGS.md` → “Responsive Image Component”.
- **READY ref:** `READY_TO_USE_CONFIGS.md` → “Responsive Image Component”.
- **Langkah:** 1. Implementasikan API sederhana `src`, optional `srcSet/sizes`, `alt`, `width/height`, `loading`, `fetchpriority`, `className`. 2. Reserve ukuran/rasio untuk mencegah CLS. 3. Pada error, tampilkan fallback visual tanpa URL lokal rekaan dan tetap pertahankan teks/alt yang bermakna.
- **Sukses:** komponen menerima data project sekarang dan tidak menghasilkan layout shift besar.
- **Troubleshooting:** gunakan atribut React yang valid untuk versi React 18; bila `fetchpriority` memunculkan warning, pakai prop `fetchPriority` sesuai hasil runtime/test React yang terpasang.

### SIANG — 2 jam

**Task 3 — Tambahkan test ResponsiveImage (60 menit)**
- **File/folder:** buat `C:\Project\Porto\src\components\common\ResponsiveImage.test.jsx`.
- **Dokumentasi:** `READY_TO_USE_CONFIGS.md` → “Responsive Image Component”.
- **READY ref:** `READY_TO_USE_CONFIGS.md` → “Responsive Image Component”.
- **Langkah:** 1. Assert `alt`, `src`, `loading`, `sizes`, dan dimensi diteruskan. 2. Simulasikan error load dan pastikan fallback state tidak membuat loop. 3. Cek image decorative (`alt=""`) tetap dapat dipakai.
- **Sukses:** test normal, lazy, dan error state lulus.
- **Troubleshooting:** JSDOM tidak mengunduh gambar; dispatch `error` pada node, jangan menunggu jaringan nyata.

**Task 4 — Integrasikan ke kartu dan gallery yang sudah ada (60 menit)**
- **File/folder:** ubah `src/components/projects/ProjectCard.jsx`, `src/components/projects/ProjectGallery.jsx`, dan `src/pages/ProjectDetail.jsx`.
- **Dokumentasi:** `READY_TO_USE_CONFIGS.md` → “Responsive Image Component” dan “Project Card Component”.
- **READY ref:** `READY_TO_USE_CONFIGS.md` → “Responsive Image Component”; “Project Card Component” untuk struktur data project.
- **Langkah:** 1. Ganti tag `<img>` ProjectCard dan ProjectGallery dengan komponen baru. 2. Berikan `loading="lazy"` untuk gambar non-Hero. 3. Pertahankan alt, class, border, crop, serta route kartu.
- **Sukses:** Projects dan Project Detail tetap menampilkan gambar, card tetap dapat diklik, gallery tidak overflow.
- **Troubleshooting:** jika styling hilang, pastikan `className` diteruskan ke `<img>`/wrapper yang benar; cek `object-fit` dari call site.

### SORE — 1 jam

**Task 5 — Cek gambar, ukuran layar, dan fallback (60 menit)**
- **File/folder:** update `docs/improvement/WEEK_1_BASELINE.md`; screenshot `docs/improvement/evidence/day-5-projects.png`.
- **Dokumentasi:** `PORTO_IMPROVEMENT_GUIDE.md` → responsive/performance; `READY_TO_USE_CONFIGS.md` → “Responsive Image Component”.
- **READY ref:** `READY_TO_USE_CONFIGS.md` → “Responsive Image Component”.
- **Langkah:** 1. Buka Projects dan Project Detail di 390px/1440px. 2. Throttle jaringan jika browser mendukung; cek ruang gambar tetap disediakan sebelum load. 3. Test satu URL gambar yang gagal sementara, pastikan halaman lain tetap bisa dipakai.
- **Sukses:** tidak ada horizontal overflow, broken layout, atau console error akibat fallback.
- **Troubleshooting:** jika remote image diblokir jaringan, catat sebagai keterbatasan koneksi dan uji fallback; jangan mengganti URL produksi diam-diam.

**VERIFIKASI HARI 5**
- [ ] ResponsiveImage dipakai ulang, tidak ada komponen duplikat.
- [ ] Hero/high priority dan gallery/lazy loading dibedakan.
- [ ] ProjectCard dan ProjectGallery tetap menjaga link, alt, dan crop.
- [ ] Test fallback dan ukuran bebas CLS lulus.

**DELIVERABLE HARI INI**
- `src/components/common/ResponsiveImage.jsx`
- `src/components/common/ResponsiveImage.test.jsx`
- `ProjectCard.jsx`, `ProjectGallery.jsx`, dan `ProjectDetail.jsx` terintegrasi

## HARI 6 (SATURDAY) — Integrasi Foundation dan UI

### PAGI — 2 jam

**Task 1 — Audit integrasi akhir tanpa menambah scope baru (60 menit)**
- **File/folder:** catat checklist di `C:\Project\Porto\docs\improvement\WEEK_1_BASELINE.md`; cek `src/pages/`, `src/sections/`, `src/components/`.
- **Dokumentasi:** `ACTION_PLAN.md` → “Integration”/phase terkait; `README_FIRST.md` → “Quick Implementation Paths”.
- **READY ref:** `READY_TO_USE_CONFIGS.md` → “ScrollReveal Component” dan “Project Card Component”.
- **Langkah:** 1. Cek penggunaan tokens, useSEO, useScrollAnimation, Button, ResponsiveImage. 2. Pastikan reusable component dipakai pada minimal satu route nyata. 3. Tandai komponen yang sengaja belum dimigrasikan; jangan refactor semua halaman pada hari integrasi.
- **Sukses:** matriks route/component menunjukkan integrasi dan TODO yang jelas.
- **Troubleshooting:** jika sebuah komponen perlu rewrite banyak call site, batasi pilot pada ProjectCard dan detail; buat task lanjutan, bukan melewati batas satu jam.

**Task 2 — Integrasikan metadata dan token pada route utama (60 menit)**
- **File/folder:** `src/pages/Home.jsx`, `About.jsx`, `Projects.jsx`, `ProjectDetail.jsx`, `Contact.jsx`; kedua locale; `src/styles/globals.css`.
- **Dokumentasi:** `READY_TO_USE_CONFIGS.md` → “SEO Hook”, “Design Tokens & Theme”.
- **READY ref:** `READY_TO_USE_CONFIGS.md` → “SEO Hook” dan “Design Tokens & Theme”.
- **Langkah:** 1. Verifikasi hook sudah dipanggil konsisten pada route. 2. Ganti hanya nilai warna/layout yang benar-benar tokenizable. 3. Pastikan language switch tidak menghapus project data atau mengubah route.
- **Sukses:** route utama punya metadata unik dan tokens dipakai di titik pilot, tanpa visual regression.
- **Troubleshooting:** jika update tokens menyebar terlalu luas, hentikan migrasi dan revert hanya perubahan pilot milik task ini; jangan overwrite file lain.

### SIANG — 2 jam

**Task 3 — Desktop integration pass (60 menit)**
- **File/folder:** evidence di `C:\Project\Porto\docs\improvement\evidence\day-6-desktop.png`; catatan baseline.
- **Dokumentasi:** `PORTO_IMPROVEMENT_GUIDE.md` → responsive/performance; `READY_TO_USE_CONFIGS.md` → “ScrollReveal Component” dan “Responsive Image Component”.
- **READY ref:** `READY_TO_USE_CONFIGS.md` → “ScrollReveal Component” dan “Responsive Image Component”.
- **Langkah:** 1. Jalankan `npm run dev -- --host 0.0.0.0`. 2. Uji Home, About, Projects, Detail, Contact pada 1440px. 3. Periksa console, CTA, gambar, title, focus, dan horizontal project rail.
- **Sukses:** semua route bisa dijelajahi, visual tidak overlap, tidak ada error browser.
- **Troubleshooting:** bila port default terpakai, gunakan port alternatif yang Vite cetak; bila scroll position stale, reload tab sebelum menyimpulkan.

**Task 4 — Mobile/reduced-motion integration pass (60 menit)**
- **File/folder:** evidence `day-6-mobile.png`; catatan di `WEEK_1_BASELINE.md`.
- **Dokumentasi:** `PORTO_IMPROVEMENT_GUIDE.md` → responsive/accessibility; `READY_TO_USE_CONFIGS.md` → “Responsive Image Component” dan “Scroll Animation Hook”.
- **READY ref:** `READY_TO_USE_CONFIGS.md` → “Responsive Image Component”, “Scroll Animation Hook”.
- **Langkah:** 1. Uji 390px, 360px, dan satu tablet width. 2. Emulasikan reduced motion. 3. Uji Tab/Enter/Space, tombol language, contact form, dan project links.
- **Sukses:** tidak ada document overflow horizontal, teks/button tidak terpotong, essential content tetap visible saat reduced motion.
- **Troubleshooting:** bedakan overflow komponen internal yang memang horizontal rail dari overflow dokumen; cek `document.documentElement.scrollWidth` terhadap client width.

### SORE — 1 jam

**Task 5 — Selesaikan regression kecil dan catat backlog (60 menit)**
- **File/folder:** ubah hanya file yang terkait bug; update `C:\Project\Porto\docs\improvement\WEEK_1_BASELINE.md`.
- **Dokumentasi:** `ACTION_PLAN.md` → “Troubleshooting Guide”; `READY_TO_USE_CONFIGS.md` → heading komponen yang mengalami bug.
- **READY ref:** pilih tepat satu heading relevan: “Button Component”, “Responsive Image Component”, “SEO Hook”, atau “Scroll Animation Hook”.
- **Langkah:** 1. Urutkan temuan severity: blocker, accessibility, visual. 2. Perbaiki satu blocker yang dapat selesai <=60 menit. 3. Sisanya tulis backlog dengan repro step dan file path.
- **Sukses:** blocker minggu ini tertutup atau setiap blocker memiliki owner/repro, tidak ada perubahan unrelated.
- **Troubleshooting:** jika bug belum terisolasi 20 menit, stop perubahan dan buat minimal reproduction/repro note.

**VERIFIKASI HARI 6**
- [ ] SEO, token, Button, dan ResponsiveImage terintegrasi pada route nyata.
- [ ] Desktop/mobile/reduced motion sudah dicoba di browser.
- [ ] Form, i18n, routing, dan project detail tetap berfungsi.
- [ ] Semua blocker tercatat dengan langkah reproduksi.

**DELIVERABLE HARI INI**
- Integrasi pada route yang disebutkan
- Screenshot desktop/mobile
- `WEEK_1_BASELINE.md` dengan checklist integration dan backlog

## HARI 7 (SUNDAY) — Integration, Regression, dan Review

### PAGI — 2 jam

**Task 1 — Jalankan semua quality gates dari kondisi bersih (60 menit)**
- **File/folder:** tidak ada file baru; output dicatat di `C:\Project\Porto\docs\improvement\WEEK_1_COMPLETION_REPORT.md`.
- **Dokumentasi:** `ACTION_PLAN.md` → “Verification Steps” dan “Progress Tracking”; `READY_TO_USE_CONFIGS.md` → heading semua fitur yang diimplementasikan.
- **READY ref:** “Design Tokens & Theme”, “SEO Hook”, “Scroll Animation Hook”, “Button Component”, “Responsive Image Component”.
- **Langkah:** 1. Jalankan `npm run lint`. 2. Jalankan `npm test`. 3. Jalankan `npm run build`; simpan status/hasil, jangan hanya menyalin screenshot terminal.
- **Sukses:** semua command exit code 0; tidak ada error build baru.
- **Troubleshooting:** jika test flakey, ulangi satu kali dan catat; jangan mengubah production code hanya untuk menyembunyikan warning JSDOM.

**Task 2 — Regression route/history, bahasa, dan form (60 menit)**
- **File/folder:** update `src/App.test.jsx` bila ada regression yang stabil untuk diotomasi; detail test di completion report.
- **Dokumentasi:** `PORTO_IMPROVEMENT_GUIDE.md` → quality/accessibility; `READY_TO_USE_CONFIGS.md` → “SEO Hook” dan “Button Component”.
- **READY ref:** `READY_TO_USE_CONFIGS.md` → “SEO Hook”, “Button Component”.
- **Langkah:** 1. Test semua route via link dan browser Back/Forward. 2. Switch `id` → `en` → `id` dan pastikan title/UI konsisten. 3. Isi form dengan data uji non-sensitif dan periksa validasi, jangan mengirim data pribadi nyata.
- **Sukses:** route/history, metadata, localization, dan validasi form tidak regression.
- **Troubleshooting:** bila efek route tidak reset, cek cleanup hook/useEffect dan key route; jangan menghapus AnimatePresence/PageTransition yang sudah berjalan.

### SIANG — 2 jam

**Task 3 — Audit visual final dan screenshot (60 menit)**
- **File/folder:** `C:\Project\Porto\docs\improvement\evidence\week-1-final-desktop.png`, `week-1-final-mobile.png`.
- **Dokumentasi:** `PORTO_IMPROVEMENT_GUIDE.md` → success metrics; `READY_TO_USE_CONFIGS.md` → “Design Tokens & Theme”, “Responsive Image Component”.
- **READY ref:** “Design Tokens & Theme” dan “Responsive Image Component”.
- **Langkah:** 1. Ambil screenshot Home, Projects, Project Detail pada 1440px dan 390px. 2. Bandingkan dengan baseline Hari 1. 3. Cek focus, contrast, image crop, content clipping, serta total document width.
- **Sukses:** screenshot punya ukuran/route label jelas dan perbedaan yang diinginkan terlihat tanpa regression besar.
- **Troubleshooting:** jika external images belum load, tunggu/reload dan tandai status jaringan; jangan menyimpulkan optimasi gambar dari koneksi yang gagal.

**Task 4 — Review ukuran bundle dan dependency (60 menit)**
- **File/folder:** update `WEEK_1_COMPLETION_REPORT.md`; tidak ada install otomatis.
- **Dokumentasi:** `PORTO_IMPROVEMENT_GUIDE.md` → “Performance Targets”; `READY_TO_USE_CONFIGS.md` → “Package.json Scripts” dan “Responsive Image Component”.
- **READY ref:** “Package.json Scripts” dan “Responsive Image Component”.
- **Langkah:** 1. Jalankan `npm ls --depth=0`. 2. Catat ukuran bundle dari `npm run build`. 3. Pastikan tidak ada library duplikat baru; jika build warning muncul, catat ukuran dan kandidat pemecahan chunk.
- **Sukses:** dependency tree tetap React 18/Tailwind 4/Vite 6 dan build report punya ukuran aktual.
- **Troubleshooting:** jangan jalankan `npm audit fix --force` atau upgrade besar dalam task ini; buat backlog security/dependency terpisah.

### SORE — 1 jam

**Task 5 — Tulis handoff Week 1 dan pilih prioritas Week 2 (60 menit)**
- **File/folder:** buat `C:\Project\Porto\docs\improvement\WEEK_1_COMPLETION_REPORT.md`.
- **Dokumentasi:** `ACTION_PLAN.md` → “Progress Tracking”; `README_FIRST.md` → “Quick Implementation Paths”; `READY_TO_USE_CONFIGS.md` → section yang benar-benar dipakai.
- **READY ref:** sebut heading code yang dipakai: “Design Tokens & Theme”, “SEO Hook”, “Scroll Animation Hook”, “Button Component”, “Responsive Image Component”.
- **Langkah:** 1. Isi ringkasan done/not done, file paths, test output, screenshot paths. 2. Catat known limitations (mis. metadata domain canonical belum tersedia). 3. Buat 3 task Week 2 berdasarkan blocker nyata, bukan menambah fitur baru tanpa prioritas.
- **Sukses:** orang lain bisa menjalankan app dan mengulang verifikasi dari report.
- **Troubleshooting:** jangan menyatakan Lighthouse/WCAG penuh lulus jika belum menjalankan audit; pisahkan “tested” dari “belum diuji”.

**VERIFIKASI HARI 7**
- [ ] `npm run lint`, `npm test`, `npm run build` exit 0.
- [ ] Route, language, form, Back/Forward, responsive, reduced motion sudah diperiksa.
- [ ] Tidak ada dependency duplikat atau informasi profesional yang dibuat-buat.
- [ ] Screenshot dan completion report tersimpan.

**DELIVERABLE HARI INI**
- `docs/improvement/WEEK_1_COMPLETION_REPORT.md`
- Screenshot final desktop/mobile
- Daftar backlog Week 2 dengan severity dan repro steps

## Command Cheat Sheet

```powershell
Set-Location 'C:\Project\Porto'
npm ls --depth=0
npm run lint
npm test
npm run build
npm run dev -- --host 0.0.0.0
```

Tidak perlu `npm install` untuk urutan ini: React 18, Tailwind 4, GSAP, `@gsap/react`, Framer Motion, Lenis, i18next, dan Vitest sudah menjadi bagian dependency project. Jalankan install hanya bila `npm ls` membuktikan package yang dirujuk tidak terpasang.

## Batas Scope dan Catatan Handoff

- Jangan mengganti `src/components/common/Button.jsx` dengan komponen kedua; audit lalu perluas file existing.
- Jangan menambah `tailwind.config.js` dari snippet Tailwind v3; gunakan `@theme` Tailwind v4 di CSS.
- Jangan membuat `useReducedMotion` atau Lenis baru; gunakan hook dan integrasi GSAP existing.
- Jangan membuat file/URL image project rekaan. Responsive image memakai URL/data yang sudah ada.
- Jangan mengubah konten project, identitas, language provider, route, splash, contextual journey, atau contact form tanpa alasan yang dicatat.
- Referensi kode READY yang ditulis pada setiap task hanya aman dipakai setelah file `READY_TO_USE_CONFIGS.md` dipulihkan dan code block aslinya diperiksa.
