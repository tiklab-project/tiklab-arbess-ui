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
import "codemirror/addon/selection/active-line";

import {inject,observer} from "mobx-react";

const MirrorContent = props =>{


    const mirrorRefs = useRef(null)


    const onFocus = e => {
        if(e.state.placeholder){
            e.state.placeholder.innerHTML=placeholder
        }
    }



    return  <CodeMirror
                value={"zzz"}//内容
                ref={mirrorRefs}
                options={{
                    mode: {name:"shell",shell: true },//语言
                    lineNumbers: true, // 是否显示行号
                    styleActiveLine: true, //高亮
                }}
                onFocus={e=>onFocus(e)}
            />
}

export default MirrorContent

