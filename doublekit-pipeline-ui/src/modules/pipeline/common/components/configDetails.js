import React,{useEffect,useState} from 'react'
import  {Form} from "antd";
import  './configDetails.scss'
import {withRouter} from "react-router-dom";
import ConfigDetailsTop from "./configDetailsTop";
import ConfigDetailsAnchor from "./configDetailsAnchor";
import ConfigDetailsSourceCode from "./configDetailsSourceCode";
import ConfigDetailsTest from "./configDetailsTest";
import ConfigDetailsStructure from "./configDetailsStructure";
import ConfigDetailsDeploy from "./configDetailsDeploy";
import ConfigDetailsBtn from "./configDetailsBtn";
import moment from "../../../../common/moment/moment";
import {inject, observer} from "mobx-react";


const ConfigDetails = props =>{

    const {ConfigStore,ProofStore}=props
    const {selectPipelineConfig,updatePipelineConfig}=ConfigStore
    const {createProof,findOneGitProof,findAllDeployProof,findOneDeployProof,oneDeployProof,
          allDeployProofList, configureId} =ProofStore

    const [form] = Form.useForm();

    //初始化Radio单选框
    const [sourceRadio,setSourceRadio]=useState(1)
    const [testRadio,setTestRadio]=useState(1)
    const [structureRadio,setStructureRadio]=useState(1)

    const pipelineId=localStorage.getItem('pipelineId')

    //页面滚动加载
    useEffect(()=> {
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll',handleScroll);
        };
    },[])

    //锚点样式
    const [anchor,setAnchor] = useState('a')
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

    //form表单初始化
    useEffect(()=>{
        selectPipelineConfig(pipelineId).then(res=>{
            if ( !res.data ) {
                return false
            }
            else {
                if ( res.data.configureCodeSource){
                    setSourceRadio(res.data.configureCodeSource)
                }
                if (res.data.configureCodeStructure){
                    setStructureRadio(res.data.configureCodeStructure)
                }
                if (res.data.configureTestType){
                    setTestRadio(res.data.configureTestType)
                }
                if(res.data.gitProofId){
                    findOneGitProof(res.data.gitProofId)
                }
                if(res.data.deployProofId){
                    findOneDeployProof(res.data.deployProofId)
                }
                form.setFieldsValue(res.data)
            }
        })
        return ()=>{
            localStorage.removeItem('gitProofId')
            localStorage.removeItem('deployProofId')
        }
    },[])

    const onFinish = values =>{
        const configure={
            configureCodeSource:values.configureCodeSource,
            configureCodeSourceAddress:values.configureCodeSourceAddress,
            configureBranch:values.configureBranch,
            configureCodeStructure:values.configureCodeStructure,
            configureTestType:values.configureTestType,
            configureTestText:values.configureTestText,
            configureStructureAddress:values.configureStructureAddress,
            configureStructureOrder:values.configureStructureOrder,
            configureTargetAddress: values.configureTargetAddress,
            configureDeployAddress:values.configureDeployAddress,
            configureShell:values.configureShell,
            configureCreateTime:moment.moment,
            pipelineId: pipelineId,
            configureId: configureId,
            deployProofId: localStorage.getItem('deployProofId'),
            gitProofId:localStorage.getItem('gitProofId'),
        }
        updatePipelineConfig(configure)
        props.history.push('/home/task/work')
    }


    return(
        <div className='config-details  task'>
            <div className='hidden' />
            <ConfigDetailsTop/>
            <div className='config-details-offset'>
                <ConfigDetailsAnchor
                    scrollToAnchor={scrollToAnchor}
                    anchor={anchor}
                />
                <Form
                    onFinish={onFinish}
                    form={form}
                    initialValues={{
                        "configureCodeStructure":1,
                        "configureCodeSource":1,
                        "configureTestType":1,
                       }}
                    layout="vertical"
                    autoComplete = "off"
                >
                    <ConfigDetailsSourceCode sourceRadio={sourceRadio}/>
                    <ConfigDetailsTest
                        testRadio={testRadio}
                    />
                    <ConfigDetailsStructure
                        structureRadio={structureRadio}
                    />
                    <ConfigDetailsDeploy
                        createProof={createProof}
                        findAllDeployProof={findAllDeployProof}
                        allDeployProofList={allDeployProofList}
                        findOneDeployProof={findOneDeployProof}
                        oneDeployProof={oneDeployProof}
                    />
                    <ConfigDetailsBtn/>
                </Form>
            </div>
        </div>
    )
}


export default withRouter(inject('ConfigStore','ProofStore')(observer(ConfigDetails)))
