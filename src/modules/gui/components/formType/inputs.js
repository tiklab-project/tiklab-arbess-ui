import React,{useContext} from "react";
import {Form,Input} from "antd";
import {observer} from "mobx-react";
import TestContext from "../common/testContext";

const Inputs = props =>{

    const {placeholder,mode,label,name,addonbefore} = props

    const context = useContext(TestContext)

    const {setFormInitialValues} = context.configDataStore
    const valueChange = context.valueChange

    const onchange = e  => {
        switch (name){
            case "codeName":
                setFormInitialValues({codeName:e.target.value})
                break
            case "codeBranch":
                setFormInitialValues({codeBranch:e.target.value})
        }
    }


    return (
        <Form.Item
            {...props}
            name={name}
            label={label}
        >
            <Input
                placeholder={placeholder}
                onChange={name==="codeName" || name==="codeBranch" ? onchange:null}
                onBlur={(e)=>valueChange(e.target.value,name,mode)}
                addonBefore={addonbefore?addonbefore:null}
            />
        </Form.Item>
    )

}

export default observer(Inputs)