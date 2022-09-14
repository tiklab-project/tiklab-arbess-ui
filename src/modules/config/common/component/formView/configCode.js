import React from "react";
import {Button,Popconfirm} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import ConfigName from "../../../../../common/configName/configName";
import ConfigForm from "../configCommon/configForm";

const ConfigCode = props =>{

    const {setCodeVisible,codeData,del} = props

    const code = () => {
        return  codeData ?
            <div className="formView-wrapper">
                <div className="formView-wrapper-Headline">
                    <div className="desc">源码管理</div>
                    <div className="desc-delete">
                        <Popconfirm
                            title="当前项数据会被清空"
                            onConfirm={()=>del(1)}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Button type="text"><CloseOutlined/></Button>
                        </Popconfirm>
                    </div>
                </div>
                <div className="desc-name">
                    <ConfigName type={codeData.codeType}/>
                </div>
                <div className="formView-wrapper-newStage">
                    <ConfigForm type={codeData.codeType}/>
                </div>
            </div>
            :
            <div className="formView-wrapper-handle" onClick={()=>setCodeVisible(true)}>
                添加代码源
            </div>
    }

    return code()
}

export default ConfigCode
