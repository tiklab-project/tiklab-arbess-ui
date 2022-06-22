import React,{useState} from "react";
import ConfigAddCodeRightGitDrawer from "./configAddCodeRightGitDrawer";
import ConfigAddCodeRightSvnDrawer from "./configAddCodeRightSvnDrawer";
import {Button} from "antd";

const ConfigAddCodeRightDrawer = props =>{

    const {opt,setIsPrompt, codeOpt,setCodeOpt,setCodeData,setCodeDrawer,codeType,setCodeType,
        formInitialValues
    } = props

    const [codeId,setCodeId] = useState('')

    const handleClick = (item,index) =>{
        setCodeId(index)
        setCodeOpt(index)
        setCodeType(item)
    }

    let newCode = { }
    const codeBtn = () =>{
        newCode = {
            codeId: codeId,
            codeType:codeType,
            codeName: formInitialValues && formInitialValues.codeName,
            codeBranch: formInitialValues && formInitialValues.codeBranch,
        }
        setCodeData(newCode)
        setCodeDrawer(false)
        setIsPrompt(true)
    }

    return(
        <div className='body-menu_right'>
            {
                opt  === 1 ?
                    <ConfigAddCodeRightGitDrawer
                        codeOpt={codeOpt}
                        handleClick={handleClick}
                    />
                    :
                    <ConfigAddCodeRightSvnDrawer
                        handleClick={handleClick}
                    />

            }
            <div>
                <Button onClick={()=>codeBtn()}>
                    保存
                </Button>
            </div>
        </div>
    )
}

export default ConfigAddCodeRightDrawer