import React from "react";
import {Popconfirm} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import ConfigSwitch from "./configSwitch";
import Forms from "../configForm/forms"
import ConfigCodeAddModal from "./configCodeAddModal";

const ConfigCode = props =>{

    const {setIsPrompt,codeVisible,setCodeVisible,codeType,setCodeType,del} = props

    const delCode = () =>{
        del(codeType)
        setCodeType("")
    }

    const changeGit = item =>{
        setCodeType(item.id)
    }

    const renderGitList = gitList =>{
        return gitList.map(item=>{
            return(
                <div className={`configCode-gitList-item ${codeType==item.id?"configCode-gitList-selected":""}`}
                     onClick={()=>changeGit(item)}
                     key={item.id}
                >
                    <span className="configCode-gitList-item-icon">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref={`#icon-${item.icon}`} />
                        </svg>
                    </span>
                    <span className="configCode-gitList-item-title">
                        {item.title}
                    </span>
                </div>
            )
        })
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
                        <span className="desc-title">
                            源码管理
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
