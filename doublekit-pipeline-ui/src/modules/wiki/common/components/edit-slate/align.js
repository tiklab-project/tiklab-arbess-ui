/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-16 14:47:06
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-10-27 15:00:34
 */
import React,{useState} from "react";
import { Transforms, Editor, Element } from "slate";
import "./align.scss"
import { inject,observer } from "mobx-react";
const AlignEditor = (props) => {
    const {editor,slatestore} = props;
    const {editorType,setEditorType} = slatestore;
    const aligns = [
        {   
            icon: "iconalign-left",
            value: "left"
        },
        {   
            icon: "iconalign-right",
            value: "right"
        },
        {   
            icon: "iconalign-justify",
            value: "justify"
        },
        {   
            icon: "iconalign-center",
            value: "center"
        },
    ]
    const [isVisible,setIsVisible] = useState(false)
    const showBox = (event) => {
        event.preventDefault();
        if(editorType === "align") {
            setEditorType("")
        }else {
            const data = "align"
            setEditorType(data)

        }
        
        console.log(editorType)
        // setIsVisible(!isVisible)
    }
    const selectAlign = (value) => {
        event.preventDefault();
        CustomEditor.toggleAlignMark(editor,value)
    }

    // 富文本方法
    const CustomEditor = {
        isAlignMarkActive(editor,align) {
            const [match] = Editor.nodes(editor, {
                match: n =>
                    !Editor.isEditor(n) &&
                    Element.isElement(n) &&
                    n.type === "align" && n.align === align,
            })
            return !!match;
        },
        toggleAlignMark(editor,align) {
            const isActive = CustomEditor.isAlignMarkActive(editor,align);
            Transforms.unwrapNodes(editor, {
                match: n => !Editor.isEditor(n) && Element.isElement(n) && n.type === "align",
                split: true,
            })
            const block = { type: "align",align: align, children: [] }
            Transforms.wrapNodes(editor, block)
            // setIsVisible(!isVisible)
            setEditorType("")
        }
    };

    return (
        <div className="align-editor" key="align">
            <div onMouseDown={(event) => showBox(event)} className = "align-botton">
                <i className="iconfont iconalign-justify"></i>
			</div>
            {
                editorType === "align" && <div className="align-box">
                    {
                        aligns.map((item,index)=> {
                            return <div 
                                    className="align-item"  
                                    key={item.value}
                                    onMouseDown = {(event)=>selectAlign(item.value)}
                                >
                                    <span className="tool-item">
                                        <i className={`iconfont ${item.icon}`} 
                                        
                                        data-value={item.value}></i>
                                    </span>
                                </div>
                        })
                    }
                </div>
            }
        </div>
    )
}
// export default AlignEditor;
export default inject('slatestore')(observer(AlignEditor))