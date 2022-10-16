import React,{useContext} from "react";
import {Form, Input, message} from "antd";
import {observer} from "mobx-react";
import TestContext from "../common/testContext";
import ConfigStore from "../../store/configStore";

const Inputs = props =>{

    const {placeholder,mode,label,name,addonBefore} = props

    const context = useContext(TestContext)

    const pipelineId = context.pipelineId
    const {setFormInitialValues} = context.configDataStore
    const {updateConfigure} = ConfigStore

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
        updateConfigure(params).then(res=>{
            if(res.code===50001){
                message.info("请选择类型")
            }
        })
    }

    return (
        <Form.Item
            name={name}
            label={label}
        >
            <Input
                placeholder={placeholder}
                onChange={name==="codeName" || name==="codeBranch" ? onchange:null}
                onBlur={(e)=>valueChange(e)}
                addonBefore={addonBefore?addonBefore:null}
            />
        </Form.Item>
    )

}

export default observer(Inputs)