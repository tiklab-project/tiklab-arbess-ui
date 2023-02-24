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

    const handleShowHint = () =>{
        const hintList = [
            {
                name: "echo",
            },
            {
                name: "xiaozhang",
            },
        ]
        const cmInstance = mirrorRefs.current.editor
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
        if (One === "e") {
            // hintList.forEach(e => {
            //     list.push(e.name)
            // })
            list.push('echo')
        }

        // 得到光标标识
        let token = cmInstance.getTokenAt(cursor)
        return {
            list: list,
            from: { ch: end, line: cursor.line },
            to: { ch: token.end, line: cursor.line },
        }
    }

    return(
        <CodeMirror
            value={mirrorValue}//内容
            ref={mirrorRefs}
            options={{
                mode: {name:"shell",shell: true },//语言
                lineNumbers: false, // 是否显示行号
                placeholder: bordered ? placeholder:"未设置",
                styleActiveLine:bordered,
                hintOptions:{hint:handleShowHint,completeSingle: false}
            }}
            onFocus={e=>onFocus(e)}
            className={`${bordered?"gui-mirror-tr":"gui-mirror-fa"}`}
            onInputRead={(editor,change) =>{
                editor.showHint()
            }}
        />
    )
}

export const ExpandMirror = props =>{
    const {expandValue,mirrorRefs} = props

    const handleShowHint = () =>{
        const hintList = [
            {
                name: "xiaohong",
                value: "xiaohong"
            },
            {
                name: "xiaozhang",
                value: [
                    {
                        name: "xiaoli",
                    },
                    {
                        name: "xiaosun",
                    },
                ],
            },
        ]
        const cmInstance = mirrorRefs.current.editor
        // 得到光标
        let cursor = cmInstance.getCursor()
        // 得到行内容
        let cursorLine = cmInstance.getLine(cursor.line)
        // 得到光标位置
        let end = cursor.ch
        // 得到每一个输入的值
        const One = `${cursorLine.charAt(end - 1)}`

        if(One.trim() !== ""){
            // console.log(cursorLine.trim().split(" ")[cursorLine.trim().split(" ").length-1],"cursorLine")
        }
        let list = []
        if (One === "$") {
            hintList.forEach(e => {
                list.push(e.name)
            })
        }

        // 得到光标标识
        let token = cmInstance.getTokenAt(cursor)
        return {
            list: list,
            from: { ch: end, line: cursor.line },
            to: { ch: token.end, line: cursor.line },
        }
    }

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
                hintOptions:{hint:handleShowHint,completeSingle: false}

            }}
            onInputRead={(editor,change) =>{
                editor.showHint()
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
            onFocus={onFocus}
        />
    )
}
