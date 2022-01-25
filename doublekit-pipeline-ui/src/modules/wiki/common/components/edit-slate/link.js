/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-16 14:47:06
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-20 17:22:34
 */
import React,{ Fragment,useState } from "react";
import { Transforms, Editor, Location, Point,Element as SlateElement,Range } from "slate";
import "./link.scss"
const withLinks = editor => {
    const { insertData, insertText, isInline } = editor
    editor.isInline = element => {
        return element.type === 'link' ? true : isInline(element)
    }
    
    // editor.insertText = text => {
    //     if (text) {
    //         wrapLink(editor, text)
    //     } else {
    //         insertText(text)
    //     }
    // }
    // editor.insertData = data => {
    //     const text = data.getData('text/plain')

    //     if (text) {
    //         wrapLink(editor, text)
    //     } else {
    //         insertData(data)
    //     }
    // }
    return editor
}

const LinkEditor = (props) => {
    const {editor} = props;
    const [showFrom,setShowFrom] = useState(false)
    const [select,setLinkAnchor] = useState()
    const insertLink = (editor) => {
        event.preventDefault()
        setLinkAnchor(editor.selection)
        setShowFrom(!showFrom)
    }
    
    const submit = (editor) => {
        const url = document.getElementsByName("link-url")[0].value;
        const text = document.getElementsByName("link-text")[0].value;
        if (select) {
            wrapLink(editor, url,text)
            
        }
        setShowFrom(!showFrom)
    }
    const isLinkActive = editor => {
        const [link] = Editor.nodes(editor, {
            match: n =>
                !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
        })
        return !!link
    }
    
    const unwrapLink = editor => {
        Transforms.unwrapNodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
        })
    }
    
    const wrapLink = (editor, url, text) => {
        if (isLinkActive(editor)) {
            unwrapLink(editor)
        }
        Transforms.select(editor, select); 
        const { selection } = editor
        const isCollapsed = selection && Range.isCollapsed(selection)
        const link = {
            type: 'link',
            url,
            children: isCollapsed ? [{ text: text }] : [],
        }
        if (isCollapsed) {
            Transforms.insertNodes(editor, link)
        } else {
            Transforms.wrapNodes(editor, link, { split: true })
            Transforms.collapse(editor, { edge: 'end' })
        }
    }
    return (
        <div className="link-tool" key="link">
            <span className="tool-item" 
                onMouseDown = {(event) => 
                    {
                        
                        insertLink(editor)
                    }
                }
            >
                <i className="iconfont iconlink"></i>
            </span>
            {
                showFrom &&  <div className="link-from">
                    <span>url: </span><input type="text" name="link-url"/>
                    <span>text: </span><input type="text" name="link-text"/>
                    <div onClick={() => submit(editor)}>确定</div>
                </div>
            }   
        </div>
        
    )
}
export default LinkEditor;

export {withLinks};
