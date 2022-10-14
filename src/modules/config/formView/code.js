import React,{useState} from "react";
import {Modal} from "antd";
import {CloseOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import Switch from "./switch";
import Forms from "./forms"
import CodeAddModal from "./codeAddModal";

const Code = props =>{

    const {codeType,setCodeType,del,pipelineId,updateConfigure} = props

    const [codeVisible, setCodeVisible] = useState(false)

    // 切换类型
    const changeType = codeType =>{
        Modal.confirm({
            title: "删除",
            icon: <ExclamationCircleOutlined />,
            content: "删除后数据无法恢复",
            onOk:()=>delCode(codeType),
            okText: "确认",
            cancelText: "取消",
        });
    }

    const delCode = codeType =>{
        const params = {
            pipelineId,
            type:codeType,
            message:"delete"
        }
        updateConfigure(params)
        del(codeType)
        setCodeType("")
    }

    const code = codeType => {
        return  codeType ==="" ?
            <div className="formView-wrapper-handle code-handle" onClick={()=>setCodeVisible(true)}>
                添加代码源
            </div>
            :
            <div className="formView-wrapper">
                <div className="formView-wrapper-Headline">
                    <div className="desc">
                        <span className="desc-icon">
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-suyuanmabiaoqian" />
                            </svg>
                        </span>
                        <span className="desc-title">
                            源码管理
                        </span>
                    </div>
                    <div className="formView-del">
                        <span className="desc-delete">
                            <CloseOutlined onClick={()=>changeType(codeType)}/>
                        </span>
                    </div>
                </div>
                <Switch type={codeType} del={del}/>
                <div className="formView-wrapper-forms">
                    <Forms type={codeType}/>
                </div>
            </div>
    }

    return <>
        { code(codeType) }

        <CodeAddModal
            codeVisible={codeVisible}
            setCodeVisible={setCodeVisible}
            setCodeType={setCodeType}
            pipelineId={pipelineId}
            updateConfigure={updateConfigure}
        />
    </>
}

export default Code
