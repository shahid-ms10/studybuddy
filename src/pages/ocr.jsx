// import React, { useState, useRef } from "react";
// import styles from "../styles/ocr.module.css";
// import Tesseract from 'tesseract.js';

// const ocr = () => {
//   const [imagePath, setImagePath] = useState("");
//   const [text, setText] = useState("");

//   const handleChange = (event) => {
//     setImagePath(URL.createObjectURL(event.target.files[0]));
//   };

//   const handleClick = () => {
  
//     Tesseract.recognize(
//       imagePath,'eng',
//       { 
//         logger: m => console.log(m) 
//       }
//     )
//     .catch (err => {
//       console.error(err);
//     })
//     .then(result => {
//       // Get Confidence score
//       let confidence = result.confidence
     
//       let text = result.text
//       setText(text);
//     console.log(text)
//     })
//   }

//   return (
//     <div className={styles.ocr}>
//       <main className={styles.body}>
//         <h3>Actual image uploaded</h3>
//         <img 
//            src={imagePath} className="App-logo" alt="Uploaded image"/>
        
//           <h3>Extracted text</h3>
//         <div className={styles.text}>
//           <p> {text} </p>
//         </div>
//         <input type="file" onChange={handleChange} />
//         <button onClick={handleClick} style={{height:50}}> convert to text</button>
//       </main>
//     </div>
//   );
// };

// export default ocr;


import React from 'react'
import { useCallback, useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';
import Tesseract from 'tesseract.js';
import styles from "../styles/ocr.module.css"

const ocr = () => {
    const [imagePath, setImagePath] = useState("");
    const [text, setText] = useState("");
    const [progress, setProgress] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleChange = (event) => {
      setImagePath(URL.createObjectURL(event.target.files[0]));
    }
   
    const handleClick = () => {
      setIsLoading(true);
      Tesseract.recognize(
        imagePath,'eng',
        { 
          logger: m => console.log(m) 
        }
      )
      .catch (err => {
        console.error(err);
      })
      .then(result => {
        // Get Confidence score
        let confidence = result.confidence
       
        let text = result.text
        setText(text);
    
      })
    }

    const handleSubmit = () => {
      setIsLoading(true);
      Tesseract.recognize(imagePath, 'eng', {
        logger: (m) => {
          console.log(m);
          if (m.status === 'recognizing text') {
            setProgress(parseInt(m.progress * 100));
          }
        },
      })
        .catch((err) => {
          console.error(err);
        })
        .then((result) => {
          console.log(result.data);
          setText(result.data.text);
          setIsLoading(false);
        });
    };

    const downloadTxtFile = () => {
      const element = document.createElement("a");
      const file = new Blob([text],    
                  {type: 'text/plain;charset=utf-8'});
      element.href = URL.createObjectURL(file);
      element.download = "myFile.txt";
      document.body.appendChild(element);
      element.click();
    }
   
    return (
      <div className={styles.ocr}>
        <main className="App-main">
          <input className="form-control mt-5 mb-5" type="file" onChange={handleChange} />
          <h3>Uploaded Image</h3>
          <img src={imagePath} className="App-image" alt="logo"/>
          {isLoading && (
            <>
              <progress className="mt-5 form-control" value={progress} max="100">
                {progress}%{' '}
              </progress>{' '}
              <p className="text-center py-0 my-0 white_text">Fetching data:- {progress} %</p>
            </>
          )}
          <div className={`${styles.button_container} mt-5`}>
          <button className={styles.ocr_button} onClick={handleSubmit} style={{height:50}}> convert to text</button>
          </div>
          <h3 className='mt-5'>Extracted text</h3>
          <div className="text-box">
            <textarea
                className="form-control w-100 mt-5"
                rows="5"
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          <div className={`${styles.button_container} mt-5`}>
          <button className={styles.ocr_button} onClick={downloadTxtFile} style={{height:50}}> Save as doc</button>
          </div>
          
        </main>
      </div>
    );
  }

export default ocr