import React from "react";
import "./listname.scss";

const Listname = props => {

    const {text,colors} = props

    return  <span className={`mf-listname-icon ${colors?`mf-icon-${colors}`:"mf-icon-1"}`}>
                {text && text.substring(0,1).toUpperCase()}
            </span>

}

export default Listname
