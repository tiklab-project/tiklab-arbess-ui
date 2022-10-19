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

    const {data,setData,formInitialValues,codeType} = configDataStore

    const {updateConfigure} = configStore

    useEffect(()=>{
        form.setFieldsValue({...formInitialValues})
    },[formInitialValues,pipelineId])


    return(
        <div className="formView">
            <div className="formView-content">
                <Form
                    id="form"
                    form={form}
                    autoComplete="off"
                    scrollToFirstError={true}
                    validateTrigger={["onBlur"]}
                    initialValues={{deployType:1}}
                >
                    <Code
                        {...props}
                        del={del}
                        data={data}
                        setData={setData}
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