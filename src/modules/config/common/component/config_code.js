import React, {useEffect} from "react";
import Config_code_git from "./config_code_git";
import Config_code_gitee from "./config_code_gitee";
import {CloseOutlined} from "@ant-design/icons";

const Config_code = props =>{

    const {setCodeVisible,codeData,setCodeData} = props

    const addCode = () =>{
        setCodeVisible(true)
    }

    const deletePart = () =>{
        setCodeData('')
    }
    const inputCode = () =>{
        if(codeData){
            switch (codeData.desc){
                case '通用Git' :
                    return  <Config_code_git/>
                case 'Gitee' :
                    return <Config_code_gitee/>
            }
        }
        return codeData
    }

    const code = () => {
        return  codeData === '' ? null :
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
                        <div className='desc-input'
                        >
                            {inputCode()}
                        </div>
                    </div>
                </div>
    }

    return(
        <div className='config-details-req'>
            <div className='config-details-Headline'>源码管理</div>
            { code () }
            <div
                className='config-details-handle'
                onClick={addCode}
            >
                添加代码源
            </div>
        </div>
    )
}
export default Config_code