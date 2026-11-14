import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LanguageProvider } from '../../contexts/LanguageProvider';
import i18n from '../../i18n';
import { ScrollNavigation } from './ScrollNavigation';

function CurrentPath() {
  const location = useLocation();
  return <span data-testid="current-path">{location.pathname}</span>;
}

describe('ScrollNavigation', () => {
  it('stays visible on other pages and returns to the home page when clicked', async () => {
    localStorage.setItem('porto-language', 'id');
    await i18n.changeLanguage('id');

    render(
      <MemoryRouter initialEntries={['/projects']}>
        <LanguageProvider>
          <ScrollNavigation alwaysVisible to="/" labelKey="home.primaryCta" />
          <CurrentPath />
        </LanguageProvider>
      </MemoryRouter>,
    );

    const popup = document.querySelector('.scroll-navigation');
    expect(screen.getByRole('button', { name: 'Mulai Perjalanan' })).toBeInTheDocument();
    expect(popup).toHaveStyle({ opacity: '0.6' });

    fireEvent.click(screen.getByRole('button', { name: 'Mulai Perjalanan' }));
    await waitFor(() => expect(screen.getByTestId('current-path')).toHaveTextContent('/'));
    expect(screen.getByRole('button', { name: 'Mulai Perjalanan' })).toBeInTheDocument();
  });

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

    const replayButton = screen.getByRole('button', { name: 'Mulai ulang perjalanan' });
    expect(replayButton).toBeInTheDocument();
    const popup = document.querySelector('.scroll-navigation');
    vi.spyOn(popup, 'getBoundingClientRect').mockReturnValue({
      left: 200,
      top: 200,
      right: 360,
      bottom: 260,
      width: 160,
      height: 60,
      x: 200,
      y: 200,
      toJSON: () => ({}),
    });

    await waitFor(() => expect(popup).toHaveStyle({ opacity: '0.6' }));
    fireEvent.pointerMove(window, { clientX: 150, clientY: 150 });
    await waitFor(() => expect(popup).toHaveStyle({ opacity: '1' }));
    fireEvent.pointerMove(window, { clientX: 500, clientY: 500 });
    await waitFor(() => expect(popup).toHaveStyle({ opacity: '0.6' }));
    expect(replayButton).toBeInTheDocument();

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
    scrollRequest.onComplete();
    expect(document.getElementById('hero-scene')).toHaveFocus();

    fireEvent.click(screen.getByRole('button', { name: 'id' }));
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Mulai ulang perjalanan' })).toBeInTheDocument();
    });
  });
});
