import React,{useRef,useState,forwardRef} from "react";
import {UnControlled as CodeMirror} from "react-codemirror2";
import "codemirror/lib/codemirror.js";
import "codemirror/lib/codemirror.css";
// 设置代码语言模式（比如JS，SQL，python，java等）
import "codemirror/mode/shell/shell.js";
// 代码模式，clike是包含java,c++等模式的
// import "codemirror/mode/clike/clike";
// import "codemirror/mode/css/css";
import "codemirror/addon/display/placeholder.js";

import {message} from "antd";
import {inject,observer} from "mobx-react";
import "./mirror.scss";
import SuffixStatus from "./suffixStatus";

const MirrorContent = forwardRef((props,ref)=>{

    const {setShellBlock,type,name,pipelineStore,configStore,placeholder} = props
    let {shellBlock} = props

    const mirrorRefs = useRef(null)

    const {pipelineId} = pipelineStore
    const {updateConfigure} = configStore

    const [isLoading,setIsLoading] = useState(1)
    const [bordered,setBordered] = useState(false)

    const onFocus = () => {
        setBordered(true)
    }

    const x = (newValue,lastValue) => {
        if (newValue == null){
            return false;
        }
        if (newValue === ""  && lastValue == null){
            return false;
        }
        return newValue !== lastValue;
    }

    const onBlur = () =>{
        const obj = {}
        obj[name] = mirrorRefs.current.editor.getValue()
        if(x(obj[name],shellBlock)){
            setIsLoading(2)
            shellBlock = obj[name]
            setShellBlock(obj[name])
            const params = {
                pipeline:{pipelineId},
                taskType:type,
                values:obj,
                message:"update"
            }
            updateConfigure(params).then(res=>{
                if(res.code===0){
                    setIsLoading(3)
                }else {
                    setIsLoading(4)
                    message.info(res.msg)
                }
            })
            setTimeout(()=>setIsLoading(1),1000)
        }
        setBordered(false)
    }


    return  <div className={`${bordered?"codeNewStage":"formViewCodeMirror"}`}>
        <CodeMirror
            value={shellBlock}//内容
            ref={mirrorRefs}
            options={{
                mode: {name:"shell",shell: true },//语言
                lineNumbers: false, // 是否显示行号
                placeholder: placeholder
            }}
            // onChange={()}
            onFocus={onFocus}
            onBlur={onBlur}
        />
        <div className="formViewCodeMirror-suffix">
            <SuffixStatus isLoading={isLoading}/>
        </div>
    </div>
})

export default inject("pipelineStore","configStore")(observer(MirrorContent))

