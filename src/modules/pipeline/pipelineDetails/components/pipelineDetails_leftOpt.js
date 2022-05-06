import React, {useState} from "react";

const PipelineDetails_leftOpt = props =>{

    const {pipelineList,setVisible,forceUpdate} = props

    const onClick = (e,item) => {
        e.preventDefault()
        localStorage.setItem('pipelineName',item.pipelineName)
        localStorage.setItem('pipelineId',item.pipelineId)
        forceUpdate({})
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




export default PipelineDetails_leftOpt