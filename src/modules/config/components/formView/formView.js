import React,{useEffect} from "react";
import  "./formView.scss";
import {Form} from "antd";
import NewStage from "./newStage";
import Code from "./code";
import {inject,observer} from "mobx-react";
import {withRouter} from "react-router";

const formView = props =>{

    const {del,configDataStore,pipelineId,configStore} = props

    const [form] = Form.useForm()

    const {data,setData,codeType,formInitialValues,setFormInitialValues} = configDataStore

    const {updateConfigure,isAddType} = configStore

    useEffect(()=>{
        form.setFieldsValue({...formInitialValues})
    },[formInitialValues,pipelineId])

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
                    validateTrigger={["onBlur"]}
                    initialValues={{deployType:1}}
                >
                    <Code
                        {...props}
                        del={del}
                        data={data}
                        setData={setData}
                        isAddType={isAddType}
                        codeType={codeType}
                        pipelineId={pipelineId}
                        updateConfigure={updateConfigure}
                    />
                    <NewStage
                        {...props}
                        del={del}
                        data={data}
                        setData={setData}
                        pipelineId={pipelineId}
                        updateConfigure={updateConfigure}
                    />
                </Form>
            </div>
        </div>
    )
}

export default withRouter(inject("configDataStore","configStore")(observer(formView)))