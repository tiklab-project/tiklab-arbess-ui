import React from "react";
import { Button } from "antd";
import './configChangeView.scss'
import {withRouter} from "react-router-dom";

const ConfigChangeView = props =>{

    const {view,setView,pipelineId,pipelineStartStructure,setIsPrompt} = props
    
    const run = () => {
        setIsPrompt(false)
        pipelineStartStructure(pipelineId).then(res=>{
            props.history.push('/home/task/structure')
        })
    }

    return (
        <div className='config_changeView'>
            <div className='changeView'>
                <div className='changeView-btn'>
                    <Button form='form' htmlType='submit'>
                        保存
                    </Button>
                    <Button type='primary' form='form' htmlType='submit' onClick = {()=>run()}>
                        运行
                    </Button>
                </div>
                <div className={view ===0 ? 'view view-link' : 'view' } onClick={()=>setView(0)}>
                    表单视图
                </div>
                <div className={view ===1 ? 'view view-link' : 'view' } onClick={()=>setView(1)}>
                    图形化视图
                </div>
            </div>
        </div>
    )
}

export default withRouter(ConfigChangeView)