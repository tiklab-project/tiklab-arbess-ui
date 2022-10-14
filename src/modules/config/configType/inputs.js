import React from "react";
import {Form,Input} from "antd";
import {inject,observer} from "mobx-react";

const Inputs = props =>{

    const {placeholder,mode,label,configStore,pipelineStore,name,addonBefore} = props

    const {pipelineId} = pipelineStore
    const {updateConfigure} = configStore

    const valueChange = (e) => {
        const obj = {}
        obj[name] = e.target.value
        const params = {
            pipelineId,
            type:mode,
            pipelineTest:obj,
            pipelineCode:obj,
            pipelineBuild:obj,
            pipelineDeploy:obj,
            messgae:"update"
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
                onBlur={(e)=>valueChange(e)}
                addonBefore={addonBefore?addonBefore:null}
            />
        </Form.Item>
    )

}

export default inject("configStore","pipelineStore")(observer(Inputs))