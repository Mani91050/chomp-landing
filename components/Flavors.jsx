'use client';

import Image from 'next/image';
import { BUNDLE_DEAL, FLAVORS } from '@/data/flavors';
import { useCart } from './CartContext';
import Reveal from './Reveal';
import styles from './Flavors.module.css';

export default function Flavors() {
  const { addItem, addBundle } = useCart();

  return (
    <section className={`section ${styles.section}`} id="flavors">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">The lineup</p>
          <h2>Pick your poison.</h2>
          <p className="lead">
            Four bars. Zero wrong answers. Every order ships with a free vinyl sticker and early
            access to next month’s drop.
          </p>
        </Reveal>

        <ul className={styles.grid}>
          {FLAVORS.map((flavor, i) => (
            <Reveal
              as="li"
              key={flavor.id}
              delay={i * 90}
              className={styles.cardWrap}
            >
              <article
                className={styles.card}
                style={{ '--flavor': flavor.color, '--flavor-soft': flavor.soft }}
              >
                <div className={styles.media}>
                  <Image
                    src={flavor.img}
                    alt={`${flavor.name} chocolate bar`}
                    width={1024}
                    height={1024}
                    sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 25vw"
                    className={styles.img}
                  />
                  <span className={styles.badge}>{flavor.badge}</span>
                </div>

                <div className={styles.body}>
                  <h3>{flavor.name}</h3>
                  <p className={styles.tag}>{flavor.tag}</p>
                  <p className={styles.blurb}>{flavor.blurb}</p>

                  <div className={styles.foot}>
                    <span className={styles.price}>${flavor.price.toFixed(2)}</span>
                    <button
                      type="button"
                      className={`btn btn--sm ${styles.add}`}
                      style={{ '--btn-bg': flavor.color }}
                      onClick={() => addItem(flavor.id)}
                    >
                      Add to box
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal className={styles.bundle}>
          <div className={styles.bundleCopy}>
            <h3>Can’t decide? Take all four.</h3>
            <p>
              The Full Send Box — every flavor, <strong>${BUNDLE_DEAL.price}</strong> instead of
              ${(FLAVORS.reduce((sum, f) => sum + f.price, 0)).toFixed(2)}.
            </p>
          </div>
          <button type="button" className="btn btn--mint btn--lg" onClick={addBundle}>
            Add the Full Send Box
          </button>
        </Reveal>
      </div>
    </section>
  );
}
