import React,{useState} from "react";
import ConfigView from "./view";
import Trigger from "./trigger";

const ConfigTabs = props =>{

    const {type,setType} = props

    const typeLis = [
        {
            id:1,
            title:"流程设计"
        },
        {
            id:2,
            title:"触发器"
        },
        {
            id:3,
            title:"后置处理"
        },
    ]

    return(
        <div className="config-tabs">
            {
                typeLis.map(item=>{
                    return(
                        <div
                            key={item.id}
                            className={`config-tab ${type===item.id?"config-active":""}`}
                            onClick={()=>setType(item.id)}
                        >
                            {item.title}
                        </div>
                    )
                })
            }
            {/* {
                type === 1 &&
                <ConfigView/>
            }
            {
                type===2 &&
                <Trigger/>
            } */}
        </div>
    )

}

export default ConfigTabs
