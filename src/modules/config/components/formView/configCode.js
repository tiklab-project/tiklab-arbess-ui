import React from "react";
import {Popconfirm} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import ConfigSwitch from "./configSwitch";
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
                        <span className="desc-title">
                            源码管理
                        </span>
                        <span className="desc-delete">
                            <Popconfirm
                                title="当前项的所有数据会被清空"
                                onConfirm={()=>delCode()}
                                okText="确定"
                                cancelText="取消"
                            >
                                <DeleteOutlined />
                            </Popconfirm>
                        </span>
                    </div>
                </div>
                <div className="desc-name">
                    <ConfigSwitch type={codeType}/>
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
