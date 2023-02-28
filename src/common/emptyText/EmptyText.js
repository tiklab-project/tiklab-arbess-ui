import React from "react";

/**
 * 暂无数据
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const EmptyText = props =>{

    const {title} = props

    return  <div style={{textAlign:"center"}}>
                <svg className="icon" aria-hidden="true" style={{height:50,width:50}} >
                    <use xlinkHref="#icon-meiyouxiangguan"/>
                </svg>
                <div style={{fontSize:13,color:"#999"}}>{title ? title : "暂无数据"}</div>
            </div>
}

export default EmptyText
