import React, { useState } from "react";
import styles from "../../styles/Rcard.module.css";

function RCard({ data }) {
  const [id, setId] = useState(data.link.split("=")[1]);
  return (
    <div className={styles.rcard}>
      <iframe
        width="300"
        height="200"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <h4>{data.title}</h4>
    </div>
  );
}

export default RCard;
