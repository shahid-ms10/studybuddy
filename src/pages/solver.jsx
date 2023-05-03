import React from 'react'
import Tesseract from 'tesseract.js';
// import { Link, useHistory } from "react-router-dom";
import Buttons from '@/components/Buttons';
import Link from 'next/link';
import styles from "../styles/visualize.module.css"

const solver = () => {

    // const history=useHistory();
    const [isLoading, setIsLoading] = React.useState(false);
    const [image, setImage] = React.useState('');
    const [text, setText] = React.useState('');
    const [progress, setProgress] = React.useState(0);
  
    const handleSubmit = () => {
      setIsLoading(true);
      Tesseract.recognize(image, 'eng', {
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

    return (
    <div className="container" style={{ height: '80vh' }}>
      <div className="row h-100">
        <div className="col-md-5 mx-auto h-100 d-flex flex-column justify-content-center">
          {/* {!isLoading && (
            <div>
              <h1 className="text-center mc-5 heading">Visolve</h1>
              <p className="text-center tagline white_text ">A solution to all your problems</p>
            </div>
            
          )} */}
          {isLoading && (
            <>
              <progress className="form-control" value={progress} max="100">
                {progress}%{' '}
              </progress>{' '}
              <p className="text-center py-0 my-0 white_text">Converting:- {progress} %</p>
            </>
          )}
          {!isLoading && !text && (
            <> 
              <input
                type="file"
                id="file"
                onChange={(e) =>
                  setImage(URL.createObjectURL(e.target.files[0]))
                }
                className="form-control mt-5 mb-2"
              />
              <input
                type="button"
                id="submit"
                onClick={handleSubmit}
                className="btn btn-primary mt-5"
                value="Solve"
              />
            </>
          )}
          {!isLoading && text && (
            <>
              <h6 className="text-center py-3 white_text">Please confirm the equation</h6>
              <textarea
                className="form-control w-100 mt-5"
                rows="5"
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
              {/* <Buttons equation={text}/>     */}
              <div className={styles.solver_div}>
                <Link className={styles.home_button} href={{
                    pathname:"/solve",
                    query: {"equation": text}
                }}>Solve</Link>
                <Link className={styles.home_button} href={{
                    pathname:"/visualize",
                    query: {"equation": text}
                }}>Visualize</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    )
}

export default solver
