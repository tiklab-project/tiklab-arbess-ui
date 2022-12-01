import React,{useRef,useState,forwardRef,useEffect} from "react";
import {UnControlled as CodeMirror} from "react-codemirror2";
import "codemirror/lib/codemirror.js";
import "codemirror/lib/codemirror.css";
// 设置代码语言模式
import "codemirror/mode/shell/shell.js";
import "codemirror/mode/ruby/ruby.js";
// 折叠代码
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/xml-fold.js';
import 'codemirror/addon/fold/indent-fold.js';
import 'codemirror/addon/fold/markdown-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
// 提示
import "codemirror/addon/display/placeholder.js";
// 高亮
import "codemirror/addon/selection/active-line";

import {inject,observer} from "mobx-react";
import Btn from "../../../common/btn/btn";
import "./mirror.scss";

const MirrorContent = props =>{

    const {item,pipelineId,updateAfterConfig} = props

    const mirrorRefs = useRef(null)
    const [styleActiveLine,setStyleActiveLine] = useState(false)


    const onFocus = e => {
        setStyleActiveLine(true)
    }

    const onCancel = () =>{
        setStyleActiveLine(false)
        mirrorRefs.current.editor.setValue(item && item.scriptOrder===null?"":item.scriptOrder)
    }

    const onOk = () =>{
        const params = {
            values: {scriptOrder: mirrorRefs.current.editor.getValue()},
            pipeline:{pipelineId},
            taskType:item.type,
            configId:item.configId
        }
        updateAfterConfig(params)
        setStyleActiveLine(false)
    }

    return  <div className="config-scenario">
        <CodeMirror
            value={item && item.scriptOrder}//内容
            ref={mirrorRefs}
            options={{
                mode: item.type ===71 ? "ruby":"shell",//语言
                lineNumbers: true, // 是否显示行号
                lineWrapping:true,
                foldGutter: true,
                gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                styleActiveLine: styleActiveLine, //高亮
            }}
            onFocus={e=>onFocus(e)}
        />
        {
            styleActiveLine &&
            <div style={{paddingTop:8}}>
                <Btn
                    title={"取消"}
                    isMar={true}
                    onClick={()=>onCancel()}
                />
                <Btn
                    title={"保存"}
                    type={"primary"}
                    onClick={()=>onOk()}
                />
            </div>
        }
    </div>
}

export default MirrorContent

