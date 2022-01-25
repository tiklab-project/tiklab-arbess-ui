/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-07 10:20:57
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-08 16:20:06
 */
import React, { useState,useEffect } from "react";
import {withRouter} from "react-router-dom";
import { observer, inject } from "mobx-react";
import { Modal,Select,Form,Input   } from 'antd';

import DocumentEditor from "../../wiki/common/components/edit-slate/editor"
import "./templateAddmodal.scss"
const TemplateAddmodal = (props) => {
    const [form] = Form.useForm();
    const wikiId = localStorage.getItem("wikiId")
    const {addModalVisible,setAddModalVisible,modalName,templateStore,setTemplateList,editOrAdd,templateId} = props;
    const {greateDocumentTemplate,findDocumentTemplatePage,findDocumentTemplate,updateDocumentTemplate} = templateStore;
    const [editorValue, setEditorValue] = useState([
		{
			type: "paragraph",
			children: [{ text: "" }],
		},
	])
    const changeEditor = (value) => {
        setEditorValue(value)
    }
    useEffect(()=>{
        if(editOrAdd === "edit") {
            findDocumentTemplate(templateId).then(data => {
                const value = data.data
                if(data.code === 0){
                    form.setFieldsValue({   
                        name: value.name,
                        description: value.description
                    })
                    setEditorValue(JSON.parse(value.details))
                }
            })
        }
        
    },[editOrAdd,templateId])
    const onFinish = () => {
        form.validateFields().then((values) => {
            const serialize = JSON.stringify(editorValue)
            
            if(editOrAdd === "edit"){
                const data = {
                    ...values,
                    details: serialize,
                    id: templateId
                }
                updateDocumentTemplate(data).then(data => {
                    if(data.code === 0){
                        setAddModalVisible(false)
                        findDocumentTemplatePage().then(data=> {
                            if(data.code === 0){
                                setTemplateList(data.data.dataList)
                            }
                        })
                    }
                })
            }else {
                const data = {
                    ...values,
                    details: serialize
                }
                greateDocumentTemplate(data).then(data => {
                    if(data.code === 0){
                        setAddModalVisible(false)
                        findDocumentTemplatePage().then(data=> {
                            if(data.code === 0){
                                setTemplateList(data.data.dataList)
                            }
                        })
                    }
                })
            }
            
        })
    }

    const onCancel = ()=> {
        setAddModalVisible(false)
        form.resetFields();
    }
    
    
    return (
        <Modal
            title= {modalName}
            visible={addModalVisible}
            onOk={()=>onFinish()} 
            onCancel={()=>onCancel()}
            width = "80vw"
            className="template-addmodal"
            destroyOnClose = {true}
        >   
        <div>
            <Form
                form={form}
                name="basic"
                initialValues={{ remember: true }}
            >   
                <div className="addmodal-top">
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref= "#iconpaihang1"></use>
                    </svg>
                    <div className="addmodal-from">
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: '请输入模板名称!' }]}
                            wrapperCol = {{ span: 12 }}
                        >
                            <Input placeholder="请输入模板名称" />
                        </Form.Item>

                        <Form.Item
                            name="description"
                            rules={[{ required: true, message: '请输入模板描述!' }]}
                            style= {{marginBottom: 0}}
                            wrapperCol = {{ span: 20 }}
                        >
                            <Input placeholder="请输入模板描述" />
                        </Form.Item>
                    </div>
                </div>
                
                
            </Form>
            <DocumentEditor value = {editorValue} onChange = {(value)=> changeEditor(value)}/>
        </div>
            
        </Modal>
    )
}

export default inject("templateStore")(observer(TemplateAddmodal));