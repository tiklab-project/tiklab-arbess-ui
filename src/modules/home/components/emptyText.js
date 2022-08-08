import React from "react";

const EmptyText = () =>{
    return  <div style={{textAlign:"center"}}>
                <svg className="icon" aria-hidden="true" >
                    <use xlinkHref="#icon-meiyouxiangguan"/>
                </svg>
                <div>没有数据</div>
            </div>
}

export default EmptyText