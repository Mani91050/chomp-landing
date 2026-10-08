'use client';

import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import styles from './Stats.module.css';

const STATS = [
  { value: 2.1, decimals: 1, suffix: 'M+', label: 'bars shipped' },
  { value: 4.9, decimals: 1, suffix: '★', label: 'average of 12,480 reviews' },
  { value: 38, decimals: 0, suffix: '', label: 'countries served' },
  { value: 92, decimals: 0, suffix: '%', label: 'reorder rate' },
];

const PROMISES = [
  {
    icon: '🌱',
    title: 'Ingredients you can pronounce',
    body: 'Real cocoa butter, freeze-dried fruit, zero palm oil. Six ingredients or fewer in every bar.',
  },
  {
    icon: '⚡',
    title: 'Packed and out the door in 24h',
    body: 'Ordered before 2pm? It ships the same day from the closest of three warehouses.',
  },
  {
    icon: '🔁',
    title: 'Didn’t love it? Money back.',
    body: 'One email, no forms, no “please keep the box” games. We refund it and you keep the chocolate.',
  },
];

function Counter({ value, decimals, suffix }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    let started = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;

        const duration = 1400;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(value * eased);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className={`section ${styles.section}`} id="why">
      <div className="container">
        <Reveal className={`section-head ${styles.head}`}>
          <p className="eyebrow">Why CHOMP</p>
          <h2>Built loud. Backed by numbers.</h2>
          <p className="lead">
            A chocolate brand is only as good as the second bar you buy. Here’s what happens after
            the first one.
          </p>
        </Reveal>

        <ul className={styles.stats}>
          {STATS.map((stat, i) => (
            <Reveal as="li" key={stat.label} delay={i * 80} className={styles.stat}>
              <p className={styles.statValue}>
                <Counter value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
              </p>
              <p className={styles.statLabel}>{stat.label}</p>
            </Reveal>
          ))}
        </ul>

        <ul className={styles.promises}>
          {PROMISES.map((promise, i) => (
            <Reveal as="li" key={promise.title} delay={i * 100} className={styles.promise}>
              <span className={styles.icon} aria-hidden="true">
                {promise.icon}
              </span>
              <h3>{promise.title}</h3>
              <p>{promise.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
