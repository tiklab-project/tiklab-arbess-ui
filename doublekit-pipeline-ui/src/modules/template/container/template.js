/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-07 09:34:01
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-08 18:01:28
 */
import React, { useState,useEffect, Fragment } from "react";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Breadcrumb,Input,Layout,Row,Col,Modal, Pagination,Button,Divider } from 'antd';
import TemplateAddmodal from "../components/templateAddmodal"
import "../components/template.scss"
import  TemplatePreviewmodal from "../components/templatePreviewmodal"
import { observer, inject } from "mobx-react";
const { Search } = Input;
const { confirm } = Modal;
const Template = (props)=>{
    const { templateStore } = props;
    const { findDocumentTemplatePage,deleteDocumentTemplate,templatePageParams } = templateStore;
    const [addModalVisible,setAddModalVisible] = useState(false)
    const [previewModalVisible,setPreviewModalVisible] = useState(false)
    const [editOrAdd,setEditOrAdd] = useState()
    const [modalName,setModalName] = useState()
    const [hoverId,setHoverId] = useState()
    const [templateList,setTemplateList] = useState()
    const [templateId,setTemplate] = useState()

    useEffect(()=> {
        findDocumentTemplatePage().then(data=> {
            if(data.code === 0){
                setTemplateList(data.data.dataList)
            }
        })
    },[])
    const addModal = () => {
        setAddModalVisible(true)
        setEditOrAdd("add")
        setModalName("添加模板")
    }

    const editModal = (id) => {
        setAddModalVisible(true)
        setEditOrAdd("edit")
        setModalName("编辑模板")
        setTemplate(id)
    }
    const previewModal = (id) => {
        setPreviewModalVisible(true)
        setTemplate(id)
    }

    // 删除模板
    const showDeleteConfirm = (name,id)=>{
        confirm({
            title: `确定删除${name}?`,
            icon: <ExclamationCircleOutlined />,
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteDocumentTemplate(id).then(data=> {
                    findDocumentTemplatePage().then(data=> {
                        if(data.code === 0){
                            setTemplateList(data.data.dataList)
                        }
                    })
                })
            },
            onCancel() {
                
            },
        });
    }
    // 查找模板
    const onSearch = (value) => {
        findDocumentTemplatePage({name: value}).then(data=> {
            if(data.code === 0){
                setTemplateList(data.data.dataList)
            }
        })
    }
    // 改变页码
    const changePage = (page) => {
        findDocumentTemplatePage({current: page}).then(data=> {
            if(data.code === 0){
                setTemplateList(data.data.dataList)
            }
        })
    }
    return (
        <Fragment>
        <Layout className="wiki-template">
            <Row style={{height: "100%"}}>
                <Col xl={{span: 18,offset:3}} lg={{span: 20,offset:2}}>
                    <Breadcrumb>
                        <Breadcrumb.Item>知识库管理</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href="/">知识库列表</a>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Divider />
                    <div className="search-add" key="search">
                        <Search
                            placeholder="请输入关键字"
                            allowClear
                            onSearch={onSearch}
                            style={{ width:300}}
                        />
                        <Button onClick={()=> addModal()} >添加模板</Button>
                    </div>
                    <div className= "template-box" key="box">
                    {
                        templateList && templateList.map((item)=> {
                            return <div className = "template-item" 
                                    onMouseEnter = {()=>setHoverId(item.id)} 
                                    onMouseLeave = {()=>setHoverId(null)}
                                    key = {item.id}
                                >
                                <div>
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref= "#iconpaihang1"></use>
                                    </svg>
                                
                                    <div className="title" key="title">{item.name}</div>
                                </div>
                                <div className={`item-shade ${item.id === hoverId ? "item-show": "item-hidden"}`}>
                                    <span onClick = {()=> previewModal(item.id)}>查看</span>
                                    <span onClick = {()=> editModal(item.id)}>编辑</span>
                                    <span onClick = {()=> showDeleteConfirm(item.name,item.id)}>删除</span>
                                </div>
                            </div>
                        })
                    }
                    </div>
                    <div style={{textAlign: "right"}}><Pagination defaultCurrent={1} total={templatePageParams.total} onChange={(page )=>changePage(page)}/></div>    
                </Col>
            </Row>
        </Layout>
        <TemplateAddmodal 
            modalName= {modalName} 
            editOrAdd= {editOrAdd}
            addModalVisible = {addModalVisible}
            setAddModalVisible = {setAddModalVisible}
            setTemplateList = {setTemplateList}
            templateId = {templateId}
        />
        <TemplatePreviewmodal 
            name="添加知识库" 
            type="add"
            previewModalVisible = {previewModalVisible}
            setPreviewModalVisible = {setPreviewModalVisible}
            templateId ={templateId}
        />
        </Fragment>
    )
}

export default inject("templateStore")(observer(Template));