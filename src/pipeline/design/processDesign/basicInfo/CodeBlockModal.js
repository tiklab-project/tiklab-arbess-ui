import React,{useRef} from "react";
import {ExpandMirror} from "../../../../common/editor/CodeMirror";
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

    return(
        <Modals
            visible={visible}
            onCancel={onCancel}
            onOk={onOks}
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
