import React from "react"
import {Spin} from "antd";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    LoadingOutlined, MinusCircleOutlined,
    PlayCircleOutlined, FieldTimeOutlined,
} from "@ant-design/icons";
import {
    runError,
    runSuccess,
    runHalt,
    runRun,
    runWait,
    runSuspend,
    runTimeout
} from "../../../common/utils/Constant";

/**
 * 运行状态说明
 * @returns {string}
 * @param type
 */
export const runStatusText = type =>{
    switch (type) {
        case runError: return "运行失败"
        case runSuccess: return "运行成功"
        case runHalt: return "运行终止"
        case runRun: return "运行中"
        case runWait: return "等待中"
        case runSuspend: return "暂停中"
        case runTimeout: return "运行超时"
    }
}

/**
 * 运行状态图标
 * @returns {JSX.Element}
 * @param type
 */
export const runStatusIcon = type =>{
    switch(type){
        case runError :
            return  <CloseCircleOutlined style={{color:"red"}}/>
        case runSuccess :
            return  <CheckCircleOutlined style={{color:"var(--tiklab-blue)"}}/>
        case runHalt:
            return  <ExclamationCircleOutlined style={{color:"black"}}/>
        case runRun:
            return  <Spin indicator={<LoadingOutlined spin style={{color:"black"}}/>} />
        case runWait:
            return  <PlayCircleOutlined style={{color:"black"}}/>
        case runSuspend:
            return <MinusCircleOutlined style={{color:"black"}}/>
        case runTimeout:
            return <FieldTimeOutlined style={{color:"orange", fontSize:16}}/>
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
