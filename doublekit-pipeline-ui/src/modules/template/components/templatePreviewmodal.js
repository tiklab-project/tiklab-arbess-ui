/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-09-07 10:20:57
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-09 09:10:16
 */
import React, { useState,useEffect } from "react";
import { observer, inject } from "mobx-react";
import { Modal,Select,Form,Input   } from 'antd';
import "./templatePreviewModal.scss"
import PreviewEditor from "../../wiki/common/components/edit-slate/previewEditor"
import template from "../container/template";
const TemplatePreviewmodal = (props) => {
    const [form] = Form.useForm();
    const wikiId = localStorage.getItem("wikiId")
    const {previewModalVisible,setPreviewModalVisible,templateStore,templateId} = props;
    const {findDocumentTemplate} = templateStore;
    const [template,setTemplate] = useState()
    const [value, setValue] = useState([
		{
			type: "paragraph",
			children: [{ text: "空白文档" }],
		},
	])
    const onFinish = () => {
        form.validateFields().then((values) => {
        })
    }
    useEffect(()=>{
        if(templateId) {
            findDocumentTemplate(templateId).then(data => {
                const value = data.data
                if(data.code === 0){
                    // form.setFieldsValue({   
                    //     name: value.name,
                    //     description: value.description
                    // })
                    setTemplate({...value})
                    setValue(JSON.parse(value.details))
                }
            })
        }
    },[templateId])
    const initTemplate = (value) => {
        // setValue(value)
        // const serialize = JSON.stringify(value)
		// const data = {
		// 	id: documentId,
		// 	details: serialize
		// }
		// updateDocument(data)
    }
    return (
        <Modal
            title="查看模板"
            visible={previewModalVisible}
            onOk={()=>onFinish()} 
            onCancel={()=>setPreviewModalVisible(false)}
            width = "80vh"
            className="template-previewmodal"
        >   
        <div>
            <Form
                form={form}
                name="basic"
                initialValues={{ remember: true }}
            >   
                <div className="previewmodal-top">
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref= "#iconpaihang1"></use>
                    </svg>
                    <div className="previewmodal-from">
                        <div className="title">
                            {template && template.name}
                        </div>
                        <div className="doc">
                            {template && template.description}
                        </div>
                    </div>
                </div>
                
                
            </Form>
            <PreviewEditor value = {value} onChange = {(value)=> initTemplate(value)}/>
        </div>
            
        </Modal>
    )
}

// export default inject("WikiCatalogueStore")(observer(TemplatePreviewmodal));
export default inject("templateStore")(observer(TemplatePreviewmodal));