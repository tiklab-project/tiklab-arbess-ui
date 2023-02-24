import React from "react";

const HIcon = props =>{

    const {type} = props

    const renderIcon = icon =>{
        return  <svg className="icon" aria-hidden="true">
                    <use xlinkHref={`#icon-${icon}`} />
                </svg>
    }

    const iconType = type =>{
        const zz = Math.floor(type/10)
        switch (zz) {
            case 0: return renderIcon("suyuanmabiaoqian")
            case 1: return renderIcon("ceshi")
            case 2: return renderIcon("goujian")
            case 3: return renderIcon("bushu")
            case 4: return renderIcon("sonarqube")
            case 5: return renderIcon("tuisong")
            case 6: return renderIcon("mes")
            case 7: return renderIcon("jiaoben")
            case 8: return renderIcon("chufa")
        }
    }

    return  <>
                {iconType(type)}
            </>
}

export default HIcon