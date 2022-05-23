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
                    <Button
                        form='form'
                        htmlType='submit'
                    >
                        保存
                    </Button>
                    <Button
                        type='primary'
                        form='form'
                        htmlType='submit'
                        onClick = {()=>run()}
                    >
                        运行
                    </Button>
                </div>
                <div
                    onClick={()=>setView(0)}
                    className={view ===0 ? 'view view-link' : 'view' }
                >
                    表单视图
                </div>
                <div
                    onClick={()=>setView(1)}
                    className={view ===1 ? 'view view-link' : 'view' }
                >
                    图形化视图
                </div>
            </div>
        </div>
    )
}

export default withRouter(ConfigChangeView)