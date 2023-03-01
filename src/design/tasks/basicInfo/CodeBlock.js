import React, {useRef,useState,forwardRef} from "react";
import {inject,observer} from "mobx-react";
import {Tooltip} from "antd";
import {ExpandOutlined} from "@ant-design/icons";
import CodeBlockModal from "./CodeBlockModal";
import Btn from "../../../common/btn/Btn";
import {TaskMirror} from "../../../common/editor/CodeMirror";
import {WhetherChange} from "../tasks/components/Common"
import "./CodeBlock.scss";

/**
 * 任务基本消息，执行命令…… -- 代码块
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{}> & React.RefAttributes<unknown>>}
 */
const MirrorContent = forwardRef((props,ref)=>{

    const {name,pipelineStore,configStore,placeholder,dataItem,mirrorValue} = props

    const {pipeline} = pipelineStore
    const {updateTaskConfig} = configStore

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
        mirrorRefs.current.editor.setValue(dataItem[name]?dataItem[name]:"")
        setBordered(false)
    }

    /**
     * 确定更改
     * @param ref
     */
    const onOk = ref =>{
        const obj = {}
        obj[name] = ref.current.editor.getValue()
        if(WhetherChange(obj[name],mirrorValue)){
            dataItem[name] = ref.current.editor.getValue()
            const params = {
                pipeline:{id:pipeline.id},
                values:obj,
                taskType:dataItem.type,
                taskId:dataItem.taskId,
            }
            updateTaskConfig(params)
        }
        setBordered(false)
    }

    return  <>
            <div className={`gui-mirror`} id={name+"_mirror"}>
                <TaskMirror
                    mirrorRefs={mirrorRefs}
                    mirrorValue={dataItem[name]}
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
                dataItem={dataItem}
                name={name}
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

export default inject("pipelineStore","configStore")(observer(MirrorContent))

