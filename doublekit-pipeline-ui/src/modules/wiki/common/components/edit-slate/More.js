/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-16 14:47:06
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-10-28 19:32:39
 */
import React,{useState} from "react";
import { Transforms, Editor, Text } from "slate";
import "./More.scss"
import WorkModal from "./table/workTable/workModal"
import { inject, observer } from "mobx-react";
const  MoreEditor = (props) => {
    const {editor,slatestore} = props;
    // const [isVisible,setIsVisible] = useState(false)
    const {editorType,setEditorType} = slatestore;
    // const {workModalVisible, setWorkModalVisible} = useState(false)
    const { workModalVisible, setWorkModalVisible } = slatestore;
    
    const [select, setTableAnchor] = useState()
    const showBox = (event) => {
        event.preventDefault();
        // setIsVisible(!isVisible)
        setTableAnchor(editor.selection)
        if(editorType === "more") {
            setEditorType("")
        }else {
            const data = "more"
            setEditorType(data)
        }
    }
    const selectLineHeight = (value) => {
        event.preventDefault();
        setWorkModalVisible(true)
        
        // CustomEditor.toggleLineHeightMark(editor,value)
    }

    // 富文本方法
    const CustomEditor = {
        isLineHeightMarkActive(editor) {
            const [match] = Editor.nodes(editor, {
                match: (n) => n.more === true,
                universal: true,
            });
    
            return !!match;
        },
        toggleLineHeightMark(editor,value) {
            const isActive = CustomEditor.isLineHeightMarkActive(editor);
            Transforms.setNodes(
                editor,
                { more: isActive ? null : value},
                { match: (n) =>  Text.isText(n), split: true}
            );
            setIsVisible(!isVisible)
        }
    }
    return (
        <div className="more-editor" key="more">
            <div onMouseDown={(event) => showBox(event)} className = "more-botton" >
                更多
                <i className="iconfont iconOther-2"></i>
            </div>
            {
                editorType === "more" && <div className="more-box" >
                    <div className={`more-item`} 
                        key = "work"
                        onMouseDown = {()=> selectLineHeight()} 
                    >
                        导入事项
                    </div>
                </div>
            }
            <WorkModal workModalVisible = {workModalVisible} setWorkModalVisible = {setWorkModalVisible} select= {select} editor ={editor}/>
        </div>
        
    )
}
export default inject('slatestore')(observer(MoreEditor));