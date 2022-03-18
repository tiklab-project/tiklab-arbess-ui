import React, {useEffect, useState} from 'react'
import {Breadcrumb, Form} from "antd";
import {withRouter} from "react-router-dom"
import './config.scss'
import Anchor from "../components/anchor";
import SourceCode from "../components/SourceCode";
import Test from "../components/test";
import Structure from "../components/structure";
import Deploy from "../components/deploy";
import Btn from "../components/btn";
import moment from "../../../common/moment/moment";
import {inject, observer} from "mobx-react";


const Config= props=>{

    const {ProofStore,ConfigStore,GitAuthorizeStore}=props
    const {createPipelineConfigure}=ConfigStore
    const {createProof,findAllGitProof,findOneGitProof,allGitProofList
        ,findAllDeployProof,findOneDeployProof,allDeployProofList} =ProofStore
    const {url,code,getAllStorehouse,gitList} = GitAuthorizeStore

    useEffect(()=> {
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll',handleScroll);
            localStorage.removeItem('gitProofId')
            localStorage.removeItem('deployProofId')
        };
    },[])
    //锚点样式
    const [anchor,setAnchor] = useState('a')
    //滚动
    const handleScroll = () => {
        //浏览器滚动的高度
        const scrollTop=document.body.scrollTop

        //固定
        const scrollA=document.getElementById('scrollA')
        const scrollB=document.getElementById('scrollB')
        if(scrollB && scrollTop >scrollB.offsetHeight){
            scrollA.classList.add('config-anchor-fixed')
        }else {
            scrollA.classList.remove('config-anchor-fixed')
        }

        //滚动
        const a=document.getElementById('a').offsetTop-55
        const b=document.getElementById('b').offsetTop-55
        const c=document.getElementById('c').offsetTop-55
        const d=document.getElementById('d').offsetTop-55

        if(scrollTop > a && scrollTop < b){
            setAnchor('a')
        }
        if(scrollTop>=b && scrollTop<c){
            setAnchor('b')
        }
        if(scrollTop>c && scrollTop<d){
            setAnchor('c')
        }
        if(scrollTop>d){
            setAnchor('d')
        }
    }
    //锚点
    const scrollToAnchor = (anchorName) => {
        if (anchorName) {
            setAnchor(anchorName)
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
        <div className='config'>
            <div className='config-breadcrumb' id='scrollB'>
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>流水线</Breadcrumb.Item>
                    <Breadcrumb.Item href="">{localStorage.getItem('pipelineName')}</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <div className='config-offset'>
                <Anchor
                    scrollToAnchor={scrollToAnchor}
                    anchor={anchor}
                />

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
                    <SourceCode
                        createProof={createProof}
                        findAllGitProof={findAllGitProof}
                        findOneGitProof={findOneGitProof}
                        allGitProofList={allGitProofList}
                        url={url}
                        code={code}
                        getAllStorehouse={getAllStorehouse}
                        gitList={gitList}

                    />
                    <Test/>
                    <Structure />
                    <Deploy
                        createProof={createProof}
                        findOneDeployProof={findOneDeployProof}
                        findAllDeployProof={findAllDeployProof}
                        allDeployProofList={allDeployProofList}
                    />
                    <Btn/>
                </Form>
            </div>
        </div>
    )
}

export default withRouter(inject('ConfigStore','ProofStore','GitAuthorizeStore')(observer(Config)))