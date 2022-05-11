import React, {useState, useRef, Fragment,useEffect} from "react";
import  '../../style/config_view2.scss';
import Config_code from "../config_view2/config_code";
import Config_addNewStage from "../config_view2/config_addNewStage";
import Config_code_drawer from "../config_view2/config_code_drawer";
import Config_newStage_drawer from "../config_view2/config_newStage_drawer";
import Config_newStage_taskForm_drawer from "../config_view2/config_newStage_taskForm_drawer";
import Config_deploy_addProofModal from "../config_form/config_deploy_addProofModal";
import Config_code_details_drawer from "../config_view2/config_code_details_drawer";
import {inject, observer} from "mobx-react";
import {Form, Input, message} from "antd";
import {EditOutlined} from "@ant-design/icons";
import moment from "../../../../../common/moment/moment";
import {withRouter} from "react-router";

const Config_view2 = props =>{

    const {formInitialValues,codeData,setCodeData,data,setData,setIsPrompt,form,
        codeName,setCodeName,codeBranch,setCodeBranch,
        updateConfigure, createProof,findAllGitProof,allGitProofList,findAllDeployProof,allDeployProofList,
    } = props

    const inputRef = useRef();
    const [codeDrawer,setCodeDrawer] = useState(false)
    const [newStageDrawer,setNewStageDrawer] = useState(false)
    const [taskFormDrawer,setTaskFormDrawer] = useState(false)
    const [deployVisible,setDeployVisible] = useState(false)
    const [codeDetailsDrawer,setCodeDetailsDrawer] = useState(false)
    const [newStage,setNewStage] = useState('')
    const [step,setStep] = useState('')
    const [index,setIndex] = useState('')

    const pipelineId = localStorage.getItem('pipelineId')

    useEffect(()=>{
        if (step!==''){
            inputRef.current.focus()
        }
    },[step])

    useEffect(()=>{
        form.setFieldsValue({
            gitCodeName:codeData && codeData.codeName,
            gitBranch:codeData && codeData.codeBranch,
            giteeCodeName:codeData && codeData.codeName,
            giteeBranch:codeData && codeData.codeBranch
        })
    },[codeData])

    const displayInput = group =>{
        setStep(group)
    }

    const hiddenInput = () =>{
        setStep('')
    }

    const changeInputValue = (e,index) =>{
        //深拷贝一次，可以让arr指向单独的内存空间
        let arr = JSON.parse(JSON.stringify(data))
        for(let i = 0 ;i<arr.length;i++){
            if( i === index ) {
                arr[i].title = e.target.value
            }
        }
        setData([...arr])
    }

    const showStage = item =>{
        setNewStage(item.desc)
        setTaskFormDrawer(true)
    }
    
    const insertData = (item,index) => {
        setNewStageDrawer(true)
        setIndex(index)
    }

    const newStageShow = () =>{
        return data && data.map((item,index)=>{
            return(
                    <Fragment key={index}>
                        <div className='group-flow'>
                            <div className='group-flow_btn' >
                                <svg
                                    className="icon group-flow_btn_i"
                                    aria-hidden="true"
                                    onClick={()=>insertData(item,index)}
                                >
                                    <use xlinkHref="#icon-zengjia"/>
                                </svg>
                            </div>
                        </div>
                        <div className='group-table'>
                            <div className='group-head'>
                                <div className='name'>
                                    <div  className='label'>
                                        {
                                            step !== index ?
                                                <Fragment>
                                                    {item.title}
                                                    &nbsp; &nbsp;
                                                    <span
                                                        onClick={()=> displayInput(index)}
                                                        style={{cursor:'pointer',paddingTop:5}}
                                                    >
                                                        <EditOutlined />
                                                    </span>
                                                </Fragment>
                                                :
                                                <Input
                                                    type="text"
                                                    ref={inputRef}
                                                    onBlur={hiddenInput}
                                                    style={{width:100}}
                                                    defaultValue={item.title}
                                                    onChange={e=>changeInputValue(e,index)}
                                                />
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='newStages'>
                                <div className='newStages-step'>
                                    <div className='newStages-content'  >
                                        <div className='newStages-task'>
                                            <div className='newStages-job'>
                                                <div
                                                    className='newStages-job_text'
                                                    onClick={()=>showStage(item)}
                                                >
                                                    {item.desc}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
            )
        })
    }

    const onFinish = value => {

        //排序
        let testSort,structureSort, deploySort = 0
        //更改步骤名
        let testAlias,structureAlias,deployAlias
        data && data.map((item,index)=>{
            if(item.desc==='单元测试'){
                testSort = index + 2
                testAlias = item.title
            }
            if(item.desc==='maven' || item.desc ==='node'){
                structureSort = index + 2
                structureAlias = item.title
            }
            if(item.desc==='linux' || item.desc === 'docker'){
                deploySort = index + 2
                deployAlias = item.title
            }
        })

        let codeList, testList,structureList,deployList={}
        const dataArray = data && data.map((item) => item.desc)
        switch (codeData.desc){
            case '通用Git':
                codeList = {
                    codeType:1,
                    codeBranch:value.gitBranch,
                    codeName:value.gitCodeName,
                    proofId:localStorage.getItem('gitProofId'),
                }
                break
            case 'Gitee':{
                codeList = {
                    codeType:2,
                    codeBranch:value.giteeBranch,
                    codeName:value.giteeCodeName,
                    proofId:localStorage.getItem('giteeProofId'),
                }
            }
        }
        for (let i in dataArray){
            switch (dataArray[i]){
                case '单元测试':
                    testList = {
                        testType:11,
                        testOrder : value.testOrder
                    }
                    break
                case 'maven':
                    structureList = {
                        structureType:21,
                        structureAddress:value.mavenAddress,
                        structureOrder:value.mavenOrder
                    }
                    break
                case 'node':
                    structureList = {
                        structureType:22,
                        structureAddress:value.nodeAddress,
                        structureOrder:value.nodeOrder
                    }
                    break
                case 'linux':
                    deployList = {
                        deployType:31,
                        deployAddress: value.linuxAddress,
                        deployTargetAddress:value.linuxTargetAddress,
                        proofName: value.linuxProofName,
                        proofId:localStorage.getItem('linuxProofId'),
                    }
                    break
                case 'docker':
                    deployList = {
                        deployType:32,
                        deployAddress: value.linuxAddress,
                        deployTargetAddress:value.dockerTargetAddress,
                        proofName: value.dockerProofName,
                        proofId:localStorage.getItem('dockerProofId'),
                    }
            }
        }

        const configureList = {
            configureCreateTime:moment.moment,
            pipelineId:pipelineId,
            pipelineCode:{
                codeId:localStorage.getItem('codeId'),
                sort:1,
                type:codeList && codeList.codeType,
                codeBranch:codeList && codeList.codeBranch,
                codeName:codeList && codeList.codeName,
                proof:{
                    proofId:codeList && codeList.proofId,
                }
            },
            pipelineTest:{
                testId:localStorage.getItem('testId'),
                sort:testSort,
                testAlias:testAlias,
                type:testList && testList.testType,
                testOrder: testList && testList.testOrder,
            },
            pipelineStructure:{
                structureId:localStorage.getItem('structureId'),
                sort:structureSort,
                structureAlias:structureAlias,
                type:structureList && structureList.structureType,
                structureAddress:structureList && structureList.structureAddress,
                structureOrder:structureList && structureList.structureOrder,
            },
            pipelineDeploy:{
                deployId:localStorage.getItem('deployId'),
                sort:deploySort,
                deployAlias:deployAlias,
                type:deployList && deployList.deployType,
                deployAddress: deployList && deployList.deployAddress,
                deployTargetAddress: deployList && deployList.deployTargetAddress,
                deployShell:value.deployShell,
                dockerPort:value.dockerPort,
                mappingPort:value.mappingPort,
                proof:{
                    proofId:deployList && deployList.proofId,
                }
            }
        }

        updateConfigure(configureList).then(res=>{
            if(res.code!==0){
                message.info('配置失败')
            }message.info('保存成功')
            setIsPrompt(false)
        })
    }

    const onValuesChange = () =>{
        setIsPrompt(true)
    }

    return (
        <div className='configView2'>
           <div className='configView2-content'>
               <Config_code
                   codeData={codeData}
                   setCodeDrawer={setCodeDrawer}
                   setCodeDetailsDrawer={setCodeDetailsDrawer}
               />
               <div className='configView2-main'>
                   <div className='configView2-main_container'>
                       <div className='configView2-main_group'>
                           { newStageShow() }
                           <Config_addNewStage
                               setNewStageDrawer={setNewStageDrawer}
                           />
                       </div>
                   </div>
               </div>
           </div>

           <Form
               id='form'
               form={form}
               layout='vertical'
               autoComplete = "off"
               onFinish={onFinish}
               onValuesChange={onValuesChange}
               initialValues={{formInitialValues}}
           >
               <Config_code_drawer
                   setIsPrompt={setIsPrompt}
                   codeData={codeData}
                   form={form}
                   setCodeData={setCodeData}
                   codeDrawer={codeDrawer}
                   setCodeDrawer={setCodeDrawer}
                   codeBranch={codeBranch}
                   setCodeBranch={setCodeBranch}
                   codeName={codeName}
                   setCodeName={setCodeName}
                   createProof={createProof}
                   findAllGitProof={findAllGitProof}
                   allGitProofList={allGitProofList}
               />

               <Config_newStage_drawer
                   setIsPrompt={setIsPrompt}
                   newStageDrawer={newStageDrawer}
                   setNewStageDrawer={setNewStageDrawer}
                   taskFormDrawer={taskFormDrawer}
                   setTaskFormDrawer={setTaskFormDrawer}
                   setNewStage={setNewStage}
                   data={data}
                   setData={setData}
                   index={index}
               />

               <Config_newStage_taskForm_drawer
                   setIsPrompt={setIsPrompt}
                   data={data}
                   form={form}
                   setData={setData}
                   setTaskFormDrawer={setTaskFormDrawer}
                   taskFormDrawer={taskFormDrawer}
                   newStage={newStage}
                   setDeployVisible={setDeployVisible}
                   setCodeName={setCodeName}
                   setCodeBranch={setCodeBranch}
                   findAllDeployProof={findAllDeployProof}
                   allDeployProofList={allDeployProofList}
               />

               <Config_code_details_drawer
                   setIsPrompt={setIsPrompt}
                   codeData={codeData}
                   setCodeData={setCodeData}
                   setCodeDetailsDrawer={setCodeDetailsDrawer}
                   codeDetailsDrawer={codeDetailsDrawer}
                   form={form}
                   codeName={codeName}
                   setCodeName={setCodeName}
                   setCodeBranch={setCodeBranch}
               />

           </Form>

            <Config_deploy_addProofModal
                deployVisible={deployVisible}
                setDeployVisible={setDeployVisible}
                createProof={createProof}
            />
        </div>
    )
}

export default withRouter(inject('ConfigStore','ProofStore','GitAuthorizeStore')(observer(Config_view2)))