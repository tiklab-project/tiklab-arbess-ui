import React,{useState} from "react";
import "./pipelineAddModalLeft.scss";

const PipelineAddModalLeft = props =>{

    const {type,changeAnchor,lis} = props

    const renderLis = lis => {
        return lis.map(item=>{
            return(
                <div key={item.id}
                     onClick={()=>changeAnchor(item.id)}
                     className={`pipelineAddModalLeft-title ${type===item.id?"PipelineAddModalLeft-setected":""}`}
                >
                    {item.title}
                </div>
            )
        })
    }

    return(
        <div  className="pipelineAddModalLeft">
            {renderLis(lis)}
        </div>
    )
}

export default PipelineAddModalLeft