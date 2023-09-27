import React,{useEffect,useRef} from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import 'monaco-editor/esm/vs/basic-languages/yaml/yaml';
import 'monaco-editor/esm/vs/basic-languages/shell/shell';
import 'monaco-editor/esm/vs/basic-languages/bat/bat';

export const TextMonaco = props =>{

    const {value,language} = props

    const monacoEditorRef = useRef()
    const monacoEditorDomRef = useRef()

    useEffect(() => {
        newMonaco()
        return () => {
            monacoEditorRef.current.dispose() // 卸载编辑器
            monacoEditorRef.current = undefined
        }
    }, [monacoEditorRef.current,value])

    const newMonaco = () => {
        try {
            monacoEditorRef.current = monaco.editor.create(monacoEditorDomRef.current, {
                value: value && value,
                language: language, // 编辑器类型支持
                minimap: { enabled: false }, // 小地图
                automaticLayout: true, // 自动布局,
                codeLens: true,
                colorDecorators: true,
                contextmenu: false,
                readOnly: false, //是否只读
                formatOnPaste: true,
                overviewRulerBorder: false, // 滚动条的边框
                scrollBeyondLastLine: true,
                quickSuggestions:false,
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
            monacoEditorRef.current.onDidChangeModelContent((event)  => {
                try {
                    if(!monacoEditorRef.current) return;

                    const model = monacoEditorRef.current.getModel();
                    const position = monacoEditorRef.current.getPosition();

                    // 当前行内容
                    // const lineContent = model.getLineContent(position.lineNumber);

                    const word = model.getWordAtPosition(position);

                    if(word?.word==='s'){
                        monacoEditorRef.current.trigger(null, 'editor.action.triggerSuggest', {});
                    }
                    else{
                        // 获取建议组件实例
                        const suggestWidget = monacoEditorRef.current.getContribution('editor.contrib.suggestController').widget;
                        // 关闭提示框
                        suggestWidget.hideWidget();
                    }

                } catch {}
            })
            // 设置补全提示的视觉样式
            monaco.languages.registerCompletionItemProvider(language, {
                provideCompletionItems: () => {
                    let suggestions = [] ;
                    [
                        'CASEWHEN(expression1, value1, expression2, value2, ..., else_value)',
                        'CONCAT(str1, str2, ...)',
                        'ISNULL (expression, defaultValue)',
                        'DATEDIFF_YEAR(startdate,enddate)',
                        'DATEDIFF_MONTH(startdate,enddate)',
                        'DATEDIFF_DAY(startdate,enddate)',
                        'SUM(expression)',
                        'AVG(expression)',
                        'MAX(expression)',
                        'MIN(expression)',
                        'COUNT(expression)',
                        'DISTINCTCOUNT(expression)',
                        'DISTINCTAVG(expression)',
                        'DISTINCTSUM(expression)',
                        'NOW()',
                    ].forEach((item) => {
                        suggestions.push(
                            // 添加contact()函数
                            {
                                label: item, // 显示名称
                                kind: monaco.languages.CompletionItemKind.Function, // 这里Function也可以是别的值，主要用来显示不同的图标
                                insertText: item, // 实际粘贴上的值
                                detail:"提示的内容",
                            }
                        );
                    });
                    return {
                        // 最后要返回一个数组
                        suggestions:suggestions
                    }
                },
                quickSuggestions: false, // 默认提示关闭
            });


        } catch {}
    }

    return (
        <div ref={monacoEditorDomRef} style={{height:'100%'}}/>
    )
}

export const TaskMonaco = props =>{

    const {value,language,bordered,onFocus,placeholder} = props

    const monacoEditorRef = useRef()
    const monacoEditorDomRef = useRef()

    useEffect(() => {
        newMonaco()
        return () => {
            monacoEditorRef.current.dispose() // 卸载编辑器
            monacoEditorRef.current = undefined
        }
    }, [monacoEditorRef.current,value])

    const newMonaco = () => {
        try {
            monacoEditorRef.current = monaco.editor.create(monacoEditorDomRef.current, {
                value: value && value,
                language: language, // 编辑器类型支持
                minimap: { enabled: false }, // 小地图
                automaticLayout: true, // 自动布局,
                lineNumbers: 'off' ,// 隐藏行号
                folding: false, // 隐藏代码折叠
                glyphMargin: false, // 隐藏glyph边距
                lineDecorationsWidth: 0, // 隐藏行装饰
                lineNumbersMinChars: 0,
                codeLens: true,
                colorDecorators: true,
                contextmenu: false,
                readOnly: false, //是否只读
                formatOnPaste: true,
                overviewRulerBorder: false, // 滚动条的边框
                scrollBeyondLastLine: true,
                quickSuggestions:false,
                // 禁用默认提示
                suggest: {
                    showWords: false,
                    showSnippets: false
                },
                theme: 'vs', // 主题
            })
            // onDidChangeModelContent，方法产生的监听需要在组件销毁的时候dispose下
            monacoEditorRef.current.onDidChangeModelContent((event)  => {
                try {


                } catch {}
            })
            monacoEditorRef.current.onDidFocusEditorWidget(() => {
                // 编辑器获得焦点
                onFocus()
            });
        } catch {}
    }

    return (
        <div ref={monacoEditorDomRef}
             className={`${bordered?"gui-mirror-tr":"gui-mirror-fa"}`}
        />
    )
}
