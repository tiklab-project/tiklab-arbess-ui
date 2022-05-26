import React, {useState, useEffect, useRef} from "react";
import '../../style/configView1.scss';
import {Button, Form, Input,message} from "antd";
import ConfigAddNewStageModal from "../configView1/configAddNewStageModal";
import ConfigAddCodeModal from "../configView1/configAddCodeModal";
import ChangeConfigSortsDrawer from "../configView1/changeConfigSortsDrawer";
import ConfigAddNewStage from "../configView1/configAddNewStage";
import Config_code from "../configView1/config_code";
import moment from "../../../../../common/moment/moment";
import formAll from "../configForm/formAll";
import {CloseOutlined, EditOutlined} from "@ant-design/icons";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router";

const ConfigView1 = props =>{

    const {form,del,git, updateConfigure,ConfigDataStore,} = props

    const {setIsPrompt, codeName,setCodeName,codeBranch,setCodeBranch,codeBlockContent,
        data,setData, codeData,setCodeData,  formInitialValues,setFormInitialValues
    } = ConfigDataStore

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
        form.setFieldsValue({
           ...formInitialValues
        })
    },[formInitialValues])

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
        del(group.desc)
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
                <div className='configView1-wrapper' key={index}>
                    <div
                        className='configView1-wrapper-Headline'
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
                    <div className='configView1-wrapper-newStage'>
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

    const onFinish = values => {

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
                }
                break
            case 'Gitee':{
                codeList = {
                    codeType:2,
                }
            }
                break
            case 'Gitlab':{
                codeList = {
                    codeType:4,
                }
            }
                break
            case 'Github':{
                codeList = {
                    codeType:3,
                }
            }
        }

        for (let i in dataArray){
            switch (dataArray[i]){
                case '单元测试':
                    testList = {
                        testType:11,
                    }
                    break
                case 'maven':
                    structureList = {
                        structureType:21,
                    }
                    break
                case 'node':
                    structureList = {
                        structureType:22,
                    }
                    break
                case 'linux':
                    deployList = {
                        deployType:31,
                    }
                    break
                case 'docker':
                    deployList = {
                        deployType:32,
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
                codeBranch:values.codeBranch,
                codeName:values.codeName,
                proof:{
                    proofId:localStorage.getItem('gitProofId')
                }
            },
            pipelineTest:{
                testId:localStorage.getItem('testId'),
                sort:testSort,
                testAlias:testAlias,
                type:testList && testList.testType,
                testOrder: values.testOrder,
            },
            pipelineStructure:{
                structureId:localStorage.getItem('structureId'),
                sort:structureSort,
                structureAlias:structureAlias,
                type:structureList && structureList.structureType,
                structureAddress:values.structureAddress,
                structureOrder:values.structureOrder,
            },
            pipelineDeploy:{
                deployId:localStorage.getItem('deployId'),
                sort:deploySort,
                deployAlias:deployAlias,
                type:deployList && deployList.deployType,
                deployAddress: values.deployAddress,
                deployTargetAddress: values.deployTargetAddress,
                deployShell:codeBlockContent,
                dockerPort:values.dockerPort,
                mappingPort:values.mappingPort,
                proof:{
                    proofId:localStorage.getItem('deployProofId'),
                }
            }
        }
        console.log(configureList,'hhhhhh')
        updateConfigure(configureList).then(res=>{
            if(res.code!==0){
                message.info('配置失败')
            }message.info('保存成功')
            setIsPrompt(false)
        })
    }

    const onValuesChange = value =>{
        Object.assign(formInitialValues,value)
        setFormInitialValues({...formInitialValues})
        setIsPrompt(true)
    }

    return(
        <div className='configView1 task '>
            <div className='configView1-content'>
                <div className='configView1-content-detail'>
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
                    >
                        <Config_code
                            codeData={codeData}
                            setFormInitialValues={setFormInitialValues}
                            setCodeData={setCodeData}
                            setCodeVisible={setCodeVisible}
                            setIsPrompt={setIsPrompt}
                            setCodeName={setCodeName}
                            setCodeBranch={setCodeBranch}
                            formInitialValues={formInitialValues}
                            git={git}
                        />
                        { newStage() }
                        <ConfigAddNewStage
                            setNewStageVisible={setNewStageVisible}
                        />
                    </Form>

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

export default withRouter(inject('ConfigDataStore')(observer(ConfigView1)))