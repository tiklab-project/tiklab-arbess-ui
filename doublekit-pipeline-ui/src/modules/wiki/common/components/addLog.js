/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-03 09:42:40
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-12-22 13:56:14
 */

import React from 'react';
import "../../../../assets/font-icon/iconfont.css";
import {withRouter} from "react-router-dom";
import { observer, inject } from "mobx-react";
import { Modal,Select,Form,Input   } from 'antd';

const AddLog = (props) => {
    const {addModalVisible,setAddModalVisible,setWikiCatalogueList,
        WikiCatalogueStore,catalogueId,form,contentValue,setSelectKey,userList} = props
    const {addWikiCatalogue,addWikiCataDocument,findWikiCatalogue} = WikiCatalogueStore;
    const wikiId = localStorage.getItem("wikiId")
    const onFinish = () => {
        
        form.validateFields().then((values) => {
            let data;
            if(values.formatType === "category"){
                
                if(catalogueId){
                    data = {
                        ...values,
                        repository:{id: wikiId},
                        parentCategory: {id:catalogueId},
                        master: {id: values.master}
                    }
                } else {
                    data = {
                        ...values,
                        repository:{id: wikiId},
                        master: {id: values.master}
                    }
                }
                addWikiCatalogue(data).then((data)=> {
                    if(data.code === 0){
                        findWikiCatalogue(wikiId).then((data)=> {
                            setWikiCatalogueList(data)
                        })
                        setAddModalVisible(!addModalVisible)
                    }
                    
                }) 
            }else {
                if(catalogueId){
                    data = {
                        ...values,
                        repository:{id: wikiId},
                        category: {id:catalogueId},
                        details:JSON.stringify(contentValue),
                        master: {id: values.master}
                    }
                } else {
                    data = {
                        ...values,
                        repository:{id: wikiId},
                        details:JSON.stringify(contentValue),
                        master: {id: values.master}
                    }
                }
                addWikiCataDocument(data).then((data)=> {
                    if(data.code === 0) {
                        findWikiCatalogue(wikiId).then((data)=> {
                            setWikiCatalogueList(data)
                        })
                        setAddModalVisible(!addModalVisible)
                        localStorage.setItem("documentId", data.data);
                        props.history.push(`/index/wikidetail/doc/${data.data}`)
                        // 左侧导航
                        setSelectKey(data.data)
                    }
                    
                })
            }
        })
    }
    return (
        <Modal
            title="添加文档"
            visible={addModalVisible}
            onOk={()=>onFinish()} 
            onCancel={()=>setAddModalVisible(false)}
            destroyOnClose={true}
        >
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
            >
                <Form.Item
                    label="名字"
                    name="name"
                    rules={[{ required: true, message: '请输入目录名字!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="负责人" name="master"  rules={[{ required: true }]} >
                    <Select
                        placeholder="负责人"
                        allowClear
                        className="work-select"
                        key="master"
                        style={{ minWidth: '80px'}}
                    >   
                        {
                            userList && userList.map((item)=>{
                                return <Select.Option value={item.user.id} key={item.user.id}>{item.user.name}</Select.Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label="类型"
                    name="formatType"
                    rules={[{ required: true, message: '请选择类型!' }]}
                >
                    <Select>
                        <Select.Option value="category">目录</Select.Option>
                        <Select.Option value="document">页面</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default inject("WikiCatalogueStore")(observer(AddLog));