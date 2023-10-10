import React, {useRef, useState, forwardRef} from "react";
import {inject,observer} from "mobx-react";
import {Tooltip} from "antd";
import {ExpandOutlined} from "@ant-design/icons";
import Btn from "../../../../../common/component/btn/Btn";
import {TaskMirror} from "../../../../../common/component/editor/CodeMirror";
import {WhetherChange} from "../gui/Common";
import CodeBlockModal from "./CodeBlockModal";
import "./CodeBlock.scss";

/**
 * 任务基本消息，执行命令…… -- 代码块
 */
const MirrorContent = forwardRef((props,ref)=>{

    const {name,placeholder,taskStore} = props

    const {updateTask,dataItem} = taskStore

    const mirrorRefs = useRef(null)

    // 边框
    const [bordered,setBordered] = useState(false)

    // 全屏visible
    const [visible,setVisible] = useState(false)

    // 全屏代码块value
    const [expandValue,setExpandValue] = useState("")

    /**
     * 获取焦点改变placeholder
     * @param e
     */
    const onFocus = e => {
        setBordered(true)
        if(e.state.placeholder){
            e.state.placeholder.innerHTML=placeholder
        }
    }

    /**
     * 代码块全屏
     */
    const expand = () =>{
        const value = mirrorRefs.current.editor.getValue()
        setExpandValue(value ? value:"")
        setBordered(false)
        setVisible(true)
    }

    /**
     * 取消编辑
     */
    const onCancel = () =>{
        if(dataItem.task){
            mirrorRefs.current.editor.setValue(dataItem.task[name]?dataItem.task[name]:"")
        }
        setBordered(false)
    }

    /**
     * 确定更改
     */
    const onOk = ref =>{
        const value = ref.current.editor.getValue()
        setBordered(false)
        if(WhetherChange(value,dataItem.task?.[name])){
            updateTask({[name]:value})
        }
    }

    return  <>
            <div className={`gui-mirror`} id={name+"_mirror"}>
                <TaskMirror
                    mirrorRefs={mirrorRefs}
                    mirrorValue={dataItem.task?.[name]}
                    bordered={bordered}
                    onFocus={onFocus}
                    placeholder={placeholder}
                />
                {
                    bordered &&
                    <div className="gui-mirror-expand">
                        <Tooltip title={"全屏编辑"}>
                            <ExpandOutlined onClick={()=>expand()}/>
                        </Tooltip>
                    </div>
                }
            </div>
            <CodeBlockModal
                visible={visible}
                setVisible={setVisible}
                expandValue={expandValue}
                narrowRef={mirrorRefs}
                initValue={dataItem.task?.[name]}
                onOk={onOk}
            />
            {
                bordered &&
                <div style={{paddingTop:8}}>
                    <Btn title={"取消"} isMar={true} onClick={()=>onCancel()}/>
                    <Btn title={"保存"} type={"primary"} onClick={()=>onOk(mirrorRefs)}/>
                </div>
            }
        </>
    })

export default inject("taskStore")(observer(MirrorContent))
