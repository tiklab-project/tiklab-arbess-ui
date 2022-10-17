import React,{Fragment,useState,useEffect} from "react";
import {toJS} from 'mobx'
import "./gui.scss";
// import {enableAxiosPlugin} from "tiklab-enable-axios-plugin";
import {observer} from "mobx-react";
import {Form} from "antd";
import TestContext from "../components/common/testContext";
import Code from "../components/common/code";
import NewStage from "../components/common/newStage";
import FormDetailsDrawer from "../components/common/formDetailsDrawer";

// enableAxiosPlugin()

const Gui = props =>{

    const {pipelineStore,configDataStore,form,del} = props

    const {pipelineId,pipelineName} = pipelineStore
    const {formInitialValues,data,setData,codeType,setCodeType,setDeployType,setBuildType,
        } = configDataStore

    const [taskFormDrawer,setTaskFormDrawer] = useState(false) // 表单详情抽屉
    const [newStage,setNewStage] = useState("") // 表单详情显示

    useEffect(()=>{
        form.setFieldsValue({...formInitialValues})
    },[formInitialValues,pipelineId])

    return (
        <TestContext.Provider value={{pipelineId,pipelineName,configDataStore}}>
            <div className="guiView">
                <Form
                    id="form"
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    initialValues={{deployType:1}}
                >
                    <div className="guiView-content">
                        <Code
                            del={del}
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
                                        del={del}
                                        data={data}
                                        setData={setData}
                                        setDeployType={setDeployType}
                                        setBuildType={setBuildType}
                                        setTaskFormDrawer={setTaskFormDrawer}
                                        setNewStage={setNewStage}
                                    />
                                </div>
                            </div>
                        </div>

                        <FormDetailsDrawer
                            del={del}
                            taskFormDrawer={taskFormDrawer}
                            setTaskFormDrawer={setTaskFormDrawer}
                            newStage={newStage}
                            configDataStore={configDataStore}
                        />
                    </div>
                </Form>
            </div>
       </TestContext.Provider>
    )
}

export default observer(Gui)