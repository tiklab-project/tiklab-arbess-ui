import React from "react";
import {CloseOutlined} from "@ant-design/icons";
import {Button} from "antd";
import "./modalTitle.scss";

const ModalTitle = props =>{

    const {setVisible,title,isType} = props

    return(
        <div className="modalTitle" >
            <div className="modalTitle-title --mf-three-level-title">
                <span>{title}</span>
            </div>
            {   isType &&
                <div className="modalTitle-icon">
                    <Button type="text" onClick={()=>setVisible(false)}>
                        <CloseOutlined />
                    </Button>
                </div>
            }
        </div>
    )
}

export default ModalTitle