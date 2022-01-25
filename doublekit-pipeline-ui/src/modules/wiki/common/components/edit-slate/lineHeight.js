/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-16 14:47:06
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-12-20 15:04:53
 */
/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-16 14:47:06
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-16 16:10:30
 */
import React,{useState} from "react";
import { Transforms, Editor, Text } from "slate";
import "./lineHeight.scss"
import { inject,observer } from "mobx-react";
const LineHeightEditor = (props) => {
    const {editor,slatestore} = props;
    // const [isVisible,setIsVisible] = useState(false)
    const {editorType,setEditorType} = slatestore;
    const showBox = (event) => {
        event.preventDefault();
        // setIsVisible(!isVisible)
        if(editorType === "lineHeight") {
            setEditorType("")
        }else {
            const data = "lineHeight"
            setEditorType(data)
        }
    }
    const selectLineHeight = (value) => {
        event.preventDefault();
        CustomEditor.toggleLineHeightMark(editor,value)
    }

    // 富文本方法
    const CustomEditor = {
        isLineHeightMarkActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: (n) => n.lineHeight === true,
                universal: true,
            });
    
            return !!match;
        },
        toggleLineHeightMark(editor,value) {
            const isActive = CustomEditor.isLineHeightMarkActive(editor);
            Transforms.setNodes(
                editor,
                { lineHeight: isActive ? null : value},
                { match: (n) =>  Text.isText(n), split: true}
            );
            setEditorType("")
        }
    }
    const lineHeight = [1, 1.5, 2, 3, 4]
    return (
        <div className="lineHeight-editor" key="lineHeight">
            <div onMouseDown={(event) => showBox(event)} className = "lineHeight-botton" >
                行间距
            </div>
            {
                editorType === "lineHeight" && <div className="lineHeight-box">
                    {
                        lineHeight.map((item,index)=> {
                            return <div className={`lineHeight-item`} 
                                key = {index}
                                onMouseDown = {()=> selectLineHeight(item)} 
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
// export default LineHeightEditor;
export default inject('slatestore')(observer(LineHeightEditor))