import React from "react";
import {Button,Popconfirm} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import ConfigSwitch from "./configSwitch";
import Forms from "./configForm/forms";

const ConfigCode = props =>{

    const {setCodeVisible,codeType,setCodeType} = props

    const code = () => {
        return  codeType ==="" ?
            <div className="formView-wrapper-handle" onClick={()=>setCodeVisible(true)}>
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
                                title="当前项数据会被清空"
                                onConfirm={()=>setCodeType("")}
                                okText="确定"
                                cancelText="取消"
                            >
                                <Button type="text"><CloseOutlined/></Button>
                            </Popconfirm>
                        </span>
                    </div>
                </div>
                <div className="desc-name">
                    <ConfigSwitch type={codeType}/>
                </div>
                <div className="formView-wrapper-newStage">
                    <Forms type={codeType}/>
                </div>
            </div>
    }

    return code()
}

export default ConfigCode
