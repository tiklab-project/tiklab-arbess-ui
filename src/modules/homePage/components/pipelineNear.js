import React from "react";

const PipelineNear = props =>{

    const {pipelineNearList} = props

    const click = item => {
        localStorage.setItem("pipelineName",item.pipelineName)
        localStorage.setItem("pipelineId",item.pipelineId)
        props.history.push("/index/task")
    }

    return(
        <div className="homePage-content-pipelineNear">
            <div className="pipelineNear-title">最近打开的流水线</div>
            <div className="pipelineNear-active">
                {
                    pipelineNearList && pipelineNearList.length === 0 ?
                        <div className="pipelineNear-active-null">
                            <svg className="icon" aria-hidden="true" >
                                <use xlinkHref="#icon-meiyouxiangguan"/>
                            </svg>
                            <div>没有数据</div>
                        </div>
                        :
                        pipelineNearList && pipelineNearList.map((item,index)=>{
                            return(
                                <div key={item.pipelineId} className="pipelineNear-active-group">
                                    <div className="pipelineNear-active-group-desc">
                                        <span>{index+1}、</span>
                                        <span  onClick={()=>click(item)} className="name">
                                            {item.pipelineName}
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}

export default PipelineNear