import React, { useEffect, useState } from 'react'
// import {useLocation} from 'react-router-dom'  
import axios from 'axios'
// import { Link, useNavigate} from 'react-router-dom'
import Error from '../components/Error'
import { useRouter } from 'next/router'
import styles from "../styles/visualize.module.css"
import Link from 'next/link';

const visualize = (props) => {
    const router = useRouter();

    const refreshPage = ()=>{
        window.location.reload();
    }

    const handleClick=()=>{
        navigate('/');
    }
  
    var reqEquation=router.query.equation
    console.log(reqEquation);
    var len=reqEquation.length
    var eq=""
    
    console.log(reqEquation);
    console.log(len);

    for(var i=0;i<reqEquation.length-1;i=i+1){
        eq=eq+reqEquation[i];
    }

    for (var char=0;char<len;char++){
        if(eq[char] == 'O')
            eq=eq.replace(eq[char],'0')
        if(eq[char] == '+'){
            eq=eq.replace(eq[char],'%20plus%20')
            len=len+9
        }
        if(eq[char] == '-'){
            eq=eq.replace(eq[char],'%20minus%20')
            len=len+10
        }
    }
    const [solution, setSolution] = useState();
    const [waiting, setWaiting] = useState(0);
    const url="https://api.wolframalpha.com/v2/query?input="+eq+"&output=json&appid=77QY3U-QR78VRQUR7";
    console.log(url);
    setTimeout(()=>setWaiting(1),5000)
    useEffect(() => {
        axios.get("https://cors-anywhere.herokuapp.com/"+url)
            .then(response => setSolution(response));
    }, []);

    return (
        (waiting)?(
            <div className={styles.visualize}>
            {(typeof(solution)=="undefined")?(refreshPage()):(
            <div className="graph">
                {solution.data.queryresult.success==false?<Error/>:
                    <div className={styles.body}>
                        <h1>Graph: </h1>
                        <h6>Entered equation: {reqEquation}</h6>
                        <br />
                        <img className="graph-img img-fluid" src={solution.data.queryresult.pods[1].subpods[0].img.src} />
                        {/* <div onClick={()=>{handleClick()}}>
                            <input
                            type="button"
                            id="home"
                            className="btn btn-primary"
                            value="HOME"
                            />
                        </div> */}
                        <div className={styles.button_container}>
                            <Link className={styles.home_button} href={{
                                pathname:"/",
                            }}>Return to Home</Link>
                        </div>
                    </div>
                }
            </div>
                )}
        </div>
    ):(<>
    <h1 className={styles.visualize}>Waiting for Api response</h1>
    <div className="loader"></div>
    </>)
    )
}

export default visualize
