import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Button } from '../components/common/Button';
import { Container } from '../components/common/Container';
import { siteConfig } from '../data/siteConfig';
import { SocialLinks } from '../components/common/SocialLinks';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ContactCTA() {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);

  useGSAP(() => {
    if (reducedMotion) return;

    gsap.fromTo('[data-contact-rule]', { scaleX: 0, transformOrigin: 'left center' }, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'center 45%',
        scrub: 0.8,
      },
    });
  }, { scope: sectionRef, dependencies: [reducedMotion], revertOnUpdate: true });

  return (
    <section id="contact-scene" ref={sectionRef} tabIndex={-1} className="contact-scene" aria-labelledby="contact-scene-title">
      <Container>
        <div className="contact-scene__content">
          <p className="scene-kicker">{t('nav.contact')}</p>
          <h2 id="contact-scene-title">{t('home.contactTitle')}</h2>
          <p className="contact-scene__text">{t('home.contactText')}</p>
          <div className="contact-scene__rule" data-contact-rule aria-hidden="true" />
          <div className="contact-scene__actions">
            <Link to="/contact"><Button>{t('common.contactMe')}<ArrowRight className="ml-2" size={16} /></Button></Link>
            {siteConfig.email && <a href={`mailto:${siteConfig.email}`} className="contact-scene__email">{siteConfig.email}<ArrowUpRight size={15} aria-hidden="true" /></a>}
          </div>
          <SocialLinks className="contact-scene__socials" />
        </div>
      </Container>
    </section>
  );
}
