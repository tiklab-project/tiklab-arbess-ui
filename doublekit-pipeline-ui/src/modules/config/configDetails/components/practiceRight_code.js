import React from "react";
import PracticeRight_code_git from "./practiceRight_code_git";
import PracticeRight_code_gitee from "./practiceRight_code_gitee";
import {CloseOutlined} from "@ant-design/icons";

const PracticeRight_code = props =>{

    const {setCodeVisible,codeData} = props

    const addCode = () =>{
        setCodeVisible(true)
    }

    const deletePart = () =>{

    }

    const inputCode = () =>{
        if(codeData){
            switch (codeData){
                case '通用Git' :
                    return  <PracticeRight_code_git/>
                case 'Gitee' :
                    return <PracticeRight_code_gitee/>
            }
        }
        return codeData
    }

    const code = () => {
            return  codeData === '' ? null :
                    <div className='config-details-wrapper' >
                        <div className='config-details-newStage'>
                            <div className='desc'>
                                <div className='desc-head'>{codeData}</div>
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
export default PracticeRight_code