import React from "react";
import {Spin} from "antd";
import "./Loading.scss";

/**
 * 全屏加载
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Loading = props =>{
    return (
        <div className="mf-loading">
            <div className="mf-shape"/>
            <div className="mf-shape"/>
            <div className="mf-shape"/>
        </div>
    )
}

/**
 * 局部加载
 * @param size：大小
 * @param type：类型
 * @param title：名称
 * @returns {JSX.Element}
 * @constructor
 */
const SpinLoading = ({size, type,title}) => {

    if(type==='table'){
        return  <div style={{textAlign:"center",padding:"25px 0"}}>
                    <Spin size={size?size:'default '}/>
                </div>
    }

    return  <div className='mf-spin-loading'>
                <Spin size={size? size:'default '}/>
                {
                    title && <div className='spin-loading-title'>{title}</div>
                }
            </div>

}

export {Loading,SpinLoading}
