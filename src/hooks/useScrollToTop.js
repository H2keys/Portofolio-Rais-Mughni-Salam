import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollEvent = new Event('porto:scroll-to-top', { cancelable: true });
    const handledByLenis = !document.dispatchEvent(scrollEvent);
    if (handledByLenis) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}
