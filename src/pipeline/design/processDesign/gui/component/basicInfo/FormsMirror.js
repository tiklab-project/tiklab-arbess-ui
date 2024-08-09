import React, {useState, useRef} from "react";
import {inject,observer} from "mobx-react";
import {Tooltip,Form} from "antd";
import {ExpandOutlined} from "@ant-design/icons";
import Modals from "../../../../../../common/component/modal/Modal";
import Btn from "../../../../../../common/component/btn/Btn";
import {TaskMirror} from "../../../../../../common/component/editor/CodeMirror";
import {WhetherChange} from "../Common";
import "./FormsMirror.scss";

/**
 * 任务基本消息，执行命令…… -- 代码块
 */
const FormsMirror = props =>{

    const {isRequire,name,label,placeholder,taskStore} = props

    const {updateTask,dataItem} = taskStore

    const narrowMirrorRef = useRef();
    const expandMirrorRef = useRef();

    // 边框
    const [bordered,setBordered] = useState(false)

    // 代码块弹出框显示
    const [visible,setVisible] = useState(false)

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
        setBordered(false)
        setVisible(true)
    }

    /**
     * 取消编辑
     */
    const onCancel = type =>{
        setNarrowMirrorValue()
        closeMirror(type)
    }

    const setNarrowMirrorValue = () =>{
        if(dataItem.task){
            narrowMirrorRef.current.editor.setValue(dataItem.task[name] || "")
        }
    }

    /**
     * 确定更改
     */
    const onOk = (type,ref) =>{
        const value = ref.current.editor.getValue()
        if(WhetherChange(value,dataItem.task?.[name])){
            updateTask({[name]:value})
        }
        closeMirror(type)
    }

    /**
     * 取消或确定修改事件
     */
    const closeMirror = type => {
        if(type==='expand'){
            setVisible(false)
        } else {
            setBordered(false)
        }
    }

    return  (
        <Form.Item label={label} name={name}>
            <Form.Item noStyle>
                <div className={`gui-mirror `} id={name+"_mirror"}>
                    <TaskMirror
                        bordered={bordered}
                        placeholder={placeholder}
                        mirrorValue={dataItem?.task?.[name] || ""}
                        mirrorRef={narrowMirrorRef}
                        onFocus={e=>onFocus(e)}
                        className={bordered ? "gui-mirror-has-focus":"gui-mirror-has"}
                        language={name==='k8sJson'? 'yaml':'shell'}
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
                {
                    bordered &&
                    <div style={{paddingTop:8}}>
                        <Btn title={"取消"} isMar={true} onClick={()=>onCancel('narrow')}/>
                        <Btn title={"保存"} type={"primary"} onClick={()=>onOk('narrow',narrowMirrorRef)}/>
                    </div>
                }
                <Modals
                    visible={visible}
                    onCancel={()=>onCancel('expand')}
                    onOk={()=>onOk('expand',expandMirrorRef)}
                    width={800}
                    title={'编辑多行文本'}
                >
                    <div className="mirror-expand">
                        <TaskMirror
                            type={true}
                            mirrorRef={expandMirrorRef}
                            mirrorValue={narrowMirrorRef?.current?.editor.getValue()}
                            language={name==='k8sJson'?'yaml':'shell'}
                        />
                    </div>
                </Modals>
            </Form.Item>
        </Form.Item>
    )
}

export default inject("taskStore")(observer(FormsMirror))
