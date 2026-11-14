import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach } from 'vitest';
import { gsap } from 'gsap';
import { LanguageProvider } from './LanguageProvider';
import { LanguageSwitcher } from '../components/common/LanguageSwitcher';
import i18n from '../i18n';

afterEach(async () => {
  vi.restoreAllMocks();
  localStorage.setItem('porto-language', 'id');
  document.documentElement.lang = 'id';
  await act(async () => i18n.changeLanguage('id'));
});

describe('LanguageProvider', () => {
  it('animates nested text inside scrubbed sections without animating their containers', async () => {
    localStorage.setItem('porto-language', 'id');
    await i18n.changeLanguage('id');
    vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }));
    const timeline = { to: vi.fn().mockReturnThis(), kill: vi.fn() };
    vi.spyOn(gsap, 'timeline').mockReturnValue(timeline);

    await act(async () => {
      render(
        <LanguageProvider>
          <main>
            <h1 data-hero-title><span data-testid="hero-title">Hero title</span></h1>
            <div data-hero-note>
              <p data-testid="hero-copy">Hero supporting copy</p>
            </div>
            <p className="about-story__intro"><span data-testid="about-word">Scrubbed word</span></p>
            <p data-no-lang-anim><span data-testid="excluded-word">Explicitly excluded word</span></p>
            <ul>
              <li data-journey-entry>
                <strong data-testid="journey-title">Journey entry</strong>
                <span data-testid="journey-period">Period</span>
              </li>
              <li data-skill-line>
                <span className="skills-story__index">01</span>
                <span data-testid="skill-label">Skill label</span>
              </li>
            </ul>
          </main>
          <div className="scroll-navigation">
            <button className="scroll-navigation__button"><span data-testid="popup-label">Popup label</span></button>
          </div>
          <LanguageSwitcher />
        </LanguageProvider>,
      );
    });

    vi.spyOn(screen.getByTestId('journey-title'), 'getBoundingClientRect').mockReturnValue({
      top: 150, left: 0, right: 100, bottom: 170, width: 100, height: 20, x: 0, y: 150, toJSON: () => ({}),
    });
    vi.spyOn(screen.getByTestId('skill-label'), 'getBoundingClientRect').mockReturnValue({
      top: 80, left: 0, right: 100, bottom: 100, width: 100, height: 20, x: 0, y: 80, toJSON: () => ({}),
    });

    fireEvent.click(screen.getByRole('button', { name: 'en' }));

    const [targets] = timeline.to.mock.calls[0];
    expect(targets).toContain(screen.getByTestId('hero-title'));
    expect(targets).toContain(screen.getByTestId('hero-copy'));
    expect(targets).toContain(screen.getByTestId('about-word'));
    expect(targets).toContain(screen.getByTestId('journey-title'));
    expect(targets).toContain(screen.getByTestId('journey-period'));
    expect(targets).toContain(screen.getByTestId('skill-label'));
    expect(targets).toContain(screen.getByTestId('popup-label'));
    expect(targets).not.toContain(document.querySelector('.about-story__intro'));
    expect(targets).not.toContain(screen.getByTestId('excluded-word'));
    expect(targets).not.toContain(document.querySelector('[data-journey-entry]'));
    expect(targets).not.toContain(document.querySelector('[data-skill-line]'));
    expect(targets.indexOf(screen.getByTestId('skill-label')))
      .toBeLessThan(targets.indexOf(screen.getByTestId('journey-title')));
  });

  it('updates and persists the selected language when reduced motion is enabled', async () => {
    localStorage.setItem('porto-language', 'id');
    await i18n.changeLanguage('id');
    vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }));

    render(
      <LanguageProvider>
        <LanguageSwitcher />
      </LanguageProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'en' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'en' })).toHaveAttribute('aria-pressed', 'true');
      expect(localStorage.getItem('porto-language')).toBe('en');
      expect(document.documentElement).toHaveAttribute('lang', 'en');
      expect(i18n.resolvedLanguage).toBe('en');
    });
  });
});
