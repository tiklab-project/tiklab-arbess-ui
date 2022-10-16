import React from "react";
import {Form,Input} from "antd";
import {inject,observer} from "mobx-react";

const Inputs = props =>{

    const {placeholder,mode,label,name,addonBefore,configStore,pipelineStore,configDataStore} = props

    const {pipelineId} = pipelineStore
    const {updateConfigure} = configStore
    const {setFormInitialValues} = configDataStore

    const onchange = e  => {
        switch (name){
            case "codeName":
                setFormInitialValues({codeName:e.target.value})
                break
            case "codeBranch":
                setFormInitialValues({codeBranch:e.target.value})
        }
    }

    const valueChange = (e) => {
        const obj = {}
        obj[name] = e.target.value
        const params = {
            pipelineId,
            taskType:mode,
            pipelineTest:obj,
            pipelineCode:obj,
            pipelineBuild:obj,
            pipelineDeploy:obj,
            message:"update"
        }
        updateConfigure(params)
    }

    return (
        <Form.Item
            name={name}
            label={label}
        >
            <Input
                bordered={false}
                placeholder={placeholder}
                onChange={name==="codeName" || name==="codeBranch" ? onchange:null}
                onBlur={(e)=>valueChange(e)}
                addonBefore={addonBefore?addonBefore:null}
            />
        </Form.Item>
    )

}

export default inject("configStore","pipelineStore","configDataStore")(observer(Inputs))