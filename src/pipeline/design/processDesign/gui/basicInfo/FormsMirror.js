import React, {useEffect, useState} from "react";
import {inject,observer} from "mobx-react";
import {Tooltip,Form} from "antd";
import {ExpandOutlined} from "@ant-design/icons";
import Modals from "../../../../../common/component/modal/Modal";
import Btn from "../../../../../common/component/btn/Btn";
import {TaskMirror} from "../../../../../common/component/editor/CodeMirror";
import {WhetherChange} from "../gui/Common";
import "./FormsMirror.scss";

/**
 * 任务基本消息，执行命令…… -- 代码块
 */
const FormsMirror = props =>{

    const {isValid,name,label,placeholder,taskStore} = props

    const {updateTask,dataItem} = taskStore

    // 代码块内容
    const [mirrorValue,setMirrorValue] = useState(null)

    // 边框
    const [bordered,setBordered] = useState(false)

    // 代码块弹出框显示
    const [visible,setVisible] = useState(false)

    useEffect(() => {
        getMirrorValue()
    }, [dataItem.taskId]);

    const getMirrorValue = () =>{
        if(dataItem.task){
            setMirrorValue(dataItem.task[name]? dataItem.task[name] : "")
        }
    }

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
        getMirrorValue()
        closeMirror(type)
    }

    /**
     * 确定更改
     */
    const onOk = type =>{
        if(WhetherChange(mirrorValue,dataItem.task?.[name])){
            updateTask({[name]:mirrorValue})
        }
        closeMirror(type)
    }

    /**
     * 取消或确定修改事件
     */
    const closeMirror = type => {
        if(type==='expand'){setVisible(false)}
        else {setBordered(false)}
    }

    return  (
        <Form.Item
            name={dataItem?.taskId+"_"+name}
            label={label}
            // rules={isValid && [{required:true,message:``}]}
        >
            <Form.Item>
                <div className={`gui-mirror `} id={name+"_mirror"}>
                    <TaskMirror
                        bordered={bordered}
                        placeholder={placeholder}
                        mirrorValue={mirrorValue}
                        setMirrorValue={setMirrorValue}
                        onFocus={e=>onFocus(e)}
                        // className={
                        //     isValid ?
                        //     mirrorValue ?
                        //         bordered ? "gui-mirror-has-focus":"gui-mirror-has"
                        //         :
                        //         bordered ? "gui-mirror-empty-focus":"gui-mirror-empty"
                        //         :
                        //         bordered ? "gui-mirror-has-focus":"gui-mirror-has"
                        // }
                        className={bordered ? "gui-mirror-has-focus":"gui-mirror-has"}
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
                {/*<div className='ant-form-item-explain ant-form-item-explain-error'>*/}
                {/*    <div role="alert">*/}
                {/*        nnn*/}
                {/*    </div>*/}
                {/*</div>*/}
                {
                    bordered &&
                    <div style={{paddingTop:8}}>
                        <Btn title={"取消"} isMar={true} onClick={()=>onCancel('narrow')}/>
                        <Btn title={"保存"} type={"primary"} onClick={()=>onOk('narrow')}/>
                    </div>
                }
                <Modals
                    visible={visible}
                    onCancel={()=>onCancel('expand')}
                    onOk={()=>onOk('expand')}
                    width={800}
                    title={'编辑多行文本'}
                >
                    <div className="mirror-expand">
                        <TaskMirror
                            type={true}
                            mirrorValue={mirrorValue}
                            setMirrorValue={setMirrorValue}
                        />
                    </div>
                </Modals>
            </Form.Item>
        </Form.Item>
    )
}

export default inject("taskStore")(observer(FormsMirror))
