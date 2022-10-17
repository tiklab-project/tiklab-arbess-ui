import React from "react";
import ConfigName from "../../../../common/configName/configName";

const StructureRightCart = props =>{

    const {item,state,log,time,style} = props

    const title = taskType =>{
        switch (taskType){
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                return "源码管理"
            case 11:
                return "测试"
            case 21:
            case 22:
                return "构建"
            case 31:
            case 32:
                return "部署"
        }
    }

    return(
        <div className={`mid_group_center-cart ${style}`}>
            <div className="cart-top">
                <span className="cart-top-taskAlias">
                    {title(item.taskType)}
                </span>
                <span> -- </span>
                <span className="cart-top-configName">
                    <ConfigName type={item.taskType}/>
                </span>
            </div>
            <div className="cart-center">
                <div className="cart-center-item">
                    <div>状态：{state}</div>
                    <div>时间：{time} </div>
                </div>
            </div>
            <div className="cart-bottom" >
                <span className="cart-bottom-span" onClick={()=>log(item)}>
                    日志
                </span>
            </div>
        </div>
    )
}

export default StructureRightCart