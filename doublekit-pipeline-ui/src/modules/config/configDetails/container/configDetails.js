import React,{useEffect,useState} from 'react'
import { Form } from "antd";
import {withRouter} from "react-router-dom";
import  './configDetails.scss'
import ConfigDetailsTop from "../component/configDetailsTop";
import ConfigDetailsSourceCode from "../component/configDetailsSourceCode";
import ConfigDetailsTest from "../component/configDetailsTest";
import ConfigDetailsStructure from "../component/configDetailsStructure";
import ConfigDetailsDeploy from "../component/configDetailsDeploy";
import Anchor from "../../common/component/anchor";
import Conserve from "../../common/component/conserve";
import moment from "../../../../common/moment/moment";
import {getUrlParam} from "../../common/component/getUrlParam";
import {inject, observer} from "mobx-react";

const ConfigDetails = props =>{

    const {ConfigStore,GitAuthorizeStore}=props
    const {findOnePipelineConfigure,updatePipelineConfig,
            configureId,codeId,deployId,structureId,testId}=ConfigStore
    const {code} = GitAuthorizeStore

    const [form] = Form.useForm()

    const [sourceRadio,setSourceRadio]=useState(0)
    const [testRadio,setTestRadio]=useState(0)
    const [structureRadio,setStructureRadio]=useState(0)
    const [anchor,setAnchor] = useState('a')
    const pipelineId=localStorage.getItem('pipelineId')
    const codeValue = getUrlParam('code')

    //Gitee授权
    useEffect(() => {
        const se = setTimeout(()=>localStorage.removeItem('code'),100)
        if (codeValue && localStorage.getItem('code')) {
            code(codeValue).then(()=>{
                window.close()
            })
        }
        return () => clearTimeout(se)
    }, [])

    //页面滚动加载
    useEffect(()=> {
        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll',handleScroll)
            localStorage.removeItem('gitProofId')
            localStorage.removeItem('deployProofId')
        };
    },[])

    //form表单初始化
    useEffect(()=>{
        findOnePipelineConfigure(pipelineId).then(res=>{
            if ( !res.data ) {
                return false
            }
            else {
                const data = res.data

                setSourceRadio(data.pipelineCode.codeType)
                setStructureRadio(data.pipelineStructure.structureType)
                setTestRadio(data.pipelineTest.testType)

                switch (data.pipelineCode.codeType){
                    case 2:
                        form.setFieldsValue({
                            gitAddress:data.pipelineCode.codeName,
                            gitBranch:data.pipelineCode.codeBranch,
                            gitPlace:data.pipelineCode.proofName,
                         })
                        break
                    case 3:
                        form.setFieldsValue({
                            giteeAddress:data.pipelineCode.codeName,
                            giteeBranch:data.pipelineCode.codeBranch,
                        })
                }

                switch (data.pipelineStructure.structureType){
                    case 2:
                        form.setFieldsValue({
                            mavenAddress:data.pipelineStructure.structureAddress,
                            mavenOrder:data.pipelineStructure.structureOrder,
                        })
                        break
                    case 3:
                        form.setFieldsValue({
                            nodeAddress:data.pipelineStructure.structureAddress,
                            nodeOrder:data.pipelineStructure.structureAddress,
                        })
                }
                form.setFieldsValue({
                    testOrder:data.pipelineTest.testOrder,
                    deployPlace:data.pipelineDeploy.proofName,
                    ...data.pipelineCode,
                    ...data.pipelineTest,
                    ...data.pipelineStructure,
                    ...data.pipelineDeploy,
                })

            }
        })
    },[])

    //滚动
    const handleScroll = () =>{
        //浏览器滚动的高度
        const scrollTop=document.body.scrollTop
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
        const scrollTop=document.body
        if (anchorName) {
            setAnchor(anchorName)
            const anchorElement = document.getElementById(anchorName)
            if (anchorElement) {
                scrollTop.scrollTop = anchorElement.offsetTop-55;
            }
        }
    }

    const onFinish = values =>{

        let CodeSourceRadioType,StructureRadioType={}

        switch (values.codeType) {
            case 2:
                CodeSourceRadioType = {
                    codeName:values.gitAddress,
                    codeBranch: values.gitBranch,
                    proofName:values.gitPlace,
                }
                break
            case 3:
                CodeSourceRadioType =  {
                    codeName: values.giteeAddress,
                    codeBranch: values.giteeBranch
                }
        }

        switch (values.structureType) {
            case 2:
                StructureRadioType = {
                    structureAddress: values.mavenAddress,
                    structureOrder:values.mavenOrder
                }
                break
            case 3:
                StructureRadioType = {
                    structureAddress: values.nodeAddress,
                    structureOrder:values.nodeOrder
                }
        }

        const configure = {
            configureCreateTime:moment.moment,
            configureId: configureId,
            pipeline:pipelineId,
            pipelineCode:{
                codeId:codeId,
                codeType:values.codeType,
                codeBranch:CodeSourceRadioType && CodeSourceRadioType.codeBranch
                    ?  CodeSourceRadioType.codeBranch : ' ',
                codeName:CodeSourceRadioType &&  CodeSourceRadioType.codeName
                    ?  CodeSourceRadioType.codeName : ' ',
                proofName:CodeSourceRadioType && CodeSourceRadioType.proofName
                    ?  CodeSourceRadioType.proofName : '无',
            },
            pipelineTest:{
                testId: testId,
                testType:values.testType,
                testOrder: values.testOrder ? values.testOrder : ' ',
            },
            pipelineStructure:{
                structureId: structureId,
                structureType: values.structureType,
                structureAddress: StructureRadioType && StructureRadioType.structureAddress
                    ?   StructureRadioType.structureAddress : ' ',
                structureOrder:StructureRadioType && StructureRadioType.structureOrder
                    ?   StructureRadioType.structureOrder : ' ',
            },
            pipelineDeploy:{
                deployId: deployId ,
                deployType:1,
                deployAddress: values.deployAddress,
                proofName: values.deployPlace ? values.deployPlace : "无" ,
                deployShell: values.deployShell,
                deployTargetAddress:values.deployTargetAddress,
            },
        }
        updatePipelineConfig(configure)
        props.history.push('/home/task/work')
    }

    return(
        <div className='config-details  task'>
            <div className='hidden' />
            <ConfigDetailsTop/>
            <div className='config-details-offset'>
                <Anchor
                    scrollToAnchor={scrollToAnchor}
                    anchor={anchor}
                />
                <Form
                    onFinish={onFinish}
                    form={form}
                    initialValues={{
                        "structureType":0,
                        "codeType":0,
                        "testType":0,
                        'giteeAddress':' '
                       }}
                    layout="vertical"
                    autoComplete = "off"
                >
                    <ConfigDetailsSourceCode
                        sourceRadio={sourceRadio}
                        form={form}/>
                    <ConfigDetailsTest testRadio={testRadio}/>
                    <ConfigDetailsStructure structureRadio={structureRadio}/>
                    <ConfigDetailsDeploy/>
                    <Conserve/>
                </Form>
            </div>
        </div>
    )
}

export default withRouter(inject('ConfigStore','GitAuthorizeStore')(observer(ConfigDetails)))
