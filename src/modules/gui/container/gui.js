import React,{useState,useEffect} from "react";
import "./gui.scss";
// import {enableAxiosPlugin} from "tiklab-enable-axios-plugin";
import {observer} from "mobx-react";
import {Form,message,Modal} from "antd";
import TestContext from "../components/common/testContext";
import NewStage from "../components/common/newStage";
import FormDetailsDrawer from "../components/common/formDetailsDrawer";
import {ExclamationCircleOutlined} from "@ant-design/icons";

// enableAxiosPlugin()

const Gui = props =>{

    const {pipelineStore,configStore} = props

    const {pipeline} = pipelineStore
    const {formInitialValues,codeType,setCodeType,updateConfigure,configValid,enabledValid,validType,data} = configStore

    const [form] = Form.useForm()
    const pipelineId = pipeline.pipelineId

    const [taskFormDrawer,setTaskFormDrawer] = useState(false) // 表单详情抽屉
    const [newStage,setNewStage] = useState("") // 表单详情显示
    const [dataItem,setDataItem] = useState("")
    const [index,setIndex] = useState("")  // 配置位置的插入

    useEffect(()=>{
        form.setFieldsValue({...formInitialValues})
    },[formInitialValues,pipeline])

    useEffect(()=>{
        // 必填配置是否完善
        pipeline && configValid(pipelineId).then(res=>{
            if(res.code===0){
                const keys =res.data && Object.keys(res.data)
                form.validateFields(keys)
                keys && keys.map(item=>{
                    const zz = document.getElementById(item)
                    zz && zz.classList.add("guiView-validateFields")
                })
            }
        })
    },[pipeline,enabledValid,newStage])


    // 添加
    const addConfig = taskType => {
        const params = {
            pipeline:{pipelineId},
            taskType:taskType,
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
        formInitialValues[name]=value
        const params = {
            pipeline:{pipelineId},
            taskType:mode,
            values:obj,
            message:"update"
        }
        updateConfigure(params).then(res=>{
            if(res.code===0){
                document.getElementById(name) && document.getElementById(name).classList.remove("guiView-validateFields")
            }
        })
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
        switch (type) {
            case "create":
                setNewStage(taskType)
                setTaskFormDrawer(true)
                break
            case "updateType":
                setCodeType(taskType)
                break
        }
    }

    return (
        <TestContext.Provider
            value={{pipelineStore,
                configStore,
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
                    initialValues={{authType:1}}
                >
                    <div className="guiView-content">
                        <div className="guiView-main">
                            <div className="guiView-main_container">
                                <div className="guiView-main_group">
                                    <NewStage
                                        validType={validType}
                                        data={data}
                                        index={index}
                                        setIndex={setIndex}
                                        codeType={codeType}
                                        setTaskFormDrawer={setTaskFormDrawer}
                                        setNewStage={setNewStage}
                                        formInitialValues={formInitialValues}
                                        setDataItem={setDataItem}
                                    />
                                </div>
                            </div>
                        </div>

                        <FormDetailsDrawer
                            deletePart={deletePart}
                            taskFormDrawer={taskFormDrawer}
                            setTaskFormDrawer={setTaskFormDrawer}
                            dataItem={dataItem}
                        />
                    </div>
                </Form>
            </div>
       </TestContext.Provider>
    )
}

export default observer(Gui)