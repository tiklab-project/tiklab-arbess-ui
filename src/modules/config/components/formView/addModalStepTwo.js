import React from "react";
import ConfigName from "../../../../common/configName/configName";
import {Form} from "antd";
import Forms from "../formType/forms";

const AddModalStepTwo = props =>{

    const {initType,form} = props

    return(
        <div className="codeOrNewStage-form">
            <div className="codeOrNewStage-form-type">类型</div>
            <div className="codeOrNewStage-form-item ">
                <span className="codeOrNewStage-form-item-title">
                    <ConfigName type={initType}/>
                </span>
            </div>
            <Form
                form={form}
                layout={"vertical"}
                initialValues={{deployType:1}}
            >
                <Forms type={initType}/>
            </Form>
        </div>
    )
}


export default AddModalStepTwo