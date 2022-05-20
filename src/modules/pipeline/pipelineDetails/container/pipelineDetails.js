import React, {Fragment, useEffect, useState} from "react";
import {Layout, Modal} from 'antd';
import {renderRoutes} from "react-router-config";
import './pipelineDetails.scss'
import PipelineDetailsBreadcrumb from "../components/pipelineDetailsBreadcrumb";
import PipelineDetails_left from "../components/pipelineDetails_left";
import { inject,observer } from "mobx-react";
import {Prompt} from "react-router-dom";

const { Content, Sider } = Layout;

const PipelineDetails= (props)=>{

    const {route,PipelineStore,ConfigCommonStore}=props
    const {findAllPipelineStatus,pipelineList,pipeline,setPipeline} = PipelineStore
    const {isPrompt,setIsPrompt} = ConfigCommonStore

    const [visible,setVisible] = useState(false)

    useEffect(()=>{
        findAllPipelineStatus()
    },[])

    useEffect(()=>{
        pipelineList && pipelineList.map(item=>{
            if(pipeline.pipelineId === item.pipelineId){
                localStorage.setItem('pipelineName',pipeline.pipelineName)
                localStorage.setItem('pipelineId',pipeline.pipelineId)
            }
        })
    },[pipeline])

    useEffect(()=>{
        return ()=>{
            localStorage.removeItem('pipelineName')
            localStorage.removeItem('pipelineId')
        }
    },[])

    const confirmLeave = pathname =>{
        setIsPrompt(false)
        if(pathname!=='/home/task/config'){
            pathname && setTimeout(()=>{
                props.history.push(pathname)
            })
        }
    }

    return(
        <Fragment>
            <Layout>
                <PipelineDetails_left
                    pipelineList={pipelineList}
                    visible={visible}
                    setVisible={setVisible}
                    isPrompt={isPrompt}
                    setPipeline={setPipeline}
                    setIsPrompt={setIsPrompt}
                />
                <Content
                    className='pipelineDetails'
                    style={{marginLeft:60}}
                    onClick={()=>setVisible(false)}
                >
                    <PipelineDetailsBreadcrumb   {...props} />
                    {renderRoutes(route.routes)}
                </Content>
            </Layout>

            <Prompt
                when={isPrompt}
                message={location =>{
                    if(!isPrompt){
                        return true
                    }
                    Modal.confirm({
                        title:'有编辑未保存，确定离开吗',
                        okText:'离开',
                        cancelText:'取消',
                        onOk:()=>confirmLeave(location.pathname)
                    })
                    return false
                }}
            />

        </Fragment>
    )
}

export default inject('PipelineStore','ConfigCommonStore')(observer(PipelineDetails))


