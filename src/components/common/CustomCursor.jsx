import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function CustomCursor() {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [label, setLabel] = useState('');
  const [isCertificateCursor, setIsCertificateCursor] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const cursorX = useSpring(x, { damping: 25, stiffness: 350 });
  const cursorY = useSpring(y, { damping: 25, stiffness: 350 });

  useEffect(() => {
    const isCoarsePointer = typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches;
    if (reducedMotion || isCoarsePointer) return undefined;

    const onPointerMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setIsVisible(true);
    };

    const onPointerLeave = () => setIsVisible(false);
    const onHover = (event) => {
      const target = event.target.closest('[data-cursor], a, button, .project-card, .nav-item');
      if (target) {
        setIsHovering(true);
        setIsCertificateCursor(target.getAttribute('data-cursor-variant') === 'certificate');
        const labelText = target.getAttribute('data-cursor') || target.getAttribute('aria-label') || target.textContent?.trim();
        setLabel(labelText && labelText.length < 24 ? labelText : t('common.viewProject'));
      } else {
        setIsHovering(false);
        setIsCertificateCursor(false);
        setLabel('');
      }
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('mouseover', onHover);
    document.addEventListener('mouseout', onHover);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('mouseover', onHover);
      document.removeEventListener('mouseout', onHover);
    };
  }, [reducedMotion, t, x, y]);

  if (typeof window === 'undefined' || reducedMotion || (typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches)) {
    return null;
  }

  return (
    <>
      <motion.div
        style={{ x: cursorX, y: cursorY }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isHovering ? 1.35 : 1 }}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d6a15b] bg-[#d6a15b]/10 mix-blend-difference md:block"
      />
      {label && (
        <motion.div
          style={{ x: cursorX, y: cursorY }}
          animate={{ opacity: isVisible ? 1 : 0, x: cursorX.get() + 18, y: cursorY.get() + 18 }}
          className={`pointer-events-none fixed left-0 top-0 z-[101] hidden rounded-full border border-white/10 bg-[#111111]/80 px-2 py-1 ${isCertificateCursor ? 'text-[9px]' : 'text-[10px]'} uppercase tracking-[0.2em] text-[#f4e9d9] md:block`}
        >
          {label}
        </motion.div>
      )}
    </>
  );
}
