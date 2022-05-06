import React from "react";

const PipelineDetails_leftOpt = props =>{
    const {pipelineList,setVisible} = props
    
    const onClick = (e,item) => {
        e.preventDefault()
        console.log(item)
        localStorage.setItem('pipelineName',item.pipelineName)
        localStorage.setItem('pipelineId',item.pipelineId)
        setVisible(false)
    }
    
    return(
        <div className='opt'>
            <div className='opt-content'>
                <div className='opt-content-title'>流水线名称</div>
                <div className='opt-content-group'>
                    {
                        pipelineList && pipelineList.map((item,index)=>{
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