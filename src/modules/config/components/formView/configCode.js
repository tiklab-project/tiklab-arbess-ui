import React from "react";
import {Popconfirm} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import ConfigSwitch from "./configSwitch";
import Forms from "../configForm/forms"
import ConfigCodeAddModal from "./configCodeAddModal";

const ConfigCode = props =>{

    const {setIsPrompt,codeVisible,setCodeVisible,codeType,setCodeType,del} = props

    const delCode = () =>{
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
                        <Popconfirm
                            title="当前项的所有数据会被清空"
                            onConfirm={()=>delCode()}
                            okText="确定"
                            cancelText="取消"
                        >
                            <CloseOutlined />
                        </Popconfirm>
                        </span>
                    </div>
                </div>
                <ConfigSwitch type={codeType}/>
                <div className="formView-wrapper-forms">
                    <Forms type={codeType}/>
                </div>
            </div>
    }

    return <>
        { code(codeType) }

        <ConfigCodeAddModal
            codeVisible={codeVisible}
            setCodeVisible={setCodeVisible}
            setIsPrompt={setIsPrompt}
            setCodeType={setCodeType}
        />
    </>
}

export default ConfigCode
