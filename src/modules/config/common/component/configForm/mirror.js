import React, {useRef} from "react";
import {UnControlled as CodeMirror} from "react-codemirror2";
import "codemirror/lib/codemirror.js";
import "codemirror/lib/codemirror.css";
// 主题风格
import "codemirror/theme/solarized.css";
// 设置代码语言模式（比如JS，SQL，python，java等）
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/sql/sql.js";
import "codemirror/mode/python/python.js";
import "codemirror/mode/shell/shell.js";
import "codemirror/mode/clike/clike.js";

// 代码模式，clike是包含java,c++等模式的
import "codemirror/mode/clike/clike";
import "codemirror/mode/css/css";
//ctrl+空格代码提示补全
import "codemirror/addon/hint/show-hint.css"; // start-ctrl+空格代码提示补全
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/anyword-hint.js"; // end

//代码高亮
import "codemirror/addon/selection/active-line";

// 代码折叠
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/comment-fold.js";

import "./mirror.scss";

const Mirror = props =>{

    const {shellBlock,setShellBlock,setIsPrompt} = props
    const mirrorRefs = useRef(null)

    return (
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
                setIsPrompt(true)
            }}
        />
    )
}

export default Mirror

