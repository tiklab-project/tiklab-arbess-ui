/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-13 11:23:54
 */
import React,{Fragment,useEffect,useRef,useState,useImperativeHandle} from "react";
import E from "wangeditor";
import "./wangEdit.scss";
import {inject,observer} from "mobx-react";
import AlertMenu from "./buttonEditor";
import AttachmentEditor from "./edit-wang/attachmentEditor/index.js.js"
const DocumentEditor = (props)=>{
    const { editRef,docDetail,setDocDetail } = props;
    // const { docDetail } = WikiCatalogueStore;
    const editToolbar = useRef();
    const editText = useRef();
    const [content,setContent] = useState()
    // 菜单 key ，各个菜单不能重复
    const menuKey = 'alertMenuKey' 
    const attachmentEditor = "attachmentEditor";
    // 注册菜单
    E.registerMenu(menuKey, AlertMenu)
    E.registerMenu(attachmentEditor, AttachmentEditor)
    useEffect(()=>{
        initEditor(docDetail.content)
    },[]);
    const initEditor = (value) =>{
        const editor = new E(editToolbar.current, editText.current);
        editor.config.onchange = html => {
            const contant = editor.txt.html();
            setContent(contant)
        }
        editor.config.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'emoticon',  // 表情
            'image',  // 插入图片
            'table',  // 表格
            'video',  // 插入视频
            'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
        ]
        editor.config.colors = [
            '#000000',
            '#eeece0',
            '#1c487f',
            '#4d80bf'
        ]
        editor.create()
        editor.txt.html(value)
    }

    const submit = () => {
        let title = document.getElementById("editTitle");
        const data = {
            title: title.innerHTML,
            content: content
        }
        setDocDetail(data)
        
    };

    useImperativeHandle(editRef,()=> ({
        submit: submit
    }))
    
    return (
        <div className="document-edit">
            <div className="edit-toolbar" ref={editToolbar}></div>
            <div className="edit-title">标题：<span suppressContentEditableWarning contentEditable = "true" style={{outline: "none"}} id="editTitle">{docDetail.title}</span></div>
            <div className="edit-text" ref={editText}></div>
        </div>
    )
}

// export default DocumentEditor;
export default inject("WikiCatalogueStore")(observer(DocumentEditor));
