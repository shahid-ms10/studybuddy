import React from 'react'
// import { Link, useNavigate} from 'react-router-dom'
import Router, { withRouter } from 'next/router'

const Buttons = (props) => {

    const solveEq=()=>{
      Router.push({
        pathname: '/solve',
        query: { state: props }
      })
    }

    

    // const visEq=()=>{
    //   navigate('/vis',{state:props});
    // }

    return (
        <div className="flex flex-row justify-end mx-auto">
                {/* {console.log(props)} */}
                <div onClick={()=>{solveEq()}}>
                  <input        
                    id="solve"
                    type="button"
                    className="btn btn-success mt-5 ms-3"
                    value="Solve"
                  />
                </div>
                
                {/* <div onClick={()=>{visEq()}}>
                <input
                  id="graph"
                  type="button"
                  className="btn btn-primary mt-4 ms-1"
                  value="Visualize"
                />
                </div> */}
        </div>
    )
}

export default Buttons
