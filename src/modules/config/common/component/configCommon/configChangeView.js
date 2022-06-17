import React from "react";
import { Button } from "antd";
import './configChangeView.scss';
import {withRouter} from "react-router-dom";

const ConfigChangeView = props =>{

    const {view,setView,pipelineId,pipelineStartStructure,setIsPrompt,userId} = props

    const run = () => {
        setIsPrompt(false)
        const params = {
            userId:userId,
            pipelineId:pipelineId
        }
        pipelineStartStructure(params).then(res=>{
            console.log(res)
            props.history.push('/index/task/structure')
        }).catch(error=>{
            console.log(error)
        })
    }

    const viewList = [
        {
            id:1,
            title:'表单视图'
        },
        {
            id:2,
            title:'图形化视图'
        }
    ]

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
                <div className='changeView-view'>
                    {
                        viewList.map(item=>{
                            return  <div className={view === item.id ? 'view view-link' : 'view' }
                                         onClick={()=>setView(item.id)}
                                         key={item.id}
                                    >
                                        {item.title}
                                    </div>
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default withRouter(ConfigChangeView)