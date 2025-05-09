/**
 * @Description: 弹出框
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React from 'react';
import {Modal} from "antd";
import Button from "../button/Button";
import "./Modal.scss";

const Modals = props => {

    const {children,...res} = props

    const modalFooter = (
        <>
            <Button onClick={res.onCancel} title={res.cancelText || "取消"} isMar={true}/>
            <Button onClick={res.onOk} title={res.okText ||  "确定"} type={res.okType || "primary"}/>
        </>
    )

    return (
        <Modal
            wrapClassName="arbess-modal"
            footer={modalFooter}
            {...res}
        >
            {children}
        </Modal>
    )

}

export default Modals
