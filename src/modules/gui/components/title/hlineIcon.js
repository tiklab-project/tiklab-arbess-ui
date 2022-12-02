import React from "react";

const HlineIcon = props =>{

    const {type} = props

    const titleType = type =>{
        const zz = Math.floor(type/10)
        switch (zz) {
            case 0: return renderTitle("ceshi1","源码")
            case 1: return renderTitle("ceshi1","测试")
            case 2: return renderTitle("goujiangongju","构建")
            case 3: return renderTitle("bushubanben","部署")
            case 4: return renderTitle("ceshi","代码扫描")
            case 5: return renderTitle("quanxian","推送制品")

        }
    }

    const renderTitle = (icon,title) =>{
        return  <>
                    <span className="desc-icon">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref={`#icon-${icon}`} />
                        </svg>
                    </span>
                    <span className="desc-title"  style={{padding:"0 8px 0 5px"}}>
                        {title}
                    </span>
                </>
    }

    return  <>
                {titleType(type)}
            </>

}

export default HlineIcon