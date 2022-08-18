import React from "react";
import EmptyText from "./emptyText";

const MatFlowNear = props =>{
    const {matFlowNearList} = props

    const goMatFlow = matFlowName => {
        props.history.push(`/index/task/${matFlowName}/work`)
    }

    return <div className="matFlowNear">
        <div className="matFlowNear-title">最近打开的流水线</div>
        <div className="matFlowNear-list">
            {
                matFlowNearList && matFlowNearList.length>0 ?
                    matFlowNearList.map((item,index)=>{
                        return  <div key={item.matFlowId} className="matFlowNear-list-item">
                            <div className="matFlowNear-list-item-desc">
                                <span>{index+1}、</span>
                                <span onClick={()=>goMatFlow(item.matFlowName)} className="name">
                                    {item.matFlowName}
                                 </span>
                            </div>
                        </div>
                    })
                    :
                    <EmptyText/>
            }
        </div>
    </div>
}

export default MatFlowNear