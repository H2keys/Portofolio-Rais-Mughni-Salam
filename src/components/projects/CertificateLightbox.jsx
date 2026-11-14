import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function CertificateLightbox({
  isOpen,
  certificates = [],
  currentIndex = 0,
  onClose,
  onPrev,
  onNext,
  closeLabel = 'Close dialog',
  prevLabel = 'Previous certificate',
  nextLabel = 'Next certificate',
}) {
  const reducedMotion = useReducedMotion();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  const activeCert = certificates[currentIndex];
  const hasMultiple = certificates.length > 1;

  // Handle focus trapping and Escape key
  useEffect(() => {
    if (!isOpen) return;

    // Focus close button on open
    const prevActiveElement = document.activeElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose?.();
        return;
      }

      if (e.key === 'ArrowLeft' && hasMultiple) {
        e.preventDefault();
        onPrev?.();
        return;
      }

      if (e.key === 'ArrowRight' && hasMultiple) {
        e.preventDefault();
        onNext?.();
        return;
      }

      if (e.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      prevActiveElement?.focus?.();
    };
  }, [isOpen, hasMultiple, onClose, onPrev, onNext]);

  // Lock scroll via existing custom event
  useEffect(() => {
    if (isOpen) {
      document.dispatchEvent(new CustomEvent('porto:scroll-lock', { detail: { locked: true } }));
    }
    return () => {
      if (isOpen) {
        document.dispatchEvent(new CustomEvent('porto:scroll-lock', { detail: { locked: false } }));
      }
    };
  }, [isOpen]);

  if (!isOpen || !activeCert) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: reducedMotion ? 0 : 0.25 } },
    exit: { opacity: 0, transition: { duration: reducedMotion ? 0 : 0.2 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: reducedMotion ? 1 : 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: reducedMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      scale: reducedMotion ? 1 : 0.96,
      transition: { duration: reducedMotion ? 0 : 0.2 },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="certificate-lightbox-backdrop"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={backdropVariants}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose?.();
        }}
        aria-hidden="false"
      >
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={activeCert.title}
          className="certificate-lightbox-dialog"
          variants={modalVariants}
        >
          <button
            ref={closeButtonRef}
            type="button"
            className="certificate-lightbox-close"
            onClick={onClose}
            aria-label={closeLabel}
          >
            <X size={22} />
          </button>

          <div className="certificate-lightbox-content">
            <div className="certificate-lightbox-image-wrap">
              <img
                src={activeCert.image.src}
                srcSet={activeCert.image.srcSet}
                sizes="(max-width: 1024px) 95vw, 1200px"
                alt={activeCert.title}
                width={activeCert.image.width}
                height={activeCert.image.height}
                loading="eager"
                decoding="async"
                className="certificate-lightbox-image"
              />
            </div>
            <div className="certificate-lightbox-footer">
              <div className="certificate-lightbox-caption">
                <p className="certificate-lightbox-title">{activeCert.title}</p>
                <p className="certificate-lightbox-issuer">{activeCert.issuer}</p>
              </div>

              {hasMultiple && (
                <div className="certificate-lightbox-actions">
                  <button
                    type="button"
                    className="certificate-lightbox-nav"
                    onClick={onPrev}
                    aria-label={prevLabel}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="certificate-lightbox-counter" aria-live="polite">
                    {currentIndex + 1} / {certificates.length}
                  </span>
                  <button
                    type="button"
                    className="certificate-lightbox-nav"
                    onClick={onNext}
                    aria-label={nextLabel}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}


