import Reveal from './Reveal';
import styles from './Testimonials.module.css';

const REVIEWS = [
  {
    quote:
      'I ordered a single bar to test the checkout. It arrived in a box taped shut like a ransom note and it was gone in a day. I have since ordered eleven.',
    name: 'Ayesha K.',
    meta: 'Verified buyer · Karachi',
    color: 'var(--pink)',
  },
  {
    quote:
      'Cosmic Crunch tastes like the middle of an Oreo went to space. I am not exaggerating, I am underselling it.',
    name: 'Marcus T.',
    meta: 'Verified buyer · Austin',
    color: 'var(--violet)',
  },
  {
    quote:
      'Bought it as a joke because the landing page was genuinely too good. Joke is on me — best chocolate I have had all year.',
    name: 'Lena R.',
    meta: 'Verified buyer · Berlin',
    color: 'var(--mint)',
  },
];

function Stars() {
  return (
    <span className={styles.stars} aria-label="5 out of 5 stars">
      {'★★★★★'.split('').map((s, i) => (
        <span key={i} aria-hidden="true">
          {s}
        </span>
      ))}
    </span>
  );
}

export default function Testimonials() {
  return (
    <section className={`section ${styles.section}`} id="reviews">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">Reviews</p>
          <h2>The people have spoken.</h2>
          <p className="lead">
            12,480 reviews, 4.9 average. Here are three of our favourites — unedited, unpaid, mildly
            obsessive.
          </p>
        </Reveal>

        <ul className={styles.grid}>
          {REVIEWS.map((review, i) => (
            <Reveal
              as="li"
              key={review.name}
              delay={i * 110}
              className={styles.cardWrap}
            >
              <figure className={styles.card} style={{ '--accent': review.color }}>
                <Stars />
                <blockquote className={styles.quote}>{review.quote}</blockquote>
                <figcaption className={styles.who}>
                  <span className={styles.avatar} aria-hidden="true">
                    {review.name.charAt(0)}
                  </span>
                  <span>
                    <strong>{review.name}</strong>
                    <em className={styles.meta}>{review.meta}</em>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
