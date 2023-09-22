import React,{useEffect,useRef} from "react";
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

/**
 * 任务命令代码块(task详情)
 */
export const TaskMirror = props =>{

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
        />
    )
}

/**
 * 任务命令代码块（全屏）
 */
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

export const TextMirrorEditor =  props => {

    const {value} = props

    const editorRef = useRef(null);

    useEffect(() => {
        if (value && editorRef.current) {
            const editor = editorRef.current.editor;
            editor.setValue(value);
            editor.clearHistory();
            let isChanged = false;
            editor.on('change', () => {
                if (!isChanged) {
                    editor.on('undo');
                    editor.on('redo');
                    isChanged = true;
                }
            });
            return () => {
                editor.off('change');
                editor.off('undo');
                editor.off('redo');
            }
        }
    }, [value]);

    /**
     * 输入提示
     */
    const handleShowHint = () =>{

        const cmInstance = editorRef.current.editor
        // 得到光标
        let cursor = cmInstance.getCursor()
        // 得到行内容
        let cursorLine = cmInstance.getLine(cursor.line)
        // 得到光标位置
        let end = cursor.ch
        // 得到输入的当前输入的字符
        const One = `${cursorLine.charAt(end - 1)}`
        // 得到最后空格后面的字符串，无空格第一个字符串
        const Two = cursorLine.trim().split(" ")[cursorLine.trim().split(" ").length-1]
        if(One.trim() !== ""){
            console.log(Two,"cursorLine")
        }

        let list = []
        if (Two==="e" || One==="$") {
            list.push('echo','sdgsg')
        }

        // 得到光标标识
        let token = cmInstance.getTokenAt(cursor)

        return {
            list: list,
            from: { ch: end, line: cursor.line },
            to: { ch: token.end, line: cursor.line },
        }
    }

    return (
        <CodeMirror
            ref={editorRef}
            value={value}
            options={{
                mode: "yaml",
                lineNumbers: true,
                lineWrapping:false,  // 换行
                foldGutter: true,
                // styleActiveLine: true,
                gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                hintOptions:{hint:handleShowHint,completeSingle: false}
            }}
            onChange={(editor, data, values) => {
            }}
            onInputRead={(editor,change) =>{
                editor.showHint()
            }}
        />
    )

}
