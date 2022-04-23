import React, {useState, useEffect, useRef} from "react";
import '../common/style/config.scss';
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import {Button, Form, Input,Modal} from "antd";
import Config_addNewStageModal from "../common/component/config_addNewStageModal";
import Config_addCodeModal from "../common/component/config_addCodeModal";
import ChangeConfigSorts_drawer from "../common/component/changeConfigSorts_drawer";
import ConfigTop from "./configTop";
import Config_code from "../common/component/config_code";
import Config_test_unit from "../common/component/config_test_unit";
import Config_structure_maven from "../common/component/config_structure_maven";
import Config_structure_node from "../common/component/config_structure_node";
import Config_deploy_linux from "../common/component/config_deploy_linux";
import Config_deploy_docker from "../common/component/config_deploy_docker";
import Config_addNewStage from "../common/component/config_addNewStage";
import moment from "../../../common/moment/moment";
import Config_deploy_addProofModal from "../common/component/config_deploy_addProofModal";
import {CloseOutlined, EditOutlined} from "@ant-design/icons";
import { Prompt} from "react-router-dom";
import { Editor } from "slate";

const Config = props =>{

    const {ConfigStore,ProofStore} = props
    const {updateConfigure} = ConfigStore
    const {createProof,findAllGitProof,allGitProofList,findAllDeployProof,allDeployProofList
    } = ProofStore

    const inputRef = useRef();
    const [form] = Form.useForm();
    const [newStageVisible, setNewStageVisible] = useState(false)
    const [codeVisible, setCodeVisible] = useState(false)
    const [changeSortVisible, setChangeSortVisible] = useState(false)
    const [data, setData] = useState([])
    const [codeData, setCodeData] = useState('' )
    const [isPrompt, setIsPrompt] = useState(false);
    const [deployVisible,setDeployVisible] = useState(false)

    const [Refresh,setRefresh] = useState(0)

    const pipelineId = localStorage.getItem('pipelineId')
    const codeId = localStorage.getItem('codeId')
    const testId = localStorage.getItem('testId')
    const structureId = localStorage.getItem('structureId')
    const deployId = localStorage.getItem('deployId')
    const gitProofId = localStorage.getItem('gitProofId')
    const deployProofId = localStorage.getItem('deployProofId')

    const [step,setStep] = useState('')

    useEffect(()=>{
          return () =>{
            localStorage.removeItem('codeId')
            localStorage.removeItem('testId')
            localStorage.removeItem('structureId')
            localStorage.removeItem('deployId')
            localStorage.removeItem('gitProofId')
            localStorage.removeItem('deployProofId')
        }
    },[])

    useEffect(()=>{
        if(step!==''){
            inputRef.current.focus()
        }
    },[step])

    const displayInput = group =>{
        setStep(group)
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

    const hiddenInput = () =>{
        setStep('')
    }

    const deletePart = group =>{
        for (let i = 0 ;i<data.length;i++){
            if(data[i].dataId === group.dataId){
                data.splice(i,1)
            }
            setData([...data])
        }
    }

    const inputContent = group =>{
        if(group){
            switch (group.desc){
                case '单元测试':
                    return  <Config_test_unit/>
                case 'maven':
                    return  <Config_structure_maven/>
                case 'node':
                    return  <Config_structure_node/>
                case 'linux':
                    return  <Config_deploy_linux
                                setDeployVisible={setDeployVisible}
                                findAllDeployProof={findAllDeployProof}
                                allDeployProofList={allDeployProofList}
                            />
                case 'docker':
                    return  <Config_deploy_docker
                                setDeployVisible={setDeployVisible}
                                findAllDeployProof={findAllDeployProof}
                                allDeployProofList={allDeployProofList}
                            />
            }
        }
    }

    const formFinish = value => {

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
                }
                break
            case 'Gitee':{
                codeList = {
                    codeType:2,
                    codeBranch:value.giteeBranch,
                    codeName:value.giteeCodeName,
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
                    }
                    break
                case 'docker':
                    deployList = {
                        deployType:32,
                        deployAddress: value.dockerAddress,
                        deployTargetAddress:value.dockerTargetAddress,
                        proofName: value.dockerProofName,
                    }
            }
        }

        const configureList = {
            configureCreateTime:moment.moment,
            pipelineId:pipelineId,
            pipelineCode:{
                codeId:codeId,
                sort:1,
                type:codeList && codeList.codeType ,
                codeBranch:codeList && codeList.codeBranch,
                codeName:codeList && codeList.codeName,
                proof:{
                    proofId:gitProofId,
                }
            },
            pipelineTest:{
                testId:testId,
                sort:testSort,
                testAlias:testAlias,
                type:testList && testList.testType,
                testOrder: testList && testList.testOrder,        
            },
            pipelineStructure:{
                structureId:structureId,
                sort:structureSort,
                structureAlias:structureAlias,
                type:structureList && structureList.structureType,
                structureAddress:structureList && structureList.structureAddress,
                structureOrder:structureList && structureList.structureOrder,
            },
            pipelineDeploy:{
                deployId:deployId,
                sort:deploySort,
                deployAlias:deployAlias,
                type:deployList && deployList.deployType,
                deployAddress: deployList && deployList.deployAddress,
                deployTargetAddress: deployList && deployList.deployTargetAddress,
                proofName: deployList && deployList.proofName,
                deployShell:value.deployShell,
                dockerPort:value.dockerPort,
                mappingPort:value.mappingPort,
                proof:{
                    proofId:deployProofId,
                }
            }
        }
        updateConfigure(configureList).then(res=>{
            if(res.code!==0){
                message.info('配置失败')
            }
            setIsPrompt(false)
            props.history.push('/home/task/work')        
        })
    }

    const formValuesChange = value =>{
        setIsPrompt(true)
    }

    const newStage = () =>{
        return  data && data.map((group,index)=>{
            return(
                <div className='config-details-wrapper' key={index}>
                    <div
                        className='config-details-Headline'
                    >
                        {
                            step !== index ?
                                <div style={{display:"inline"}}>
                                    {group.title}
                                </div>
                                :
                                <Input
                                    type="text"
                                    ref={inputRef}
                                    onBlur={hiddenInput}
                                    style={{width:100}}
                                    defaultValue={group.title}
                                    onChange={e=>changeInputValue(e,index)}
                                />
                        }
                        &nbsp; &nbsp;
                        <span onClick={()=> displayInput(index)}  style={{cursor:'pointer'}}>
                                    <EditOutlined />
                                </span>
                    </div>
                    <div className='config-details-newStage'>
                        <div className='desc'>
                            <div className='desc-head'>{group.desc}</div>
                            <div
                                id='del'
                                className='desc-delete'
                                onClick={()=>deletePart(group)}
                            >
                                <CloseOutlined />
                            </div>
                        </div>
                        <div className='desc-input'>
                            { inputContent(group) }
                        </div>
                    </div>
                </div>
            )
        })
    }

    const confirmLeave = pathname =>{
        setIsPrompt(false)
        pathname && setTimeout(()=>{
            props.history.push(pathname)
        })
    }

    return(
        <div className='config-details '>
            <ConfigTop/>
            <div className='config-details-content'>
                <div className='config-details-right'>
                    <div className='config-details-right-all'>
                        <div style={{textAlign:'right'}}>
                            <Button onClick={()=> setChangeSortVisible(true)}>更改配置顺序</Button>
                        </div>
                        <div>
                            <Form
                                form={form}
                                layout='vertical'
                                autoComplete = "off"
                                onFinish={formFinish}
                                onValuesChange={formValuesChange}
                            >
                                <Config_code
                                    codeData={codeData}
                                    setCodeData={setCodeData}
                                    setCodeVisible={setCodeVisible}
                                    setIsPrompt={setIsPrompt}
                                    createProof={createProof}
                                    findAllGitProof={findAllGitProof}
                                    allGitProofList={allGitProofList}
                                />
                                { newStage()}
                                <Config_addNewStage
                                    setNewStageVisible={setNewStageVisible}
                                />
                            </Form>
                        </div>
                    </div>   

                    <Prompt
                        when={isPrompt}
                        message={location =>{
                            if(!isPrompt){
                                return true
                            }
                            Modal.confirm({
                                title:'有编辑未保存，确定离开吗',
                                okText:'离开',
                                cancelText:'取消',
                                onOk:()=>confirmLeave(location.pathname)           
                            })
                            return false
                        }} 
                    />           

                    <Config_addNewStageModal
                        data={data}
                        setData={setData}
                        newStageVisible={newStageVisible}
                        setNewStageVisible={setNewStageVisible}
                        setIsPrompt={setIsPrompt}
                    />

                    <Config_addCodeModal
                        codeVisible={codeVisible}
                        setCodeVisible={setCodeVisible}
                        setCodeData={setCodeData}
                        setIsPrompt={setIsPrompt}
                        pipelineId={pipelineId}
                    />

                    <ChangeConfigSorts_drawer
                        changeSortVisible={changeSortVisible}
                        setChangeSortVisible={setChangeSortVisible}
                        data={data}
                        setData={setData}
                    
                    />

                    <Config_deploy_addProofModal
                        deployVisible={deployVisible}
                        setDeployVisible={setDeployVisible}
                        createProof={createProof}
                    />
                </div>

            </div>

        </div>
    )
}

export default withRouter(inject('ConfigStore','ProofStore','GitAuthorizeStore')(observer(Config)))