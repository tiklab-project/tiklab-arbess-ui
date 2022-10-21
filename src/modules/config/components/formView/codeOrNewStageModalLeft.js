import React from "react";

const CodeOrNewStageModalLeft = props =>{

    const {lis,type,setType} = props

    const renderLis = item =>{
        return  <div
                    key={item.id}
                    className={`item ${item.id===type? "item-select":""}`}
                    onClick={()=>setType(item.id)}
                >
                    <div className="item-title">{item.title}</div>
                </div>
    }

    return(
        <div className="modalLeft">
            {
                lis && lis.map(item=>{
                    return renderLis(item)}
            )}
        </div>
    )
}

export default CodeOrNewStageModalLeft