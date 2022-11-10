import React from "react";
import SubIcon from "../../../gui/components/title/subIcon";
import "./switch.scss";

const Switch = props =>{

    const {type} = props

    const renderType = type =>{
        return <div className="configCode-gitList-item ">
                    <SubIcon type={type}/>
                </div>
    }

    return(
        <div className="configCode-gitList">
            {
                (()=>{
                    if(type > 0 &&type < 10){
                        return  <>
                                    <div className="configCode-gitList-title">源码类型</div>
                                    { renderType(type) }
                                </>
                    }
                    if(type===11){
                        return  <>
                                    <div className="configCode-gitList-title">测试类型</div>
                                    { renderType(type) }
                                </>
                    }
                    else if(type > 20 && type < 30){
                        return  <>
                                    <div className="configCode-gitList-title">构建类型</div>
                                    { renderType(type) }
                                </>
                    }
                    else if(type > 30 && type < 40){
                        return  <>
                                    <div className="configCode-gitList-title">部署类型</div>
                                    { renderType(type) }
                                </>
                    }
                    else if(type > 40 && type < 50){
                        return  <>
                                    <div className="configCode-gitList-title">代码扫描类型</div>
                                    { renderType(type) }
                                </>
                    }
                    else if(type > 50 && type < 60){
                        return  <>
                                    <div className="configCode-gitList-title">推送制品类型</div>
                                    { renderType(type) }
                                </>
                    }

                })()
            }
        </div>
    )
}

export default Switch