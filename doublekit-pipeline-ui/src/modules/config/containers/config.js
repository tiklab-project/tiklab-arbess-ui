import React, {useEffect, useState} from 'react'
import SourceCode from "../components/SourceCode";
import Structure from "../components/structure";
import Deploy from "../components/deploy";
import Test from "../components/test";
import {Breadcrumb, Button, Form} from "antd";
import moment from "../../../common/moment/moment";
import {withRouter} from "react-router-dom"
import {inject, observer} from "mobx-react";

const Config= props=>{

    const {ProofStore,ConfigStore}=props
    const {createPipelineConfigure}=ConfigStore
    const {
        createGitProof,findAllGitProof,findOneCodeProof,allGitProof,gitProofId,oneCodeProof,
        createDeployProof,findAllDeployProof,findOneDeployProof,allDeployProof,deployProofId,oneDeployProof
    } =ProofStore

    useEffect(()=> {
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll',handleScroll);
        };
    },[])

    const handleScroll = () => {
        //浏览器滚动的高度
        const scrollTop=document.body.scrollTop

        //固定
        const scrollA=document.getElementById('scrollA')
        const scrollB=document.getElementById('scrollB')
        if(scrollB && scrollTop >scrollB.offsetHeight){
            scrollA.classList.add('newDeployment-anchor-fixed')
        }else {
            scrollA.classList.remove('newDeployment-anchor-fixed')
        }

        //滚动
        const lis=document.getElementsByClassName('newDeployment-anchor-d')
        const a=document.getElementById('a').offsetTop-55
        const b=document.getElementById('b').offsetTop-55
        const c=document.getElementById('c').offsetTop-55
        const d=document.getElementById('d').offsetTop-55

        if(scrollTop > a && scrollTop < b){
            lis.item(0).classList.add("newDeployment-anchor-active")
            lis.item(1).classList.remove("newDeployment-anchor-active")
            lis.item(2).classList.remove("newDeployment-anchor-active")
            lis.item(3).classList.remove("newDeployment-anchor-active")
        }

        if(scrollTop>=b && scrollTop<c){
            lis.item(1).classList.add("newDeployment-anchor-active")
            lis.item(0).classList.remove("newDeployment-anchor-active")
            lis.item(2).classList.remove("newDeployment-anchor-active")
            lis.item(3).classList.remove("newDeployment-anchor-active")
        }

        if(scrollTop>c && scrollTop<d){
            lis.item(2).classList.add("newDeployment-anchor-active")
            lis.item(0).classList.remove("newDeployment-anchor-active")
            lis.item(1).classList.remove("newDeployment-anchor-active")
            lis.item(3).classList.remove("newDeployment-anchor-active")
        }
        if(scrollTop>d){
            lis.item(3).classList.add("newDeployment-anchor-active")
            lis.item(0).classList.remove("newDeployment-anchor-active")
            lis.item(1).classList.remove("newDeployment-anchor-active")
            lis.item(2).classList.remove("newDeployment-anchor-active")
        }
    }

    const scrollToAnchor = (anchorName) => {
        if (anchorName) {
            const scrollTop=document.body
            const anchorElement = document.getElementById(anchorName)
            if (anchorElement) {
                scrollTop.scrollTop = anchorElement.offsetTop+55 ;
            }
        }
    }

    const onFinish=(values)=>{
        const configure={
            configureBranch:values.configureBranch,
            configureTargetAddress: values.configureTargetAddress,
            configureCodeSource:values.configureCodeSource,
            configureCodeSourceAddress:values.configureCodeSourceAddress,
            configureTestType:values.configureTestType,
            configureTestText:values.configureTestText,
            configureCodeStructure:values.configureCodeStructure,
            configureStructureAddress:values.configureStructureAddress,
            configureStructureOrder:values.configureStructureOrder,
            configureDeployAddress:values.configureDeployAddress,
            configureShell:values.configureShell,
            configureCreateTime:moment.moment,
            pipelineId:localStorage.getItem('pipelineId'),
            deployProofId: localStorage.getItem('deployProofId'),
            gitProofId: localStorage.getItem('gitProofId'),
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
                        单元测试
                    </div>
                    <div
                        onClick={()=>scrollToAnchor('c')}
                        className={'newDeployment-anchor-d'}
                    >
                        构建
                    </div>
                    <div
                        onClick={()=>scrollToAnchor('d ')}
                        className={'newDeployment-anchor-d' }
                    >
                        部署
                    </div>
                </div>

                <Form
                    onFinish={onFinish}
                    initialValues={{
                        "configureCodeStructure":1,
                        "configureCodeSource":1,
                        "configureTestType":1 ,
                        "configureTestText": 'mvn -B test -Dmaven.test.failure.ignore=true\n' +
                                             'mvn surefire-report:report-only\n' +
                                             'mvn site -DgenerateReports=false'
                    }}
                    layout="vertical"
                    autoComplete = "off"
                >
                    <div id="a" >
                        <SourceCode
                            createGitProof={createGitProof}
                            findAllGitProof={findAllGitProof}
                            findOneCodeProof={findOneCodeProof}
                            allGitProof={allGitProof}
                        />
                    </div>
                    <div id="b"> <Test/></div>
                    <div id="c"><Structure /></div>
                    <div id="d">
                        <Deploy
                            createDeployProof={createDeployProof}
                            findOneDeployProof={findOneDeployProof}
                            findAllDeployProof={findAllDeployProof}
                            allDeployProof={allDeployProof}
                        />
                    </div>
                    <Form.Item>
                      <div className={'btn-sticker-inner'}  id={'bottom-sticker'}>
                          <Button htmlType='submit' type='primary' style={{marginLeft:30,marginRight:30}}>
                              保存
                          </Button>
                          <Button onClick={()=>props.history.push('/home/task/config')}>取消</Button>
                      </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default withRouter(inject('ConfigStore','ProofStore')(observer(Config)))