import React from "react"
import {Spin} from "antd";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    LoadingOutlined, MinusCircleOutlined,
    PlayCircleOutlined
} from "@ant-design/icons";

/**
 * 运行状态说明
 * @returns {string}
 * @param type
 */
export const runStatusText = type =>{
    switch (type) {
        case "error":return  "运行失败"
        case "success":return  "运行成功"
        case "halt":return  "运行终止"
        case "run":return  "运行中"
        case "wait":return "等待中"
        case "suspend":return "暂停中"
    }
}

/**
 * 运行状态图标
 * @returns {JSX.Element}
 * @param type
 */
export const runStatusIcon = type =>{
    switch(type){
        case "error" :
            return  <CloseCircleOutlined style={{color:"red"}}/>
        case "success" :
            return  <CheckCircleOutlined style={{color:"var(--thoughtware-blue)"}}/>
        case "halt":
            return  <ExclamationCircleOutlined/>
        case "run":
            return  <Spin indicator={<LoadingOutlined spin />} />
        case "wait":
            return  <PlayCircleOutlined />
        case 'suspend':
            return <MinusCircleOutlined />
    }
}

/**
 * 时间转换
 * @param time
 * @returns {string}
 */
export const getTime = time =>{
    let DateTimes ;
    let days = parseInt(time / ( 60 * 60 * 24));
    let hours = parseInt((time % ( 60 * 60 * 24)) / (60 * 60));
    let minutes = parseInt((time % ( 60 * 60)) /60);
    let seconds =  parseInt(time % 60);
    if(days >= 1){
        DateTimes= days + " 天 " + hours + " 时 " + minutes + " 分 " + seconds + " 秒"
    }else if(hours >= 1){
        DateTimes=hours + " 时 " + minutes + " 分 " + seconds + " 秒"
    }else if(minutes >= 1){
        DateTimes=minutes + " 分 " + seconds + " 秒"
    }else{
        DateTimes=seconds + " 秒"
    }
    return DateTimes
}
