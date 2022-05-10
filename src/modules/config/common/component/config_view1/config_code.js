import React from "react";
import Config_code_git from "../config_form/config_code_git";
import Config_code_gitee from "../config_form/config_code_gitee";
import Config_code_gitlab from "../config_form/config_code_gitlab";
import {CloseOutlined} from "@ant-design/icons";

const Config_code = props =>{

    const {setCodeVisible,codeData,setCodeData,setIsPrompt,form,setCodeName,setCodeBranch} = props

    const addCode = () =>{
        setCodeVisible(true)
    }

    const deletePart = () =>{
        form.setFieldsValue({
            gitCodeName:null,
            gitBranch:null,
            gitProofName:null,
            giteeCodeName:null,
            giteeBranch:null,
            gitlabCodeName:null,
            gitlabBranch:null,
            gitlabProofName:null,
        })
        setCodeData('')
        setCodeName('')
        setCodeBranch('')
        setIsPrompt(true)
    }
    
    const inputCode = () =>{
        if(codeData){
            switch (codeData.desc){
                case '通用Git' :
                    return  <Config_code_git
                                setCodeName={setCodeName}
                                setCodeBranch={setCodeBranch}
                            />
                case 'Gitee' :
                    return <Config_code_gitee
                                form={form}
                                setCodeName={setCodeName}
                                setCodeBranch={setCodeBranch}
                            />
                case 'GitLab' :
                    return  <Config_code_gitlab/>
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
