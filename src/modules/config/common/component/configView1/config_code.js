import React from "react";
import ConfigCodeGitee from "../configForm/configCodeGitee";
import formResetFields from "../configForm/formResetFields";
import formAll from "../configForm/formAll";
import {CloseOutlined} from "@ant-design/icons";

const Config_code = props =>{

    const {setCodeVisible,codeData,setCodeData,setIsPrompt,form,setCodeName,setCodeBranch} = props

    const addCode = () =>{
        setCodeVisible(true)
    }

    const deletePart = () =>{
        form.setFieldsValue({...formResetFields.git})
        setCodeData('')
        setCodeName('')
        setCodeBranch('')
        setIsPrompt(true)
    }
    
    const inputCode = () =>{
        if(codeData){
            switch (codeData.desc){
                case '通用Git' :
                    return  formAll.git
                case 'Gitee' :
                    return  <ConfigCodeGitee
                                form={form}
                            />
                case 'GitLab' :
                    return  formAll.gitlab
            }
        }
        return codeData
    }

    const code = () => {
        return  codeData === '' ?
                    <div
                        className='config-details-handle'
                        onClick={()=>addCode()}
                    >
                        添加代码源
                    </div> :
                    <div className='config-details-wrapper' >
                        <div className='config-details-newStage'>
                            <div className='desc'>
                                <div className='desc-head'>{codeData.desc}</div>
                                <div
                                    id='del'
                                    className='desc-delete'
                                    onClick={()=>deletePart()}
                                >
                                    <CloseOutlined />
                                </div>
                            </div>
                            <div className='desc-input'>
                                {inputCode()}
                            </div>
                        </div>
                    </div>
    }

    return(
        <div className='config-details-req'>
            <div className='config-details-Headline'>源码管理</div>
            { code () }
        </div>
    )
}

export default Config_code
