import React, {useEffect, useState} from 'react'
import {Breadcrumb, Form} from "antd";
import {withRouter} from "react-router"
import './config.scss'
import Anchor from "../../common/component/anchor";
import ConfigSourceCode from "../components/configSourceCode";
import ConfigTest from "../components/configTest";
import ConfigStructure from "../components/configStructure";
import ConfigDeploy from "../components/configDeploy";
import Conserve from "../../common/component/conserve";
import moment from "../../../../common/moment/moment";
import {getUrlParam} from "../../common/component/getUrlParam";
import {inject, observer} from "mobx-react";

const Config = props=>{

    const {ProofStore,ConfigStore,GitAuthorizeStore}=props
    const {updatePipelineConfig}=ConfigStore
    const {createProof,findAllDeployProof,findOneDeployProof,allDeployProofList,oneDeployProof} =ProofStore
    const {code} = GitAuthorizeStore

    //Gitee--code
    const codeValue = getUrlParam('code')

    //Gitee授权
    useEffect(() => {
        const se = setTimeout(()=>localStorage.removeItem('code'),100)
        if (codeValue && localStorage.getItem('code')) {
            code(codeValue).then(res=>{
                window.close()
            })
        }
        return () => clearTimeout(se)
    }, [])

    useEffect(()=> {
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll',handleScroll);
            localStorage.removeItem('configureId')
            localStorage.removeItem('codeId')
            localStorage.removeItem('testId')
            localStorage.removeItem('structureId')
            localStorage.removeItem('deployId')
        }
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
            configureCreateTime:moment.moment,
            configureId: localStorage.getItem('configureId'),
            pipeline:{
                pipelineId:localStorage.getItem('pipelineId')
            },
            pipelineCode:{
                codeId:localStorage.getItem('codeId'),
                codeType:values.codeType,
                codeBranch:values.codeBranch,
                codeName:values.codeName ,
                proofName:values.proofName,
            },
            pipelineTest:{
                testId: localStorage.getItem('testId'),
                testOrder: values.testOrder,
                testType:values.testType,
            },
            pipelineStructure:{
                structureId: localStorage.getItem('structureId'),
                structureAddress: values.structureAddress,
                structureOrder: values.structureOrder,
                structureType: values.structureType,
            },
            pipelineDeploy:{
                deployId:  localStorage.getItem('deployId'),
                deployType:values.deployType,
                deployAddress:values.deployAddress,
                proofName: values.proofName ,
                deployShell: values.deployShell ,
                deployTargetAddress:values.deployTargetAddress ,
                dockerPort:values.dockerPort,
                mappingPort:values.mappingPort,
            },
        }
        updatePipelineConfig(configure)
        props.history.push('/home/task/config')
    }

    return (
        <div className='config'>
            <div className='config-breadcrumb' id='scrollB'>
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>流水线</Breadcrumb.Item>
                    <Breadcrumb.Item>{localStorage.getItem('pipelineName')}</Breadcrumb.Item>
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
                        "codeType":0,
                        "testType":0,
                        "structureType":0,
                        "deployType":0,
                        "deployPlace":"无",
                        "testOrder": 'mvn -B test -Dmaven.test.failure.ignore=true\n' +
                                             'mvn surefire-report:report-only\n' +
                                             'mvn site -DgenerateReports=false'
                    }}
                    layout="vertical"
                    autoComplete = "off"
                >
                    <ConfigSourceCode/>
                    <ConfigTest/>
                    <ConfigStructure />
                    <ConfigDeploy
                        createProof={createProof}
                        findOneDeployProof={findOneDeployProof}
                        findAllDeployProof={findAllDeployProof}
                        allDeployProofList={allDeployProofList}
                        oneDeployProof={oneDeployProof}
                    />
                    <Conserve/>
                </Form>
            </div>
        </div>
    )
}

export default withRouter(inject('ConfigStore','ProofStore','GitAuthorizeStore')(observer(Config)))