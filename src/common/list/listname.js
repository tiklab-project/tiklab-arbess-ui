import React from "react";
import "./listname.scss";

const Listname = props => {

    const {text,onClick,colors} = props

    return  <span
                className={`mf-listname ${onClick?"mf-listname-href":""}`}
                onClick={onClick}
            >
                <span className={`mf-listname-icon icon-${colors}`}>
                    {text && text.substring(0,1).toUpperCase()}
                </span>
                <span className={`${onClick?"mf-listname-name":""}`}>
                    {text}
                </span>
            </span>
}

export default Listname