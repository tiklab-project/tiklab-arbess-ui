/**
 * @Description: 任务代码块命令
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/11
 */
import React, {useState, useRef} from "react";
import {inject,observer} from "mobx-react";
import {Tooltip,Form} from "antd";
import {ExpandOutlined} from "@ant-design/icons";
import Modals from "../../../../../../common/component/modal/Modal";
import Btn from "../../../../../../common/component/btn/Btn";
import TaskMirror from "../../../../../../common/component/editor/CodeMirror";
import {WhetherChange} from "../Common";
import "./FormsMirror.scss";

const FormsMirror = props =>{

    const {isRequire,name,label,placeholder,taskStore} = props

    const {updateTask,dataItem,taskPermissions} = taskStore

    const narrowMirrorRef = useRef();
    const expandMirrorRef = useRef();

    const taskUpdate = taskPermissions?.includes('pipeline_task_update');

    //边框
    const [bordered,setBordered] = useState(false)
    //代码块弹出框显示
    const [visible,setVisible] = useState(false)

    /**
     * 获取焦点改变placeholder
     * @param e
     */
    const onFocus = e => {
        if(!taskUpdate){return;}
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

    /**
     * 代码框重新赋值
     */
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

    const mirrorClass = taskUpdate ? bordered ? "gui-mirror-has-focus":"gui-mirror-has" : 'gui-mirror-disable'

    return  (
        <Form.Item label={label} name={name}>
            <Form.Item noStyle>
                <div className={`gui-mirror `} id={name+"_mirror"}>
                    <TaskMirror
                        mirrorValue={dataItem?.task?.[name] || ""}
                        mirrorRef={narrowMirrorRef}
                        onFocus={e=>onFocus(e)}
                        className={mirrorClass}
                        options={{
                            mode: name==='k8sJson'? 'yaml':'shell',
                            theme:'default',
                            placeholder: bordered ? placeholder : '未设置',
                            styleActiveLine: bordered,
                            readOnly: !taskUpdate
                        }}
                    />
                    {
                        bordered &&
                        <div className="gui-mirror-expand">
                            <Tooltip title={taskUpdate?"全屏编辑":"全屏查看"}>
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
                            mirrorRef={expandMirrorRef}
                            mirrorValue={narrowMirrorRef?.current?.editor.getValue()}
                            options={{
                                mode: name==='k8sJson'? 'yaml':'shell',
                                theme:'dracula',
                                lineNumbers: true,
                                autofocus: taskUpdate,
                                readOnly: !taskUpdate
                            }}
                        />
                    </div>
                </Modals>
            </Form.Item>
        </Form.Item>
    )
}

export default inject("taskStore")(observer(FormsMirror))
