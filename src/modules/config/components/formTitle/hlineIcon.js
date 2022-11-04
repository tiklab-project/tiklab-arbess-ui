import React from "react";

const HlineIcon = props =>{

    const {type} = props

    const titleType = type =>{
        if(type>0 && type<10){
            return renderTitle("ceshi1","源码")
        }else if(type>10 && type<20){
            return renderTitle("ceshi1","测试")
        }else if(type>20 && type<30){
            return renderTitle("goujiangongju","构建")
        }else if(type>30 && type<40){
            return renderTitle("bushubanben","部署")
        }else if(type>40 && type<50){
            return renderTitle("ceshi","代码扫描")
        }else if(type>50 && type<60){
            return renderTitle("quanxian","推送制品")
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