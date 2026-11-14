import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '../../contexts/LanguageProvider';
import { MenuOverlay } from './MenuOverlay';

describe('MenuOverlay', () => {
  it('dims menu text outside the overlay, restores full opacity on hover, and keeps Escape handling', () => {
    const onClose = vi.fn();

    render(
      <MemoryRouter>
        <LanguageProvider>
          <MenuOverlay onClose={onClose} triggerRef={{ current: null }} />
        </LanguageProvider>
      </MemoryRouter>,
    );

    const dialog = screen.getByRole('dialog', { name: 'Navigasi situs' });
    const navigation = screen.getByRole('navigation', { name: 'Navigasi situs' });

    expect(navigation).toHaveStyle({ opacity: '0.6' });
    fireEvent.mouseEnter(dialog);
    expect(navigation).toHaveStyle({ opacity: '1' });
    fireEvent.mouseLeave(dialog);
    expect(navigation).toHaveStyle({ opacity: '0.6' });

    fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();
    expect(screen.getByRole('link', { name: /Beranda/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Tentang/i }).parentElement).not.toHaveAttribute('style');
  });
});
