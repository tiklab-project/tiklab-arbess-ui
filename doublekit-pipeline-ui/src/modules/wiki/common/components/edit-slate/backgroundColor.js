/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-16 14:47:06
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-10-28 18:15:42
 */
import React,{useState} from "react";
import { Transforms, Editor, Text, Node } from "slate";
import { inject,observer } from "mobx-react";
import "./backgroundColor.scss"
const BackgroundColor = (props) => {
    const {editor,slatestore} = props;
    const {editorType,setEditorType} = slatestore;
    const backgroundColors = [
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
    const [isVisible,setIsVisible] = useState(false)
    const showBox = (event) => {
        event.preventDefault();
        // setIsVisible(!isVisible)
            if(editorType === "backgroundColor") {
                setEditorType("")
            }else {
                const data = "backgroundColor"
                setEditorType(data)
            }
    }
    const selectBackgroundColor = (value) => {
        event.preventDefault();
        CustomEditor.toggleBackgroundColorMark(editor,value)
    }

    // 富文本方法
    const CustomEditor = {
        isBackgroundColorMarkActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: (n) => n.backgroundColor === true,
                universal: true,
            });
    
            return !!match;
        },
        toggleBackgroundColorMark(editor,backgroundColor) {
            const isActive = CustomEditor.isBackgroundColorMarkActive(editor,backgroundColor);
            Transforms.setNodes(
                editor,
                { backgroundColor: isActive ? null : backgroundColor },
                { match: (n) => Text.isText(n), split: true }
            );
            setIsVisible(!isVisible)
        }
    };

    return (
        <div className="backgroundColor-editor" key="backgroundColor">
            <div onMouseDown={(event) => showBox(event)} className = "backgroundColor-botton">
                <i className="iconfont iconchuangzuo"></i>
			</div>
            {
                editorType === "backgroundColor" && <div className="backgroundColor-box">
                    {
                        backgroundColors.map((item,index)=> {
                            return <div 
                                    className="backgroundColor-item"  
                                    key={item.value}
                                    onMouseDown = {(event)=>selectBackgroundColor(item.value)}
                                    
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
// export default BackgroundColor;
export default inject('slatestore')(observer(BackgroundColor))