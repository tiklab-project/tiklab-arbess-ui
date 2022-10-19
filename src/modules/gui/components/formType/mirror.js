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

const Mirror = props =>{

    const {shellBlock,setShellBlock,name,type} = props

    const mirrorRefs = useRef(null)
    const context = useContext(TestContext)

    const valueChange = context.valueChange

    return <div className="guiViewCodeMirror">
        <CodeMirror
            value={shellBlock}//内容
            ref={mirrorRefs}
            options={{
                mode: { name: "shell", shell: true },//语言
                lineNumbers: false, // 是否显示行号
                lineWrapping: true,//是否支持代码折叠
            }}
            onBlur={()=>{
                setShellBlock(mirrorRefs.current.editor.getValue())
                valueChange(mirrorRefs.current.editor.getValue(),name,type)
            }}
        />
    </div>

}

export default observer(Mirror)

