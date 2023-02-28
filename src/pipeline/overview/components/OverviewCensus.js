import React from "react";
import {
    BorderOuterOutlined,
    CheckSquareOutlined,
    CloseSquareOutlined,
    ExclamationCircleOutlined,
    ClockCircleOutlined,
} from "@ant-design/icons";

/**
 * 运行概况
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Overviewoverview = props =>{

    const {overview} = props

    const status = [
        {
            title:"成功",
            num:<span className="overview-successNumber">{overview && overview.successNumber} 次</span>,
            icon:<CheckSquareOutlined className="overview-successNumber"/>,
        },
        {
            title:"停止",
            num: <span className="overview-removeNumber">{overview && overview.removeNumber} 次</span>,
            icon:<ExclamationCircleOutlined className="overview-removeNumber"/>,
        },
        {
            title:"失败",
            num:<span className="overview-errorNumber">{overview && overview.errorNumber} 次</span>,
            icon:<CloseSquareOutlined className="overview-errorNumber"/>,
        },
        {
            title:"执行次数",
            num:<span className="overview-number">{overview && overview.number} 次</span>,
            icon:<BorderOuterOutlined className="overview-number"/>,
        },
        {
            title:"平均执行时长",
            num:<span className="overview-time">{overview && overview.time}</span>,
            icon:<ClockCircleOutlined className="overview-time"/>
        },
    ]

    return(
        <div className="survey-overview-stat">
            <div className="stat">
                {
                    status.map(item=>{
                        return(
                            <div className="stat-div" key={item.title}>
                                <div className="stat-div-title">
                                    <span className="stat-div-title-icon">{item.icon}</span>
                                    <span className="stat-div-title-name">{item.title}</span>
                                </div>
                                <div className="overview-num">{item.num} </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Overviewoverview
