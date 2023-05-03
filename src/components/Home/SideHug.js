import React from 'react'
import styles from "../../styles/SideHug.module.css"

const SideHug = () => {
  return (
    <div className={styles.sidehug}>
      <div className={styles.side_image}>
        <img src="/assets/images/sidehug_image.jpg" alt="" width={500}/>
      </div>
      <div className={styles.side_content}>
        <h1 className={styles.title}>StudyBuddy</h1>
        <p className={styles.text}>One place for all your productivity</p>
        </div>
    </div>
  )
}

export default SideHug