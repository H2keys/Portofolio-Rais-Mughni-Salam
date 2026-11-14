export const projects = [
  {
    slug: 'dashboard-analisis-sentimen-mypertamina',
    title: {
      id: 'Dashboard Analisis Sentimen MyPertamina',
      en: 'MyPertamina Sentiment Analysis Dashboard',
    },
    category: {
      id: 'Sains Data / Aplikasi Web',
      en: 'Data Science / Web App',
    },
    categoryId: 'data-science',
    year: {
      id: '2026',
      en: '2026',
    },
    role: {
      id: 'Pengembang tunggal (full-stack)',
      en: 'Solo full-stack developer',
    },
    stack: [
      'Python 3.12',
      'Flask 3',
      'scikit-learn (SVM + TF-IDF)',
      'pandas',
      'NumPy',
      'Sastrawi',
      'Chart.js 4',
      'wordcloud2.js',
      'Bootstrap Icons',
      'Inter',
      'JetBrains Mono',
      'Vercel Python Runtime',
    ],
    summary: {
      id: 'Dashboard interaktif untuk menganalisis sentimen ulasan MyPertamina di Google Play Store menggunakan SVM dan TF-IDF.',
      en: 'An interactive dashboard analyzing MyPertamina Google Play reviews with an SVM model and TF-IDF features.',
    },
    description: {
      id: 'Sebagai bagian dari skripsi, dashboard ini mengolah 5.209 ulasan menjadi ringkasan sentimen, tren peringkat, dan visualisasi kata yang mudah ditelusuri. Evaluasi model dan prediksi teks tersedia dalam satu aplikasi web agar hasil analisis mudah dipahami dan diuji.',
      en: 'Developed as part of an undergraduate thesis, this dashboard turns 5,209 reviews into sentiment summaries, rating trends, and searchable word patterns. It also provides model evaluation and live text prediction, making the analysis easier to explore and verify.',
    },
    features: [
      {
        id: 'Ringkasan statistik yang mencakup distribusi sentimen, penilaian, tren bulanan, dan perbandingan tahunan.',
        en: 'Statistical overview with sentiment distribution, ratings, monthly trends, and year-by-year comparisons.',
      },
      {
        id: 'Visualisasi awan kata terpisah untuk menampilkan kata-kata dominan pada ulasan positif dan negatif.',
        en: 'Separate word clouds surface dominant language in positive and negative reviews.',
      },
      {
        id: 'Halaman evaluasi model yang menampilkan akurasi, presisi, recall, F1-score, dan matriks konfusi.',
        en: 'Model evaluation page presents accuracy, precision, recall, F1-score, and a confusion matrix.',
      },
      {
        id: 'Prediksi sentimen dari teks pengguna beserta tingkat keyakinan berdasarkan fungsi keputusan SVM.',
        en: 'Predicts sentiment from user-entered text and reports confidence from the SVM decision function.',
      },
      {
        id: 'Eksplorasi sampel dan statistik dataset; REST API menyediakan data ringkasan, grafik, evaluasi, dan prediksi.',
        en: 'Explores review samples and dataset statistics, with REST endpoints for summaries, charts, evaluation, and prediction.',
      },
      {
        id: 'REST API mencakup /api/overview, /api/charts/*, /api/evaluation, dan /api/predict.',
        en: 'REST API includes /api/overview, /api/charts/*, /api/evaluation, and /api/predict.',
      },
      {
        id: 'Model dan vectorizer dimuat sekali saat runtime dimulai; stemming Bahasa Indonesia memiliki fallback sederhana. Cold start serverless dapat memerlukan 3–8 detik.',
        en: 'Loads the model and vectorizer once per runtime, with a lightweight fallback for Indonesian stemming. Serverless cold starts can take 3–8 seconds.',
      },
    ],
    highlights: [
      {
        label: { id: 'Ulasan', en: 'Reviews' },
        value: { id: '5.209', en: '5,209' },
      },
      {
        label: { id: 'Positif / negatif', en: 'Positive / negative' },
        value: { id: '3.044 / 2.165', en: '3,044 / 2,165' },
      },
      {
        label: { id: 'Periode data', en: 'Review period' },
        value: { id: '30 Sep 2025 – 11 Jun 2026', en: '30 Sep 2025 – 11 Jun 2026' },
      },
      {
        label: { id: 'Rata-rata rating', en: 'Average rating' },
        value: { id: '3,33 / 5', en: '3.33 / 5' },
      },
      {
        label: { id: 'Model', en: 'Model' },
        value: { id: 'SVM + TF-IDF', en: 'SVM + TF-IDF' },
      },
      {
        label: { id: 'Data latih / uji', en: 'Train / test split' },
        value: { id: '80 / 20', en: '80 / 20' },
      },
      {
        label: { id: 'Akurasi / F1', en: 'Accuracy / F1' },
        value: { id: 'Belum dicantumkan', en: 'Not provided' },
      },
      {
        label: { id: 'Deploy', en: 'Deployment' },
        value: { id: 'Flask di Vercel', en: 'Flask on Vercel' },
      },
    ],
    image: {
      src: '/projects/dashboard-sentimen-mypertamina/cover.webp',
      srcSet: '/projects/dashboard-sentimen-mypertamina/cover-800.webp 800w, /projects/dashboard-sentimen-mypertamina/cover.webp 1600w',
      width: 1600,
      height: 1131,
    },
    images: [],
    liveUrl: 'https://my-pertamina-dashboard-analisis.vercel.app/',
    repoUrl: '',
    featured: true,
  },
  {
    slug: 'berkah-mandiri-plastik',
    title: {
      id: 'Website Promosi Berkah Mandiri Plastik',
      en: 'Berkah Mandiri Plastik Promotion Website',
    },
    category: {
      id: 'Profil Perusahaan / Landing Page',
      en: 'Company Profile / Landing Page',
    },
    categoryId: 'company-profile',
    year: {
      id: '2026',
      en: '2026',
    },
    role: {
      id: 'Pengembang tunggal (full-stack)',
      en: 'Solo full-stack developer',
    },
    stack: [
      'HTML5',
      'CSS3',
      'CSS Variables',
      'JavaScript (Vanilla)',
      'Node.js 24',
      'Vercel Static Hosting',
      'Vercel Serverless Functions',
      'Git',
      'GitHub',
    ],
    summary: {
      id: 'Situs promosi satu halaman yang menampilkan produk kemasan plastik dan layanan sablon khusus, dengan pemesanan langsung melalui WhatsApp.',
      en: 'A one-page promotional website for plastic packaging and custom printing, with direct ordering through WhatsApp.',
    },
    description: {
      id: 'Menyatukan katalog kemasan, contoh hasil sablon, dan cara pemesanan dalam satu halaman yang responsif. Pengunjung dapat membandingkan produk, memahami layanan, lalu menghubungi tim melalui WhatsApp dengan mudah.',
      en: 'Brings the packaging catalog, custom-print showcase, and ordering path into one responsive landing page. Visitors can compare products, understand the service, and contact the business through WhatsApp in a straightforward flow.',
    },
    features: [
      {
        id: 'Enam produk unggulan—Gelas Injection 14 OZ, Cup Sauce 25/35 ml, Garpu Lipat Pop Mie, Tutup Gelas Injection, dan Hanging HD Cup—dengan spesifikasi serta tombol pemesanan.',
        en: 'Six featured products—14 oz injection cups, 25/35 ml sauce cups, folding Pop Mie forks, injection-cup lids, and hanging HD cups—with specifications and order actions.',
      },
      {
        id: 'Galeri contoh sablon yang mendukung usap dan indikator titik, menampilkan tiga kartu di komputer dan satu kartu di ponsel.',
        en: 'The custom-print carousel supports swiping and pagination dots. It displays three cards on desktop and one on mobile.',
      },
      {
        id: 'Enam keunggulan layanan dan tautan WhatsApp di setiap bagian, termasuk tombol mengambang dengan animasi.',
        en: 'Six service benefits and WhatsApp links throughout the page, including an animated floating action button.',
      },
      {
        id: 'Tema gelap dan terang dengan transisi melingkar; pilihan tema pengguna disimpan di penyimpanan lokal browser.',
        en: 'Dark and light themes switch with a circular reveal, and the selected theme is saved in local storage.',
      },
      {
        id: 'Animasi kemunculan saat halaman digulir, pengguliran halus, dan bilah navigasi yang menandai bagian aktif.',
        en: 'Scroll-triggered reveals, smooth scrolling, and a navigation bar that highlights the active section.',
      },
      {
        id: 'Tampilan lightbox produk yang aksesibel, dukungan untuk preferensi pengurangan gerakan, dan desain responsif.',
        en: 'An accessible product lightbox, support for the prefers-reduced-motion setting, and a responsive layout.',
      },
      {
        id: 'Proses build statis menyalin templat dan aset; endpoint serverless /api/health tersedia di Vercel.',
        en: 'The static build copies templates and assets. A Vercel serverless endpoint is available at /api/health.',
      },
      {
        id: 'SEO dasar, robots.txt, sitemap.xml, header cache aset, URL bersih, dan gambar WebP.',
        en: 'Baseline SEO, robots.txt, sitemap.xml, asset cache headers, clean URLs, and WebP images.',
      },
    ],
    highlights: [
      {
        label: { id: 'Produk', en: 'Products' },
        value: { id: '6 unggulan', en: '6 featured' },
      },
      {
        label: { id: 'Contoh sablon', en: 'Print examples' },
        value: { id: '4', en: '4' },
      },
      {
        label: { id: 'Mode tema', en: 'Theme modes' },
        value: { id: '2', en: '2' },
      },
      {
        label: { id: 'Hosting', en: 'Hosting' },
        value: { id: 'Vercel + serverless', en: 'Vercel + serverless' },
      },
    ],
    image: {
      src: '/projects/berkah-mandiri-plastik/cover.webp',
      srcSet: '/projects/berkah-mandiri-plastik/cover-800.webp 800w, /projects/berkah-mandiri-plastik/cover.webp 1600w',
      width: 1600,
      height: 1131,
    },
    images: [],
    liveUrl: 'https://berkah-mandiri-plastik-zeta.vercel.app/',
    repoUrl: '',
    featured: true,
  },
];
