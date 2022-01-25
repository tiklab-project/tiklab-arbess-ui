/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-16 14:47:06
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-10-26 15:51:14
 */
import React,{useState} from "react";
import { Transforms, Editor, Text, Node } from "slate";
import "./color.scss"
import { inject,observer } from "mobx-react";
const ColorEditor = (props) => {
    const {editor,slatestore} = props;
    const {editorType,setEditorType} = slatestore;
    const [isVisible,setIsVisible] = useState(false)
    const colors = [
        {   
            key: "ff0",
            value: "#ff0"
        },
        {   
            key: "f0f",
            value: "#f0f"
        },
        {   
            key: "00f",
            value: "#00f"
        },
        {   
            key: "f00",
            value: "#f00"
        },
    ]
    const showBox = (event) => {
        event.preventDefault();
        // setIsVisible(!isVisible)
        // setEditorType("color")
        if(editorType === "color") {
            setEditorType("")
        }else {
            const data = "color"
            setEditorType(data)

        }
    }
    const selectColor = (value) => {
        event.preventDefault();
        CustomEditor.toggleColorMark(editor,value)
    }

    // 富文本方法
    const CustomEditor = {
        isColorMarkActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: (n) => n.color === true,
                universal: true,
            });
    
            return !!match;
        },
        toggleColorMark(editor,color) {
            const isActive = CustomEditor.isColorMarkActive(editor,color);
            Transforms.setNodes(
                editor,
                { color: isActive ? null : color },
                { match: (n) => Text.isText(n), split: true }
            );
            // setIsVisible(!isVisible)
            setEditorType("")
        }
    };

    return (
        <div className="color-editor" key="color">
            <div onMouseDown={(event) => showBox(event)} className = "color-botton">
                <i className="iconfont iconfont-color"></i>
			</div>
            {
                editorType === "color" && 
                <div className="color-box">
                    {
                        colors.map((item,index)=> {
                            return <div 
                                    className="color-item"  
                                    key={item.value}
                                    onMouseDown = {(event)=>selectColor(item.value)}
                                    
                                >
                                    <span className="tool-item" style={{background: `${item.value}`}}>
                                    </span>
                                </div>
                        })
                    }
                </div>
            }
        </div>
    )
}
export default inject('slatestore')(observer(ColorEditor))