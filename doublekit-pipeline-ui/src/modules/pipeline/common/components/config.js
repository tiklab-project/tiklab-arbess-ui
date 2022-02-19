import React,{useEffect,useState} from 'react'
import  {Button ,Form} from "antd";
import {withRouter} from "react-router-dom";
import ConfigTop from "./configTop";
import ConfigSourceCode from "./configSourceCode";
import ConfigStructure from "./configStructure";
import ConfigAction from "./configAction";
import {inject, observer} from "mobx-react";
import moment from "../../../../common/moment/moment";
import {set} from "mobx";

const scrollToAnchor = (anchorName) => {
    if (anchorName) {
        let anchorElement = document.getElementById("box");
        let a = document.getElementById(anchorName)
        if (anchorElement) {
            anchorElement.scrollTop = a.offsetTop-200
        }
    }
}

const ConfigTask=props=>{

    const {CONFIG_STORE,PROOF_STORE}=props
    const {selectPipelineConfig,updatePipelineConfig}=CONFIG_STORE

    const {allProof,createProof,selectProofName,selectAllProof}=PROOF_STORE

    const [form] = Form.useForm();

    const [sourceValue,setSourceValue]=useState('a')

    // const [name,setName]=useState()

    const [structure,setStructure]=useState('b')

    const pipelineId=localStorage.getItem('pipelineId')

    useEffect(()=>{
        selectPipelineConfig(pipelineId).then(res=>{
            if ( !res.data ) {
                // setSourceValue('a')
                // setStructure('b')
                return  false
            } else {
                if ( res.data.configureCodeSource==='b'){
                    setSourceValue('b')
                }
                if (res.data.configureCodeStructure==='a'){
                    setStructure('a')
                }
            }
            form.setFieldsValue(res.data)
        })
        // selectProofName()
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
            // proofId:null,
        }
        updatePipelineConfig(configure)
        props.history.push('/home/task/work')
    }

    return(
        <div className='task-config'>
            <div  className='task-config-top'>
                <ConfigTop/>
                <div className='task-config-top-a' >
                    <ul className='_cf'>
                        <li className='ac a '>
                            <a  onClick={()=>scrollToAnchor('b1')}>
                                源码管理
                            </a>
                        </li>
                        <li className=' a '>
                            <a  onClick={()=>scrollToAnchor('b2')}>
                                构建
                            </a>
                        </li>
                        <li className=' a '>
                            <a  onClick={()=>scrollToAnchor('b3')}>
                               构建后管理
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='task-config-bottom'>
                <div className='task-config-bottom-con' id='box'>
                   <Form
                       form={form}
                       id={'form'}
                       onFinish={onFinish}
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
                           />
                       </div>
                       <div id='b2'><ConfigStructure structure={structure}/></div>
                       <div id='b3'><ConfigAction/></div>
                       <div style={{height:700}}/>
                   </Form>
                </div>
                <div className='btn'>
                    <Button
                        htmlType='submit'
                        form='form'
                        type='primary'
                        style={{marginRight:30}}
                    >
                        保存
                    </Button>
                    <Button onClick={()=>props.history.push('/home/task/work')}>取消</Button>
                </div>
            </div>
        </div>
    )
}
export default withRouter(inject('CONFIG_STORE','PROOF_STORE')(observer(ConfigTask)))