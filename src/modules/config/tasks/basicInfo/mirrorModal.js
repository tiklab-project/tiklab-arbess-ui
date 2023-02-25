import React,{useEffect,useState,useRef} from "react";
import {Modal} from "antd";
import {CompressOutlined} from "@ant-design/icons";
import {autoHeight} from "../../../common/client/client";
import {ExpandMirror} from "../../../common/editor/mirror";
import Btn from "../../../common/btn/btn";

const MirrorModal = props =>{

    const {visible,setVisible,expandValue,narrowRef,dataItem,name,onOk} = props

    const mirrorRefs = useRef(null)

    const [height,setHeight] = useState(0)

    useEffect(()=>{
        setHeight(autoHeight())
        return ()=>{
            window.onresize = null
        }
    },[height])

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    const onCancel = () =>{
        narrowRef.current.editor.setValue(dataItem[name]?dataItem[name]:"")
        setVisible(false)
    }

    const onOks = () =>{
        onOk(mirrorRefs)
        setVisible(false)
    }

    const modalFooter = (
        <>
            <Btn onClick={()=>onCancel()} title={"取消"} isMar={true}/>
            <Btn onClick={()=>onOks()} title={"确定"} type={"primary"}/>
        </>
    )

    return(
        <Modal
            closable={false}
            visible={visible}
            onCancel={()=>setVisible(false)}
            footer={modalFooter}
            destroyOnClose={true}
            width={800}
            style={{height:height,top:60}}
            bodyStyle={{padding:0}}
            className="mf"
        >
            <div className="mirror-expand">
                <div className="mirror-expand-up">
                    <div className="up-title">编辑多行文本</div>
                    <div className="mirror-expand-close" onClick={()=>onCancel()}>
                        <CompressOutlined/>
                    </div>
                </div>
                <div className="mirror-expand-content">
                    <ExpandMirror mirrorRefs={mirrorRefs} expandValue={expandValue}/>
                </div>
            </div>

        </Modal>
    )
}

export default MirrorModal
