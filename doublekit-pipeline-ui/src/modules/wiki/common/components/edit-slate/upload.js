/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-16 09:08:38
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-09-02 10:46:47
 */
import React, { useState } from 'react';
import { Modal, Upload, message, Input, Form, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Point, Transforms, Editor, Element as SlateElement, Range } from 'slate'
import {getUser} from "doublekit-frame-ui"
import "./upload.scss"
import Tabs from "./tabs"
const { Dragger } = Upload;
// const { TabPane } = Tabs;
const AttUpload = (props) => {
	const { editor } = props
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [select, setImageAnchor] = useState()

	const showModal = (event) => {
		event.preventDefault();
		setImageAnchor(editor.selection)
		setIsModalVisible(!isModalVisible);
	};

	const handleOk = () => {
		setIsModalVisible(false);

	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};
	const ticket = getUser().ticket;
	const params = {
		name: 'uploadFile',
		multiple: true,
		showUploadList: false,
		action: `${base_url}dfs/upload`,
		headers: {
            ticket: ticket
        },
		onChange(info) {
			const { status,type,response } = info.file;
			console.log(info)
			
			// if (status !== 'uploading') {
			// 	console.log(info.file, info.fileList);
			// }
			if (status === 'done') {
				message.success(`${info.file.name} file uploaded successfully.`);
				if(response.code === 0){
					if (select) {
						if(type === "application/msword") {
							wrapAttachment(editor, `${img_url}/file/${response.data.fileName}`)
						}else if(type === "image/png" || type === "image/jpeg"){
							wrapImage(editor, `${img_url}/file/${response.data.fileName}`)
						}
						
					}
				}
				
			} else if (status === 'error') {
				message.error(`${info.file.name} file upload failed.`);
			}
			
		}
	};

	const onFinish = (value) => {
		console.log(value)
		wrapImage(editor, "http://127.0.0.1:3001/images/logo.png")
		setIsModalVisible(false);
	}

	const wrapImage = (editor, url) => {
		Transforms.select(editor, select);
		const { selection } = editor
		const isCollapsed = selection && Range.isCollapsed(selection)
		let editorEnd = Editor.end(editor, []); 
		let [selectionStart, selectionEnd] = Range.edges(selection); 
		let isEditorEnd = false; 
		if (selection) { 
			if (Point.equals(editorEnd, selectionEnd)){ 
				isEditorEnd = true; 
			} 
		}
		
		const image = {
			type: 'image',
			url,
			children: isCollapsed ? [{ text: "" }] : [],
		}
		if (isCollapsed) {
			Transforms.insertNodes(editor, image)
			editor.insertBreak(editor)
			setIsModalVisible(false);

		}
		if(isCollapsed && isEditorEnd) {
			Transforms.insertNodes(editor, {type: 'paragraph', children: [{ text: '' }]}); 
			// Transforms.select(editor, editorEnd); 
			setIsModalVisible(false);
			let anchor = selection.anchor;
			let path = anchor.path.map((item) => item);
			path[path.length - 2]+=2;
			// Transforms.select(editor, {path,offset: 0 });
			// Transforms.select(editor,{
			// 	anchor: { path: [2, 0], offset: 0 },
			// 	focus: { path: [2, 0], offset: 0 },
			// })
			// console.log(editor.selection)
		}
	}

	const wrapAttachment = (editor, url) => {
		Transforms.select(editor, select);
		const { selection } = editor
		const isCollapsed = selection && Range.isCollapsed(selection)
		let editorEnd = Editor.end(editor, []); 
		let [selectionStart, selectionEnd] = Range.edges(selection); 
		let isEditorEnd = false; 
		if (selection) { 
			if (Point.equals(editorEnd, selectionEnd)){ 
				isEditorEnd = true; 
			} 
		}
		
		const attachment = {
			type: 'attachment',
			url,
			children: isCollapsed ? [{ text: "" }] : [],
		}
		if (isCollapsed) {
			Transforms.insertNodes(editor, attachment)
			setIsModalVisible(false);
		}
	}
	return (
		<div className = "upload-editor" key="upload">
			<span onMouseDown={(event) => showModal(event)}>
				<i className="iconfont iconimage" style={{fontWeight: 600}}></i>
			</span>
			{
				isModalVisible && <div className="upload-box">
					<Tabs>
						<div name="本地文件" key = "1">
							<Dragger {...params}>
								<p className="ant-upload-drag-icon">
									<InboxOutlined />
								</p>
								<p className="ant-upload-text">点击上传</p>
								<p className="ant-upload-hint">
									支持拖拽上传
								</p>
							</Dragger>
						</div>
						<div name="网络文件" className="upload-url" key="2">
							<Form
								name="basic"
								labelCol={{ span: 8 }}
								wrapperCol={{ span: 16 }}
								initialValues={{ remember: true }}
								onFinish={onFinish}
							>
								<Form.Item
									label="url"
									name="url"
									rules={[{ required: true, message: '请输入地址' }]}
								>
									<Input />
								</Form.Item>
								<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
									<Button type="primary" htmlType="submit">
										确定
									</Button>
								</Form.Item>
							</Form>
						</div>
					</Tabs>
				</div>
			}
		</div>
	);
};

export default AttUpload;

