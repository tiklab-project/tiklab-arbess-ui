import React,{useEffect,useRef,useState} from 'react';
import * as monaco from 'monaco-editor';
import 'monaco-editor/esm/vs/basic-languages/monaco.contribution';

export const Monaco = props =>{

    const monacoEditorRef = useRef()
    const monacoEditorDomRef = useRef()

    const [value,setValue] = useState('最新版')

    useEffect(() => {
        newMonaco()
        return () => {
            monacoEditorRef.current.dispose() // 卸载编辑器
            monacoEditorRef.current = undefined
        }
    }, [monacoEditorRef.current])

    let suggestions
    const newMonaco = () => {
        try {
            monacoEditorRef.current = monaco.editor.create(monacoEditorDomRef.current, {
                value: value && value,
                language: "plaintext", // 编辑器类型支持
                minimap: { enabled: false }, // 小地图
                automaticLayout: true, // 自动布局,
                codeLens: true,
                colorDecorators: true,
                contextmenu: false,
                readOnly: false, //是否只读
                formatOnPaste: true,
                overviewRulerBorder: false, // 滚动条的边框
                scrollBeyondLastLine: true,
                // 禁用默认提示
                suggest: {
                    showWords: false,
                    showSnippets: false
                },
                theme: 'vs', // 主题
                folding: true, // 是否折叠
                foldingHighlight: true, // 折叠等高线
                foldingStrategy: "auto", // 折叠方式  auto | indentation
                showFoldingControls: "always", // 是否一直显示折叠 always | mouseover
            })
            // onDidChangeModelContent，方法产生的监听需要在组件销毁的时候dispose下
            monacoEditorRef.current.onDidChangeModelContent(e => {
                try {
                    let newValue = monacoEditorRef.current.getValue()
                    updateSuggestions(value);
                } catch {}
            })
            monaco.languages.registerCompletionItemProvider('plaintext', {
                provideCompletionItems() {
                    const suggestions = getSuggestions(monacoEditorRef.current.getValue());
                    return {
                        suggestions:suggestions.map(item=>({
                            label:item,
                            kind:monaco.languages.CompletionItemKind.Text,
                            insertText:item,
                            detail: "提示内容",
                        }))
                    }
                },
            });
        } catch {}
    }

    /**
     * 设置提示内容
     * @param value
     */
    function updateSuggestions(value) {
        if (value.includes('console.')) {
            suggestions = ['log', 'warn', 'error'];
        } else if (value.includes('fetch')) {
            suggestions = ['then', 'catch', 'finally'];
        } else {
            suggestions = [];
        }
    }

    /**
     * 设置提示内容
     */
    const getSuggestions = value =>{
        if (value.includes('console.')) {
            suggestions = ['log', 'warn', 'error'];
        } else if (value.includes('fetch')) {
            suggestions = ['then', 'catch', 'finally'];
        } else {
            suggestions = [];
        }
    }

    return (
        <div ref={monacoEditorDomRef} style={{height:400}}/>
    )
}

export default Monaco