/**
 * @Description: 弹出框
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/12
 */
import React,{useState,useEffect} from 'react';
import {Modal} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {autoHeight} from "../../utils/Client";
import Button from "../button/Button";
import "./Modal.scss";

const Modals = props => {

    const {title,children,...res} = props

    const [height,setHeight] = useState(0)

    useEffect(()=>{
        setHeight(autoHeight())
        return ()=>{
            window.onresize = null
        }
    },[height])

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    const modalFooter = (
        <>
            <Button onClick={res.onCancel} title={res.cancelText || "取消"} isMar={true}/>
            <Button onClick={res.onOk} title={res.okText ||  "确定"} type={res.okType || "primary"}/>
        </>
    )

    return (
        <Modal
            style={{height:height,top:60}}
            bodyStyle={{padding:0}}
            closable={false}
            footer={modalFooter}
            className="arbess-modal"
            {...res}
        >
            <div className='arbess-modal-up'>
                <div>{title}</div>
                <Button
                    title={<CloseOutlined style={{fontSize:16}}/>}
                    type="text"
                    onClick={res.onCancel}
                />
            </div>
            <div className='arbess-modal-content'>
                {children}
            </div>
        </Modal>
    )

}

export default Modals
