import React from "react";
import {Statistic} from "antd";
import Guide from "./guide";


const status = [
    {
        title:"成功",
        color:"#1890ff"
    },
    {
        title:"失败",
        color:"#ff0000"
    },
    {
        title:"停止",
        color:"#222222"
    },
]

const Statistics = props =>{

    const {stateList} = props


    return(
        <div className="state">
            <div className="state-bottom">
                {
                    status.map(item=>{
                        return(
                            <div className="state-div" key={item.title}>
                                <div className="state-div-1">{item.title}</div>
                                <div>{stateList && stateList[item.title]}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Statistics