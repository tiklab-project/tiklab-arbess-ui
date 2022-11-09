import React from "react";
import {CloseOutlined} from "@ant-design/icons";
import {Button} from "antd";
import "./modalTitle.scss";
import Btn from "../btn/btn";

const ModalTitle = props =>{

    const {setVisible,title} = props

    return(
        <div className="modalTitle" >
            <div className="modalTitle-title">
                <span>{title}</span>
            </div>
            <div className="modalTitle-icon">
                <Btn
                    title={<CloseOutlined />}
                    type="text"
                    onClick={()=>setVisible(false)}
                />
            </div>
        </div>
    )
}

export default ModalTitle