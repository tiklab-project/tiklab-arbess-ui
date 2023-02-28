import React from "react";
import {CloseOutlined} from "@ant-design/icons";
import Btn from "../btn/Btn"
import "./ModalTitle.scss";

/**
 * 弹出框标题
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ModalTitle = props =>{

    const {setVisible,title} = props

    return(
        <div className="modalTitle" >
            <div className="modalTitle-title">
                <span>{title}</span>
            </div>
            <div className="modalTitle-icon">
                <Btn
                    title={<CloseOutlined style={{fontSize:16}}/>}
                    type="text"
                    onClick={()=>setVisible(false)}
                />
            </div>
        </div>
    )
}

export default ModalTitle
