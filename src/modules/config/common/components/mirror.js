import React from "react";
import {UnControlled as CodeMirror} from "react-codemirror2";
import "codemirror/lib/codemirror.js";
import "codemirror/lib/codemirror.css";

// 设置代码语言模式
import "codemirror/mode/shell/shell.js";
import "codemirror/mode/ruby/ruby.js";
//代码提示
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/anyword-hint.js";
// 主题风格
import "codemirror/theme/solarized.css";
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
                styleActiveLine:bordered,
            }}
            onFocus={e=>onFocus(e)}
            className={`${bordered?"gui-mirror-tr":"gui-mirror-fa"}`}
            onInputRead={( editor, change) => {
                // editor.showHint()
                // const data = { t: ['t_user', 'menu', 'auth_info'], t_user: [], menu: [''], default: ['tableinfo'] }
                // editor.setOption('hintOptions', {
                //     tables: data,
                //     completeSingle: false
                // });
                // editor.execCommand('autocomplete')
            }}
        />
    )
}

export const PostposeMirrorScenario = props =>{
    const {type,mirrorRefs,value,onFocus,styleActiveLine} = props
    return (
        <CodeMirror
            value={value}
            ref={mirrorRefs}
            options={{
                mode: type===71 ? "ruby":"shell",
                lineNumbers: true,
                lineWrapping:true,
                styleActiveLine:styleActiveLine,
                foldGutter: true,
                gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
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
                theme:"dracula",
                autofocus:true,
                lineNumbers: true, // 是否显示行号
                lineWrapping:true,
                styleActiveLine:true,
                foldGutter: true,
                gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
            }}
        />
    )
}