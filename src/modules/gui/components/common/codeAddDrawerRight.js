import React,{useContext} from "react";
import CodeAddDrawerRightGit from "./codeAddDrawerRightGit";
import CodeAddDrawerRightSvn from "./codeAddDrawerRightSvn";
import TestContext from "./testContext";
import {observer} from "mobx-react";
import {Modal} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";

const CodeAddDrawerRight = props =>{
    const {opt} = props

    const context = useContext(TestContext)

    const {codeType,setCodeType} = context.configDataStore
    const changType = context.changType
    const addConfig = context.addConfig
    const del = context.del

    const handleClick = type =>{
        if(codeType===""){
            setCodeType(type)
            addConfig(type)
        }else {
            Modal.confirm({
                title: "切换",
                icon: <ExclamationCircleOutlined />,
                content: "切换后数据无法恢复",
                onOk:()=>chang(type),
                okText: "确认",
                cancelText: "取消",
            })
        }
    }

    const chang = type =>{
        del(type)
        changType(type)
    }

    return(
        <div className="body-menu_right">
            {
                opt  === 1 ?
                    <CodeAddDrawerRightGit
                        codeType={codeType}
                        handleClick={handleClick}
                    />
                    :
                    <CodeAddDrawerRightSvn
                        codeType={codeType}
                        handleClick={handleClick}
                    />
            }
        </div>
    )
}

export default observer(CodeAddDrawerRight)