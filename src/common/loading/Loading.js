import React from "react";
import {Spin} from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import "./Loading.scss";

const Loading = props =>{
    return (
        <div className="mf-loading">
            <div className="mf-shape"/>
            <div className="mf-shape"/>
            <div className="mf-shape"/>
        </div>
    )
}


const SpinLoading = ({size, type}) => {

    if(type==='table'){
        return  <div style={{textAlign:"center",paddingTop:30}}>
                    <Spin size={size?size:'default '}/>
                </div>
    }

    return  <div style={{height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Spin size={size?size:'default '}/>
            </div>

}

const ServerLoading = ({title}) =>{
    return (
        <div className='mf-server-loading'>
            <div className='server-loading-content'>
                <Spin indicator={<LoadingOutlined style={{fontSize:14}}/>}/>
                <span className='loading-content-title'>{title}</span>
            </div>
        </div>
    )
}

export {Loading,SpinLoading,ServerLoading}
