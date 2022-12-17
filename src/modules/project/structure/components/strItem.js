import React from "react";
import {getTime} from "../../../common/client/client";

const StrItem = props =>{

    const {itemData,status,setTreeData,setLogData,setExecIndex,index,setId} = props

    const log = (item,itemIndex) =>{
        switch (index) {
            case 0:
                setExecIndex(itemIndex)
                break
            case 1:
                setTreeData(item)
                setLogData(item)
                setId(item.id)
        }
    }

    // 样式
    const style = runState => {
        return `item-${runState}`
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
        return <div className={`st-card ${style(item.state)}`} key={index}>
            <div className="card-top">
                <span className="card-top-state">
                    {status(item.state)}
                </span>
                <span className="card-top-title">
                    {item.name}
                </span>
            </div>
            <div className="card-ct">
                {statusText(item.state)}
            </div>
            <div className="card-bt">
                <span className="card-bt-log" onClick={()=>log(item,index)}>日志</span>
                <span className="card-bt-time">
                    {getTime(item.time)}
                </span>
            </div>
        </div>
    }

    return(
        <div className="str-multi">
            {
                itemData && itemData.map((item,index)=>{
                    return renderMulti(item,index)
                })
            }
        </div>
    )
}

export default StrItem