import React,{Fragment,useState,useRef,useEffect} from "react";
import  "./guiView.scss";
import ConfigName from "./configName";
import ConfigCode from "../guiView/configCode";
import ConfigAddNewStage from "../guiView/configAddNewStage";
import ConfigAddCodeDrawer from "../guiView/configAddCodeDrawer";
import ConfigAddNewStageDrawer from "../guiView/configAddNewStageDrawer";
import ConfigFormDetailsDrawer from "../guiView/configFormDetailsDrawer";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router";
import {Form,Input,message} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {getUser} from "doublekit-core-ui";
import moment from "../../../../../common/moment/moment";

const GuiView = props =>{

    const {form,configDataStore,del,updateConfigure,jumpOrNot} = props

    const {setIsPrompt,data,setData,codeData,setCodeData,formInitialValues,setFormInitialValues,
        isGuiAlias,setIsGuiAlias,codeType,setCodeType,mavenShellBlock,linuxShellBlock,unitShellBlock,
        shellBlock,orderShellBlock} = configDataStore

    const inputRef = useRef()
    const [codeDrawer,setCodeDrawer] = useState(false) // 新建源码抽屉
    const [newStageDrawer,setNewStageDrawer] = useState(false) // 添加新阶段抽屉
    const [taskFormDrawer,setTaskFormDrawer] = useState(false) // 表单详情抽屉
    const [index,setIndex] = useState("")  // 配置位置的插入
    const [newStage,setNewStage] = useState("")
    const pipelineId = localStorage.getItem("pipelineId")
    const userId = getUser().userId

    useEffect(()=>{
        if (isGuiAlias !==""){
            inputRef.current.focus()
        }
    },[isGuiAlias])

    useEffect(()=>{
        form.setFieldsValue({...formInitialValues})
    },[formInitialValues])

    const displayInput = index =>{
        setIsGuiAlias(index)
    }

    const hiddenInput = () =>{
        setIsGuiAlias("")
    }

    const changeInputValue = (e,index) =>{
        //深拷贝一次，可以让arr指向单独的内存空间
        let arr = JSON.parse(JSON.stringify(data))
        for(let i = 0 ;i<arr.length;i++){
            if( i === index  && e.target.value) {
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

    const onFinish = values => {
        //排序
        let codeSort, testSort,structureSort, deploySort = 0
        //配置别名
        let testAlias,structureAlias,deployAlias
        //配置类型
        let testType,structureType,deployType

        switch (codeData){
            case "":
                codeSort = 0
                break
            default:codeSort = 1
        }

        data && data.map((item,index)=>{
            if(item.dataType > 10 && item < 20 ){
                testSort = index + 2
                testAlias = item.title
                testType = item.dataType
            }
            if(item.dataType > 20 && item.dataType < 30){
                structureSort = index + 2
                structureAlias = item.title
                structureType = item.dataType
            }
            if(item.dataType > 30 && item.dataType < 40){
                deploySort = index + 2
                deployAlias = item.title
                deployType = item.dataType
            }
        })

        const configureList = {
            configureCreateTime:moment.moment,
            user:{id:userId},
            pipeline:{pipelineId:pipelineId},
            pipelineCode:{
                codeId:localStorage.getItem("codeId"),
                sort:codeSort,
                type:codeData && codeData.codeType,
                codeBranch:values.codeBranch,
                codeName:values.codeName,
                proof:{proofId:localStorage.getItem("gitProofId")}
            },
            pipelineTest:{
                testId:localStorage.getItem("testId"),
                sort:testSort,
                testAlias:testAlias,
                type:testType,
                testOrder:unitShellBlock,
            },
            pipelineStructure:{
                structureId:localStorage.getItem("structureId"),
                sort:structureSort,
                structureAlias:structureAlias,
                type:structureType,
                structureAddress:values.structureAddress,
                structureOrder:mavenShellBlock,
            },
            pipelineDeploy:{
                deployId:localStorage.getItem("deployId"),
                sort:deploySort,
                deployAlias:deployAlias,
                type:deployType,
                deployType:values.deployType,
                sshIp:values.deployType === 0 ? values.sshIp :null,
                sshPort:values.deployType === 0 ? values.sshPort :null,
                deployAddress:values.deployType === 0 ? values.deployAddress :null,
                sourceAddress:values.deployType === 0 ? values.sourceAddress:null,
                startShell:values.deployType === 0 ? linuxShellBlock:shellBlock,
                startPort:values.deployType === 0 ? values.startPort:null,
                mappingPort:values.deployType === 0 ?values.mappingPort:null,
                startAddress:values.deployType === 0 ? values.startAddress :null,
                deployOrder:values.deployType === 0 ? orderShellBlock :null,
                proof:{proofId:localStorage.getItem("deployProofId")}
            }
        }
        updateConfigure(configureList).then(res=>{
            setIsPrompt(false)
            if(jumpOrNot){
                props.history.push("/index/task/config")
            }
            if(res.code!==0){
                message.error({content:"配置失败",className:"message"})
            }else {
                message.success({content:"配置成功",className:"message"})
            }
        })
    }

    const onValuesChange = value =>{
        Object.assign(formInitialValues,value)
        setFormInitialValues({...formInitialValues})
        setIsPrompt(true)
    }

    const newStageShow = data =>{
        return data && data.map((item,index)=>{
            return(
                <Fragment key={index}>
                    <div className="group-flow">
                        <div className="group-flow_btn" >
                            <svg className="icon group-flow_btn_i"
                                 aria-hidden="true"
                                 onClick={()=>insertData(item,index)}
                            >
                                {/*<use xlinkHref="#icon-tianjia"/>*/}
                                <use xlinkHref="#icon-zengjia"/>
                            </svg>
                        </div>
                    </div>
                    <div className="group-table">
                        <div className="group-head">
                            <div className="name">
                                <div  className="label">
                                    {
                                        isGuiAlias === index ?
                                            <Input type="text"
                                                   ref={inputRef}
                                                   onBlur={hiddenInput}
                                                   style={{width:100}}
                                                   defaultValue={item.title}
                                                   onChange={e=>changeInputValue(e,index)}
                                            />
                                            :
                                        <Fragment>
                                            {item.title}
                                            &nbsp; &nbsp;
                                            <span onClick={()=> displayInput(index)} >
                                                <EditOutlined />
                                            </span>
                                        </Fragment>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="newStages">
                            <div className="newStages-step">
                                <div className="newStages-content"  >
                                    <div className="newStages-task">
                                        <div className="newStages-job">
                                            <div className="newStages-job_text" onClick={()=>showStage(item)}>
                                                <ConfigName type={item.dataType}/>
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
        <div className="guiView">
            <div className="guiView-content">
                <ConfigCode
                    codeData={codeData}
                    setCodeDrawer={setCodeDrawer}
                    setNewStage={setNewStage}
                    setTaskFormDrawer={setTaskFormDrawer}
                />
                <div className="guiView-main">
                    <div className="guiView-main_container">
                        <div className="guiView-main_group">
                            { newStageShow(data) }
                            <ConfigAddNewStage
                                setIndex={setIndex}
                                setNewStageDrawer={setNewStageDrawer}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Form
                id="form"
                form={form}
                layout="vertical"
                autoComplete = "off"
                onFinish={onFinish}
                onValuesChange={onValuesChange}
            >
                <ConfigAddCodeDrawer
                    setIsPrompt={setIsPrompt}
                    codeData={codeData}
                    setCodeData={setCodeData}
                    codeDrawer={codeDrawer}
                    setCodeDrawer={setCodeDrawer}
                    codeType={codeType}
                    setCodeType={setCodeType}
                    formInitialValues={formInitialValues}
                />
                <ConfigAddNewStageDrawer
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
                    data={data}
                    setData={setData}
                    taskFormDrawer={taskFormDrawer}
                    setTaskFormDrawer={setTaskFormDrawer}
                    newStage={newStage}
                    del={del}
                />
           </Form>
        </div>
    )
}

export default withRouter(inject("configDataStore")(observer(GuiView)))