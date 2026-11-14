import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './app/App';
import en from './locales/en/translation.json';
import id from './locales/id/translation.json';

const translationKeys = (translations, prefix = '') => Object.entries(translations).flatMap(([key, value]) => {
  const path = prefix ? `${prefix}.${key}` : key;
  return value && typeof value === 'object'
    ? translationKeys(value, path)
    : [path];
});
const translationValues = (translations) => Object.values(translations).flatMap((value) => (
  value && typeof value === 'object' ? translationValues(value) : [value]
));

describe('portfolio app', () => {
  it('keeps Indonesian and English translations complete and in sync', () => {
    expect(translationKeys(id).sort()).toEqual(translationKeys(en).sort());
    expect([...translationValues(id), ...translationValues(en)].every((value) => (
      typeof value === 'string' && value.trim().length > 0
    ))).toBe(true);
  });

  it('renders the home page and bilingual project details', async () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /Rais Mughni Salam/i })).toBeInTheDocument();
    await waitFor(() => {
      expect(document.title).toBe('Beranda | Rais Mughni Salam');
      expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute('href', 'https://rais-porto-portfolio.vercel.app/');
      expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute('content', 'https://rais-porto-portfolio.vercel.app/og-image.jpg');
    });
    expect(document.querySelector('[data-hero-subject] img')).toHaveAttribute('src', '/profile/rais-subject.webp');
    expect(screen.getByRole('heading', { name: /karya terpilih/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Pendidikan dan Pengalaman/i })).toBeInTheDocument();
    expect(screen.getAllByRole('navigation', { name: 'Kontak dan media sosial' }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('heading', { name: 'Kemampuan' }).length).toBeGreaterThan(0);
    expect(screen.getByText('Tentang Saya')).toBeInTheDocument();
    expect(screen.getByLabelText('Saya lulusan Program Studi Informatika di Universitas Sebelas April yang adaptif, disiplin, dan memiliki integritas tinggi.')).toBeInTheDocument();
    expect(screen.getByText('Portofolio ini mendokumentasikan beberapa proyek web yang saya kerjakan, pengalaman yang saya peroleh, dan kemampuan yang saya kuasai.')).toBeInTheDocument();
    screen.getAllByRole('img', { name: 'Rais Mughni Salam, programmer dan pengembang web' }).forEach((image) => {
      expect(image).toHaveAttribute('src', '/profile/rais-dark-background.jpg');
    });
    ['Pengembangan Web Front-End', 'Vibe Coding', 'React.js', 'Python', 'Microsoft Office', 'Visualisasi Data', 'Analisis Data', 'UI/UX'].forEach((skill) => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
    const certificateButtons = screen.getAllByRole('button', { name: /Lihat sertifikat:/i });
    expect(certificateButtons).toHaveLength(3);
    fireEvent.click(screen.getByRole('button', { name: 'Lihat sertifikat: Intro to Digital Marketing' }));
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAccessibleName('Intro to Digital Marketing');
    const certImage = dialog.querySelector('img');
    expect(certImage).toBeInTheDocument();
    expect(certImage).toHaveAttribute('src', '/certificates/revou-digital-marketing.webp');
    expect(certImage.getAttribute('src')).toMatch(/\.webp$/i);

    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    screen.getAllByRole('link', { name: /WhatsApp/i }).forEach((link) => {
      expect(link).toHaveAttribute('href', 'https://wa.me/6283100470857');
    });
    const expectedSocialLinks = {
      Email: 'mailto:raismughnisa@gmail.com',
      LinkedIn: 'https://www.linkedin.com/in/rais-mughni-salam',
      GitHub: 'https://github.com/H2keys',
      Instagram: 'https://www.instagram.com/rais_mghns/',
    };
    Object.entries(expectedSocialLinks).forEach(([label, url]) => {
      screen.getAllByRole('link', { name: new RegExp(label, 'i') }).forEach((link) => {
        expect(link).toHaveAttribute('href', url);
        if (label === 'Email') {
          expect(link).not.toHaveAttribute('target', '_blank');
        } else {
          expect(link).toHaveAttribute('target', '_blank');
        }
      });
    });
    expect(screen.getByRole('status', { name: /memuat/i })).toBeInTheDocument();
    expect(document.querySelector('header nav')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('link', { name: /Jelajahi semua proyek/i }));
    expect(await screen.findByRole('heading', { name: /Proyek pilihan/i })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /Lihat proyek:/i })).toHaveLength(2);

    fireEvent.click(screen.getByRole('link', { name: /Lihat proyek: Dashboard Analisis Sentimen MyPertamina/i }));
    expect(await screen.findByRole('heading', { name: /Dashboard Analisis Sentimen MyPertamina/i })).toBeInTheDocument();
    await waitFor(() => {
      expect(document.title).toBe('Dashboard Analisis Sentimen MyPertamina | Rais Mughni Salam');
      expect(document.querySelector('meta[property="og:type"]')).toHaveAttribute('content', 'article');
      expect(document.querySelector('script#structured-data')).toHaveTextContent('"@type":"CreativeWork"');
    });
    expect(screen.getByText('Perbesar pratinjau')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Navigasi halaman' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'en' }));
    expect(screen.getByText('Zoom preview')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Breadcrumb navigation' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'id' }));
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /Lihat demo langsung/i }).some((link) => (
      link.getAttribute('href') === 'https://my-pertamina-dashboard-analisis.vercel.app/'
    ))).toBe(true);
    fireEvent.click(screen.getAllByRole('link', { name: /Kembali ke proyek/i })[0]);
    expect(await screen.findByRole('heading', { name: /Proyek pilihan/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('link', { name: /Lihat proyek: Website Promosi/i }));
    expect(await screen.findByRole('heading', { name: /Website Promosi Berkah Mandiri Plastik/i })).toBeInTheDocument();
    expect(screen.getByText(/6 unggulan/i)).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /Lihat demo langsung/i }).some((link) => (
      link.getAttribute('href') === 'https://berkah-mandiri-plastik-zeta.vercel.app/'
    ))).toBe(true);

    fireEvent.click(screen.getByRole('button', { name: 'en' }));
    expect(await screen.findByRole('heading', { name: /Berkah Mandiri Plastik Promotion Website/i })).toBeInTheDocument();
    await waitFor(() => {
      expect(document.title).toBe('Berkah Mandiri Plastik Promotion Website | Rais Mughni Salam');
      expect(document.documentElement).toHaveAttribute('lang', 'en');
      expect(document.querySelector('meta[property="og:locale"]')).toHaveAttribute('content', 'en_US');
    });
    expect(screen.getByText('View live demo')).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('link', { name: /Back home/i })[0]);
    expect(await screen.findByRole('heading', { name: /Rais Mughni Salam/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('link', { name: /About me/i }));
    expect(await screen.findByText('Bachelor of Informatics')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Rais Mughni Salam, programmer and web developer' })).toBeInTheDocument();
    expect(screen.getByText('Data Analysis')).toBeInTheDocument();
    expect(screen.getAllByText('Experience').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Education').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Social Media').length).toBeGreaterThan(0);
    expect(screen.getByText('February 2024')).toBeInTheDocument();
  });

  it('localizes the missing project page', async () => {
    localStorage.setItem('porto-language', 'id');
    window.history.replaceState({}, '', '/projects/not-a-real-project');

    render(<App />);

    expect(await screen.findAllByRole('heading', { name: 'Proyek tidak ditemukan' })).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: 'en' }));
    expect(await screen.findAllByRole('heading', { name: 'Project not found' })).toHaveLength(2);
  });
});
