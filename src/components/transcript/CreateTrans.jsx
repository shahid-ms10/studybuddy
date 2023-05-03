import React, { useContext, useState } from "react";
import styles from "../../styles/Transcript.module.css";
import axios from "axios";
import dataContext from "@/hooks/DataContext/dataContext";
import authContext from "@/hooks/AuthContext/authContext";
import TransHistory from "@/components/transcript/TransHistory";

const CreateTrans = () => {
  const { user } = useContext(authContext);
  const { sendTranscripts } = useContext(dataContext);

  const [link, setLink] = useState("");
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");
  const [yid, setYid] = useState("")
  const initialSubs = ["Psychology", "Geography", "History"];

  const handleSubmit = () => {
    setYid(link.split("=")[1])
    let formData = {
      "user_id": user ? user.user_id : "test_user_1",
      "video_url": link,
      "chapter_name": chapter,
      "subject_name": subject
    }
    sendTranscripts(formData);
  };

  return (
    <div className={styles.transcript}>
      <div className={styles.subhome}>
        <input
          onChange={(e) => setLink(e.target.value)}
          type="text"
          placeholder="Please enter YouTube video link"
        />
        <div className={styles.option}>
          <select
            onChange={(e) => setSubject(e.target.value)}
            value={subject}
            name="subject"
            id="subjecr"
          >
            <option value="" disabled>Select Subject</option>
            {initialSubs.map((sub) => {
              return <option value={sub}>{sub}</option>;
            })}
          </select>
          <input
            onChange={(e) => setChapter(e.target.value)}
            type="text"
            placeholder="Enter Chapter name"
          />
        </div>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${yid}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        <button onClick={() => handleSubmit()}>Get Notes</button>
      </div>
    </div>
  );
};

export default CreateTrans;
