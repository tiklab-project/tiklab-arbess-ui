import React, {useState, useEffect, useRef} from "react";
import '../../style/config_view1.scss';
import {Button, Form, Input,message,Modal} from "antd";
import Config_addNewStageModal from "../config_view1/config_addNewStageModal";
import Config_addCodeModal from "../config_view1/config_addCodeModal";
import ChangeConfigSorts_drawer from "../config_view1/changeConfigSorts_drawer";
import Config_addNewStage from "../config_view1/config_addNewStage";
import Config_code from "../config_view1/config_code";
import Config_test_unit from "../config_form/config_test_unit";
import Config_structure_maven from "../config_form/config_structure_maven";
import Config_structure_node from "../config_form/config_structure_node";
import Config_deploy_linux from "../config_form/config_deploy_linux";
import Config_deploy_docker from "../config_form/config_deploy_docker";
import moment from "../../../../../common/moment/moment";
import Config_deploy_addProofModal from "../config_form/config_deploy_addProofModal";
import {CloseOutlined, EditOutlined} from "@ant-design/icons";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router";

const Config_view1 = props =>{

    const {formInitialValues,codeData,setCodeData,data,setData,setIsPrompt,form,updateConfigure,
        createProof,findAllGitProof,allGitProofList,findAllDeployProof,allDeployProofList
    } = props

    const inputRef = useRef();
    const [newStageVisible, setNewStageVisible] = useState(false)
    const [codeVisible, setCodeVisible] = useState(false)
    const [changeSortVisible, setChangeSortVisible] = useState(false)
    const [step,setStep] = useState('')
    const [deployVisible,setDeployVisible] = useState(false)

    const pipelineId = localStorage.getItem('pipelineId')

    useEffect(()=>{
        if (step!==''){
            inputRef.current.focus()
        }
    },[step])

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
                setIsPrompt(true)
            }
        }
        setData([...arr])
    }

    const deletePart = group =>{
        switch (group.desc) {
            case '单元测试' :
                form.setFieldsValue({
                    testOrder:null,
                })
                break
            case 'maven' :
                form.setFieldsValue({
                    mavenAddress:null,
                    mavenOrder:null
                })
                break
            case 'node':
                form.setFieldsValue({
                    nodeAddress:null,
                    nodeOrder:null
                })
                break
            case 'linux':
                form.setFieldsValue({
                    linuxTargetAddress:null,
                    linuxProofName:null,
                    linuxAddress:null,
                    deployShell:null,
                })
                break
            case 'docker':
                form.setFieldsValue({
                    dockerTargetAddress:null,
                    dockerProofName:null,
                    dockerPort:null,
                    mappingPort:null,
                    dockerAddress:null
                })
        }
        for (let i = 0 ;i<data.length;i++){
            if(data[i].dataId === group.dataId){
                data.splice(i,1)
            }
            setData([...data])
            setIsPrompt(true)
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

    const newStage = () =>{
        return   data && data.map((group,index)=>{
            return(
                <div className='config-details-wrapper' key={index}>
                    <div
                        className='config-details-Headline'
                    >
                        {
                            step !== index ?
                                <div style={{display:"inline"}}>
                                    {group.title}
                                    &nbsp; &nbsp;
                                    <span onClick={()=> displayInput(index)} style={{cursor:'pointer'}}>
                                        <EditOutlined />
                                    </span>
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
            }
            setIsPrompt(false)
            props.history.push('/home/task/structure')
        })
    }

    const onValuesChange = () =>{
        setIsPrompt(true)
    }

    return(
        <div className='config-details task '>
            <div className='config-details-content'>
                <div className='config-details-right'>
                    <div className='config-details-right-all'>
                        <div style={{textAlign:'right'}}>
                            <Button onClick={()=>setChangeSortVisible(true)}>更改配置顺序</Button>
                        </div>
                        <Form
                            id='form'
                            form={form}
                            layout='vertical'
                            autoComplete = "off"
                            onFinish={onFinish}
                            onValuesChange={onValuesChange}
                            initialValues={formInitialValues}
                        >
                            <Config_code
                                codeData={codeData}
                                form={form}
                                setCodeData={setCodeData}
                                setCodeVisible={setCodeVisible}
                                setIsPrompt={setIsPrompt}
                                createProof={createProof}
                                findAllGitProof={findAllGitProof}
                                allGitProofList={allGitProofList}
                            />
                            { newStage() }
                            <Config_addNewStage
                                setNewStageVisible={setNewStageVisible}
                            />
                        </Form>

                    </div>

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
                    />

                    <ChangeConfigSorts_drawer
                        changeSortVisible={changeSortVisible}
                        setChangeSortVisible={setChangeSortVisible}
                        data={data}
                        setData={setData}
                        codeData={codeData}
                        setIsPrompt={setIsPrompt}
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

export default withRouter(inject('ConfigStore','ProofStore','GitAuthorizeStore')(observer(Config_view1)))