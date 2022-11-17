import React,{useRef,useContext,useState} from "react";
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
import SuffixStatus from "./suffixStatus";


const Mirror = props =>{

    const {setShellBlock,name,type} = props
    let {shellBlock} = props

    const mirrorRefs = useRef(null)
    const context = useContext(TestContext)

    const [isLoading,setIsLoading] = useState(1)

    const valueChange = context.valueChange

    const x = (newValue,lastValue) => {
        if (newValue == null){
            return false;
        }
        if (newValue === "" && lastValue == null){
            return false;
        }
        return newValue !== lastValue;
    }

    const onBlur = () =>{
        const zz = mirrorRefs.current.editor.getValue()
        if(x(zz,shellBlock)){
            valueChange(zz,name,type,setIsLoading)
            shellBlock = zz
            setShellBlock(shellBlock)
        }
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
            onBlur={onBlur}
        />
        <div className="guiView-inputs-suffix">
            {<SuffixStatus isLoading={isLoading}/>}
        </div>
    </div>

}

export default observer(Mirror)

