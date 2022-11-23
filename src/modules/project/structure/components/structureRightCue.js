import React from "react";
import Btn from "../../../common/btn/btn";
import {ExclamationCircleOutlined,DeleteOutlined} from "@ant-design/icons";
import {Popconfirm} from "antd";

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
                {
                    actionTitle==="删除"
                    &&
                    <Popconfirm
                        placement="topRight"
                        title="你确定删除吗"
                        onConfirm={action}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Btn
                            icon={<DeleteOutlined/>}
                            title={actionTitle}
                        />
                    </Popconfirm>
                }
                {
                    actionTitle==="停止"
                    &&
                    <Btn
                        icon={<ExclamationCircleOutlined/>}
                        title={actionTitle}
                        onClick={action}
                    />
                }
            </div>
        </div>
    )
}

export default StructureRightCue