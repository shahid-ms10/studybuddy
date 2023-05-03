import React from 'react'
import styles from "../../styles/Transcript.module.css";
import Chunks from '@/components/transcript/Chunks';
import { useRouter } from 'next/router'

const Details = () => {
    const router = useRouter();
    
    console.log(router.query)
    const data = JSON.parse(router.query.chunks);

    console.log(data)
    return (
        <div className={styles.details}>
            <div className={styles.individual}>
                {/* <div className={styles.item}>
            <h3>YouTube name: </h3>
            <h3> CIA Properties | Confidentiality, Integrity, Availability with examples</h3>
        </div>
        <div className={styles.item}>
            <h3>Subject: </h3>
            <h3> History</h3>
        </div> 
        <div className={styles.item}>
            <h3>Chapter: </h3>
            <h3> Chapt1</h3>
        </div>*/}
            </div>
            <div className={styles.chunks}>
                {data?.map((chunk, key) =>
                    <Chunks key={key} text={chunk} />
                )}
            </div>
            {/* <button className={styles.add_notes}>Add to notes</button> */}
        </div>
    )
}

export default Details