import React from "react";
import pip_meiyouxiangguan from "../../../assets/images/svg/pip_meiyouxiangguan.svg";

/**
 * 暂无数据
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ListEmpty = props =>{

    const {title} = props

    return  <div style={{textAlign:"center"}}>
                <img src={pip_meiyouxiangguan} alt="maven" style={{width:50,height:50}}/>
                <div style={{fontSize:13,color:"#999"}}>{title ? title : "暂无数据"}</div>
            </div>
}

export default ListEmpty
