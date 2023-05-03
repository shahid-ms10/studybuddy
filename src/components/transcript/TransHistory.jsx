import authContext from '@/hooks/AuthContext/authContext';
import dataContext from '@/hooks/DataContext/dataContext';
import React, { useContext, useEffect } from 'react'
import styles from "../../styles/Transcript.module.css";
import TCrad from './TCrad';
import axios from 'axios';
import { useState } from 'react';

const TransHistory = () => {
  const { user } = useContext(authContext);
  const [ transcripts, setTranscripts ] = useState([]);

  useEffect(() => {
    
    getTranscripts();
      console.log("transcripts ",transcripts)
    }, [])

  const getTranscripts = async () => {
    let formData = {
      "user_id": user ? user.user_id : "test_user_1",
    }
      console.log("get transcripts: ", formData["user_id"])
      axios
      .get(`http://127.0.0.1:5000/gettranscripts`, { params: { user_id: formData["user_id"] } })
      .then(function (response) {
          const res = response.data;
          console.log(res.transcripts);
          setTranscripts(res.transcripts);
      })
      .catch(function (error) {
          console.log(error);
      });
  }
  return (
    <div className={styles.history}>
      <h4>Transcript History</h4>
      <div className={styles.history_section}>
        {transcripts?.map((transcript, key) =>
          <TCrad key={key} title={transcript.title} subject={transcript.subject_name} chapter={transcript.chapter_name} youtube={transcript.video_url} tid={transcript._id} summary={transcript.summary} chunks={transcript.chunks} />
        )}
      </div>
    </div>
  )
}

export default TransHistory