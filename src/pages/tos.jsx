import axios from "axios";
import React, { useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import styles from "../styles/tos.module.css";

const tos = () => {
  const { speak } = useSpeechSynthesis();
  const [text, setText] = useState("");
  const [blog, setBlog]=useState("");

  const handleBlog = ()=>{

    let body={
      params: {
        article: blog
      } 
    }
    axios.get(`http://8b4f-34-150-151-244.ngrok.io/get_article`, body)
    .then((res)=>{
      console.log(res)
      speak({ text: res.data.article })
    })
    .catch(err=>console.log(err))
  }
  
  return (
    <div className={styles.tos}>
      <textarea onChange={(e) => setText(e.target.value)} value={text} name="" id="" cols="60" rows="10"></textarea>
      <button onClick={() => speak({ text: text })} className={`mt-5 ${styles.tos_button}`}>
        Generate voice from text
      </button>
      <p>OR</p>
      <h4>Give any blog link and I'll automate in the voice🤖</h4>
      <input className={styles.blog} type="text" onChange={(e)=>setBlog(e.target.value)} placeholder="blog link"/>
      <button onClick={handleBlog} className={`mt-5 ${styles.tos_button}`}>
        Generate voice from blog
      </button>
    </div>
  );
};

export default tos;