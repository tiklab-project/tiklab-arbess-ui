import React,{useRef,useState,forwardRef,useEffect} from "react";
import {UnControlled as CodeMirror} from "react-codemirror2";
import "codemirror/lib/codemirror.js";
import "codemirror/lib/codemirror.css";
// 设置代码语言模式（比如JS，SQL，python，java等）
import "codemirror/mode/shell/shell.js";
// 代码模式，clike是包含java,c++等模式的
// import "codemirror/mode/clike/clike";
// import "codemirror/mode/css/css";
import "codemirror/addon/display/placeholder.js";

import {inject,observer} from "mobx-react";
import {RadiusUprightOutlined} from "@ant-design/icons";
import Btn from "../../../../../common/btn/btn";
import {x} from "../../delData";
import "./mirror.scss";

const MirrorContent = forwardRef((props,ref)=>{

    const {name,pipelineStore,configStore,placeholder,dataItem,mirrorValue} = props

    const mirrorRefs = useRef(null)

    const {pipelineId} = pipelineStore
    const {updateConfigure} = configStore

    const [bordered,setBordered] = useState(false)
    
    const onFocus = e => {
        setBordered(true)
        if(e.state.placeholder){
            e.state.placeholder.innerHTML=placeholder
        }
    }

    const onCancel = () =>{
        // const targetDiv = document.getElementById(name+"_mirror")
        // targetDiv.style.height = "auto"
        mirrorRefs.current.editor.setValue(mirrorValue?mirrorValue:"")
        setBordered(false)
    }

    const onOk = () =>{
        const obj = {}
        obj[name] = mirrorRefs.current.editor.getValue()
        if(x(obj[name],mirrorValue)){
            const params = {
                pipeline:{pipelineId},
                values:obj,
                taskType:dataItem.type,
                configId:dataItem.configId,
            }
            updateConfigure(params)
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
            <div className="form-mirror" id={name+"_mirror"}>
                <CodeMirror
                    value={mirrorValue}//内容
                    ref={mirrorRefs}
                    options={{
                        mode: {name:"shell",shell: true },//语言
                        lineNumbers: false, // 是否显示行号
                        placeholder: bordered ? placeholder:"未设置",
                        // readOnly:true
                    }}
                    onFocus={e=>onFocus(e)}
                    className={`${bordered?"form-mirror-tr":"form-mirror-fa"}`}
                />
                {/*{*/}
                {/*    bordered &&*/}
                {/*    <div className="form-mirror-move"  onMouseDown={handleMouseDown}/>*/}
                {/*}*/}
            </div>
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
                        onClick={()=>onOk()}
                    />
                </div>
            }
        </>
    })

export default inject("pipelineStore","configStore")(observer(MirrorContent))

