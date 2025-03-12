/**
 * @Description: 代码块
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/11
 */
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

const TaskMirror = props =>{

    const {mirrorRef,mirrorValue,...res} = props;

    return(
        <CodeMirror
            {...res}
            ref={mirrorRef}
            value={mirrorValue}
        />
    )
}

export default TaskMirror
