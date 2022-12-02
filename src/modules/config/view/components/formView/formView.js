import React,{useEffect} from "react";
import {Form} from "antd";
import NewStage from "./newStage";
import {observer} from "mobx-react";
import  "./formView.scss";
import Anch from "./anch";

const formView = props =>{

    const {configStore,pipeline} = props

    const {formInitialValues,setAddConfigVisible,data,opt,setOpt,configValid,enabledValid,validType,deleteConfig,updateOrderConfig} = configStore

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
                form.validateFields( res.data && res.data)
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
                            deleteConfig={deleteConfig}
                            validType={validType}
                            updateOrderConfig={updateOrderConfig}
                        />
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default observer(formView)