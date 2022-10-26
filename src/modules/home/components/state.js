import React from "react";

const State = props =>{

    const {stateList} = props

    console.log("values",Object.values(stateList))
    console.log("keys",Object.keys(stateList))

    const renderLi = stateList => {
        stateList && Object.values(stateList).map(item=>{
            return <span>{item}</span>
        })
    }

    return(
        <div className="state">
            {/*{stateList && Object.keys(stateList).map(key=>{*/}
            {/*    return <div key={key}>{key}</div>*/}
            {/*})}*/}
            {/*{stateList && Object.values(stateList).map(key=>{*/}
            {/*    return <div key={key}>{key}</div>*/}
            {/*})}*/}
        </div>
    )
}

export default State