import React from "react";
import ConfigName from "../configCommon/configName";

const ConfigCode = props =>{

    const {setCodeDrawer ,codeData,setNewStage,setTaskFormDrawer} = props

    const showDetailsDrawer = () => {
        if(codeData){
            setNewStage(codeData.codeType)
            setTaskFormDrawer(true)
        }
    }

    const code = () => {
        return  codeData ?
            <div className="guiView-sider_code_one">
                <div className="guiView-sider_code_one_name" onClick={()=>showDetailsDrawer()}>
                    <ConfigName type={codeData.codeType}/>
                </div>
                {
                    codeData.codeName ?
                        <div className="guiView-sider_code_one_address">
                            <div className="branch-title"> {codeData.codeName} </div>
                        </div>
                        : null
                }
                {
                    codeData.codeBranch ?
                        <div className="guiView-sider_code_one_branch ">
                            <div className="branch-address"> {codeData.codeBranch} </div>
                        </div>
                        : null
                }
            </div>
            :
            <div className="guiView-sider_code_add" onClick={()=>setCodeDrawer(true)}>
                添加代码源
            </div>
    }

    return(
        <div className="guiView-sider">
            <div className="guiView-sider_head"> 源码管理 </div>
            <div className="guiView-sider_code"> { code() } </div>
        </div>
    )
}

export default ConfigCode