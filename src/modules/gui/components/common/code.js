import React,{useState} from "react";
import NameType from "./nameType";
import CodeAddDrawer from "./codeAddDrawer";

const Code = props =>{

    const {formInitialValues,setNewStage,codeType,setTaskFormDrawer} = props

    const [codeDrawer,setCodeDrawer] = useState(false) // 新建源码抽屉

    const showDetailsDrawer = () => {
        if(codeType){
            setNewStage(codeType)
            setTaskFormDrawer(true)
        }
    }
    
    const addCode = () => {
        setCodeDrawer(true)
    }

    const code = () => {

        return  codeType === "" ?
            <div className="guiView-sider_code_add" onClick={()=>addCode()}>
                添加代码源
            </div>
            :
            <div className="guiView-sider_code_one">
                <div className="guiView-sider_code_one_name" onClick={()=>showDetailsDrawer()}>
                    <NameType type={codeType}/>
                </div>
                {
                    formInitialValues && formInitialValues.codeName ?
                        <div className="guiView-sider_code_one_address">
                            <div className="branch-title"> {formInitialValues.codeName} </div>
                        </div>
                        : null
                }
                {
                    formInitialValues && formInitialValues.codeBranch ?
                        <div className="guiView-sider_code_one_branch ">
                            <div className="branch-address">{formInitialValues.codeBranch}</div>
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
            <CodeAddDrawer
                {...props}
                codeDrawer={codeDrawer}
                setCodeDrawer={setCodeDrawer}
                setTaskFormDrawer={setTaskFormDrawer}
            />
            <div className="guiView-sider_code"> { code() } </div>
        </div>
    )
}

export default Code