import React, {useEffect, useState} from "react";
import { Button } from "antd";
import './configChangeView.scss';
import {withRouter} from "react-router-dom";

const ConfigChangeView = props =>{

    const {view,setView,pipelineId,pipelineStartStructure,setIsPrompt,userId,isBtn} = props

    const run = () => {
        setIsPrompt(false)
        const params = {
            userId:userId,
            pipelineId:pipelineId
        }
        setTimeout(()=>{
            pipelineStartStructure(params).then(res=>{
                console.log(res)
                if(res.code === 0){
                    props.history.push('/index/task/structure')
                }
            }).catch(error=>{
                console.log(error)
            })
        },1000)
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
                    <Button form='form' htmlType='submit'> 保存 </Button>
                    <Button form='form' type='primary' htmlType='submit' onClick = {()=>run()}>
                        运行
                    </Button>
                </div>
                {
                    isBtn ?
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
                        :null
                }
            </div>
        </div>
    )
}

export default withRouter(ConfigChangeView)