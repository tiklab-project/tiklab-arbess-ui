import React from "react";
import {Space} from "antd";
import "./listname.scss";

const Listname = props => {

    const {isImg,text,onClick,colors} = props

    return  <span
                className={`mf-listname ${onClick?"mf-listname-href":""}`}
                onClick={onClick}
            >
                <Space>
                    <span className={`mf-listname-icon ${colors?`mf-icon-${colors}`:"mf-icon-2"}`}>
                        {text && text.substring(0,1).toUpperCase()}
                    </span>
                    <span className={`${onClick?"mf-listname-name":"mf-listname-home"}`}>
                        {text}
                    </span>
                </Space>
            </span>
}

export default Listname