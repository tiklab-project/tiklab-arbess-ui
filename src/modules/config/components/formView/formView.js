import React,{useEffect} from "react";
import {Form} from "antd";
import NewStage from "./newStage";
import {observer} from "mobx-react";
import  "./formView.scss";
import Anch from "./anch";

const formView = props =>{

    const {configDataStore,configStore,pipeline} = props

    const {formInitialValues,setAddConfigVisible} = configDataStore
    const {data,opt,setOpt,configValid,enabledValid,updateConfigure,validType} = configStore

    const [form] = Form.useForm()

    useEffect(()=>{
        form && form.setFieldsValue({...formInitialValues})
    },[pipeline,formInitialValues])

    let timout
    useEffect(()=>{
        // 必填配置是否完善
        setTimeout(()=>
            pipeline && configValid(pipeline.pipelineId).then(res=>{
                res.code===0 &&
                form.validateFields( res.data && Object.keys(res.data))
        }),20)
        return ()=>clearTimeout(timout)
    },[pipeline,enabledValid])

    return(
        <div className="formView">
            <div className="formView-content">
                <Anch
                    data={data}
                    opt={opt}
                    setOpt={setOpt}
                    setAddConfigVisible={setAddConfigVisible}
                />
                <div className="formView-center">
                    <Form
                        id="form"
                        form={form}
                        autoComplete="off"
                        initialValues={{authType:1}}
                    >
                        <NewStage
                            data={data}
                            pipelineId={pipeline.pipelineId}
                            updateConfigure={updateConfigure}
                            validType={validType}
                        />
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default observer(formView)