/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-16 14:47:06
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-27 18:22:14
 */
import React,{ Fragment,useState } from "react";
import { Transforms, Editor, Location, Point,Element as SlateElement,Range } from "slate";
import "./image.scss"
const withImage = editor => {
    const { insertData, insertText, isVoid,isInline } = editor
    editor.isVoid = element => {
        return element.type === 'image' ? true : isVoid(element)
    }
    editor.isInline = element => {
        return element.type === 'attachment' ? true : isInline(element)
    }
    // editor.insertText = text => {
    //     if (text) {
    //         wrapImage(editor, text)
    //     } else {
    //         insertText(text)
    //     }
    // }
    // editor.insertData = data => {
    //     const text = data.getData('text/plain')

    //     if (text) {
    //         wrapImage(editor, text)
    //     } else {
    //         insertData(data)
    //     }
    // }
    return editor
}

const ImageEditor = (props) => {
    const {editor} = props;
    const [showFrom,setShowFrom] = useState(false)
    const [select,setImageAnchor] = useState()
    const insertImage = (editor) => {
        console.log(editor)
        event.preventDefault()
        setImageAnchor(editor.selection)
        setShowFrom(!showFrom)
        
    }
    
    const submit = (editor) => {
        const url = document.getElementsByName("image-url")[0].value;
        if (select) {
            wrapImage(editor, url)
        }
        setShowFrom(!showFrom)
    }
    const isImageActive = editor => {
        const [image] = Editor.nodes(editor, {
            match: n =>
                !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'image',
        })
        return !!image
    }
    
    const unwrapImage = editor => {
        Transforms.unwrapNodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'image',
        })
    }
    
    const wrapImage = (editor, url) => {
        if (isImageActive(editor)) {
            unwrapImage(editor)
        }
        Transforms.select(editor, select); 
        const { selection } = editor
        const isCollapsed = selection && Range.isCollapsed(selection)
        const image = {
            type: 'image',
            url,
            children: isCollapsed ? [{ text: "" }] : [],
        }
        if (isCollapsed) {
            Transforms.insertNodes(editor, image)
        } 
        // else {
        //     Transforms.wrapNodes(editor, image, { split: true })
        //     Transforms.collapse(editor, { edge: 'end' })
        // }
    }
    return (
        <div className="image-tool" key="image">
            <span className="tool-item" 
                onMouseDown = {(event) => 
                    {
                        
                        insertImage(editor)
                    }
                }
            >
                <i className="iconfont iconimage"></i>
            </span>
            {
                showFrom &&  <div className="image-from">
                    <span>url: </span><input type="text" name="image-url"/>
                    <div onClick={() => submit(editor)}>确定</div>
                </div>
            }   
        </div>
        
    )
}
export default ImageEditor;

export {withImage};
