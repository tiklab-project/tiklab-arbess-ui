import React,{Component} from 'react'
import BuildTop from "./buildHistory_buildTop";
import BuildHistory_buildCenter from "./buildHistory_buildCenter";

const BuildTask=()=>{
    return(
        <div className='task-build'>
            <BuildTop/>
            <BuildHistory_buildCenter/>
        </div>
    )
}
export default BuildTask