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
                    {/*{*/}
                    {/*    isImg ?*/}
                    {/*        <Imgs type={colors}/>*/}
                    {/*        :*/}
                    {/*        <span className={`mf-listname-icon icon-${colors}`}>*/}
                    {/*            {text && text.substring(0,1).toUpperCase()}*/}
                    {/*        </span>*/}
                    {/*}*/}
                    <span className={`mf-listname-icon ${colors?`mf-icon-${colors}`:"mf-icon-2"}`}>
                        {text && text.substring(0,1).toUpperCase()}
                    </span>
                    <span className={`${onClick?"mf-listname-name":""}`}>
                    {text}
                </span>
                </Space>
            </span>
}

export default Listname