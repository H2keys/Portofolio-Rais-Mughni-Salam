import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, RotateCcw } from 'lucide-react';
import { useRef, useState } from 'react';
import { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { LanguageSwitcher } from './LanguageSwitcher';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ScrollNavigation({ targetId, labelKey, replay = false }) {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const slotRef = useRef(null);
  const instanceId = useId();
  const [visible, setVisible] = useState(false);
  const Icon = replay ? RotateCcw : ArrowDown;

  useEffect(() => {
    const handleActiveNavigation = (event) => setVisible(event.detail?.owner === instanceId);
    document.addEventListener('porto:scroll-navigation-active', handleActiveNavigation);
    return () => document.removeEventListener('porto:scroll-navigation-active', handleActiveNavigation);
  }, [instanceId]);

  useGSAP(() => {
    if (!slotRef.current) return;

    ScrollTrigger.create({
      trigger: slotRef.current,
      start: replay ? 'top 65%' : 'top 12%',
      end: () => `+=${window.innerHeight * 0.45}`,
      onEnter: () => {
        setVisible(true);
        document.dispatchEvent(new CustomEvent('porto:scroll-navigation-active', { detail: { owner: instanceId } }));
      },
      onEnterBack: () => {
        setVisible(true);
        document.dispatchEvent(new CustomEvent('porto:scroll-navigation-active', { detail: { owner: instanceId } }));
      },
      onLeave: () => setVisible(false),
      onLeaveBack: () => setVisible(false),
      invalidateOnRefresh: true,
    });
  }, { scope: slotRef, dependencies: [instanceId, replay], revertOnUpdate: true });

  const navigate = () => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const revealTargetText = () => {
      if (!reducedMotion && targetId !== 'hero-scene') {
        const textElements = target.querySelectorAll('h1, h2, h3, p');
        gsap.fromTo(textElements, {
          opacity: 0,
          y: 18,
          filter: 'blur(4px)',
        }, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.55,
          stagger: 0.065,
          ease: 'power3.out',
          clearProps: 'opacity,transform,filter',
        });
      }

      target.focus({ preventScroll: true });
    };

    const event = new CustomEvent('porto:scroll-to', {
      cancelable: true,
      detail: {
        targetId,
        duration: replay ? 2.4 : 2,
        onComplete: revealTargetText,
      },
    });
    const handled = !document.dispatchEvent(event);

    if (!handled) {
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      if (reducedMotion) target.focus({ preventScroll: true });
      else document.addEventListener('scrollend', revealTargetText, { once: true });
    }
  };

  return (
    <>
      <div ref={slotRef} className="scroll-navigation-slot" aria-hidden="true" />
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence initial={false}>
          {visible && (
            <motion.div
              key="scroll-navigation"
              initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: reducedMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="scroll-navigation"
            >
              <button type="button" onClick={navigate} className="scroll-navigation__button">
                <span>{t(labelKey)}</span>
                <Icon className={replay ? 'scroll-navigation__replay' : ''} size={17} aria-hidden="true" />
              </button>
              <LanguageSwitcher />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
