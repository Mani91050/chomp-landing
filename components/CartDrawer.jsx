'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FREE_SHIPPING_THRESHOLD, getFlavor } from '@/data/flavors';
import { useCart } from './CartContext';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
  const { items, isOpen, closeCart, subtotal, remaining, updateQty, removeItem, count } = useCart();
  const closeRef = useRef(null);
  const [demoNote, setDemoNote] = useState(false);

  // Move focus into the panel when it opens.
  useEffect(() => {
    if (isOpen) {
      setDemoNote(false);
      const id = window.setTimeout(() => closeRef.current?.focus(), 60);
      return () => window.clearTimeout(id);
    }
  }, [isOpen]);

  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className={`${styles.root} ${isOpen ? styles.open : ''}`}>
      <button
        type="button"
        className={styles.overlay}
        onClick={closeCart}
        tabIndex={isOpen ? 0 : -1}
        aria-label="Close cart"
      />

      <aside
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Your box"
        aria-hidden={!isOpen}
      >
        <header className={styles.head}>
          <div>
            <h2 className={styles.title}>Your box</h2>
            <p className={styles.count}>
              {count} {count === 1 ? 'bar' : 'bars'}
            </p>
          </div>
          <button
            type="button"
            ref={closeRef}
            className={styles.close}
            onClick={closeCart}
            aria-label="Close cart"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        <div className={styles.shipWrap}>
          <div className={styles.shipBar}>
            <span style={{ width: `${progress}%` }} />
          </div>
          <p className={styles.shipText} aria-live="polite">
            {remaining > 0 ? (
              <>
                You’re <strong>${remaining.toFixed(2)}</strong> away from free shipping
              </>
            ) : (
              <>🎉 Free shipping unlocked</>
            )}
          </p>
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyEmoji} aria-hidden="true">
              🍫
            </p>
            <h3>Your box is empty</h3>
            <p>Statistically speaking, that’s a mistake.</p>
            <button type="button" className="btn btn--pink" onClick={closeCart}>
              Browse the flavors
            </button>
          </div>
        ) : (
          <ul className={styles.list}>
            {items.map((item) => {
              const flavor = getFlavor(item.id);
              if (!flavor) return null;

              return (
                <li key={item.id} className={styles.item}>
                  <div className={styles.thumb} style={{ background: flavor.soft }}>
                    <Image src={flavor.img} alt="" width={140} height={140} />
                  </div>

                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>{flavor.name}</p>
                    <p className={styles.itemTag}>{flavor.tag}</p>

                    <div className={styles.itemControls}>
                      <div className={styles.qty}>
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          aria-label={`Decrease ${flavor.name} quantity`}
                        >
                          −
                        </button>
                        <span aria-live="polite">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          aria-label={`Increase ${flavor.name} quantity`}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className={styles.remove}
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <p className={styles.linePrice}>${(flavor.price * item.qty).toFixed(2)}</p>
                </li>
              );
            })}
          </ul>
        )}

        {items.length > 0 && (
          <footer className={styles.foot}>
            <div className={styles.row}>
              <span>Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
            <div className={styles.row}>
              <span>Shipping</span>
              <strong>{remaining > 0 ? 'At checkout' : 'Free'}</strong>
            </div>

            <button
              type="button"
              className="btn btn--pink btn--lg btn--block"
              onClick={() => setDemoNote(true)}
            >
              Checkout
            </button>

            {demoNote && (
              <p className={styles.demoNote} role="status">
                Front-end demo — no payment is taken. 🙂
              </p>
            )}
          </footer>
        )}
      </aside>
    </div>
  );
}
