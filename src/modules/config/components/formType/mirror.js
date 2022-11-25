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
import "./mirror.scss";
import Btn from "../../../common/btn/btn";
import {x} from "../common/delData";

const MirrorContent = forwardRef((props,ref)=>{

    const {setShellBlock,type,name,pipelineStore,configStore,placeholder} = props
    let {shellBlock} = props

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
        mirrorRefs.current.editor.setValue(shellBlock)
        setBordered(false)
    }

    const onOk = () =>{
        const obj = {}
        obj[name] = mirrorRefs.current.editor.getValue()
        if(x(obj[name],shellBlock)){
            shellBlock = obj[name]
            setShellBlock(obj[name])
            const params = {
                pipeline:{pipelineId},
                taskType:type,
                values:obj,
                message:"update"
            }
            updateConfigure(params)
        }
        setBordered(false)
    }

    return  <>
        <div className={`${bordered?"codeNewStage":"formViewCodeMirror"}`}>
            <CodeMirror
                value={shellBlock}//内容
                ref={mirrorRefs}
                options={{
                    mode: {name:"shell",shell: true },//语言
                    lineNumbers: false, // 是否显示行号
                    placeholder: bordered ? placeholder:"未设置"
                }}
                onFocus={e=>onFocus(e)}
            />
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

