import Image from 'next/image';
import Marquee from './Marquee';
import Reveal from './Reveal';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.blobs} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <Reveal>
            <p className="eyebrow">New drop · Cosmic Crunch</p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className={styles.title}>
              Chocolate that <em>bites</em> back.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="lead">
              Four stupidly good bars. Real cocoa, real fruit, absurd crunch. No palm oil, no
              filler, and absolutely no boring.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className={styles.ctas}>
              <a href="#flavors" className="btn btn--pink btn--lg">
                Shop the flavors
              </a>
              <a href="#why" className="btn btn--ghost btn--lg">
                Why CHOMP?
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <ul className={styles.trust}>
              <li>
                <strong>4.9★</strong> from 12,480 reviews
              </li>
              <li>
                <strong>24h</strong> dispatch
              </li>
              <li>
                <strong>38</strong> countries
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={180} className={styles.visual}>
          <div className={styles.frame}>
            <Image
              src="/images/hero.jpg"
              alt="A CHOMP chocolate bar standing upright, surrounded by floating chocolate chunks and raspberries"
              width={1024}
              height={1024}
              priority
              className={styles.img}
            />
          </div>

          <div className={`${styles.pill} ${styles.pillTop}`}>
            <span aria-hidden="true">🔥</span> #1 bestseller this week
          </div>

          <div className={`${styles.pill} ${styles.pillBottom}`}>
            <span aria-hidden="true">🎁</span> Free sticker in every box
          </div>

          <svg className={styles.spinBadge} viewBox="0 0 120 120" aria-hidden="true">
            <defs>
              <path
                id="chompCircle"
                d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0"
              />
            </defs>
            <circle cx="60" cy="60" r="58" fill="#0c0a1a" />
            <text
              fill="#ffffff"
              fontSize="10.5"
              fontWeight="700"
              letterSpacing="2.4"
              fontFamily="Inter, sans-serif"
            >
              <textPath href="#chompCircle">100% REAL COCOA • NO PALM OIL • </textPath>
            </text>
            <text
              x="60"
              y="70"
              textAnchor="middle"
              fontSize="28"
              fill="#ff2e88"
              fontFamily="Archivo Black, sans-serif"
            >
              ★
            </text>
          </svg>
        </Reveal>
      </div>

      <Marquee
        items={[
          'No palm oil',
          'Real cocoa butter',
          'Vegan options',
          'Free sticker in every box',
          'Ships in 24 hours',
          'Carbon-neutral delivery',
        ]}
      />
    </section>
  );
}
