import React, {useState, useEffect, useRef} from "react";
import '../../style/configView1.scss';
import {Button, Form, Input,message} from "antd";
import ConfigAddNewStageModal from "../configView1/configAddNewStageModal";
import ConfigAddCodeModal from "../configView1/configAddCodeModal";
import ChangeConfigSortsDrawer from "../configView1/changeConfigSortsDrawer";
import ConfigAddNewStage from "../configView1/configAddNewStage";
import ConfigCode from "../configView1/configCode";
import moment from "../../../../../common/moment/moment";
import {CloseOutlined, EditOutlined} from "@ant-design/icons";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router";

const ConfigView1 = props =>{

    const {form,del, updateConfigure,configDataStore,configName,configForm,
    } = props

    const {setIsPrompt, codeName,codeBranch,data,setData,codeData,setCodeData,formInitialValues,
        setFormInitialValues,isAlias,setIsAlias,linuxShellBlock,unitShellBlock,mavenShellBlock,
    } = configDataStore

    const inputRef = useRef();
    const [newStageVisible, setNewStageVisible] = useState(false)
    const [codeVisible, setCodeVisible] = useState(false)
    const [changeSortVisible, setChangeSortVisible] = useState(false)
    const pipelineId = localStorage.getItem('pipelineId')

    useEffect(()=>{
        if (isAlias!==''){
            inputRef.current.focus()
        }
    },[isAlias])

    useEffect(()=>{
        form.setFieldsValue({...formInitialValues})
    },[formInitialValues])

    const displayInput = index =>{
        setIsAlias(index)
    }

    const hiddenInput = () =>{
        setIsAlias('')
    }

    const changeInputValue = (e,index) =>{
        //深拷贝一次，可以让arr指向单独的内存空间
        let arr = JSON.parse(JSON.stringify(data))
        for(let i = 0 ;i<arr.length;i++){
            if( i === index && e.target.value) {
                arr[i].title = e.target.value
                setIsPrompt(true)
            }
        }
        setData([...arr])
    }

    const deletePart = group =>{
        del(group.dataType)
        for (let i = 0 ;i<data.length;i++){
            if(data[i].dataType === group.dataType){
                data.splice(i,1)
            }
            setData([...data])
        }
    }

    const inputContent = type =>{
        return configForm(type)
    }

    const dataType = type =>{
        return configName(type)
    }

    const onFinish = values => {

        //排序
        let testSort,structureSort, deploySort = 0
        //配置别名
        let testAlias,structureAlias,deployAlias
        //配置类型
        let testType,structureType,deployType

        data && data.map((item,index)=>{
            if(item.dataType === 11){
                testSort = index + 2
                testAlias = item.title
                testType = item.dataType
            }
            if(item.dataType === 21 || item.dataType === 22){
                structureSort = index + 2
                structureAlias = item.title
                structureType = item.dataType
            }
            if(item.dataType === 31 || item.dataType === 32){
                deploySort = index + 2
                deployAlias = item.title
                deployType = item.dataType
            }
        })

        const configureList = {
            configureCreateTime:moment.moment,
            pipelineId:pipelineId,
            pipelineCode:{
                codeId:localStorage.getItem('codeId'),
                sort:1,
                type:codeData && codeData.codeType,
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
                type:testType,
                testOrder: unitShellBlock,
            },
            pipelineStructure:{
                structureId:localStorage.getItem('structureId'),
                sort:structureSort,
                structureAlias:structureAlias,
                type:structureType,
                structureAddress:values.structureAddress,
                structureOrder:mavenShellBlock,
            },
            pipelineDeploy:{
                deployId:localStorage.getItem('deployId'),
                sort:deploySort,
                deployAlias:deployAlias,
                type:deployType,
                deployAddress: values.deployAddress,
                deployTargetAddress: values.deployTargetAddress,
                deployShell:linuxShellBlock,
                dockerPort:values.dockerPort,
                mappingPort:values.mappingPort,
                proof:{
                    proofId:localStorage.getItem('deployProofId'),
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
        Object.assign(formInitialValues,value)
        setFormInitialValues({...formInitialValues})
        setIsPrompt(true)
    }

    const newStage = () =>{
        return   data && data.map((group,index)=>{
            return(
                <div className='configView1-wrapper' key={index}>
                    <div className='configView1-wrapper-Headline'>
                        {
                            isAlias !== index ?
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
                    <div className='configView1-wrapper-newStage'>
                        <div className='desc'>
                            <div className='desc-head'> {dataType(group.dataType)} </div>
                            <div className='desc-delete' onClick={()=>deletePart(group)}>
                                <CloseOutlined />
                            </div>
                        </div>
                        <div className='desc-input'> { inputContent(group.dataType) }</div>
                    </div>
                </div>
            )
        })
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
                        <ConfigCode
                            codeData={codeData}
                            setCodeVisible={setCodeVisible}
                            del={del}
                            configName={configName}
                            configForm={configForm}
                        />
                        { newStage() }
                        <ConfigAddNewStage setNewStageVisible={setNewStageVisible}/>
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

export default withRouter(inject('configDataStore')(observer(ConfigView1)))