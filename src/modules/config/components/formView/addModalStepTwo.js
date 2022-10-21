import React from "react";
import ConfigName from "../../../../common/configName/configName";
import {Form} from "antd";
import Forms from "../formType/forms";

const AddModalStepTwo = props =>{

    const {initType,form} = props

    const icon = type => {
        switch (type) {
            case 1:return "git"
            case 2:return "gitee"
            case 3:return "github"
            case 4:return "gitlab"
            case 5:return "-_ssh"
            case 11:return "ceshi"
            case 21:return "quanxian"
            case 22:return "nodejs"
            case 31:return "xuniji"
            case 32:return "docker"
        }
    }


    return(
        <div className="codeOrNewStage-form">
            <div className="codeOrNewStage-form-item ">
                <span className="codeOrNewStage-form-item-icon">
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref={`#icon-${icon(initType)}`} />
                    </svg>
                </span>
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