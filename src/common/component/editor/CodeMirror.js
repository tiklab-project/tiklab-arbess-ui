import React from "react";
import {UnControlled as CodeMirror} from "react-codemirror2";
import "codemirror/lib/codemirror.js";
import "codemirror/lib/codemirror.css";
// 设置代码语言模式
import "codemirror/mode/shell/shell.js";
import "codemirror/mode/ruby/ruby.js";
import "codemirror/mode/yaml/yaml.js"
//代码提示
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/anyword-hint.js";
// 主题风格
import "codemirror/theme/solarized.css";
import "codemirror/theme/dracula.css";
// 高亮
import "codemirror/addon/selection/active-line";
// 提示
import "codemirror/addon/display/placeholder.js";
// 折叠代码
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/xml-fold.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/comment-fold.js";

/**
 * 任务命令代码块(task详情)
 */
export const TaskMirror = props =>{

    const {type,mirrorValue,setMirrorValue,bordered,placeholder,...res} = props

    return(
        <CodeMirror
            {...res}
            value={mirrorValue}//内容
            options={{
                mode: {name:"shell",shell: true },//语言
                theme:type? "dracula":"material",
                autofocus: type,
                lineNumbers: type, // 是否显示行号
                placeholder: type ? "" : bordered ? placeholder: "未设置",
                styleActiveLine: bordered,
            }}
            onChange={(_,__,value)=>setMirrorValue(value)}
        />
    )
}


/**
 * 后置处理代码块
 */
export const PostprocessMirrorScenario = props =>{

    const {onFocus,type,mirrorRefs,value,styleActiveLine} = props

    return (
        <CodeMirror
            value={value}
            ref={mirrorRefs}
            options={{
                mode: type==='bat' ? "ruby":"shell",
                lineNumbers: true,
                lineWrapping:true,
                styleActiveLine:styleActiveLine,
                foldGutter: true,
                gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
            }}
            onFocus={onFocus}
        />
    )
}
