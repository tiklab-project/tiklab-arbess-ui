import React from "react"
import {Spin} from "antd";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    LoadingOutlined,
    PlayCircleOutlined
} from "@ant-design/icons";

/**
 * 运行状态说明
 * @param type：运行类型
 * @returns {string}
 */
export const runStatusText = type =>{
    switch (type) {
        case "error" :
            return  "运行失败"
        case "success" :
            return  "运行成功"
        case "halt":
            return  "运行终止"
        case "run":
            return  "运行中"
        case "wait":
            return "等待中"
    }
}

/**
 * 运行状态图标
 * @param type：运行类型
 * @returns {JSX.Element}
 */
export const runStatusIcon = type =>{
    switch(type){
        case "error" :
            return  <CloseCircleOutlined style={{fontSize:14,color:"red"}}/>
        case "success" :
            return  <CheckCircleOutlined style={{fontSize:14,color:"#0063FF"}}/>
        case "halt":
            return  <ExclamationCircleOutlined style={{fontSize:14}}/>
        case "run":
            return  <Spin indicator={<LoadingOutlined style={{fontSize:14}} spin />} />
        case "wait":
            return  <PlayCircleOutlined style={{fontSize:14}}/>
    }
}

