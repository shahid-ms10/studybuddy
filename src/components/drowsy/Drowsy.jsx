import { alertBox } from '@/utils';
import { faWindowMinimize } from '@fortawesome/free-solid-svg-icons';
import * as faceapi from 'face-api.js';
import React, { useState, useRef  } from 'react';


function Drowsy() {

  const [modelsLoaded, setModelsLoaded] = React.useState(false);
  const [captureVideo, setCaptureVideo] = React.useState(false);
  const [intervalId, setIntervalId] = React.useState(null);
  // const [audio, setAudio]=useState(new Audio(song))
  const audioRef = useRef();

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play()
    } else {
      // Throw error
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    } else {
      // Throw error
    }
  }

  var tick = 0;

  const videoRef = React.useRef();
  const videoHeight = 480;
  const videoWidth = 640;
  const canvasRef = React.useRef();

  React.useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(setModelsLoaded(true));
    }
    loadModels();
  }, []);

  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error("error:", err);
      });
  }

  const handleVideoOnPlay = () => {
    let interval_id = setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
        const displaySize = {
          width: videoWidth,
          height: videoHeight
        }

        faceapi.matchDimensions(canvasRef.current, displaySize);

        const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        console.log(resizedDetections)

        if (resizedDetections.length === 0) {
          tick = tick + 1;
          if (tick > 6) {
            tick = 0;
            //insert here
            play()

            setTimeout(()=>{
              pause()
            },2000)
          }

        }

        canvasRef && canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
        canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        canvasRef && canvasRef.current && faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
      }
    }, 100)

    setIntervalId(interval_id);

    // clearInterval(intervalId);
  }

  const closeWebcam = () => {
    clearInterval(intervalId);
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
  }

  return (
    <div>
      <audio ref={audioRef} src='/sounds/audio.mp3' />
      <div style={{ textAlign: 'center', padding: '10px' }}>
        {
          captureVideo && modelsLoaded ?
            <button onClick={closeWebcam} style={{width:'300px', cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px', marginBottom:'10px'  }}>
              Close Webcam
            </button>
            :
            <><button onClick={startVideo} style={{ width:'300px', cursor: 'pointer', backgroundColor: 'green', color: 'white', padding: '15px', fontSize: '25px', border: 'none', borderRadius: '10px', marginBottom:'10px' }}>
              Enable Webcam Monitoring
            </button>
            <div>
              {/* <button onClick={play}>Play</button> */}
              
            </div>
            </>
        }
      </div>
      {
        captureVideo ?
          modelsLoaded ?
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                <video ref={videoRef} height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} style={{ borderRadius: '10px', display: 'none' }} />
                <canvas ref={canvasRef} style={{ position: 'absolute', display: 'none' }} />
              </div>
            </div>
            :
            <div>loading...</div>
          :
          <>
          </>
      }
    </div>
  );
}

export default Drowsy;