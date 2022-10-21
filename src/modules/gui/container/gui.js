import React,{useState,useEffect} from "react";
import "./gui.scss";
// import {enableAxiosPlugin} from "tiklab-enable-axios-plugin";
import {observer} from "mobx-react";
import {Form,message,Modal} from "antd";
import TestContext from "../components/common/testContext";
import Code from "../components/common/code";
import NewStage from "../components/common/newStage";
import FormDetailsDrawer from "../components/common/formDetailsDrawer";
import ConfigStore from "../store/configStore";
import {ExclamationCircleOutlined} from "@ant-design/icons";

// enableAxiosPlugin()

const Gui = props =>{

    const {pipelineStore,configDataStore,del} = props

    const {pipelineId} = pipelineStore
    const {formInitialValues,setFormInitialValues,data,codeType,setCodeType,setData} = configDataStore
    const {updateConfigure} = ConfigStore

    const [form] = Form.useForm()

    const [taskFormDrawer,setTaskFormDrawer] = useState(false) // 表单详情抽屉
    const [newStage,setNewStage] = useState("") // 表单详情显示
    const [index,setIndex] = useState("")  // 配置位置的插入

    useEffect(()=>{
        form.setFieldsValue({...formInitialValues})
    },[formInitialValues,pipelineId])

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
                }
                break
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
    const valueChange = (value,name,mode) => {
        const obj = {}
        obj[name] = value
        const params = {
            pipeline:{pipelineId},
            taskType:mode,
            pipelineTest:obj,
            pipelineCode:obj,
            pipelineBuild:obj,
            pipelineDeploy:obj,
            message:"update"
        }
        if(validation(codeType,name,value)){
            updateConfig(params,"update")
        }
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
                    setNewStage(taskType)
                    setTaskFormDrawer(true)
                }
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
        }
        setData([...newData])
    }

    const onValuesChange = value =>{
        Object.assign(formInitialValues,value)
        setFormInitialValues({...formInitialValues})
    }

    return (
        <TestContext.Provider
            value={{pipelineStore,configDataStore,del,valueChange,changType,addConfig}}
        >
            <div className="guiView">
                <Form
                    id="form"
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    onValuesChange={onValuesChange}
                    initialValues={{deployType:1}}
                >
                    <div className="guiView-content">
                        <Code
                            setNewStage={setNewStage}
                            setTaskFormDrawer={setTaskFormDrawer}
                            codeType={codeType}
                            setCodeType={setCodeType}
                            formInitialValues={formInitialValues}
                        />
                        <div className="guiView-main">
                            <div className="guiView-main_container">
                                <div className="guiView-main_group">
                                    <NewStage
                                        data={data}
                                        index={index}
                                        setIndex={setIndex}
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