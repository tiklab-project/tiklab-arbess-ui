import React from "react";
import {LockOutlined,UnlockOutlined} from "@ant-design/icons";
import "./pipelinePower.scss";

const PipelinePower = props =>{

    const {powerType,set,onClick} = props

    const powerLis = [
        {
            id:1,
            title:"全局",
            icon:<UnlockOutlined />,
            desc:"互联网上的任何人都可以查看该项目。不支持TFVC等某些功能。"
        },
        {
            id:2,
            title:"私有",
            icon:<LockOutlined />,
            desc: "只有您授予访问权限的人才能查看此项目。"
        }
    ]

    return(
        <div className="pipeline-power">
            <div className="pipeline-power-title">流水线权限</div>
            <div className="pipeline-power-content">
                {
                    powerLis.map(item=>{
                        return <div
                            key={item.id}
                            className={`pipeline-power-item ${set?"pipeline-power-set":"pipeline-power-noSet"} ${powerType===item.id?"pipeline-power-select":""}`}
                            onClick={()=>onClick(item)}
                        >
                            <div className="power-item">
                                <div>
                                    <div className="power-title power-icon">
                                        {item.icon}
                                    </div>
                                    <div className="power-title power-name">
                                        {item.title}
                                    </div>
                                </div>
                                {
                                    powerType===item.id &&
                                    <div className="power-select-show"/>
                                }
                            </div>
                            <div className="power-desc">
                                {item.desc}
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default PipelinePower