import React,{useEffect,useState} from "react";
import {Form} from "antd";
import {inject,observer} from "mobx-react";
import {withRouter} from "react-router";
import NewStage from "./newStage";
import  "./formView.scss";
import Anch from "./anch";

const formView = props =>{

    const {del,configDataStore,pipelineId,configStore} = props

    const {data,setData,formInitialValues,setFormInitialValues,opt,setOpt,setAddConfigVisible} = configDataStore
    const {configValid,enabledValid,updateConfigure,validType} = configStore

    const [form] = Form.useForm()

    useEffect(()=>{
        form && form.setFieldsValue({...formInitialValues})
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
            <Anch
                data={data}
                opt={opt}
                setOpt={setOpt}
                setAddConfigVisible={setAddConfigVisible}
            />
            <div className="formView-content">
                <Form
                    id="form"
                    form={form}
                    autoComplete="off"
                    scrollToFirstError={true}
                    onValuesChange={onValuesChange}
                    initialValues={{authType:1}}
                >
                    <NewStage
                        del={del}
                        data={data}
                        setData={setData}
                        pipelineId={pipelineId}
                        updateConfigure={updateConfigure}
                        validType={validType}
                    />
                </Form>
            </div>
        </div>
    )
}

export default withRouter(inject("configDataStore","configStore")(observer(formView)))