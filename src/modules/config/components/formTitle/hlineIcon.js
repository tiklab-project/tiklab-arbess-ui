import React from "react";

const HlineIcon = props =>{

    const {type} = props

    const titleType = type =>{
        switch (parseInt(type)) {
            case 11:
                return renderTitle("ceshi1","测试")
            case 21:
            case 22:
                return renderTitle("goujiangongju","构建")
            case 31:
            case 32:
                return renderTitle("bushubanben","部署")
            case 41:
                return renderTitle("ceshi","代码扫描")
            default:
                return renderTitle("ceshi1","源码")
        }
    }

    const renderTitle = (icon,title) =>{
        return  <>
                    <span className="desc-icon">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref={`#icon-${icon}`} />
                        </svg>
                    </span>
                    <span className="desc-title">
                        {title}
                    </span>
                </>
    }

    return titleType(type)

}

export default HlineIcon