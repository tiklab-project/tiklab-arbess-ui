import React,{useContext} from "react";
import CodeAddDrawerRightGit from "./codeAddDrawerRightGit";
import CodeAddDrawerRightSvn from "./codeAddDrawerRightSvn";
import TestContext from "./testContext";
import ConfigStore from "../../store/configStore";
import {observer} from "mobx-react";
import {Modal} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";

const CodeAddDrawerRight = props =>{
    const {opt,del} = props

    const context = useContext(TestContext)
    const {codeType,setCodeType} = context.configDataStore
    const pipelineId = context.pipelineId
    const {updateConfigure} = ConfigStore

    const handleClick = type =>{
        setCodeType(type)
        if(codeType===""){
            send(type,"create")
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
        send(type,"update")
    }

    const send = (type,message) =>{
        const params = {
            pipelineId,
            taskType:type,
            message:message
        }
        updateConfigure(params)
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