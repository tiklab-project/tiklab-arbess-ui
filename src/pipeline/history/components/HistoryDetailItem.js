import React from "react";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    LoadingOutlined,
    PlayCircleOutlined
} from "@ant-design/icons";
import {Spin} from "antd";
import {getTime} from "../../../common/client/Client";

const HistoryDetailItem = props =>{

    const {itemData,setTreeData,setLogData,setExecIndex,index,setId} = props

    const log = (item,itemIndex) =>{
        switch (index) {
            case 1:
                setTreeData(item)
                setLogData(item)
                break
            default:
                setExecIndex(itemIndex)
                setId(item.id)
        }
    }

    const status = state =>{
        switch(state){
            case 1 :
                //失败
                return  <CloseCircleOutlined style={{fontSize:16,color:"red"}}/>
            case 10 :
                //成功
                return  <CheckCircleOutlined style={{fontSize:16,color:"#0063FF"}}/>
            case 20:
                //被迫停止
                return  <ExclamationCircleOutlined style={{fontSize:16}}/>
            case 0:
                //运行
                return  <Spin indicator={<LoadingOutlined style={{fontSize:16}} spin />} />
            case 3:
                //运行--等待运行
                return  <PlayCircleOutlined style={{fontSize:16}}/>
        }
    }

    const statusText = state =>{
        switch (state) {
            case 1:
                return "运行失败"
            case 10:
                return "运行成功"
            case 20:
                return "运行终止"
            case 0:
                return "正在运行"
            case 3:
                return "等待运行"
        }
    }

    const renderMulti = (item,index) =>{
        return <div className={`st-card item-${item.state}`} key={index}>
            <div className="card-top">
                <span className="card-top-state">{status(item.state)}</span>
                <span className="card-top-title">{item.name}</span>
            </div>
            <div className="card-ct">{statusText(item.state)}</div>
            <div className="card-bt">
                <span className="card-bt-log" onClick={()=>log(item,index)}>日志</span>
                <span className="card-bt-time">{getTime(item.time)}</span>
            </div>
        </div>
    }

    return(
        <div className="str-multi">
            {
                itemData && itemData.map((item,index)=>renderMulti(item,index))
            }
        </div>
    )
}

export default HistoryDetailItem
