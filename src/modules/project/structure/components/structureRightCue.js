import React from "react";
import {Button} from "antd";
import {ExclamationCircleOutlined,InfoOutlined} from "@ant-design/icons";

const StructureRightCue = props =>{

    const {way,time,title,action,actionTitle} = props

    const runWay = i => {
        switch (i) {
            case 1:return "手动"
            default:return "自动"
        }
    }

    return(
        <div className="mid_group_top">
            <div className="mid_group_top_tel">
                <span className="tel_title">{title}</span>
                <span className="tel_time">执行时长：{time} </span>
                <span className="tel_way">触发方式：{runWay(way)} </span>
            </div>
            <div className="mid_group_top_del">
                <Button onClick={()=>action()}>
                    {actionTitle ==="停止" && <ExclamationCircleOutlined/>}
                    {actionTitle ==="删除" && <InfoOutlined />}
                    {actionTitle}
                </Button>
            </div>
        </div>
    )
}

export default StructureRightCue