import React from "react";
import ConfigName from "../../../../common/configName/configName";
import "./switch.scss";

const Switch = props =>{

    const {type} = props

    const icon = type => {
        switch (type) {
            case 1:return "git"
            case 2:return "gitee"
            case 3:return "github"
            case 4:return "gitlab"
            case 5:return "-_ssh"
            case 11:return "ceshi"
            case 21:return "quanxian"
            case 22:return "nodejs"
            case 31:return "xuniji"
            case 32:return "docker"
        }
    }

    const renderType = type =>{
        return <div className="configCode-gitList-item ">
                    <span className="configCode-gitList-item-icon">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref={`#icon-${icon(type)}`} />
                        </svg>
                    </span>
                    <span className="configCode-gitList-item-title">
                        <ConfigName type={type}/>
                    </span>
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

                })()
            }
        </div>
    )
}

export default Switch