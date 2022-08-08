import React from "react";
import EmptyText from "./emptyText";

const MatFlowNear = props =>{
    const {matFlowNearList} = props

    const goMatFlow = matFlowName => {
        props.history.push(`/index/task/${matFlowName}/work`)
    }

    return <div className="matFlowNear">
        <div className="matFlowNear-title">最近打开的流水线</div>
        <div className="matFlowNear-active">
            {
                matFlowNearList && matFlowNearList.length>0 ?
                    matFlowNearList.map((item,index)=>{
                        return  <div key={item.matFlowId} className="matFlowNear-active-group">
                            <div className="matFlowNear-active-group-desc">
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