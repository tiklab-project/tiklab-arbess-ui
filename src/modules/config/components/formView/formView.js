import React,{useEffect} from "react";
import  "./formView.scss";
import {Form} from "antd";
import NewStage from "./newStage";
import Code from "./code";
import {inject,observer} from "mobx-react";
import {withRouter} from "react-router";

const formView = props =>{

    const {form,del,configDataStore,pipelineId,configStore} = props

    const {data,setData,formInitialValues,setCodeType,codeType,
        setBuildType,setDeployType,} = configDataStore

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
                        codeType={codeType}
                        setCodeType={setCodeType}
                        del={del}
                        pipelineId={pipelineId}
                        updateConfigure={updateConfigure}
                    />
                    <NewStage
                        del={del}
                        data={data}
                        setData={setData}
                        setBuildType={setBuildType}
                        setDeployType={setDeployType}
                        updateConfigure={updateConfigure}
                        pipelineId={pipelineId}
                    />
                </Form>
            </div>
        </div>
    )
}

export default withRouter(inject("configDataStore","configStore")(observer(formView)))