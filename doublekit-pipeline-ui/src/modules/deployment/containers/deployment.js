import React, {useEffect, useState} from 'react'
import SourceCode from "../components/SourceCode";
import Structure from "../components/structure";
import Deploy from "../components/deploy";
import {Breadcrumb, Button, Form} from "antd";
import moment from "../../../common/moment/moment";
import {withRouter} from "react-router-dom"
import {inject, observer} from "mobx-react";

const scrollToAnchor = (anchorName) => {
    if (anchorName) {
        const scrollTop=document.body
        const anchorElement = document.getElementById(anchorName)
        if (anchorElement) {
            scrollTop.scrollTop = anchorElement.offsetTop-160 ;
        }
    }
}

const handleScroll = () => {
    //浏览器滚动的高度
    const scrollTop=document.body.scrollTop

    //固定
    const scrollA=document.getElementById('scrollA')
    const scrollB=document.getElementById('scrollB')
    if(scrollTop >scrollB.offsetHeight-20){
        scrollA.classList.add('newDeployment-anchor-fixed')
    }else {
        scrollA.classList.remove('newDeployment-anchor-fixed')
    }

    //滚动
    const lis=document.getElementsByClassName('newDeployment-anchor-d')
    const a=document.getElementById('a').offsetTop-100
    const b=document.getElementById('b').offsetTop-200
    const c=document.getElementById('c').offsetTop-200
    if(scrollTop > a && scrollTop < b){
        lis.item(0).classList.add("newDeployment-anchor-active")
        lis.item(1).classList.remove("newDeployment-anchor-active")
        lis.item(2).classList.remove("newDeployment-anchor-active")
    }

    if(scrollTop>=b && scrollTop<c){
        lis.item(1).classList.add("newDeployment-anchor-active")
        lis.item(0).classList.remove("newDeployment-anchor-active")
        lis.item(2).classList.remove("newDeployment-anchor-active")
    }

    if(scrollTop>c){
        lis.item(2).classList.add("newDeployment-anchor-active")
        lis.item(0).classList.remove("newDeployment-anchor-active")
        lis.item(1).classList.remove("newDeployment-anchor-active")
    }
}

const Deployment= props=>{

    useEffect(()=> {
        window.addEventListener('scroll', handleScroll);
    },[])

    const {DEPLOYMENT_STORE}=props
    const {createPipelineConfigure}=DEPLOYMENT_STORE

    const onFinish=(values)=>{
        let configure={
            configureCodeSource:values.configureCodeSource,
            configureCodeSourceAddress:values.configureCodeSourceAddress,
            configureCodeStructure:values.configureCodeStructure,
            configureStructureAddress:values.configureStructureAddress,
            configureStructureOrder:values.configureStructureOrder,
            configureDeployAddress:values.configureDeployAddress,
            configureCreateTime:moment.moment,
            pipelineId:localStorage.getItem('pipelineId'),
            proofId:localStorage.getItem('proofId'),
        }
        createPipelineConfigure(configure)
        props.history.push('/home/task/config')
    }

    return (
        <div className='newDeployment'>
            <div className='newDeployment-breadcrumb' id={'scrollB'}>
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>流水线</Breadcrumb.Item>
                    <Breadcrumb.Item href="">{localStorage.getItem('pipelineName')}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='newDeployment-offset'>
                <div className='newDeployment-anchor'  id={'scrollA'}>
                    <div
                        onClick={()=>scrollToAnchor('a')}
                        className={'newDeployment-anchor-d newDeployment-anchor-active'}
                    >
                        源码管理
                    </div>
                    <div
                        onClick={()=>scrollToAnchor('b')}
                        className={'newDeployment-anchor-d'}
                    >
                        构建
                    </div>
                    <div
                        onClick={()=>scrollToAnchor('c')}
                        className={'newDeployment-anchor-d' }
                    >
                        部署
                    </div>

                </div>
                <Form
                    onFinish={onFinish}
                    id={'form'}
                    initialValues={{"configureCodeStructure":'b',"configureCodeSource":'a'}}
                    layout="vertical"
                    autoComplete = "off"
                >
                    <div id="a" >
                        <SourceCode />
                    </div>
                    <div id="b">
                        <Structure   />
                    </div>
                    <div id="c">
                        <Deploy/>
                    </div>
                    <div className='newDeployment-btn'>
                        <Button
                            htmlType='submit'
                            form='form'
                            type='primary'
                            style={{marginLeft:30,marginRight:30}}
                        >
                            保存
                        </Button>
                        <Button onClick={()=>props.history.push('/home/task/config')}>取消</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default withRouter(inject('DEPLOYMENT_STORE')(observer(Deployment)))