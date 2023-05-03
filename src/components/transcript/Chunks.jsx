import React from 'react'
import styles from "../../styles/Chunks.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp } from '@fortawesome/fontawesome-free-solid'
import { useSpeechSynthesis } from "react-speech-kit";

const Chunks = ({ text }) => {
  const { speak } = useSpeechSynthesis();

  return (
    <div className={styles.chunks}>
      <div className={styles.checkbox}>
        <FontAwesomeIcon onClick={() => speak({ text: text })} icon={faVolumeUp} className="speak-icon hover-pointer" />
        <span className={styles.read_aloud}>Read aloud</span>
      </div>
      <p>
        {text}
      </p>

    </div>
  )
}

export default Chunks