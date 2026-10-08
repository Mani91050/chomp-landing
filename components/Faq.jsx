'use client';

import { useState } from 'react';
import Reveal from './Reveal';
import styles from './Faq.module.css';

const QUESTIONS = [
  {
    q: 'How fast do orders ship?',
    a: 'Orders placed before 2pm ship the same day from the closest warehouse. Everything else goes out within 24 hours. Free shipping kicks in at $25.',
  },
  {
    q: 'Is the chocolate actually vegan?',
    a: 'OG Chomp and Cosmic Crunch are fully vegan. Strawberry Riot and Mint Static contain milk solids, and they are honest about it on the label.',
  },
  {
    q: 'What about allergies?',
    a: 'No peanuts anywhere in the facility. We do handle tree nuts, milk and soy on the same lines, so every wrapper carries a full allergen breakdown.',
  },
  {
    q: 'What comes in the box?',
    a: 'Your bars, a free vinyl sticker, and a QR code that unlocks the monthly drop list — early access, occasional chaos, no spam.',
  },
  {
    q: 'Can I pause or cancel a subscription?',
    a: 'One click in your account, no email required, no guilt trip. Pause for a month, skip a delivery, or cancel outright. It is your chocolate.',
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className={`section ${styles.section}`} id="faq">
      <div className={`container ${styles.inner}`}>
        <Reveal className={styles.rail}>
          <p className="eyebrow">FAQ</p>
          <h2>Questions, answered.</h2>
          <p className="lead">
            Still stuck? Email{' '}
            <a className={styles.mail} href="mailto:hello@chomp.example">
              hello@chomp.example
            </a>{' '}
            — a human replies within a day.
          </p>
        </Reveal>

        <Reveal as="ul" delay={120} className={styles.list}>
          {QUESTIONS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
                <h3>
                  <button
                    type="button"
                    className={styles.trigger}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-trigger-${i}`}
                  >
                    <span>{item.q}</span>
                    <span className={styles.plus} aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  className={styles.panel}
                  hidden={!isOpen}
                >
                  <p>{item.a}</p>
                </div>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
