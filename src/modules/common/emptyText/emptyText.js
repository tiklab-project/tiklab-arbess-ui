import React from "react";

const EmptyText = props =>{

    const {title} = props

    return  <div style={{textAlign:"center"}}>
                <svg className="icon" aria-hidden="true" style={{height:50,width:50}} >
                    <use xlinkHref="#icon-meiyouxiangguan"/>
                </svg>
                <div>{title ? title : "没有查询到数据"}</div>
            </div>
}

export default EmptyText