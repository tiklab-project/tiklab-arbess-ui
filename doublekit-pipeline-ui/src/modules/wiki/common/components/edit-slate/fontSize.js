
/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-16 14:47:06
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-12-20 15:04:32
 */
import React,{useState} from "react";
import { Transforms, Editor, Text } from "slate";
import "./fontSize.scss"
import { inject,observer } from "mobx-react";
const FontSize = (props) => {
    const {editor,slatestore} = props;
    const {editorType,setEditorType} = slatestore;
    // const [isVisible,setIsVisible] = useState(false)
    const showBox = (event) => {
        event.preventDefault();
        // setIsVisible(!isVisible)
        if(editorType === "fontSize") {
            setEditorType("")
        }else {
            const data = "fontSize"
            setEditorType(data)
        }
    }
    const selectFontSize = (value) => {
        event.preventDefault();
        CustomEditor.toggleFontSizeMark(editor,value)
    }

    // 富文本方法
    const CustomEditor = {
        isFontSizeMarkActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: (n) => n.fontSize === true,
                universal: true,
            });
    
            return !!match;
        },
        toggleFontSizeMark(editor,value) {
            const isActive = CustomEditor.isFontSizeMarkActive(editor,value);
            Transforms.setNodes(
                editor,
                { fontSize: isActive ? null : value},
                { match: (n) => Text.isText(n), split: true }
            );
            setEditorType("")
        }
    }
    const fontSize = ["10px","13px","16px","18px","24px","36px"]
    return (
        <div className="fontSize-editor" key="fontSize">
            <div onMouseDown={(event) => showBox(event)} className = "fontSize-botton">
                字号
			</div>
            {
                editorType === "fontSize" && <div className="fontSize-box">
                    {
                        fontSize.map((item,index)=> {
                            return <div className={`fontSize-item`} 
                                key = {index}
                                onMouseDown = {()=> selectFontSize(item)} 
                            >
                                {item}
                            </div>
                        })
                    }
                </div>
            }
        </div>
        
    )
}
// export default FontSize;
export default inject('slatestore')(observer(FontSize))