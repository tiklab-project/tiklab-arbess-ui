/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-31 09:03:31
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-12-22 14:04:36
 */
import React, { useState, useEffect, Fragment } from "react";
import { Breadcrumb, Dropdown, Divider,Form,Menu  } from 'antd';
import "./logDetail.scss"
import { observer, inject } from "mobx-react";
import AddLog from "./addLog"
import TemplateList from "./templateList"
import { useForm } from "antd/es/form/Form";
const LogDetail = (props) => {
    const { WikiCatalogueStore,} = props;
    const { detailWikiLog, findCategoryDocument,findDmPrjRolePage,setWikiCatalogueList} = WikiCatalogueStore
    const categoryId = localStorage.getItem("categoryId");
    const [logList, setLogList] = useState();
    const [logDetail, setLogDetail] = useState();
    // 当前知识库id
    const wikiId = localStorage.getItem("wikiId")
    useEffect(() => {
        detailWikiLog({ id: categoryId }).then(data => {
            setLogDetail(data)
        })
        findCategoryDocument(categoryId).then(data => {
            setLogList(data.data)
        })
    }, [categoryId])

    const [changeTemplateVisible, setChangeTemplateVisible] = useState()

    const [addModalVisible, setAddModalVisible] = useState()
    const [templateId, setTemplateId] = useState()
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

    /**
     * 添加目录
     */
    const [contentValue, setContentValue] = useState([
        {
            type: "paragraph",
            children: [{ text: "" }],
        },
    ])
    const [catalogueId, setCatalogueId] = useState()
    const [userList, setUserList] = useState()
    const [form] = Form.useForm();
    // 当前选中目录id
    const [selectKey, setSelectKey] = useState();
    const selectAddType = (value, id) => {
        setCatalogueId(id)
        findDmPrjRolePage(wikiId).then(data => {
            setUserList(data.dataList)
        })
        if (value.key === "category") {
            setAddModalVisible(true)
        } else {
            setChangeTemplateVisible(true)
        }
        // 
        form.setFieldsValue({
            formatType: value.key
        })
    }

    return (
        <div className="log-detail">
            <div className="log-detail-header">
                <Breadcrumb>
                    <Breadcrumb.Item>知识库管理</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="/">目录详情</a>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <Divider />
            <div>
                {
                    logDetail && <Fragment>
                        <div className="log-title">

                            <div className="title-left">
                                <svg className="title-icon" aria-hidden="true">
                                    <use xlinkHref="#iconB-13"></use>
                                </svg>
                                <div className="title-name">
                                    <div className="name">{logDetail.name}</div>
                                    <div className="master">管理员: {logDetail.master.name}</div>
                                </div>

                            </div>
                            {/* <div className="title-right" onClick={()=>addMenu(logDetail.id)}>
                                
                            </div> */}
                            <Dropdown overlay={() => addMenu(logDetail.id)} placement="bottomLeft">
                                <div>添加内容</div>
                            </Dropdown>
                        </div>
                        <Divider />
                    </Fragment>
                }

                <div className="log-child">
                    {
                        logList && logList.map(item => {
                            return <Fragment><div className="log-child-list" key={item.id}>
                                {
                                    item.formatType && item.formatType === "document" ?
                                        <svg className="log-icon" aria-hidden="true">
                                            <use xlinkHref="#iconB-06"></use>
                                        </svg> :
                                        <svg className="log-icon" aria-hidden="true">
                                            <use xlinkHref="#iconB-13"></use>
                                        </svg>
                                }

                                <span>{item.name}</span>
                            </div>
                                <Divider />
                            </Fragment>
                        })
                    }
                </div>

            </div>
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
            <TemplateList 
                changeTemplateVisible={changeTemplateVisible}
                setChangeTemplateVisible={setChangeTemplateVisible}
                templateId={templateId}
                setTemplateId={setTemplateId}
                setAddModalVisible={setAddModalVisible}
                contentValue={contentValue}
                setContentValue={setContentValue}

            />
        </div>
    )
}
export default inject("WikiCatalogueStore")(observer(LogDetail));