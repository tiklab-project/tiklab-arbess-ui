/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-26 09:37:52
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-27 18:21:24
 */
import React,{ Fragment,useState } from "react";
import { Transforms, Editor, Location, Point,Element as SlateElement,Range } from "slate";
import Tabs from "./tabs"
import emoji1 from "../../../../../assets/images/1f60d.png"
import emoji2 from "../../../../../assets/images/1f60b.png"
import emoji3 from "../../../../../assets/images/1f603.png"
import "./emoji.scss"

const images = [
    {
        src: emoji1,
        key: 1
    },
    {
        src: emoji2,
        key: 2
    },
    {
        src: emoji3,
        key: 3
    }
]
const withEmoji = editor => {
    const { isInline } = editor
    editor.isInline = element => {
        return element.type === 'emoji' ? true : isInline(element)
    }
    return editor
}
const Emoji = (props) => {
    const {editor} = props;
    const [showDrop,setShowDrop] = useState(false)
    const [select,setEmojiSelect] = useState()
    const showDropdown = (editor) => {
        event.preventDefault()
        setEmojiSelect(editor.selection)
        setShowDrop(!showDrop)
    }
    const insertEmoji = (editor,src) => {
        Transforms.select(editor, select); 
        const { selection } = editor
        const isCollapsed = selection && Range.isCollapsed(selection)
        const emoji = {
            type: 'emoji',
            src,
            children: isCollapsed ? [{ text: "" }] : [],
        }
        if (isCollapsed) {
            Transforms.insertNodes(editor, emoji)
        }
        setShowDrop(!showDrop)
    }
    return (
        <div className="emoji-tool" key="emoji">
            <span className="tool-item" 
                onMouseDown = {(event) =>{showDropdown(editor)}}
            >
                <i className="iconfont iconemoji1"></i>
            </span>
            {
                showDrop &&  <div className="emoji-box">
                    <Tabs>
                        <div name="表情" kwy="1">
                            <div className="emoji-contant">
                                {
                                    images.map(item => {
                                        return <div className="emoji-img" key={item.key} onMouseDown = {()=> {insertEmoji(editor,item.src)}}>
                                            <img src={item.src} alt="" />
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        <div name="手势" key="2">3456</div>
                    </Tabs>
                </div>
            }   
        </div>
    )
}
export default Emoji;
export {
    withEmoji
}