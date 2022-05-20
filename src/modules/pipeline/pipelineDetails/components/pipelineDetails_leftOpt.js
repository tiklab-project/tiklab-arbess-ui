import React  from "react";
import {withRouter} from "react-router-dom";

const PipelineDetails_leftOpt = props =>{

    const {pipelineList,isPrompt,setVisible,setPipeline,setIsPrompt} = props
    const pipelineName = localStorage.getItem('pipelineName')

    const onClick = (e,item) => {
        e.preventDefault()
        if(pipelineName!==item.pipelineName){
            if(!isPrompt){
                localStorage.setItem('pipelineName',item.pipelineName)
                localStorage.setItem('pipelineId',item.pipelineId)
            }else {
                setPipeline(item)
                props.history.push('/home/task/config')
            }
        }
        setVisible(false)
    }

    return(
        <div className='opt'>
            <div className='opt-content'>
                <div className='opt-content-title'>流水线名称</div>
                <div className='opt-content-group'>
                    {
                        pipelineList && pipelineList.map(item=>{
                            return(
                                <div
                                    onClick={e =>{onClick(e,item)}}
                                    key={item.pipelineId}
                                    className='opt-content-group_item'
                                >
                                    {item.pipelineName}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default withRouter(PipelineDetails_leftOpt)