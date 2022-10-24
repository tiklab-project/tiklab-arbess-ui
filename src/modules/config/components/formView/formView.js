import React,{useEffect} from "react";
import  "./formView.scss";
import {Form} from "antd";
import NewStage from "./newStage";
import Code from "./code";
import {inject,observer} from "mobx-react";
import {withRouter} from "react-router";

const formView = props =>{

    const {del,configDataStore,pipelineId,configStore} = props

    const {data,setData,codeType,formInitialValues,setFormInitialValues} = configDataStore
    const {configValid,enabledValid} = configStore

    const [form] = Form.useForm()

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
                    zz && zz.classList.add("formView-validateFields")
                })
            }
        })
    },[pipelineId,enabledValid])

    const onValuesChange = value =>{
        Object.assign(formInitialValues,value)
        setFormInitialValues({...formInitialValues})
    }

    return(
        <div className="formView">
            <div className="formView-content">
                <Form
                    id="form"
                    form={form}
                    autoComplete="off"
                    scrollToFirstError={true}
                    onValuesChange={onValuesChange}
                    initialValues={{deployType:0}}
                >
                    <Code
                        del={del}
                        data={data}
                        setData={setData}
                        codeType={codeType}
                        pipelineId={pipelineId}
                    />
                    <NewStage
                        del={del}
                        data={data}
                        setData={setData}
                        pipelineId={pipelineId}
                    />
                </Form>
            </div>
        </div>
    )
}

export default withRouter(inject("configDataStore","configStore")(observer(formView)))