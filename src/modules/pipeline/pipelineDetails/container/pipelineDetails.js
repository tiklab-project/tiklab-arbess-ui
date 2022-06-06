import React, { useEffect, useState} from "react";
import {Layout, Modal} from 'antd';
import {renderRoutes} from "react-router-config";
import './pipelineDetails.scss'
import PipelineDetailsBreadcrumb from "../components/pipelineDetailsBreadcrumb";
import PipelineDetailsLeft from "../components/pipelineDetailsLeft";
import { inject,observer } from "mobx-react";
import {Prompt} from "react-router-dom";

const { Content } = Layout;

const PipelineDetails= (props)=>{

    const {route,pipelineStore,configDataStore}=props
    const {findAllPipelineStatus,pipelineList,pipeline,setPipeline} = pipelineStore
    const {isPrompt,setIsPrompt} = configDataStore
    const pipelineName = localStorage.getItem('pipelineName')
    const pipelineId = localStorage.getItem('pipelineId')
    const [visible,setVisible] = useState(false)

    useEffect(()=>{
        findAllPipelineStatus()
    },[])

    useEffect(()=>{
        if(pipeline !== undefined ){
            pipelineList && pipelineList.map(item=>{
                if(pipeline.pipelineId === item.pipelineId){
                    localStorage.setItem('pipelineName',pipeline.pipelineName)
                    localStorage.setItem('pipelineId',pipeline.pipelineId)
                }
            })
        }
    },[pipeline])

    useEffect(()=>{
        return ()=>{
            localStorage.removeItem('pipelineName')
            localStorage.removeItem('pipelineId')
        }
    },[])

    const confirmLeave = pathname =>{
        if(pathname!=='/home/task/config'){
            pathname && setTimeout(()=>{
                props.history.push(pathname)
            })
        }
        setIsPrompt(false)
    }

    const confirmStay = () => {
        setPipeline()
        localStorage.setItem('pipelineName',pipelineName)
        localStorage.setItem('pipelineId',pipelineId)
    }

    return(
        <Layout>
            <PipelineDetailsLeft
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
                        onOk:()=>confirmLeave(location.pathname),
                        onCancel:()=>confirmStay()
                    })
                    return false
                }}
            />
        </Layout>
    )
}

export default inject('pipelineStore','configDataStore')(observer(PipelineDetails))

