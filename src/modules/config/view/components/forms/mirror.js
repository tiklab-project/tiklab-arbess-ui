import React, {useRef,useState,forwardRef} from "react";
import {inject,observer} from "mobx-react";
import {Tooltip} from "antd";
import {ExpandOutlined} from "@ant-design/icons";
import MirrorExpand from "./mirrorExpand";
import Btn from "../../../../common/btn/btn";
import {ViewMirror} from "../../../common/components/mirror";
import {x} from "../delData";
import "./mirror.scss";

const MirrorContent = forwardRef((props,ref)=>{

    const {name,pipelineStore,configStore,placeholder,dataItem,mirrorValue} = props

    const mirrorRefs = useRef(null)

    const {pipeline} = pipelineStore
    const {updateTaskConfig} = configStore

    const [bordered,setBordered] = useState(false)
    const [visible,setVisible] = useState(false)
    const [expandValue,setExpandValue] = useState("")

    const onFocus = e => {
        setBordered(true)
        if(e.state.placeholder){
            e.state.placeholder.innerHTML=placeholder
        }
    }

    const expand = () =>{
        const value = mirrorRefs.current.editor.getValue()
        setExpandValue(value?value:"")
        setBordered(false)
        setVisible(true)
    }

    const onCancel = () =>{
        mirrorRefs.current.editor.setValue(dataItem[name]?dataItem[name]:"")
        setBordered(false)
    }

    const onOk = ref =>{
        const obj = {}
        obj[name] = ref.current.editor.getValue()
        if(x(obj[name],mirrorValue)){
            dataItem[name] = ref.current.editor.getValue()
            const params = {
                pipeline:{id:pipeline.id},
                values:obj,
                taskType:dataItem.type,
                configId:dataItem.configId,
            }
            updateTaskConfig(params)
        }
        setBordered(false)
    }

    return  <>
            <div className={`gui-mirror`} id={name+"_mirror"}>
                <ViewMirror
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
            <MirrorExpand
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

