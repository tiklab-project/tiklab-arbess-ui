import React, {useState, useEffect,useRef} from "react";
import  "./formView.scss";
import {Button, Form, Input, message} from "antd";
import {CloseOutlined, EditOutlined} from "@ant-design/icons";
import ConfigAddNewStageModal from "../formView/configAddNewStageModal";
import ConfigAddCodeModal from "../formView/configAddCodeModal";
import ChangeConfigSortsDrawer from "../formView/changeConfigSortsDrawer";
import ConfigAddNewStage from "../formView/configAddNewStage";
import ConfigCode from "../formView/configCode";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router";
import ConfigForm from "./configForm";
import ConfigName from "./configName";
import moment from "../../../../../common/moment/moment";
import {getUser} from "doublekit-core-ui";

const FormView = props =>{

    const {form,del,configDataStore,updateConfigure,jumpOrNot} = props

    const {setIsPrompt,data,setData,codeData,setCodeData,formInitialValues,setFormInitialValues,
        isFormAlias,setIsFormAlias,setCodeType,mavenShellBlock,linuxShellBlock,unitShellBlock,
    } = configDataStore

    const inputRef = useRef()
    const [newStageVisible, setNewStageVisible] = useState(false)
    const [codeVisible, setCodeVisible] = useState(false)
    const [changeSortVisible, setChangeSortVisible] = useState(false)
    const pipelineId = localStorage.getItem("pipelineId")
    const userId = getUser().userId

    useEffect(()=>{
        if (isFormAlias!==""){
            inputRef.current.focus()
        }
    },[isFormAlias])

    useEffect(()=>{
        form.setFieldsValue({...formInitialValues})
    },[formInitialValues])

    // 显示文本框
    const displayInput = index =>{
        setIsFormAlias(index)
    }

    // 隐藏文本框
    const hiddenInput = () =>{
        setIsFormAlias("")
    }

    // 改变title
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

    // 删除部分构建配置
    const deletePart = group =>{
        del(group.dataType)
        for (let i = 0 ;i<data.length;i++){
            if(data[i].dataType === group.dataType){
                data.splice(i,1)
            }
            setData([...data])
        }
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
            user:{id:userId,},
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
                ip:values.ip,
                port:values.port,
                deployAddress: values.deployAddress,
                deployTargetAddress: values.deployTargetAddress,
                deployShell:linuxShellBlock,
                dockerPort:values.dockerPort,
                mappingPort:values.mappingPort,
                proof:{ proofId:localStorage.getItem("deployProofId") }
            }
        }
        updateConfigure(configureList).then(res=>{
            if(jumpOrNot){
                props.history.push("/index/task/config")
            }
            if(res.code!==0){
                message.error({content:"配置失败", className:"message"})
            }else {
                message.success({content: "配置成功", className:"message"})
            }
            setIsPrompt(false)
        })
    }

    const onValuesChange = value =>{
        Object.assign(formInitialValues,value)
        setFormInitialValues({...formInitialValues})
        setIsPrompt(true)
    }

    const newStage = data =>{
        return   data && data.map((group,index)=>{
            return(
                <div className="configView1-wrapper" key={index} >
                    <div className="configView1-wrapper-Headline">
                        {
                            isFormAlias === index ?
                                <Input type="text"
                                       ref={inputRef}
                                       onBlur={hiddenInput}
                                       style={{width:100}}
                                       defaultValue={group.title}
                                       onChange={e=>changeInputValue(e,index)}
                                />
                                :
                                <div style={{display:"inline"}}>
                                    {group.title}
                                    &nbsp; &nbsp;
                                    <span onClick={()=> displayInput(index)} style={{cursor:"pointer"}}>
                                        <EditOutlined />
                                    </span>
                                </div>
                        }
                    </div>
                    <div className="configView1-wrapper-newStage">
                        <div className="desc">
                            <div className="desc-head">
                                <ConfigName type={group.dataType}/>
                            </div>
                            <div className="desc-delete" onClick={()=>deletePart(group)}>
                                <CloseOutlined />
                            </div>
                        </div>
                        <div className="desc-input">
                            <ConfigForm type={group.dataType}/>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return(
        <div className="configView1">
            <div className="configView1-content">
                <div style={{textAlign:"right"}}>
                    <Button onClick={()=>setChangeSortVisible(true)}>更改配置顺序</Button>
                </div>
                <Form
                    id="form"
                    form={form}
                    layout="vertical"
                    autoComplete = "off"
                    onFinish={onFinish}
                    onValuesChange={onValuesChange}
                >
                    <ConfigCode
                        codeData={codeData}
                        setCodeVisible={setCodeVisible}
                        del={del}
                    />
                    { newStage(data) }
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
                    codeVisible={codeVisible}
                    setCodeVisible={setCodeVisible}
                    setCodeData={setCodeData}
                    setIsPrompt={setIsPrompt}
                    setCodeType={setCodeType}
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
    )
}

export default withRouter(inject("configDataStore")(observer(FormView)))