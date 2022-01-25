/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-13 16:53:20
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-13 17:55:12
 */
import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Table1 from "./table"
const { Dragger } = Upload;
const AttaUpload = (props) => {
    const {editor,setIsModalVisible,Modal} = props;
    const config = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            console.log(111)
            editor.cmd.do('insertHTML', `<div id="imgdddd"></div>`)
            ReactDOM.render(<Table1 />, document.getElementById('imgdddd'))
            editor.cmd.do('insertHTML', `<p></p>`)
            setIsModalVisible(false)
            Modal.destroyAll();
            document.getElementById("testatt").remove();
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
    
    return (
        <Dragger {...config}>
            <p className="ant-upload-drag-icon">
            <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
            band files
            </p>
        </Dragger>
    );
}
export default AttaUpload;
