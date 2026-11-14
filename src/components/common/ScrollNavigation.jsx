import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowRight, RotateCcw } from 'lucide-react';
import { useRef, useState } from 'react';
import { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { LanguageSwitcher } from './LanguageSwitcher';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ScrollNavigation({ targetId, labelKey, replay = false, to, alwaysVisible = false }) {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const navigateToRoute = useNavigate();
  const slotRef = useRef(null);
  const popupRef = useRef(null);
  const instanceId = useId();
  const [visible, setVisible] = useState(alwaysVisible);
  const [pointerNear, setPointerNear] = useState(false);
  const Icon = to ? ArrowRight : replay ? RotateCcw : ArrowDown;

  useEffect(() => {
    if (alwaysVisible) return undefined;

    const handleActiveNavigation = (event) => {
      const active = event.detail?.owner === instanceId;
      setVisible(active);
      if (!active) setPointerNear(false);
    };
    document.addEventListener('porto:scroll-navigation-active', handleActiveNavigation);
    return () => document.removeEventListener('porto:scroll-navigation-active', handleActiveNavigation);
  }, [alwaysVisible, instanceId]);

  useEffect(() => {
    if (!visible) return undefined;

    const handlePointerMove = (event) => {
      const bounds = popupRef.current?.getBoundingClientRect();
      if (!bounds) return;

      const proximity = 64;
      const near = event.clientX >= bounds.left - proximity
        && event.clientX <= bounds.right + proximity
        && event.clientY >= bounds.top - proximity
        && event.clientY <= bounds.bottom + proximity;
      setPointerNear(near || popupRef.current.contains(document.activeElement));
    };
    const handleWindowLeave = () => setPointerNear(popupRef.current?.contains(document.activeElement) ?? false);

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handleWindowLeave);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handleWindowLeave);
    };
  }, [visible]);

  useGSAP(() => {
    if (alwaysVisible || !slotRef.current) return;

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
      onLeave: () => {
        setVisible(false);
        setPointerNear(false);
      },
      onLeaveBack: () => {
        setVisible(false);
        setPointerNear(false);
      },
      invalidateOnRefresh: true,
    });
  }, { scope: slotRef, dependencies: [alwaysVisible, instanceId, replay], revertOnUpdate: true });

  const navigate = () => {
    if (to) {
      navigateToRoute(to);
      return;
    }

    const target = document.getElementById(targetId);
    if (!target) {
      navigateToRoute('/');
      return;
    }

    const focusTarget = () => {
      target.focus({ preventScroll: true });
    };

    const event = new CustomEvent('porto:scroll-to', {
      cancelable: true,
      detail: {
        targetId,
        duration: replay ? 2.4 : 2,
        onComplete: focusTarget,
      },
    });
    const handled = !document.dispatchEvent(event);

    if (!handled) {
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      if (reducedMotion) focusTarget();
      else document.addEventListener('scrollend', focusTarget, { once: true });
    }
  };

  return (
    <>
      {!alwaysVisible && <div ref={slotRef} className="scroll-navigation-slot" aria-hidden="true" />}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence initial={false}>
          {visible && (
            <motion.div
              ref={popupRef}
              key="scroll-navigation"
              initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: pointerNear ? 1 : 0.6, y: 0, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
              transition={{
                opacity: { duration: reducedMotion ? 0 : 0.25, ease: 'easeOut' },
                y: { duration: reducedMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: reducedMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] },
              }}
              onFocusCapture={() => setPointerNear(true)}
              className="scroll-navigation"
            >
              <button type="button" onClick={navigate} className="scroll-navigation__button" aria-label={t(labelKey)}>
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
