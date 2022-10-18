import React,{useRef,useContext} from "react";
import {UnControlled as CodeMirror} from "react-codemirror2";
import "codemirror/lib/codemirror.js";
import "codemirror/lib/codemirror.css";
// 设置代码语言模式（比如JS，SQL，python，java等）
import "codemirror/mode/shell/shell.js";
// 代码模式，clike是包含java,c++等模式的
// import "codemirror/mode/clike/clike";
// import "codemirror/mode/css/css";

import "./mirror.scss";
import {observer} from "mobx-react";
import TestContext from "../common/testContext";
import ConfigStore from "../../store/configStore";

const Mirror = props =>{

    const {shellBlock,setShellBlock,name,type} = props

    const context = useContext(TestContext)

    const mirrorRefs = useRef(null)
    const pipelineId = context.pipelineId
    const {updateConfigure} = ConfigStore

    const onBlur = () =>{
        const obj = {}
        obj[name] = mirrorRefs.current.editor.getValue()
        setShellBlock(mirrorRefs.current.editor.getValue())
        const params = {
            pipelineId,
            taskType:type,
            pipelineTest: obj,
            pipelineCode:obj,
            pipelineBuild:obj,
            pipelineDeploy:obj,
            message:"update"
        }
        updateConfigure(params)
    }

    return <div className="guiViewCodeMirror">
        <CodeMirror
            value={shellBlock}//内容
            ref={mirrorRefs}
            options={{
                mode: { name: "shell", shell: true },//语言
                lineNumbers: false, // 是否显示行号
                lineWrapping: true,//是否支持代码折叠
            }}
            onBlur={()=>onBlur()}
        />
    </div>

}

export default observer(Mirror)

