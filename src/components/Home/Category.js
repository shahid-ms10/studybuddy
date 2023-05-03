import React from "react";
import styles from "../../styles/Category.module.css";
import Link from "next/link";

const Category = () => {
  return (
    <div className={styles.category}>
      <p>Browse Categories</p>
      <div className={styles.subcat}>
        <Link href="/transcript">
          <div className={`${styles.cat} ${styles.red}`}>Notes</div>
        </Link>
        <Link href="/ocr">
          <div className={`${styles.cat} ${styles.blue}`}>OCR</div>
        </Link>
        <Link href="/dnd">
          <div className={`${styles.cat} ${styles.purple}`}>Pro study mode</div>
        </Link>
        <Link href="/solver">
          <div className={`${styles.cat} ${styles.red}`}>Equation solver</div>
        </Link>
        <Link href="/contests">
          <div className={`${styles.cat} ${styles.purple}`}>
            Upcoming Contests
          </div>
        </Link>
        <Link href="/tos">
          <div className={`${styles.cat} ${styles.red}`}>Text to speech</div>
        </Link>
        <Link href="/recommendation">
          <div className={`${styles.cat} ${styles.blue}`}>Recommendations</div>
        </Link>
        <Link href="/news">
          <div className={`${styles.cat} ${styles.purple}`}>
            Current Affairs
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Category;
