import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';
import { Container } from '../components/common/Container';
import { CertificateLightbox } from '../components/projects/CertificateLightbox';
import { certificates } from '../data/certificates';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function CertificateShowcase() {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useGSAP(() => {
    if (reducedMotion) return;

    const cards = gsap.utils.toArray('.certificate-story__card', sectionRef.current);
    const reveal = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 72%',
        toggleActions: 'play none none none',
        once: true,
      },
    });

    reveal
      .fromTo('[data-certificate-heading]', { opacity: 0, y: 22 }, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: 'power2.out',
      })
      .fromTo(cards, { opacity: 0, y: 40 }, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out',
      }, '-=0.28');
  }, { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true });

  const formattedCertificates = certificates.map((cert) => ({
    ...cert,
    title: t(cert.titleKey),
    issuer: t(cert.issuerKey),
  }));

  const handleOpen = (index) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  const handleClose = () => {
    setLightboxOpen(false);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : certificates.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < certificates.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="certificate-story" ref={sectionRef} tabIndex={-1} className="certificate-story" aria-labelledby="certificate-story-title">
      <Container>
        <div className="certificate-story__content">
          <div className="certificate-story__heading" data-certificate-heading>
            <div>
              <p className="scene-kicker">{t('certificates.eyebrow')}</p>
              <h2 id="certificate-story-title">{t('certificates.title')}</h2>
            </div>
            <p>{t('certificates.intro')}</p>
          </div>
          <div className="certificate-story__grid">
            {certificates.map((certificate, index) => {
              const title = t(certificate.titleKey);
              return (
                <article key={certificate.id} className={`certificate-story__card certificate-story__card--${(index % 4) + 1}`}>
                  <button
                    type="button"
                    className="certificate-story__image-link"
                    onClick={() => handleOpen(index)}
                    aria-label={`${t('certificates.view')}: ${title}`}
                    data-cursor={t('certificates.cursor')}
                    data-cursor-variant="certificate"
                  >
                    <span className="certificate-story__preview">
                      <img
                        src={certificate.image.src}
                        srcSet={certificate.image.srcSet}
                        sizes="(max-width: 900px) 100vw, (max-width: 1200px) 50vw, 650px"
                        alt={title}
                        width={certificate.image.width}
                        height={certificate.image.height}
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                    <span className="certificate-story__overlay" aria-hidden="true"><ArrowUpRight size={18} /></span>
                  </button>
                  <div className="certificate-story__caption">
                    <span>{title}</span>
                    <span>{t(certificate.issuerKey)}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
      <CertificateLightbox
        isOpen={lightboxOpen}
        certificates={formattedCertificates}
        currentIndex={selectedIndex}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
        closeLabel={t('common.close')}
        prevLabel={t('certificates.previous', 'Sebelumnya')}
        nextLabel={t('certificates.next', 'Berikutnya')}
      />
    </section>
  );
}