'use client';

import { useEffect, useRef } from 'react';

/**
 * Scroll-reveal wrapper. Fades + lifts its children into view once.
 * Respects prefers-reduced-motion and fails "visible" when JS is off
 * (see the <noscript> override in app/layout.jsx).
 */
export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-in');
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
