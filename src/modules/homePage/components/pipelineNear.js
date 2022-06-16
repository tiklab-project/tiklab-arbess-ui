import React, {useEffect} from "react";
import {inject,observer} from "mobx-react";
import {getUser} from "doublekit-core-ui";

const PipelineNear = props =>{

    const {homePageStore} = props
    const {findAllOpen,pipelineNearList} = homePageStore

    useEffect(()=>{
        findAllOpen(getUser().userId)
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

export default inject('homePageStore')(observer(PipelineNear))