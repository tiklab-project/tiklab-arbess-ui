import React, {useState, useEffect, useRef} from "react";
import '../../style/config_view1.scss';
import {Button, Form, Input,message} from "antd";
import ConfigAddNewStageModal from "../configView1/configAddNewStageModal";
import ConfigAddCodeModal from "../configView1/configAddCodeModal";
import ChangeConfigSortsDrawer from "../configView1/changeConfigSortsDrawer";
import ConfigAddNewStage from "../configView1/configAddNewStage";
import Config_code from "../configView1/config_code";
import moment from "../../../../../common/moment/moment";
import formResetFields from "../configForm/formResetFields";
import formAll from "../configForm/formAll";
import {CloseOutlined, EditOutlined} from "@ant-design/icons";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router";

const ConfigView1 = props =>{

    const {formInitialValues,codeData,setCodeData,data,setData,setIsPrompt,form,codeBlockContent,
        codeName,setCodeName,codeBranch,setCodeBranch,newStageForm,setNewStageForm, updateConfigure,
    } = props

    const inputRef = useRef();
    const [newStageVisible, setNewStageVisible] = useState(false)
    const [codeVisible, setCodeVisible] = useState(false)
    const [changeSortVisible, setChangeSortVisible] = useState(false)
    const [step,setStep] = useState('')

    const pipelineId = localStorage.getItem('pipelineId')

    useEffect(()=>{
        if (step!==''){
            inputRef.current.focus()
        }
    },[step])

    useEffect(()=>{
        form.setFieldsValue(newStageForm)
    },[newStageForm])

    const displayInput = index =>{
        setStep(index)
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
                setNewStageForm({ ...formResetFields.unit})
                break
            case 'maven' :
                setNewStageForm({...formResetFields.maven})
                break
            case 'node':
                setNewStageForm({...formResetFields.node})
                break
            case 'linux':
                setNewStageForm({...formResetFields.linux})
                break
            case 'docker':
                setNewStageForm({...formResetFields.docker})
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
                    return  formAll.unit
                case 'maven':
                    return  formAll.maven
                case 'node':
                    return formAll.node
                case 'linux':
                    return  formAll.linux
                case 'docker':
                    return  formAll.docker
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
                                    <span onClick={()=> displayInput(index)}
                                          style={{cursor:'pointer'}}>
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
                // deployShell:codeBlockContent,
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

    const onValuesChange = value =>{
        Object.assign(newStageForm,value)
        setNewStageForm({...newStageForm})
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
                            initialValues={{formInitialValues}}
                        >
                            <Config_code
                                codeData={codeData}
                                form={form}
                                setCodeData={setCodeData}
                                setCodeVisible={setCodeVisible}
                                setIsPrompt={setIsPrompt}
                                setCodeName={setCodeName}
                                setCodeBranch={setCodeBranch}
                            />
                            { newStage() }
                            <ConfigAddNewStage
                                setNewStageVisible={setNewStageVisible}
                            />
                        </Form>

                    </div>

                    <ConfigAddNewStageModal
                        data={data}
                        setData={setData}
                        newStageVisible={newStageVisible}
                        setNewStageVisible={setNewStageVisible}
                        setIsPrompt={setIsPrompt}               
                    />

                    <ConfigAddCodeModal
                        codeName={codeName}
                        codeBranch={codeBranch}
                        codeVisible={codeVisible}
                        setCodeVisible={setCodeVisible}
                        setCodeData={setCodeData}
                        setIsPrompt={setIsPrompt}        
                    />

                    <ChangeConfigSortsDrawer
                        changeSortVisible={changeSortVisible}
                        setChangeSortVisible={setChangeSortVisible}
                        data={data}
                        setData={setData}
                        codeData={codeData}
                        setIsPrompt={setIsPrompt}
                    />

                </div>
            </div>
        </div>
    )
}

export default withRouter(inject('ConfigStore','ProofStore','GitAuthorizeStore')(observer(ConfigView1)))