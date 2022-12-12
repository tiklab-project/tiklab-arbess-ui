import React from "react";
import {UnControlled as CodeMirror} from "react-codemirror2";
import "codemirror/lib/codemirror.js";
import "codemirror/lib/codemirror.css";

// 设置代码语言模式
import "codemirror/mode/shell/shell.js";
import "codemirror/mode/ruby/ruby.js";
// 主题风格
import "codemirror/theme/solarized.css";
// 黑色主题
import "codemirror/theme/dracula.css";
// 高亮
import "codemirror/addon/selection/active-line";
// 折叠代码
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/xml-fold.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/comment-fold.js";
// 提示
import "codemirror/addon/display/placeholder.js";


export const ViewMirror = props =>{
    const {mirrorRefs,mirrorValue,bordered,onFocus,placeholder} = props
    return(
        <CodeMirror
            value={mirrorValue}//内容
            ref={mirrorRefs}
            options={{
                mode: {name:"shell",shell: true },//语言
                lineNumbers: false, // 是否显示行号
                placeholder: bordered ? placeholder:"未设置",
                styleActiveLine:bordered
            }}
            onFocus={e=>onFocus(e)}
            className={`${bordered?"gui-mirror-tr":"gui-mirror-fa"}`}
        />
    )
}

export const PostposeMirrorScenario = props =>{
    const {type,mirrorRefs,value} = props
    return (
        <CodeMirror
            value={value}
            ref={mirrorRefs}
            options={{
                mode: type===71 ? "ruby":"shell",
                lineNumbers: true,
                lineWrapping:false,
                foldGutter: true   ,
                gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                styleActiveLine:true
            }}
        />
    )
}

export const PostposeMirror = props =>{
    const {mirrorRefs,item,styleActiveLine,onFocus} = props
    return (
        <CodeMirror
            value={item && item.scriptOrder}
            ref={mirrorRefs}
            options={{
                mode: item.type ===71 ? "ruby":"shell",
                lineNumbers: true,
                lineWrapping:true,
                foldGutter: true,
                gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                styleActiveLine: styleActiveLine, //高亮
            }}
            onFocus={e=>onFocus(e)}
        />
    )
}

export const ExpandMirror = props =>{
    const {expandValue,mirrorRefs} = props
    return(
        <CodeMirror
            ref={mirrorRefs}
            value={expandValue}//内容
            options={{
                mode: {name:"shell",shell: true },//语言
                // theme: "solarized light",
                theme:"dracula",
                autofocus:true,
                lineNumbers: true, // 是否显示行号
                lineWrapping:true,
                foldGutter: true,
                styleActiveLine:true,
            }}
        />
    )
}