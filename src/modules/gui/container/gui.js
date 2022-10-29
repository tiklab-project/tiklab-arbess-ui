import React,{useState,useEffect} from "react";
import "./gui.scss";
// import {enableAxiosPlugin} from "tiklab-enable-axios-plugin";
import {observer} from "mobx-react";
import {Form,message,Modal} from "antd";
import TestContext from "../components/common/testContext";
import Code from "../components/common/code";
import NewStage from "../components/common/newStage";
import FormDetailsDrawer from "../components/common/formDetailsDrawer";
import {ExclamationCircleOutlined} from "@ant-design/icons";

// enableAxiosPlugin()

const Gui = props =>{

    const {pipelineStore,configDataStore,del,configStore} = props

    const {pipelineId} = pipelineStore
    const {formInitialValues,setFormInitialValues,data,codeType,setCodeType,setData} = configDataStore
    const {updateConfigure,configValid,enabledValid,validType} = configStore

    const [form] = Form.useForm()

    const [taskFormDrawer,setTaskFormDrawer] = useState(false) // 表单详情抽屉
    const [newStage,setNewStage] = useState("") // 表单详情显示
    const [index,setIndex] = useState("")  // 配置位置的插入

    useEffect(()=>{
        form.setFieldsValue({...formInitialValues})
    },[formInitialValues,pipelineId])

    useEffect(()=>{
        // 必填配置是否完善
        pipelineId && configValid(pipelineId).then(res=>{
            if(res.code===0){
                const keys =res.data && Object.keys(res.data)
                form.validateFields(keys)
                keys && keys.map(item=>{
                    const zz = document.getElementById(item)
                    zz && zz.classList.add("guiView-validateFields")
                })
            }
        })
    },[pipelineId,enabledValid,newStage])

    const validCodeGit = /^(http(s)?:\/\/([^\/]+?\/){2}|git@[^:]+:[^\/]+?\/).*?\.git$/
    const validCodeSvn = /^svn(\+ssh)?:\/\/([^\/]+?\/){2}.*$/
    const validDeploySshIp = /((25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)/

    const validation = (codeType,name,value) =>{
        switch (name) {
            case "codeName":
                if(codeType===5){
                    return validCodeSvn.test(value)
                }else if(codeType===1||codeType===4){
                    return validCodeGit.test(value)
                }else return true
            case "sshIp":
                return validDeploySshIp.test(value)
            default:
                return true
        }
    }

    // 添加
    const addConfig = taskType => {
        const params = {
            pipeline:{pipelineId},
            taskType:taskType,
            message:"create"
        }
        updateConfig(params,"create",taskType)
    }

    // 切换
    const changType = type =>{
        const params = {
            pipeline:{pipelineId},
            taskType:type,
            message:"updateType",
        }
        updateConfig(params,"updateType",type)
    }

    // 更改
    const valueChange = (value,name,mode,setIsLoading) => {
        const obj = {}
        obj[name] = value
        const params = {
            pipeline:{pipelineId},
            taskType:mode,
            values:obj,
            message:"update"
        }
        if(name==="proofId"){
            params.values = {
                proof: {proofId:value}
            }
        }
        if(validation(codeType,name,value)){
            updateConfigure(params).then(res=>{
                if(res.code===0){
                    const zz = document.getElementById(name)
                    zz && zz.classList.remove("guiView-validateFields")
                    setIsLoading(3)
                }else {
                    setIsLoading(4)
                    message.info(res.msg)
                }
            })
        }else {
            setIsLoading(4)
        }

        setTimeout(()=>setIsLoading(1),1000)
    }

    // 删除
    const deletePart = newStage => {
        Modal.confirm({
            title: "删除",
            icon: <ExclamationCircleOutlined />,
            content: "删除后数据无法恢复",
            onOk:()=>delPart(newStage),
            okText: "确认",
            cancelText: "取消",
        })
    }

    const delPart = newStage => {
        const params = {
            pipeline:{pipelineId},
            taskType:newStage,
            message:"delete"
        }
        updateConfig(params,"delete",newStage)
        setTaskFormDrawer(false)
    }

    const updateConfig = (params,type,taskType) =>{
        updateConfigure(params).then(res=>{
            if(res.code===50001){
                message.info(res.msg)
            }else if(res.code===0){
               renderType(type,taskType)
            }
        })
    }
    
    const renderType = (type,taskType) => {
        const newData = [...data]
        switch (type) {
            case "create":
                if(taskType>10){
                    newData.splice(index,0,{
                        dataId:index,
                        dataType:taskType
                    })
                }
                setNewStage(taskType)
                setTaskFormDrawer(true)
                break
            case "updateType":
                setCodeType(taskType)
                break
            case "delete":
                del(taskType)
                for (let i = 0 ;i<newData.length;i++){
                    if(newData[i].dataType === newStage){
                        newData.splice(i,1)
                    }
                }
                break
        }
        setData([...newData])
    }

    const onValuesChange = value =>{
        Object.assign(formInitialValues,value)
        setFormInitialValues({...formInitialValues})
    }

    return (
        <TestContext.Provider
            value={{pipelineStore,
                configDataStore,
                configStore,
                del,
                valueChange,
                changType,
                addConfig,
        }}
        >
            <div className="guiView">
                <Form
                    id="form"
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    onValuesChange={onValuesChange}
                    initialValues={{deployType:0}}
                >
                    <div className="guiView-content">
                        <div className="guiView-main">
                            <div className="guiView-main_container">
                                <div className="guiView-main_group">
                                    <Code
                                        validType={validType}
                                        setIndex={setIndex}
                                        index={index}
                                        setNewStage={setNewStage}
                                        setTaskFormDrawer={setTaskFormDrawer}
                                        codeType={codeType}
                                        formInitialValues={formInitialValues}
                                    />
                                    <NewStage
                                        validType={validType}
                                        data={data}
                                        index={index}
                                        setIndex={setIndex}
                                        codeType={codeType}
                                        setTaskFormDrawer={setTaskFormDrawer}
                                        setNewStage={setNewStage}
                                    />
                                </div>
                            </div>
                        </div>

                        <FormDetailsDrawer
                            deletePart={deletePart}
                            taskFormDrawer={taskFormDrawer}
                            setTaskFormDrawer={setTaskFormDrawer}
                            newStage={newStage}
                        />
                    </div>
                </Form>
            </div>
       </TestContext.Provider>
    )
}

export default observer(Gui)