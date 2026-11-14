import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LanguageProvider } from '../../contexts/LanguageProvider';
import i18n from '../../i18n';
import { ScrollNavigation } from './ScrollNavigation';

describe('ScrollNavigation', () => {
  it('updates the replay label with the selected language and scrolls to the start', async () => {
    localStorage.setItem('porto-language', 'id');
    await i18n.changeLanguage('id');

    render(
      <MemoryRouter>
        <LanguageProvider>
          <ScrollNavigation targetId="hero-scene" labelKey="home.replayJourney" replay />
          <main id="hero-scene" tabIndex={-1} />
        </LanguageProvider>
      </MemoryRouter>,
    );

    const scrollSlot = document.querySelector('.scroll-navigation-slot');
    const navigationTrigger = ScrollTrigger.getAll().find((trigger) => trigger.trigger === scrollSlot);
    expect(navigationTrigger).toBeDefined();
    act(() => navigationTrigger.vars.onEnter());

    expect(screen.getByRole('button', { name: 'Mulai ulang perjalanan' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'en' }));
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Restart the journey' })).toBeInTheDocument();
    });

    let scrollRequest;
    const handleScrollTo = (event) => {
      event.preventDefault();
      scrollRequest = event.detail;
    };
    document.addEventListener('porto:scroll-to', handleScrollTo, { once: true });

    fireEvent.click(screen.getByRole('button', { name: 'Restart the journey' }));
    expect(scrollRequest).toMatchObject({ targetId: 'hero-scene', duration: 2.4 });
    expect(scrollRequest.onComplete).toEqual(expect.any(Function));

    fireEvent.click(screen.getByRole('button', { name: 'id' }));
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Mulai ulang perjalanan' })).toBeInTheDocument();
    });
  });
});
