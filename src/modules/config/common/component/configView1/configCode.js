import React, {Fragment} from "react";
import {CloseOutlined} from "@ant-design/icons";

const ConfigCode = props =>{

    const {setCodeVisible,codeData,setCodeData,setIsPrompt, setCodeName, setCodeBranch,del,
        configName,configForm,
    } = props

    const addCode = () =>{
        setCodeVisible(true)
    }

    const deletePart = () =>{
        del('git')
        setCodeData('')
        setCodeName('')
        setCodeBranch('')
        setIsPrompt(true)
    }
    
    const inputCode = () =>{
        return configForm(codeData.codeType)
    }

    const codeType = () =>{
        return configName(codeData.codeType)
    }

    const code = () => {
        return  codeData ?
            <div className='configView1-wrapper' >
                <div className='configView1-wrapper-newStage'>
                    <div className='desc'>
                        <div className='desc-head'> {codeType()} </div>
                        <div className='desc-delete' onClick={()=>deletePart()}>
                            <CloseOutlined />
                        </div>
                    </div>
                    <div className='desc-input'> {inputCode()} </div>
                </div>
            </div>
            :
            <div className='configView1-wrapper-handle' onClick={()=>addCode()}>
                添加代码源
            </div>
    }

    return(
        <Fragment>
            <div className='configView1-wrapper-Headline'>源码管理</div>
            { code () }
        </Fragment>
    )
}

export default ConfigCode
