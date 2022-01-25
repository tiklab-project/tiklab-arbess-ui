/*
 * @Descripttion: 知识库详情页面左侧导航栏
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:05:16
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-12-22 14:33:43
 */

import React, { Fragment, useState, useEffect } from 'react';
import "../../../../assets/font-icon/iconfont.css";
import { withRouter } from "react-router-dom";
import { observer, inject } from "mobx-react";
import { Menu, Dropdown, Button, Modal, Layout, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import AddLog from "./addLog"
import ChangeWikiModal from "./changeWikiModal"
import MoveLogList from "./moveLogList"
import TemplateList from "./templateList"
import { PrivilegeProject } from "doublekit-privilege-ui";   
const { Sider } = Layout;
const WikideAside = (props) => {
    // 解析props
    const [form] = Form.useForm();
    const { searchwiki, wikiName, wikilist, WikiCatalogueStore} = props
    //语言包
    const { t } = useTranslation();
    const { findWikiCatalogue, updateWikiCatalogue,
        deleteWikiLog, updateDocument, deleteDocument,findDmPrjRolePage,wikiCatalogueList,setWikiCatalogueList} = WikiCatalogueStore;
    
    // 当前选中目录id
    const [selectKey, setSelectKey] = useState();
    // 菜单是否折叠
    const [isShowText, SetIsShowText] = useState(true)
    // 是否显示弹窗
    const [changeWikiVisible, setChangeWikiVisible] = useState(null)
    // 当前知识库id
    const wikiId = localStorage.getItem("wikiId")
    // 显示菜单操作icon
    const [isHover, setIsHover] = useState(false)

    const [changeTemplateVisible, setChangeTemplateVisible] = useState()

    const [templateId, setTemplateId] = useState()

    // 模板内容
    const [contentValue, setContentValue] = useState([
        {
            type: "paragraph",
            children: [{ text: "" }],
        },
    ])
    useEffect(() => {
        findWikiCatalogue(wikiId).then((data) => {
            setWikiCatalogueList({...data})
        })
    }, [])

    useEffect(() => {
        // 初次进入激活导航菜单
        setSelectKey(props.location.pathname)
        return
    }, [wikiId])

    /**
     * 点击左侧菜单
     * @param {*} key 
     */
    const selectKeyFun = (id, formatType) => {
        setSelectKey(id)
        if (formatType === "category") {
            localStorage.setItem("categoryId", id);
            props.history.push(`/index/wikidetail/folder/${id}`)
        }
        if (formatType === "document") {
            localStorage.setItem("documentId", id);
            props.history.push(`/index/wikidetail/doc/${id}`)
        }
    }

    /**
     * 点击折叠或展开菜单栏
     */
    const toggleCollapsed = () => {
        SetIsShowText(!isShowText)
    }
    /**
     * 显示切换知识库弹窗
     */
    const showModal = () => {
        setChangeWikiVisible(true)
    };

    // 添加按钮下拉菜单
    const addMenu = (id) => {
        return <Menu onClick={(value) => selectAddType(value, id)}>
            <Menu.Item key="category">
                添加目录
            </Menu.Item>
            <Menu.Item key="document">
                添加页面
            </Menu.Item>
        </Menu>
    };

    // 编辑
    const editMenu = (id, formatType, fid) => {
        return <Menu onClick={(value) => editCatelogue(value, id, formatType, fid)}>
            <Menu.Item key="edit">
                重命名
            </Menu.Item>
            <Menu.Item key="delete">
                删除
            </Menu.Item>
            <Menu.Item key="move">
                移动
            </Menu.Item>
        </Menu>
    };

    /**
     * 添加目录
     */
    const [catalogueId, setCatalogueId] = useState()
    const [userList,setUserList] = useState()
    const selectAddType = (value, id) => {
        setCatalogueId(id)
        findDmPrjRolePage(wikiId).then(data=> {
            setUserList(data.dataList)
        })
        if(value.key === "category") {
            setAddModalVisible(true)
        }else {
            setChangeTemplateVisible(true)
        }
        // 
        form.setFieldsValue({
            formatType: value.key
        })
    }
    /**
     * 更新目录
     */
    const inputRef = React.useRef(null);
    const [isRename, setIsRename] = useState()
    const editCatelogue = (value, id, formatType, fid) => {
        value.domEvent.stopPropagation()
        if (value.key === "edit") {
            setIsRename(id)
        }
        if (value.key === "delete") {
            if (formatType === "category") {
                deleteWikiLog(id).then(data => {
                    if (data.code === 0) {
                        findWikiCatalogue(wikiId).then((data) => {
                            setWikiCatalogueList(data)
                        })
                    }
                })
            }
            if (formatType === "document") {
                deleteDocument(id).then(data => {
                    if (data.code === 0) {
                        findWikiCatalogue(wikiId).then((data) => {
                            setWikiCatalogueList(data)
                        })
                    }
                })
            }
        }
        if (value.key === "move") {
            setMoveLogListVisible(true)
            setMoveCategoryId(id)
            setFormatType(formatType)
            setMoveCategoryParentId(fid)
        }
    }
    useEffect(() => {
        if (isRename) {
            inputRef.current.autofocus = true;
            let range = getSelection();//创建range
            range.selectAllChildren(inputRef.current);//range 选择obj下所有子内容
            range.collapseToEnd()
        }
    }, [isRename])

    const reName = (value, id, formatType) => {
        const name = value.target.innerText;
        const params = {
            name: name,
            id: id
        }
        if (formatType === "category") {
            updateWikiCatalogue(params).then(data => {
                if (data.code === 0) {
                    setIsRename(null)
                }
            })
        }
        if (formatType === "document") {
            updateDocument(params).then(data => {
                if (data.code === 0) {
                    setIsRename(null)
                }
            })
        }
    }
    const [addModalVisible, setAddModalVisible] = useState()
    /**
     * 折叠菜单
     */
    const [expandedTree, setExpandedTree] = useState([])
    // 树的展开与闭合
    const isExpandedTree = (key) => {
        return expandedTree.some(item => item === key)
    }
    const setOpenOrClose = key => {
        if (isExpandedTree(key)) {
            setExpandedTree(expandedTree.filter(item => item !== key))
        } else {
            setExpandedTree(expandedTree.concat(key));
        }
    }

    const [moveCategoryId, setMoveCategoryId] = useState()
    const [moveCategoryParentId, setMoveCategoryParentId] = useState()
    const [formatType, setFormatType] = useState()
    const [moveLogListVisible, setMoveLogListVisible] = useState(false)
    // 拖放效果
    const moveWorkItem = () => {
        const dragEvent = event.target
        dragEvent.style.background = "#d0e5f2";

    }

    const moveStart = (moveId, fId, formatType) => {

        event.stopPropagation();
        console.log(moveId)
        const dragEvent = event.target
        dragEvent.style.background = "#d0e5f2";

        // 被拖拽盒子的起始id
        setMoveCategoryId(moveId)
        setMoveCategoryParentId(fId)
        setFormatType(formatType)
    }

    //必须有onDragOver才能触发onDrop
    const dragover = () => {
        event.preventDefault();
    }

    const changeLog = (targetId) => {
        event.preventDefault();
        let value;
        if (targetId !== moveCategoryParentId) {
            if (formatType === "category") {
                if (targetId) {
                    value = {
                        parentCategory: { id: targetId },
                        id: moveCategoryId
                    }
                } else {
                    value = {
                        id: moveCategoryId
                    }
                }
                updateWikiCatalogue(value).then((res) => {
                    if (res.code === 0) {
                        findWikiCatalogue(wikiId).then((data) => {
                            setWikiCatalogueList(data)
                        })
                    }
                })
            } else {
                if (targetId) {
                    value = {
                        category: { id: targetId },
                        id: moveCategoryId
                    }
                } else {
                    value = {
                        id: moveCategoryId
                    }
                }
                updateDocument(value).then((res) => {
                    if (res.code === 0) {
                        findWikiCatalogue(wikiId).then((data) => {
                            setWikiCatalogueList(data)
                        })
                    }
                })
            }

        }
    }

    /**
     * @param {*} data 
     * @param {*} levels 
     * @returns 
     */

    const logTree = (data, levels, faid) => {
        let newLevels = 0;
        return data && data.length > 0 && data.map((item, index) => {
            return <div className={`${!isExpandedTree(faid) ? null : 'wiki-menu-submenu-hidden'}`}
                key={item.id}>
                <div className={`wiki-menu-submenu ${item.id === selectKey ? "wiki-menu-select" : ""} `}
                    key={item.id}
                    onClick={() => selectKeyFun(item.id, item.formatType)}
                    onMouseOver={() => setIsHover(item.id)} onMouseLeave={() => setIsHover(null)}
                    onDrop={() => changeLog(item.id)}
                    onDragOver={dragover}
                    onDrag={() => moveWorkItem()}
                    draggable="true"
                    onDragStart={() => moveStart(item.id, faid, item.formatType)}
                >
                    <div style={{ paddingLeft: levels * 10 }}>
                        {
                            (item.children && item.children.length > 0) || (item.documents && item.documents.length > 0) ?
                                isExpandedTree(item.id) ? <svg className="icon" aria-hidden="true" onClick={() => setOpenOrClose(item.id)}>
                                    <use xlinkHref="#iconright" ></use>
                                </svg> :
                                    <svg className="icon" aria-hidden="true" onClick={() => setOpenOrClose(item.id)}>
                                        <use xlinkHref="#icondown" ></use>
                                    </svg> : <svg className="icon" aria-hidden="true">
                                    <use xlinkHref=""></use>
                                </svg>
                        }
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#iconB-13"></use>
                        </svg>
                        <span className={`${isRename === item.id ? "wiki-input" : ""}`}
                            contentEditable={isRename === item.id ? true : false}
                            suppressContentEditableWarning
                            onBlur={(value) => reName(value, item.id, item.formatType)}
                            ref={isRename === item.id ? inputRef : null}
                        >{item.name} </span>
                    </div>
                    <div className={`${isHover === item.id ? "icon-show" : "icon-hidden"}`}>
                        <Dropdown overlay={() => addMenu(item.id)} placement="bottomLeft">
                            <svg className="icon iconright" aria-hidden="true">
                                <use xlinkHref="#iconjiahao"></use>
                            </svg>
                        </Dropdown>
                        <Dropdown overlay={() => editMenu(item.id, item.formatType, faid)} placement="bottomLeft">
                            <svg className="icon iconright" aria-hidden="true">
                                <use xlinkHref="#icongengduo-copy"></use>
                            </svg>
                        </Dropdown>
                    </div>
                </div>
                {
                    item.children && item.children.length > 0 && (newLevels = levels + 1) && logTree(item.children, newLevels, item.id)
                }
                {
                    item.documents && item.documents.length > 0 && (newLevels = levels + 1) && folderTree(item.documents, newLevels, item.id)
                }
            </div>
        })
    }
    const folderTree = (data, levels, faid) => {
        return data && data.length > 0 && data.map((item) => {
            return <div className={`${!isExpandedTree(faid) ? null : 'wiki-menu-submenu-hidden'}`}
                key={item.id}
            >
                <div className={`wiki-menu-submenu ${item.id === selectKey ? "wiki-menu-select" : ""} `}
                    key={item.id}
                    onClick={() => selectKeyFun(item.id, item.formatType)}
                    onMouseOver={() => setIsHover(item.id)} onMouseLeave={() => setIsHover(null)}
                    onDragOver={dragover}
                    onDrag={() => moveWorkItem()}
                    draggable="true"
                    onDragStart={() => moveStart(item.id, faid, item.formatType)}
                >
                    <div style={{ paddingLeft: levels * 10 }} >
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref=""></use>
                        </svg>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#iconB-06"></use>
                        </svg>
                        <span className={`${isRename === item.id ? "wiki-input" : ""}`}
                            contentEditable={isRename === item.id ? true : false}
                            suppressContentEditableWarning
                            onBlur={(value) => reName(value, item.id, item.formatType)}
                            ref={isRename === item.id ? inputRef : null}
                        >{item.name} </span>
                    </div>
                    <div className={`${isHover === item.id ? "icon-show" : "icon-hidden"}`}>
                        <Dropdown overlay={() => editMenu(item.id, item.formatType, faid)} placement="bottomLeft">
                            <svg className="icon iconright" aria-hidden="true">
                                <use xlinkHref="#icongengduo-copy"></use>
                            </svg>
                        </Dropdown>
                    </div>
                </div>
            </div>
        })
    }
    return (
        <Fragment>
            <Sider trigger={null} collapsible collapsed={!isShowText} collapsedWidth="50" width="250">
                <div className={`wiki-aside ${isShowText ? "" : "wiki-icon"}`}>
                    <div className="wiki-title title">
                        <span style={{ marginRight: "20px" }}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-B-13"></use>
                            </svg>
                            {wikiName}
                        </span>
                        <div className="wiki-toggleCollapsed">
                            {/* <PrivilegeProject code="addDocument" domainId={wikiId}> */}
                                <Dropdown overlay={() => addMenu(null)} placement="bottomLeft">
                                    <svg className="icon iconright" aria-hidden="true">
                                        <use xlinkHref="#iconjiahao"></use>
                                    </svg>
                                </Dropdown>
                            {/* </PrivilegeProject> */}
                            <svg className="icon" aria-hidden="true" onClick={showModal}>
                                <use xlinkHref="#iconfenlei"></use>
                            </svg>
                        </div>
                    </div>
                    <div className="wiki-menu" onDrop={() => changeLog(null)} >
                        {
                            wikiCatalogueList && folderTree(wikiCatalogueList[1], 0, 1)
                        }
                        {
                            wikiCatalogueList && logTree(wikiCatalogueList[0], 1, 0)
                        }
                    </div>
                    <div onClick={() => { props.history.push(`/index/wikidetail/wikiDomainRole`) }} className="wiki-priviege">
                        <svg className="icon iconright" aria-hidden="true">
                            <use xlinkHref="#icon1_lightnings"></use>
                        </svg>
                        角色管理
                    </div>
                    <div onClick={() => { props.history.push(`/index/wikidetail/wikiDomainUser`) }} className="wiki-priviege">
                        <svg className="icon iconright" aria-hidden="true">
                            <use xlinkHref="#icon1_magnifier-money"></use>
                        </svg>
                        成员管理
                    </div>
                    <div className="wiki-title setting">
                        <span style={{ marginRight: "20px" }}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#iconshezhi-2"></use>
                            </svg>
                            知识库设置
                        </span>
                        <div className="wiki-toggleCollapsed" onClick={toggleCollapsed}>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#iconfaxian"></use>
                            </svg>
                        </div>
                    </div>
                </div>
            </Sider>
            <ChangeWikiModal
                searchwiki={searchwiki}
                wikilist={wikilist}
                changeWikiVisible={changeWikiVisible}
                setChangeWikiVisible={setChangeWikiVisible}
            />
            <AddLog
                setAddModalVisible={setAddModalVisible}
                addModalVisible={addModalVisible}
                setWikiCatalogueList={setWikiCatalogueList}
                form={form}
                catalogueId={catalogueId}
                contentValue={contentValue}
                setSelectKey={setSelectKey}
                userList={userList}
                {...props}
            />
            <MoveLogList
                wikiCatalogueList={wikiCatalogueList}
                moveLogListVisible={moveLogListVisible}
                setWikiCatalogueList={setWikiCatalogueList}
                setMoveLogListVisible={setMoveLogListVisible}
                findWikiCatalogue={findWikiCatalogue}
                updateDocument={updateDocument}
                formatType={formatType}
                moveCategoryId={moveCategoryId}
                updateWikiCatalogue={updateWikiCatalogue}
                moveCategoryParentId={moveCategoryParentId}
            />
            <TemplateList changeTemplateVisible={changeTemplateVisible}
                setChangeTemplateVisible={setChangeTemplateVisible}
                templateId={templateId}
                setTemplateId={setTemplateId}
                setAddModalVisible={setAddModalVisible}
                contentValue={contentValue}
                setContentValue={setContentValue}

            />
        </Fragment>
    )
}
export default withRouter(inject("wikiDetailStore", "WikiCatalogueStore")(observer(WikideAside)));