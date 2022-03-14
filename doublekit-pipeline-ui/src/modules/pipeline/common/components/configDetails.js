import React,{useEffect,useState} from 'react'
import  {Button ,Form} from "antd";
import {withRouter} from "react-router-dom";
import ConfigDetailsTop from "./configDetailsTop";
import ConfigDetailsSourceCode from "./configDetailsSourceCode";
import ConfigDetailsStructure from "./configDetailsStructure";
import ConfigDetailsTest from "./configDetailsTest";
import ConfigDetailsDeploy from "./configDetailsDeploy";
import {inject, observer} from "mobx-react";
import moment from "../../../../common/moment/moment";


const handleScroll = () =>{
    //浏览器滚动的高度
    const scrollTop=document.body.scrollTop

    const lis=document.getElementsByClassName('task-config-anchor-d')
    const a=document.getElementById('a').offsetTop-55
    const b=document.getElementById('b').offsetTop-55
    const c=document.getElementById('c').offsetTop-55
    const d=document.getElementById('d').offsetTop-55

    if(scrollTop > a && scrollTop < b){
        lis.item(0).classList.add("task-config-anchor-active")
        lis.item(1).classList.remove("task-config-anchor-active")
        lis.item(2).classList.remove("task-config-anchor-active")
        lis.item(3).classList.remove("task-config-anchor-active")
    }

    if(scrollTop>=b && scrollTop<c){
        lis.item(1).classList.add("task-config-anchor-active")
        lis.item(0).classList.remove("task-config-anchor-active")
        lis.item(2).classList.remove("task-config-anchor-active")
        lis.item(3).classList.remove("task-config-anchor-active")
    }

    if(scrollTop>c && scrollTop<d){
        lis.item(2).classList.add("task-config-anchor-active")
        lis.item(0).classList.remove("task-config-anchor-active")
        lis.item(1).classList.remove("task-config-anchor-active")
        lis.item(3).classList.remove("task-config-anchor-active")
    }
    if(scrollTop>d){
        lis.item(3).classList.add("task-config-anchor-active")
        lis.item(0).classList.remove("task-config-anchor-active")
        lis.item(1).classList.remove("task-config-anchor-active")
        lis.item(2).classList.remove("task-config-anchor-active")
    }

}

const scrollToAnchor = (anchorName) => {
    if (anchorName) {
        const scrollTop=document.body
        const anchorElement = document.getElementById(anchorName)
        if (anchorElement) {
            scrollTop.scrollTop = anchorElement.offsetTop-55;
        }
    }
}

const ConfigTask=props=>{

    const {ConfigStore,ProofStore}=props
    const {selectPipelineConfig,updatePipelineConfig}=ConfigStore

    const {
        createGitProof,findAllGitProof,findOneCodeProof,allGitProof,gitProofId,oneCodeProof,
        createDeployProof,findAllDeployProof,findOneDeployProof,allDeployProof,deployProofId,oneDeployProof
    } =ProofStore

    const [form] = Form.useForm();

    //初始化Radio单选框
    const [sourceValue,setSourceValue]=useState(1)
    const [structure,setStructure]=useState(1)
    const [test,setTest]=useState(1)

    const pipelineId=localStorage.getItem('pipelineId')

    useEffect(()=> {
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll',handleScroll);
        };
    },[])

    useEffect(()=>{
        selectPipelineConfig(pipelineId).then(res=>{
            if ( !res.data ) {
                return false
            } else {
                if ( res.data.configureCodeSource){
                    setSourceValue(res.data.configureCodeSource)
                }
                if (res.data.configureCodeStructure){
                    setStructure(res.data.configureCodeStructure)
                }
                if (res.data.configureTestType){
                    setTest(res.data.configureTestType)
                }
            }
            form.setFieldsValue(res.data)
        })

        return ()=>{
            localStorage.removeItem('configureId')
        }
    },[])

    const onFinish =(values)=>{
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
            deployProofId: localStorage.getItem('deployProofId'),
            gitProofId:localStorage.getItem('gitProofId'),
            configureId: localStorage.getItem('configureId'),
        }
        updatePipelineConfig(configure)
        props.history.push('/home/task/work')
    }

    return(
        <div className='task-config  task'>
            <div className={'hidden'} />
            <ConfigDetailsTop/>
            <div className='task-config-offset'>
                <div className='task-config-anchor'>
                    <div
                        onClick={()=>scrollToAnchor('a')}
                        className={'task-config-anchor-d task-config-anchor-active'}
                    >
                        源码管理
                    </div>
                    <div
                        onClick={()=>scrollToAnchor('b')}
                        className={'task-config-anchor-d'}
                    >
                        单元测试
                    </div>
                    <div
                        onClick={()=>scrollToAnchor('c')}
                        className={'task-config-anchor-d'}
                    >
                        构建
                    </div>
                    <div
                        onClick={()=>scrollToAnchor('d')}
                        className={'task-config-anchor-d' }
                    >
                        部署
                    </div>
                </div>
                <Form
                    onFinish={onFinish}
                    form={form}
                    initialValues={{
                        "configureCodeStructure":1,
                        "configureCodeSource":1,
                        "configureTestType":1
                    }}
                    layout="vertical"
                    autoComplete = "off"
                >
                    <div id='a'>
                        <ConfigDetailsSourceCode
                            sourceValue={sourceValue}
                            allGitProof={allGitProof}
                            createGitProof={createGitProof}
                            findOneCodeProof={findOneCodeProof}
                            findAllGitProof={findAllGitProof}
                        />
                    </div>
                    <div id='b'>
                        <ConfigDetailsTest
                            test={test}
                        />
                    </div>
                    <div id='c'>
                        <ConfigDetailsStructure
                            structure={structure}
                        />
                    </div>
                    <div id='d'>
                        <ConfigDetailsDeploy
                            createDeployProof={createDeployProof}
                            findOneDeployProof={findOneDeployProof}
                            findAllDeployProof={findAllDeployProof}
                            allDeployProof={allDeployProof}
                        />
                    </div>
                    <Form.Item >
                        <div className={'bottom-sticker-inner'} id={'bottom-sticker'}>
                            <Button htmlType='submit' type='primary' style={{marginRight:30}}>
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

export default withRouter(inject('ConfigStore','ProofStore')(observer(ConfigTask)))
