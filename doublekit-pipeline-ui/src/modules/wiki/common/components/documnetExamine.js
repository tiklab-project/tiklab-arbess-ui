/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-10-22 15:38:49
 */
import React, { useMemo, useEffect, useCallback, useState, useRef } from "react";
import { inject, observer } from "mobx-react";
import { Divider,Input,Button  } from 'antd';
import PreviewEditor from "./edit-slate/previewEditor"
import "./documentExamine.scss"
import Share from "./share"
const DocumentExamine = (props) => {
    const { docDetail, docInfo,wikiCommon,value } = props;
    const documentId = localStorage.getItem("documentId");
    const {createComment,findCommentPage,createLike,createShare,updateShare} = wikiCommon
    const [shareVisible,setShareVisible] = useState(false)
    const [commonList,setCommonList] = useState()
    useEffect(() => {
        console.log(value)
        findCommentPage({documentId:documentId}).then(data => {
            console.log(data)
            if (data.code === 0) {
                setCommonList(data.data)
            }
        })
    }, [documentId])
    const initTemplate = (value) => {
        // setValue(value)
        // const serialize = JSON.stringify(value)
        // const data = {
        // 	id: documentId,
        // 	details: serialize
        // }
        // updateDocument(data)
    }
    const [commontContent,setCommontContent] = useState()
    const commonInput = (value) => {
        // console.log(value)
        setCommontContent(value.target.value)
    }
    const announce = () => {
        const data = {
            document: {
                id: documentId
            },
            details: commontContent,
            user: {id:JSON.parse(localStorage.getItem("authConfig")).id}
        }
        createComment(data).then(data=> {
            findCommentPage({documentId:documentId}).then(data => {
                console.log(data)
                if (data.code === 0) {
                    setCommonList(data.data)
                }
            })
        })
    }
    //回复评论
    const [reply,setReply] = useState()

    const announceReply = (id) => {
        const data = {
            firstOneCommentId: id,
            parentCommentId: id,
            document: {
                id: documentId
            },
            details: commontContent,
            user: {id:JSON.parse(localStorage.getItem("authConfig")).id}
        }
        createComment(data).then(data=> {
            findCommentPage({documentId:documentId}).then(data => {
                console.log(data)
                if (data.code === 0) {
                    setReply(null)
                    setCommonList(data.data)
                }
            })
        })
    }

    const [childrenReply,setChildrenReply] = useState()
    const announceThirdReply = (firstOneCommentId,parentCommentId) => {
        const data = {
            firstOneCommentId: firstOneCommentId,
            parentCommentId: parentCommentId,
            document: {
                id: documentId
            },
            details: commontContent,
            user: {id:JSON.parse(localStorage.getItem("authConfig")).id}
        }
        createComment(data).then(data=> {
            findCommentPage({documentId:documentId}).then(data => {
                console.log(data)
                if (data.code === 0) {
                    setChildrenReply(null)
                    setCommonList(data.data)
                }
            })
        })
    }

    // 点赞
    const addDocLike = () => {
        const data = {
            toWhomId: documentId,
            likeUser: {id: JSON.parse(localStorage.getItem("authConfig")).id},
            likeType: "doc"
        }
        createLike(data)
    }
    return (
        <div className="document-examine">
            <Divider />
            <div>
                <div className="examine-title">{docInfo.name}<span className="examine-type">类型：{docDetail.type === "doc" ? "文档" : "目录"}</span></div>
                <PreviewEditor value={value} onChange={(value) => initTemplate(value)} />
                
                <div className="examine-comment" >
                    <span className="comment-item" onClick={addDocLike}>
                        {docInfo.isLike ? <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icondianzan-copy"></use>
                        </svg>: <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icondianzan"></use>
                        </svg>}
                        <span className="number">({docInfo.likenumInt || 0}条)</span>
                    </span>
                    <span className="comment-item" >
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#iconpinglun"></use>
                        </svg>
                        <span className="number">({docInfo.commentNumber || 0}条)</span>
                    </span>
                    <span className="comment-item" onClick = {()=>setShareVisible(true)}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#iconfenxiang"></use>
                        </svg>
                    </span>
                </div>
                <div className="edit-comment">
                    <svg className="user-icon" aria-hidden="true">
                        <use xlinkHref="#icon1_user5"></use>
                    </svg>
                    <Input placeholder="请输入评论" onChange={value => commonInput(value)}/>
                    <Button type="primary" onClick = {()=> announce()}>发布</Button>
                </div>
                <div className="comment-list">
                    <div className="title">评论({docInfo.commentNumber || 0}条)</div>
                    {
                        commonList && commonList.map(item=> {
                            return <div className="comment-item" key = {item.id}>
                                <div className="comment-user">
                                    <svg className="user-icon" aria-hidden="true">
                                        <use xlinkHref="#icon1_user5"></use>
                                    </svg>
                                    <span className="user-name">{item.user.name}</span>
                                </div>
                                <div className="comment-content">
                                    {item.details}
                                </div>
                                <div className="comment-operate">
                                    <span>编辑</span>
                                    <span>删除</span>
                                    <span onClick={()=> setReply(item.id)}>回复</span>
                                    <span>赞</span>
                                </div>
                                <div className={`edit-comment ${reply === item.id ? "edit-comment-show": "edit-comment-hidden"}`}>
                                    <svg className="user-icon" aria-hidden="true">
                                        <use xlinkHref="#icon1_user5"></use>
                                    </svg>
                                    <Input placeholder="请输入评论" onChange={value => commonInput(value)}/>
                                    <Button type="primary" onClick = {()=> announceReply(item.id)}>发布</Button>
                                </div>
                                {
                                    item.commentList && item.commentList.map(children=> {
                                            return <div className="comment-item commnet-children-item" key = {children.id}>
                                                <div className="comment-user">
                                                    <svg className="user-icon" aria-hidden="true">
                                                        <use xlinkHref="#icon1_user5"></use>
                                                    </svg>
                                                    <span className="user-name">{children.user.name}回复了：{children.aimAtUser.name}</span>
                                                </div>
                                                <div className="comment-content">
                                                    {children.details}
                                                </div>
                                                <div className="comment-operate">
                                                    <span>编辑</span>
                                                    <span>删除</span>
                                                    <span onClick={()=> setChildrenReply(children.id)}>回复</span>
                                                    <span>赞</span>
                                                </div>
                                                <div className={`edit-comment ${childrenReply === children.id ? "edit-comment-show": "edit-comment-hidden"}`}>
                                                    <svg className="user-icon" aria-hidden="true">
                                                        <use xlinkHref="#icon1_user5"></use>
                                                    </svg>
                                                    <Input placeholder="请输入评论" onChange={value => commonInput(value)}/>
                                                    <Button type="primary" onClick = {()=> announceThirdReply(item.id,children.id)}>发布</Button>
                                                </div>
                                            </div>
                                            
                                        })
                                }
                            </div>
                        })
                    }
                </div>
            </div>
            <Share shareVisible = {shareVisible} setShareVisible = {setShareVisible} docInfo = {docInfo} createShare = {createShare} updateShare = {updateShare}/>
        </div>
    )
}

export default inject("wikiCommon")(observer(DocumentExamine));