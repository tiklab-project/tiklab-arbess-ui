import React,{useState,useEffect} from "react";
import {observer} from "mobx-react";
import {Form} from "antd";
import NewStage from "./newStage";
import FormDetailsDrawer from "./formDetailsDrawer";
import "./gui.scss";

const Gui = props =>{

    const {pipelineStore,configStore} = props

    const {formInitialValues,configValid,deleteConfig,enabledValid,validType,data,taskFormDrawer,setTaskFormDrawer,
        dataItem,setDataItem
    } = configStore
    const {pipeline,pipelineId} = pipelineStore
    
    const [form] = Form.useForm()

    useEffect(()=>{
        form.setFieldsValue({...formInitialValues})
    },[formInitialValues,pipeline])

    useEffect(()=>{
        // 效验表单
        pipeline && configValid(pipelineId).then(res=>{
            res.code===0 &&
            form.validateFields( res.data && res.data)
        })
    },[pipeline,enabledValid,taskFormDrawer])

    return (
        <div className="guiView">
            <Form
                id="form"
                form={form}
                layout="vertical"
                autoComplete="off"
            >
                <div className="guiView-content">
                    <div className="guiView-main_group">
                        <NewStage
                            data={data}
                            validType={validType}
                            pipeline={pipeline}
                            setTaskFormDrawer={setTaskFormDrawer}
                            formInitialValues={formInitialValues}
                            setDataItem={setDataItem}
                        />
                    </div>

                    <FormDetailsDrawer
                        dataItem={dataItem}
                        deleteConfig={deleteConfig}
                        taskFormDrawer={taskFormDrawer}
                        setTaskFormDrawer={setTaskFormDrawer}
                    />

                </div>
            </Form>
        </div>
    )
}

export default observer(Gui)