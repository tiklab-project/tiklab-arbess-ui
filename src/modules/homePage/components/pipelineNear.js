import React, {useEffect} from "react";

const PipelineNear = props =>{

    const {findAllOpen,pipelineNearList,userId} = props

    useEffect(()=>{
        findAllOpen(userId)
    },[])

    const click = item => {
        localStorage.setItem('pipelineName',item.pipeline.pipelineName)
        localStorage.setItem('pipelineId',item.pipeline.pipelineId)
        props.history.push('/index/task')
    }

    return(
        <div className='homePage-content-pipelineNear'>
            <div className='pipelineNear-title'>最近打开的流水线</div>
            <div className='pipelineNear-active'>
                {
                    pipelineNearList && pipelineNearList.length === 0 ?
                        <div className='pipelineNear-active-null'>
                            <svg className="icon" aria-hidden="true" >
                                <use xlinkHref="#icon-meiyouxiangguan"/>
                            </svg>
                            <div>没有数据</div>
                        </div>
                        :
                        pipelineNearList && pipelineNearList.map((item,index)=>{
                            return(
                                <div key={item.id} className='pipelineNear-active-group'>
                                    <div className='pipelineNear-active-group-desc'>
                                        <span>{index+1}、</span>
                                        <span  onClick={()=>click(item)} className='name'>{item.pipelineName}</span>
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