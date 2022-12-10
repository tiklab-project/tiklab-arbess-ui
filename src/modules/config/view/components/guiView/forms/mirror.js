import React, {useRef,useState,forwardRef,useEffect} from "react";
import {inject,observer} from "mobx-react";
import {Tooltip} from "antd";
import {RadiusUprightOutlined,ExpandOutlined} from "@ant-design/icons";
import MirrorExpand from "./mirrorExpand";
import Btn from "../../../../../common/btn/btn";
import {ViewMirror} from "../../../../common/components/mirror";
import {x} from "../../delData";
import "./mirror.scss";

const MirrorContent = forwardRef((props,ref)=>{

    const {name,pipelineStore,configStore,placeholder,dataItem,mirrorValue} = props

    const mirrorRefs = useRef(null)

    const {pipelineId} = pipelineStore
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
        // const targetDiv = document.getElementById(name+"_mirror")
        // targetDiv.style.height = "auto"
        mirrorRefs.current.editor.setValue(dataItem[name]?dataItem[name]:"")
        setBordered(false)
    }

    const onOk = ref =>{
        const obj = {}
        obj[name] = ref.current.editor.getValue()
        if(x(obj[name],mirrorValue)){
            dataItem[name] = ref.current.editor.getValue()
            const params = {
                pipeline:{id:pipelineId},
                values:obj,
                taskType:dataItem.type,
                configId:dataItem.configId,
            }
            updateTaskConfig(params)
        }
        setBordered(false)
    }


    const handleMouseDown = e => {
        const targetDiv = document.getElementById(name+"_mirror")
        const targetDivHeight = targetDiv.offsetHeight
        // clientY是该表高度，也可以取clientX改变宽度
        const startY = e.clientY
        document.onmousemove = function(e) {
            e.preventDefault()
            const distY = Math.abs(e.clientY - startY)
            if (e.clientY > startY) {
                targetDiv.style.height = targetDivHeight + distY + 'px'
            }
            if (e.clientY < startY) {
                targetDiv.style.height = (targetDivHeight - distY) + 'px'
            }
            // 最大高度，也可以通过css  max-height设置
            if (parseInt(targetDiv.style.height) >= 700) {
                targetDiv.style.height = 700 + "px"
            }
            if (parseInt(targetDiv.style.height) <= 68){
                targetDiv.style.height = 68 + "px"
            }
        }
        document.onmouseup = function() {
            document.onmousemove = null
        }
    }

    return  <>
            <div className="gui-mirror" id={name+"_mirror"}>
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
                {/*{*/}
                {/*    bordered &&*/}
                {/*    <div className="gui-mirror-move"  onMouseDown={handleMouseDown}/>*/}
                {/*}*/}
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
                    <Btn
                        title={"取消"}
                        isMar={true}
                        onClick={()=>onCancel()}
                    />
                    <Btn
                        title={"保存"}
                        type={"primary"}
                        onClick={()=>onOk(mirrorRefs)}
                    />
                </div>
            }
        </>
    })

export default inject("pipelineStore","configStore")(observer(MirrorContent))

