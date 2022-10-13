import React from "react";
import ConfigName from "../form/configName";

const ConfigCode = props =>{

    const {setCodeDrawer,codeType,setNewStage,setTaskFormDrawer,formInitialValues} = props

    const showDetailsDrawer = () => {
        if(codeType){
            setNewStage(codeType)
            setTaskFormDrawer(true)
        }
    }

    const code = () => {
        return  codeType==="" ?
            <div className="guiView-sider_code_add" onClick={()=>setCodeDrawer(true)}>
                添加代码源
            </div>
            :
            <div className="guiView-sider_code_one">
                <div className="guiView-sider_code_one_name" onClick={()=>showDetailsDrawer()}>

                    <ConfigName type={codeType}/>
                </div>
                {
                    formInitialValues && formInitialValues[codeType+"codeName"] ?
                        <div className="guiView-sider_code_one_address">
                            <div className="branch-title"> {formInitialValues[codeType+"codeName"]} </div>
                        </div>
                        : null
                }
                {
                    formInitialValues && formInitialValues[codeType+"codeBranch"] ?
                        <div className="guiView-sider_code_one_branch ">
                            <div className="branch-address">{formInitialValues[codeType+"codeBranch"]}</div>
                        </div>
                        : null
                }
            </div>
    }

    return(
        <div className="guiView-sider">
            <div className="guiView-sider_head">
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-suyuanmabiaoqian" />
                </svg>
                <span style={{paddingLeft:10}}>源码管理</span>
            </div>
            <div className="guiView-sider_code"> { code() } </div>
        </div>
    )
}

export default ConfigCode