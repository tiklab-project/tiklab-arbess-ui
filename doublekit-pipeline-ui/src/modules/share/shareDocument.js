/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-14 11:20:08
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-16 09:14:44
 */
/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-09 09:18:21
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-13 13:56:29
 */
import React, { useMemo, useEffect, useCallback, useState, useRef } from "react";
import { inject, observer } from "mobx-react";
import { Row,Col,Input,Button  } from 'antd';
import PreviewEditor from "../wiki/common/components/edit-slate/previewEditor"
import "./shareDocument.scss"
import Share from "../wiki/common/components/share"
import { withRouter } from "react-router";
const ShareDocument = (props) => {
    const { shareStore } = props;
    
    const {documentView,commentView,judgeAuthCode} = shareStore;
    const [shareVisible,setShareVisible] = useState(false)
    const [value, setValue] = useState([
		{
			type: "paragraph",
			children: [{ text: "" }],
		},
	])
    const [docInfo, setDocInfo] = useState({name: "",likenumInt: "",commentNumber: ""})
    
    const [commonList,setCommonList] = useState()
    useEffect(()=> {
        console.log(props)
        judgeAuthCode({shareLink: `${props.match.params.shareId}${props.location.search}`}).then(data => {
            if(data.data === "true"){
                if(!props.location.state){
                    window.location.href=`http://192.168.2.3:3001/#/passWord/${props.match.params.id}/${props.match.params.shareId}${props.location.search}`
                }else {
                    commentView({documentId:props.match.params.id}).then(data => {
                        console.log(data)
                        if (data.code === 0) {
                            setCommonList(data.data)
                        }
                    })
                    documentView({documentId:props.match.params.id}).then((data) => {
                        if (data.code === 0) {
                            if(data.data.details){
                                setValue(JSON.parse(data.data.details))
                                console.log()
                            }else {
                                setValue([
                                    {
                                        type: "paragraph",
                                        children: [{ text: "" }],
                                    },
                                ])
                            }
                            setDocInfo(data.data)
                        }
                    })
                }
            }
            if(data.data === "false") {
                commentView({documentId:props.match.params.id}).then(data => {
                        console.log(data)
                        if (data.code === 0) {
                            setCommonList(data.data)
                        }
                })
                documentView({documentId:props.match.params.id}).then((data) => {
                    if (data.code === 0) {
                        if(data.data.details){
                            setValue(JSON.parse(data.data.details))
                            console.log()
                        }else {
                            setValue([
                                {
                                    type: "paragraph",
                                    children: [{ text: "" }],
                                },
                            ])
                        }
                        setDocInfo(data.data)
                    }
                })
            }
        })
        
    },[])
    // useEffect(() => {
    //     commentView({documentId:documentId}).then(data => {
    //         console.log(data)
    //         if (data.code === 0) {
    //             setCommonList(data.data)
    //         }
    //     })
    //     documentView({documentId:documentId}).then((data) => {
	// 		if (data.code === 0) {
	// 			if(data.data.details){
    //                 setValue(JSON.parse(data.data.details))
    //                 console.log()
    //             }else {
    //                 setValue([
    //                     {
    //                         type: "paragraph",
    //                         children: [{ text: "" }],
    //                     },
    //                 ])
    //             }
    //             setDocInfo(data.data)
	// 		}
	// 	})
    // }, [documentId])
    // const renderLeaf = useCallback((props) => {
    // 	return <Leaf {...props} />;
    // }, []);
    // const editor = useMemo(() => withReact(createEditor()), [])
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
    // const announce = () => {
    //     const data = {
    //         document: {
    //             id: documentId
    //         },
    //         details: commontContent,
    //         user: {id:JSON.parse(localStorage.getItem("authConfig")).id}
    //     }
    //     createComment(data).then(data=> {
    //         findCommentPage({documentId:documentId}).then(data => {
    //             console.log(data)
    //             if (data.code === 0) {
    //                 setCommonList(data.data)
    //             }
    //         })
    //     })
    // }
    //回复评论
    const [reply,setReply] = useState()

    // const announceReply = (id) => {
    //     const data = {
    //         firstOneCommentId: id,
    //         parentCommentId: id,
    //         document: {
    //             id: documentId
    //         },
    //         details: commontContent,
    //         user: {id:JSON.parse(localStorage.getItem("authConfig")).id}
    //     }
    //     createComment(data).then(data=> {
    //         findCommentPage({documentId:documentId}).then(data => {
    //             console.log(data)
    //             if (data.code === 0) {
    //                 setReply(null)
    //                 setCommonList(data.data)
    //             }
    //         })
    //     })
    // }

    const [childrenReply,setChildrenReply] = useState()
    // const announceThirdReply = (firstOneCommentId,parentCommentId) => {
    //     const data = {
    //         firstOneCommentId: firstOneCommentId,
    //         parentCommentId: parentCommentId,
    //         document: {
    //             id: documentId
    //         },
    //         details: commontContent,
    //         user: {id:JSON.parse(localStorage.getItem("authConfig")).id}
    //     }
    //     createComment(data).then(data=> {
    //         findCommentPage({documentId:documentId}).then(data => {
    //             console.log(data)
    //             if (data.code === 0) {
    //                 setChildrenReply(null)
    //                 setCommonList(data.data)
    //             }
    //         })
    //     })
    // }

    // 点赞
    // const addDocLike = () => {
    //     const data = {
    //         toWhomId: documentId,
    //         likeUser: {id: JSON.parse(localStorage.getItem("authConfig")).id},
    //         likeType: "doc"
    //     }
    //     createLike(data)
    // }
    return (
        <div className="document-examine">
        <Row style={{height: "100%"}}>
            <Col className="wikidetail-content-col" xl={{span: 18,offset:3}} lg={{span: 20,offset:2}}>
            <div>
                <div className="examine-title" style={{marginTop: "20px"}}>{docInfo.name}<span className="examine-type">类型：{docInfo.type === "doc" ? "文档" : "目录"}</span></div>
                <PreviewEditor value={value} onChange={(value) => initTemplate(value)} />
                <div className="examine-comment">
                    <span className="comment-item">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icondianzan"></use>
                        </svg>
                        <span className="number">({docInfo.likenumInt}条)</span>
                    </span>
                    <span className="comment-item" >
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#iconpinglun"></use>
                        </svg>
                        <span className="number">({docInfo.commentNumber}条)</span>
                    </span>
                    <span className="comment-item" onClick = {()=>setShareVisible(true)}>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#iconfenxiang"></use>
                        </svg>
                        <span className="number">(100条)</span>
                    </span>
                </div>
                {/* <div className="edit-comment">
                    <svg className="user-icon" aria-hidden="true">
                        <use xlinkHref="#icon1_user5"></use>
                    </svg>
                    <Input placeholder="请输入评论" onChange={value => commonInput(value)}/>
                    <Button type="primary" onClick = {()=> announce()}>发布</Button>
                </div> */}
                <div className="comment-list">
                    <div className="title">评论({docInfo.commentNumber}条)</div>
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
                                {/* <div className="comment-operate">
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
                                </div> */}
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
                                                {/* <div className="comment-operate">
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
                                                </div> */}
                                            </div>
                                            
                                        })
                                }
                            </div>
                        })
                    }
                </div>
            </div>
            </Col>
            </Row>
        </div>
    )
}

export default inject("shareStore")(observer(withRouter(ShareDocument)));