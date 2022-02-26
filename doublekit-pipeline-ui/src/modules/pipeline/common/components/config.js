import React,{useEffect,useState} from 'react'
import  {Button ,Form} from "antd";
import {withRouter} from "react-router-dom";
import ConfigTop from "./configTop";
import ConfigSourceCode from "./configSourceCode";
import ConfigStructure from "./configStructure";
import ConfigAction from "./configAction";
import {inject, observer} from "mobx-react";
import moment from "../../../../common/moment/moment";

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
}

const ConfigTask=props=>{

    const {CONFIG_STORE,PROOF_STORE}=props
    const {selectPipelineConfig,updatePipelineConfig}=CONFIG_STORE

    const {allProof,proofName,createProof,selectProofName,selectAllProof}=PROOF_STORE

    const [form] = Form.useForm();

    const [sourceValue,setSourceValue]=useState('a')

    const [structure,setStructure]=useState('b')

    const pipelineId=localStorage.getItem('pipelineId')

    useEffect(()=>{
        window.addEventListener('scroll', handleScroll);
        selectPipelineConfig(pipelineId).then(res=>{
            if ( !res.data ) {
                setSourceValue('a')
                setStructure('b')
            } else {
                if ( res.data.configureCodeSource==='b'){
                    setSourceValue('b')
                }
                if (res.data.configureCodeStructure==='a'){
                    setStructure('a')
                }
                form.setFieldsValue(res.data)
            }

        })
    },[])

    const onFinish =(values)=>{
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
        updatePipelineConfig(configure)
        props.history.push('/home/task/work')
    }

    return(
        <div className='task-config'>
            <div  className='task-config-top' id={'scrollB'}>
                <ConfigTop/>
            </div>
            <div className='task-config-offset'>
                <div className='task-config-anchor'  id={'scrollA'}>
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
                        构建
                    </div>
                    <div
                        onClick={()=>scrollToAnchor('c')}
                        className={'task-config-anchor-d' }
                    >
                        部署
                    </div>

                </div>
                <Form
                    onFinish={onFinish}
                    form={form}
                    id={'form'}
                    initialValues={{"configureCodeStructure":'b',"configureCodeSource":'a'}}
                    layout="vertical"
                    autoComplete = "off"
                >
                    <div id='b1'>
                        <ConfigSourceCode
                            sourceValue={sourceValue}
                            allProof={allProof}
                            createProof={createProof}
                            selectProofName={selectProofName}
                            selectAllProof={selectAllProof}
                            proofName={proofName}
                        />
                    </div>
                    <div id='b2'><ConfigStructure structure={structure}/></div>
                    <div id='b3'><ConfigAction/></div>
                    <div className='task-config-btn'>
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
export default withRouter(inject('CONFIG_STORE','PROOF_STORE')(observer(ConfigTask)))
