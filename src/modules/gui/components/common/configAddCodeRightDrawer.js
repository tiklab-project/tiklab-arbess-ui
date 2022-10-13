import React from "react";
import ConfigAddCodeRightGitDrawer from "./configAddCodeRightGitDrawer";
import ConfigAddCodeRightSvnDrawer from "./configAddCodeRightSvnDrawer";
import {Button} from "antd";

const ConfigAddCodeRightDrawer = props =>{

    const {opt,codeOpt,setCodeOpt,setCodeDrawer,configDataStore,type,setType} = props
    const {setCodeType,setIsPrompt} = configDataStore

    const handleClick = (item,index) =>{
        setCodeOpt(index)
        setType(item)
    }

    const codeBtn = () =>{
        setCodeType(type)
        setCodeDrawer(false)
        setIsPrompt(true)
    }

    return(
        <div className="body-menu_right">
            {
                opt  === 1 ?
                    <ConfigAddCodeRightGitDrawer
                        codeOpt={codeOpt}
                        handleClick={handleClick}
                        configDataStore={configDataStore}
                    />
                    :
                    <ConfigAddCodeRightSvnDrawer
                        handleClick={handleClick}
                        configDataStore={configDataStore}
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