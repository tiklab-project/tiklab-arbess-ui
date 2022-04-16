import React, {useEffect} from "react";
import ConfigDetails_code_git from "./configDetails_code_git";
import ConfigDetails_code_gitee from "./configDetails_code_gitee";
import {CloseOutlined} from "@ant-design/icons";

const ConfigDetails_code = props =>{

    const {setCodeVisible,codeData} = props

    const addCode = () =>{
        setCodeVisible(true)
    }

    const deletePart = () =>{
        console.log(codeData.codeId)
    }

    const inputCode = () =>{
        if(codeData){
            switch (codeData.desc){
                case '通用Git' :
                    return  <ConfigDetails_code_git/>
                case 'Gitee' :
                    return <ConfigDetails_code_gitee/>
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
export default ConfigDetails_code