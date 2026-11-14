import { useEffect } from 'react';

export function useScrollToTop() {
  useEffect(() => {
    const scrollEvent = new Event('porto:scroll-to-top', { cancelable: true });
    const handledByLenis = !document.dispatchEvent(scrollEvent);
    if (handledByLenis) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);
}
