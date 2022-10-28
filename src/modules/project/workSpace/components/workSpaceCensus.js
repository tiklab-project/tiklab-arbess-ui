import React from "react";
import {
    BorderOuterOutlined,
    CheckSquareOutlined,
    CloseSquareOutlined,
    ExclamationCircleOutlined,
    ClockCircleOutlined,
} from "@ant-design/icons";


const WorkSpaceCensus = props =>{

    const {census} = props

    const status = [
        {
            title:"成功",
            num:<span className="census-successNumber">{census && census.successNumber} 次</span>,
            icon:<CheckSquareOutlined className="census-successNumber"/>,
        },
        {
            title:"停止",
            num: <span className="census-removeNumber">{census && census.removeNumber} 次</span>,
            icon:<ExclamationCircleOutlined className="census-removeNumber"/>,
        },
        {
            title:"失败",
            num:<span className="census-errorNumber">{census && census.errorNumber} 次</span>,
            icon:<CloseSquareOutlined className="census-errorNumber"/>,
        },
        {
            title:"执行次数",
            num:<span className="census-number">{census && census.number} 次</span>,
            icon:<BorderOuterOutlined className="census-number"/>,
        },
        {
            title:"平均执行时长",
            num:<span className="census-time">{census && census.time}</span>,
            icon:<ClockCircleOutlined className="census-time"/>
        },
    ]

    return(
        <div className="workSpace-census-stat">
            <div className="stat">
                {
                    status.map(item=>{
                        return(
                            <div className="stat-div" key={item.title}>
                                <div className="stat-div-title">
                                    <span className="stat-div-title-icon">
                                        {item.icon}
                                    </span>
                                    <span className="stat-div-title-name">
                                        {item.title}
                                    </span>
                                </div>
                                <div className="census-num">{item.num} </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default WorkSpaceCensus