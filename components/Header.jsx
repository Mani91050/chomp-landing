'use client';

import { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import styles from './Header.module.css';

const NAV = [
  { href: '#flavors', label: 'Flavors' },
  { href: '#why', label: 'Why CHOMP' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#faq', label: 'FAQ' },
];

export default function Header() {
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.ticker}>
        <div className={`container ${styles.tickerInner}`}>
          <span>🚚 Free shipping over $25</span>
          <span className={styles.tickerMid}>New: Cosmic Crunch is live</span>
          <span>🍫 Ships in 24 hours</span>
        </div>
      </div>

      <div className={`container ${styles.bar}`}>
        <a href="#top" className={styles.logo} aria-label="CHOMP home">
          CHOMP<span aria-hidden="true">.</span>
        </a>

        <nav className={styles.nav} aria-label="Primary">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a href="#flavors" className={`btn btn--pink btn--sm ${styles.shopCta}`}>
            Shop now
          </a>

          <button
            type="button"
            onClick={openCart}
            className={styles.cartBtn}
            aria-label={`Open cart, ${count} ${count === 1 ? 'item' : 'items'}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 7h16l-1.4 12.1A2 2 0 0 1 16.6 21H7.4a2 2 0 0 1-2-1.9L4 7Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path d="M8.5 7a3.5 3.5 0 0 1 7 0" stroke="currentColor" strokeWidth="2" />
            </svg>
            {count > 0 && <span className={styles.badge}>{count}</span>}
          </button>

          <button
            type="button"
            className={styles.burger}
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`${styles.burgerLine} ${menuOpen ? styles.b1 : ''}`} />
            <span className={`${styles.burgerLine} ${menuOpen ? styles.b2 : ''}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu} id="mobile-menu">
          <nav aria-label="Mobile">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={styles.mobileLink}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#flavors"
            className={`btn btn--pink btn--block ${styles.mobileCta}`}
            onClick={() => setMenuOpen(false)}
          >
            Shop the flavors
          </a>
        </div>
      )}
    </header>
  );
}
