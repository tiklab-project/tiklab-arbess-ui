import React from "react";
import {Spin} from "antd";
import "./Loading.scss";

/**
 * 全屏加载
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export const Loading = props =>{
    return (
        <div className="arbess-loading">
            <div className="arbess-shape"/>
            <div className="arbess-shape"/>
            <div className="arbess-shape"/>
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
export const SpinLoading = ({size, type,title}) => {

    if(type==='table'){
        return  <div style={{textAlign:"center",padding:"25px 0"}}>
                    <Spin size={size?size:'default '}/>
                </div>
    }

    return  <div className='arbess-spin-loading'>
                <Spin size={size? size:'default '}/>
                {
                    title && <div className='spin-loading-title'>{title}</div>
                }
            </div>

}
