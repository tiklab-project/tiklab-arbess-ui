import React, {useState, useRef, Fragment,useEffect} from "react";
import  '../../style/configView2.scss';
import ConfigCode from "../configView2/configCode";
import ConfigAddNewStage from "../configView2/configAddNewStage";
import ConfigCodeDrawer from "../configView2/configCodeDrawer";
import ConfigNewStageDrawer from "../configView2/configNewStageDrawer";
import ConfigFormDetailsDrawer from "../configView2/configFormDetailsDrawer";
import {inject, observer} from "mobx-react";
import {Form, Input, message} from "antd";
import {EditOutlined} from "@ant-design/icons";
import moment from "../../../../../common/moment/moment";
import {withRouter} from "react-router";

const ConfigView2 = props =>{

    const {form, updateConfigure,configDataStore,del,configName,configForm
    } = props

    const {setIsPrompt, codeName,setCodeName,codeBranch,setCodeBranch, data,setData,
        codeData,setCodeData,  formInitialValues,setFormInitialValues
    } = configDataStore

    const inputRef = useRef();
    const [codeDrawer,setCodeDrawer] = useState(false) // 新建源码抽屉
    const [newStageDrawer,setNewStageDrawer] = useState(false) // 添加新阶段抽屉
    const [taskFormDrawer,setTaskFormDrawer] = useState(false) // 表单详情抽屉
    const [index,setIndex] = useState('')  // 配置的插入
    const [newStage,setNewStage] = useState('')
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

    const showStage = item =>{
        setNewStage(item.dataType)
        setTaskFormDrawer(true)
    }
    
    const insertData = (item,index) => {
        setNewStageDrawer(true)
        setIndex(index)
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
                testOrder: values.testOrder,
            },
            pipelineStructure:{
                structureId:localStorage.getItem('structureId'),
                sort:structureSort,
                structureAlias:structureAlias,
                type:structureType,
                structureAddress:values.structureAddress,
                structureOrder:values.structureOrder,
            },
            pipelineDeploy:{
                deployId:localStorage.getItem('deployId'),
                sort:deploySort,
                deployAlias:deployAlias,
                type:deployType,
                deployAddress: values.deployAddress,
                deployTargetAddress: values.deployTargetAddress,
                deployShell:values.deployShell,
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
                                                    <span onClick={()=> displayInput(index)} >
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
                                                <div className='newStages-job_text' onClick={()=>showStage(item)}>
                                                    {dataType(item.dataType)}
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

    return (
        <div className='configView2'>
           <div className='configView2-content'>
               <ConfigCode
                   codeData={codeData}
                   setCodeDrawer={setCodeDrawer}
                   setNewStage={setNewStage}
                   setTaskFormDrawer={setTaskFormDrawer}
                   configName={configName}
               />
               <div className='configView2-main'>
                   <div className='configView2-main_container'>
                       <div className='configView2-main_group'>
                           { newStageShow() }
                           <ConfigAddNewStage
                               setIndex={setIndex}
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
               <ConfigCodeDrawer
                   setIsPrompt={setIsPrompt}
                   codeData={codeData}
                   form={form}
                   setCodeData={setCodeData}
                   codeDrawer={codeDrawer}
                   setCodeDrawer={setCodeDrawer}
                   codeBranch={codeBranch}
                   codeName={codeName}
               />

               <ConfigNewStageDrawer
                   setIsPrompt={setIsPrompt}
                   newStageDrawer={newStageDrawer}
                   setNewStageDrawer={setNewStageDrawer}
                   taskFormDrawer={taskFormDrawer}
                   setTaskFormDrawer={setTaskFormDrawer}
                   setNewStage={setNewStage}
                   data={data}
                   setData={setData}
                   index={index}
                   setIndex={setIndex}
               />

               <ConfigFormDetailsDrawer
                   setIsPrompt={setIsPrompt}
                   data={data}
                   form={form}
                   setData={setData}
                   del={del}
                   setTaskFormDrawer={setTaskFormDrawer}
                   taskFormDrawer={taskFormDrawer}
                   newStage={newStage}
                   setCodeName={setCodeName}
                   setCodeBranch={setCodeBranch}
                   setCodeData={setCodeData}
                   setFormInitialValues={setFormInitialValues}
                   configName={configName}
                   configForm={configForm}
               />

           </Form>

        </div>
    )
}

export default withRouter(inject('configDataStore')(observer(ConfigView2)))