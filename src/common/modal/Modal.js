import React,{useState,useEffect} from 'react';
import {Modal} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {autoHeight} from "../utils/Client";
import Btn from "../btn/Btn";
import "./Modal.scss";

/**
 * 弹出框
 * @param props
 * @constructor
 */
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

    return (
        <Modal
            style={{height:height,top:60}}
            bodyStyle={{padding:0}}
            closable={false}
            className="mf"
            {...res}
        >
            <div className='mf-modal'>
                <div className='mf-modal-up'>
                    <div>{title}</div>
                    <Btn
                        title={<CloseOutlined style={{fontSize:16}}/>}
                        type="text"
                        onClick={res.onCancel}
                    />
                </div>
                <div className='mf-modal-content'>
                    {children}
                </div>
            </div>
        </Modal>
    )

}

export default Modals
