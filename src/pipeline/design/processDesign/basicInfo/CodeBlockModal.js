import React,{useRef} from "react";
import {ExpandMirror} from "../../../../common/editor/CodeMirror";
import Btn from "../../../../common/btn/Btn"
import Modals from "../../../../common/modal/Modal";

const CodeBlockModal = props =>{

    const {visible,setVisible,expandValue,narrowRef,initValue,onOk} = props

    const mirrorRefs = useRef(null)

    /**
     * 取消编辑
     */
    const onCancel = () =>{
        narrowRef.current.editor.setValue(initValue || "")
        setVisible(false)
    }

    /**
     * 确定更改
     */
    const onOks = () =>{
        onOk(mirrorRefs)
        setVisible(false)
    }

    const modalFooter = (
        <>
            <Btn onClick={onCancel} title={"取消"} isMar={true}/>
            <Btn onClick={onOks} title={"确定"} type={"primary"}/>
        </>
    )

    return(
        <Modals
            closable={false}
            visible={visible}
            onCancel={onCancel}
            footer={modalFooter}
            destroyOnClose={true}
            width={800}
            title={'编辑多行文本'}
        >
            <div className="mirror-expand">
                <ExpandMirror mirrorRefs={mirrorRefs} expandValue={expandValue}/>
            </div>

        </Modals>
    )
}

export default CodeBlockModal
