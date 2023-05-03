import Link from 'next/link';
import React from 'react'
import styles from "../../styles/Transcript.module.css";

const colors = ['red', 'blue', 'green', 'purple']

const TCrad = ({ title, subject, chapter, youtube, tid, chunks, summary }) => {
  return (
    <div className={styles.tcard}>
      <Link
        href={{
          pathname: `/transcript/${tid}`,
          query: {
            chunks: JSON.stringify(chunks),
          }
        }}
      >
        <div style={{ backgroundColor: colors[[Math.floor(Math.random() * colors.length)]] }} className={styles.tid}>
          {title}
        </div>
      </Link>
      <div className={styles.tbody}>
        <p>Subject: {subject}</p>
        <p>Chapter: {chapter}</p>
        <a href={youtube} target="_black">YT Link</a>
      </div>
    </div>

  )
}

export default TCrad