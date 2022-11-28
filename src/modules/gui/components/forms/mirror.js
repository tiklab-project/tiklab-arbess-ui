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
import Btn from "../../../common/btn/btn";
import {x} from "../common/delData";


const Mirror = props =>{

    const {setShellBlock,name,type,placeholder} = props
    let {shellBlock} = props

    const mirrorRefs = useRef(null)
    const context = useContext(TestContext)
    const valueChange = context.valueChange

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
        const zz = mirrorRefs.current.editor.getValue()
        if(x(zz,shellBlock)){
            valueChange(zz,name,type)
            shellBlock = zz
            setShellBlock(shellBlock)
        }
    }

    return  <div className="guiViewCodeMirror">
                <CodeMirror
                    value={shellBlock}//内容
                    ref={mirrorRefs}
                    options={{
                        mode: {name: "shell", shell: true},//语言
                        lineNumbers: false, // 是否显示行号
                        placeholder: bordered ? placeholder:"未设置"
                    }}
                    onFocus={e=>onFocus(e)}
                    className={`${bordered?"gui-mirror-tr":"gui-mirror-fa"}`}
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
                            onClick={()=>onOk()}
                        />
                    </div>
                }
            </div>

}

export default observer(Mirror)

