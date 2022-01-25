/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2021-08-13 13:20:26
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2021-08-13 17:10:13
 */
import React, { useState,useEffect } from 'react';
import { Modal, Button } from 'antd';
import AttaUpload from "./upload"
import "./upload.scss"
const AttachmentModal = (props) => {
    const {editor} = props;
    const [isModalVisible, setIsModalVisible] = useState(true);
    
    useEffect(() => {
    }, [])
    const handleOk = () => {
        setIsModalVisible(false);
        Modal.destroyAll();
        document.getElementById("testatt").remove();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        Modal.destroyAll();
        document.getElementById("testatt").remove();
    };

    return (
        <>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} zIndex="10002" destroyOnClose = "true">
                <AttaUpload editor = {editor} setIsModalVisible = {setIsModalVisible} Modal = {Modal}/>
            </Modal>
        </>
    );
};
export default AttachmentModal;