import React,{useRef} from "react";
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

import "./mirror.scss";

const MirrorContent = props =>{

    const {shellBlock,setShellBlock,type,name,pipelineStore,configStore,placeholder} = props
    const mirrorRefs = useRef(null)

    const {pipelineId} = pipelineStore
    const {updateConfigure,isAddType} = configStore

    const onBlur = () =>{
        const obj = {}
        obj[name] = mirrorRefs.current.editor.getValue()
        const params = {
            pipeline:{pipelineId},
            taskType:type,
            values:obj,
            message:"update"
        }
        setShellBlock(mirrorRefs.current.editor.getValue())
        isAddType && updateConfigure(params).then(res=>{
            if(res.code===50001){
                message.info(res.msg)
            }
        })
    }

    return  <div className={`${isAddType?"formViewCodeMirror":"codeNewStage"}`}>
        <CodeMirror
            value={shellBlock}//内容
            ref={mirrorRefs}
            options={{
                mode: {name:"shell",shell: true },//语言
                lineNumbers: false, // 是否显示行号
                // placeholder: placeholder
            }}
            onBlur={()=>onBlur()}
        />
    </div>
}

export default MirrorContent

