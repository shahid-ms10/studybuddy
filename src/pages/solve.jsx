import React, { useEffect, useState } from 'react'
// import "../index.css" 
import axios from 'axios'
// import { Link, useNavigate} from 'react-router-dom'
import Error from '../components/Error'
import { useRouter } from 'next/router'
import Link from 'next/link';
import styles from "../styles/visualize.module.css"


const Solve = (props) => {
    // const navigate = useNavigate();
    // const location = useLocation();
    const router = useRouter();
    console.log("QUERY", router.query)

    var reqEquation = router.query.equation
    var len = reqEquation.length
    var eq = ""
    const arr = [];
    let ans = "";

    console.log(reqEquation);
    console.log(len);

    for (var i = 0; i < reqEquation.length - 1; i = i + 1) {
        eq = eq + reqEquation[i];
    }

    for (var char = 0; char < len; char++) {
        if (eq[char] == 'O')
            eq = eq.replace(eq[char], '0')
        if (eq[char] == '+') {
            eq = eq.replace(eq[char], '%20plus%20')
            len = len + 9
        }
        if (eq[char] == '-') {
            eq = eq.replace(eq[char], '%20minus%20')
            len = len + 10
        }
    }

    const visEq = () => {
        // navigate('/vis',{state:location.state});
        <Link href={{
            pathname: "/solve",
            query: { "equation": reqEquation }
        }}>Solve</Link>
    }

    const refreshPage = () => {
        window.location.reload();
    }

    const [solution, setSolution] = useState();
    const [waiting, setWaiting] = useState(0);
    const url = "https://api.wolframalpha.com/v2/query?input=" + eq + "&output=json&appid=77QY3U-QR78VRQUR7";
    console.log(url);
    setTimeout(() => setWaiting(1), 5000)
    useEffect(() => {
        axios.get("https://cors-anywhere.herokuapp.com/" + url)
            .then(response => setSolution(response))
    }, []);

    return (
        (waiting) ? (
            <div className={styles.visualize}>
                {console.log(solution)}
                {(typeof (solution) == "undefined") ? (refreshPage()) : (
                    <div className="solution home">
                        {console.log("Status" + solution.data.queryresult.success + typeof (solution.data.queryresult.success))}
                        {solution.data.queryresult.success == false ? <Error /> :
                            <div className="box">
                                {arr.push(solution.data.queryresult.pods[solution.data.queryresult.pods.length - 3].subpods)}
                                <h1>Solution: </h1>
                                <h6>Entered equation: {reqEquation}</h6>
                                <br />
                                {console.log(solution.data.queryresult.pods[solution.data.queryresult.pods.length - 3].subpods[0].img.alt)}
                                {console.log(arr)}
                                <h6>Answer : </h6>
                                {/* <p>{solution.data.queryresult.pods[4].subpods[0].img.alt}</p> */}
                                {arr.forEach(s => {
                                    s.forEach(final => {
                                        {/* {console.log("printing this brooo"+final.img.alt)} */ }
                                        {/* {ans.push(final.plaintext + " ")} */ }
                                        ans = ans + final.plaintext + "  "
                                    })
                                })}
                                {/* <Answer arr={arr}/> */}
                                <p>{ans}</p>
                                {/* <div onClick={()=>{visEq()}}>
                            <input
                            type="button"
                            id="vis"
                            className="btn btn-primary mt-4 ms-1"
                            value="Visualize"
                            />
                        </div> */}
                                <div className={styles.button_container}>
                                    <Link className={styles.home_button} href={{
                                        pathname: "/visualize",
                                        query: { "equation": reqEquation }
                                    }}>Visualize</Link>
                                </div>
                            </div>}
                    </div>
                )}
            </div>
        ) : (<>
            <h1 className={styles.visualize}>Waiting for Api response</h1>
            <div className="loader"></div>
        </>)
    )
}


export default Solve
