import React from "react";
import Subtitle from "../../../gui/components/title/subtitle";
import Headline from "../../../gui/components/title/headline";

const StructureRightCart = props =>{

    const {item,state,log,time,style} = props

    return(
        <div className={`mid_group_center-cart ${style}`}>
            <div className="cart-top">
                <span className="cart-top-taskAlias">
                    <Headline type={item.taskType}/>
                </span>
                <span> -- </span>
                <span className="cart-top-configName">
                    <Subtitle type={item.taskType}/>
                </span>
            </div>
            <div className="cart-center">
                <div className="cart-center-item">
                    <div>状态：{state}</div>
                    <div>时间：{time} </div>
                </div>
            </div>
            <div className="cart-bottom" >
                <span className="cart-bottom-span" onClick={()=>log && log(item)}>
                    日志
                </span>
            </div>
        </div>
    )
}

export default StructureRightCart