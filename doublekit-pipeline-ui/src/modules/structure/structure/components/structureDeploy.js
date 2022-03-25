import React from 'react'
import { Card } from 'antd';
import Running from "../../../../common/running/running";

const StructureDeploy = props =>{

    const {logList}=props

    const state = () =>{
        if(!logList){
            return (
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-yunhang"/>
                </svg>
            )
        } else {
            //如果构建状态为10--运行
            if(logList.logPackState===10 && logList.logDeployState===0){
                return (
                    <div className='structure-running'>
                        <Running/>
                    </div>
                )
            }
            //如果部署状态为10--成功
            else if(logList.logDeployState===10){
                return (
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-chenggong-"/>
                    </svg>
                )
            }
            //如果部署状态为1--失败
            else if(logList.logDeployState===1){
                return (
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-yunhangshibai1"/>
                    </svg>
                )
            }else {
                return (
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-yunhang"/>
                    </svg>
                )
            }
        }
    }

    const time = () => {
        if(!logList){
            return (
                <li>部署时间：0</li>
            )
        }else {
            return (
                <li>部署时间：{logList.logDeployTime}</li>
            )
        }
    }

    return(
        <Card title="部署" className='structure-card'>
            <div className='structure-div'>
                {state()}
            </div>
            <div className='structure-ul' >
                <ul>
                    {time()}
                </ul>
            </div>
        </Card>
    )
}

export default StructureDeploy