import styles from './Marquee.module.css';

/**
 * Infinite ticker. The list is rendered twice and translated -50%,
 * so the loop is seamless with pure CSS.
 */
export default function Marquee({ items = [], tone = 'pink', speed = 32 }) {
  const strip = (
    <ul className={styles.strip} aria-hidden="true">
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className={styles.item}>
          {item}
          <span className={styles.star} aria-hidden="true">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`${styles.marquee} ${tone === 'ink' ? styles.ink : ''}`}>
      <div className={styles.track} style={{ animationDuration: `${speed}s` }}>
        {strip}
        {strip}
      </div>
      <span className="sr-only">{items.join(' · ')}</span>
    </div>
  );
}
