import React from "react";

const HlineIcon = props =>{

    const {type} = props

    const titleType = type =>{
        const zz = Math.floor(type/10)
        switch (zz) {
            case 0: return renderTitle("suyuanmabiaoqian","源码")
            case 1: return renderTitle("ceshi","测试")
            case 2: return renderTitle("goujian","构建")
            case 3: return renderTitle("bushu","部署")
            case 4: return renderTitle("sonarqube","代码扫描")
            case 5: return renderTitle("tuisong","推送制品")
            case 6: return renderTitle("mes","后置处理")
            case 7: return renderTitle("jiaoben","后置处理")
            case 8: return renderTitle("chufa","定时触发")
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