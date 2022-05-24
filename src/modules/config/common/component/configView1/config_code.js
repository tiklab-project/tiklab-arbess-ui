import React, {Fragment} from "react";
import formAll from "../configForm/formAll";
import {CloseOutlined} from "@ant-design/icons";

const Config_code = props =>{

    const {setCodeVisible,codeData,setCodeData,setIsPrompt, setCodeName,
        setCodeBranch,formInitialValues,setFormInitialValues,git
    } = props

    const addCode = () =>{
        setCodeVisible(true)
    }

    const deletePart = () =>{
        git()
        setFormInitialValues({...formInitialValues})
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
                    return  formAll.gitee
                case 'Gitlab' :
                    return  formAll.gitlab
                case 'Github' :
                    return formAll.github
            }
        }
        return codeData
    }

    const code = () => {
        return  codeData === '' ?
                    <div
                        className='configView1-wrapper-handle'
                        onClick={()=>addCode()}
                    >
                        添加代码源
                    </div> :
                    <div className='configView1-wrapper' >
                        <div className='configView1-wrapper-newStage'>
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
        <Fragment>
            <div className='configView1-wrapper-Headline'>源码管理</div>
            { code () }
        </Fragment>
    )
}

export default Config_code
