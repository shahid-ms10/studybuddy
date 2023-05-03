// import React, { useEffect, useState } from 'react'
// import styles from "../styles/dnd.module.css"
// import { FullScreen, useFullScreenHandle } from "react-full-screen";
// import Drowsy from '@/components/drowsy/Drowsy';

// const dnd = () => {

//     const handle = useFullScreenHandle();
//     const[time, setTime]=useState()
//     const [full, setFull]=useState(false)
//     const[counter, setCounter]=useState(60)
//     const handleSubmit =(e)=>{
//         handle.enter(e)
//         setTimeout(()=>{
//             handle.exit(e)
//         },counter*1000)
//     }

//     useEffect(()=>{
//         counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
//     },[counter])
//   return (
//     // <FullScreen  handle={handle}>
//     <div className={styles.dnd}>
//         <Drowsy/>
//         <input onChange={(e)=>setTime(e.target.value)} type="number" name="" id="" placeholder='Enter the time in minutes'/>
//         <p>Once you enter in dnd mode you can not exit full screen until the time is over</p>
//         <p>(Use ESC for emergency)</p>
//         <button onClick={handleSubmit}>Start</button>
      
//         {<FullScreen  handle={handle}>
//             <div className={styles.fscreen}>
//                 <h1 className={styles.time}>Time remaining: {counter}</h1>
//             </div>
//         </FullScreen>}
        
//     </div>
//     // </FullScreen>
//   )
// }

// export default dnd

import React, { useState } from 'react';
import axios from 'axios';
import styles from "../styles/dnd.module.css"

const Dnd = () => {
  const [alarmTime, setAlarmTime] = useState(0);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleStart = () => {
    if (alarmTime <= 0) {
      setError('Please enter a positive integer.');
      return;
    }

    axios.get('', {
      params: { alarm_time: alarmTime }
    })
    .then(response => {
      console.log(response.data);
      setStatus('Face detection activated.');
    })
    .catch(error => {
      console.log(error);
      setError('Error activating face detection.');
    });
  }

  return (
    <div>
      <h1>Do Not Disturb</h1>
      <p>Enter the time in seconds to wait before setting the alarm:</p>
      <input type="number" value={alarmTime} onChange={e => setAlarmTime(parseInt(e.target.value))} />
      <button onClick={handleStart}>Start</button>
      {status && <p>{status}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Dnd;
