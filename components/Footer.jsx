'use client';

import { useState } from 'react';
import styles from './Footer.module.css';

const COLUMNS = [
  {
    title: 'Shop',
    links: [
      { label: 'All flavors', href: '#flavors' },
      { label: 'Full Send Box', href: '#flavors' },
      { label: 'Gift cards', href: '#flavors' },
      { label: 'Track an order', href: '#faq' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Why CHOMP', href: '#why' },
      { label: 'Reviews', href: '#reviews' },
      { label: 'Sustainability', href: '#why' },
      { label: 'Press kit', href: '#top' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQ', href: '#faq' },
      { label: 'Shipping & returns', href: '#faq' },
      { label: 'Allergens', href: '#faq' },
      { label: 'Contact', href: 'mailto:hello@chomp.example' },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
    setEmail('');
  };

  return (
    <footer className={styles.footer} id="footer">
      <div className="container">
        <div className={styles.pitchStrip}>
          <p>
            <strong>Concept build.</strong> Designed and coded from scratch — 4 flavors, a working
            cart, zero templates.
          </p>
          <a className="btn btn--mint btn--sm" href="mailto:rehmanishtiaq9105@gmail.com">
            Want one for your brand? →
          </a>
        </div>

        <div className={styles.top}>
          <div className={styles.newsletter}>
            <h3>Get first dibs on drops</h3>
            <p>
              One email a month, a 10% code on signup, and the occasional unhinged flavour poll.
            </p>

            {sent ? (
              <p className={styles.success} role="status">
                You’re in — check your inbox for the 10% code. 🍫
              </p>
            ) : (
              <form className={styles.form} onSubmit={onSubmit}>
                <label className="sr-only" htmlFor="footer-email">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                />
                <button type="submit" className="btn btn--pink">
                  Sign up
                </button>
              </form>
            )}
          </div>

          <nav className={styles.columns} aria-label="Footer">
            {COLUMNS.map((column) => (
              <div key={column.title}>
                <h4 className={styles.colTitle}>{column.title}</h4>
                <ul className={styles.colList}>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <p className={styles.wordmark} aria-hidden="true">
          CHOMP
        </p>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} CHOMP. A fictional brand, built for demonstration.</p>
          <p className={styles.credit}>
            Built by <strong>Abdulrehman</strong> ·{' '}
            <a href="https://github.com/Mani91050">GitHub</a> ·{' '}
            <a href="mailto:rehmanishtiaq9105@gmail.com">rehmanishtiaq9105@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
