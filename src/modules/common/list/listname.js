import React from "react";
import "./listname.scss";

const Listname = props => {

    const {text,onClick,colors} = props

    return  <span
                className={`${onClick?"mf-listname-href":""}`}
                onClick={onClick}
            >
                <span className={`mf-listname-icon ${colors?`mf-icon-${colors}`:"mf-icon-2"}`}>
                    {text && text.substring(0,1).toUpperCase()}
                </span>
                <span className={`${onClick?"mf-listname-name":"mf-listname-home"}`}>
                    {text}
                </span>
            </span>
            
}

export default Listname