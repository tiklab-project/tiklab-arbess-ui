import React from 'react'
import {Card} from "antd";

const StructureHistoryDetailsCenter = props =>{

    const {historyLog}=props

    const CodeState = () =>{
        if(historyLog.logCodeState===10){
            return (
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-chenggong-"/>
                </svg>
            )
        }else if(historyLog.logCodeState===0){
            return(
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-yizhongzhi"/>
                </svg>
            )
        }else {
            return (
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-yunhangshibai1"/>
                </svg>
            )
        }
    }

    const TestState = () =>{
        if(historyLog.logTestState===10){
            return (
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-chenggong-"/>
                </svg>
            )
        }else if(historyLog.logTestState===0){
            return(
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-yizhongzhi"/>
                </svg>
            )
        }else {
            return (
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-yunhangshibai1"/>
                </svg>
            )
        }
    }

    const PackState = () =>{
        if(historyLog.logPackState===10){
            return (
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-chenggong-"/>
                </svg>
            )
        }else if(historyLog.logPackState===0){
            return(
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-yizhongzhi"/>
                </svg>
            )
        }else {
            return (
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-yunhangshibai1"/>
                </svg>
            )
        }
    }

    const DeployState = () =>{
        if(historyLog.logDeployState===10){
            return (
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-chenggong-"/>
                </svg>
            )
        }else if(historyLog.logDeployState===0){
            return(
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-yizhongzhi"/>
                </svg>
            )
        }else {
            return (
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-yunhangshibai1"/>
                </svg>
            )
        }
    }

    return(
        <div>
            <div className='structureHistory-details-center'>
                <Card title='克隆'  className='structureHistory-details-card'>
                    <div className='structureHistory-details-div'>
                        {CodeState()}
                    </div>
                    <div className='structureHistory-details-ul'>
                        <ul>
                            <li>克隆时间：{historyLog.logCodeTime}</li>
                        </ul>
                    </div>
               </Card>

                <Card title='测试'  className='structureHistory-details-card'>
                    <div className='structureHistory-details-div'>
                        {TestState()}
                    </div>
                    <div className='structureHistory-details-ul'>
                        <ul>
                            <li>测试时间：{historyLog.logTestTime}</li>
                        </ul>
                    </div>
                </Card>

                <Card title='构建'  className='structureHistory-details-card'>
                    <div className='structureHistory-details-div'>
                        {PackState()}
                    </div>
                    <div className='structureHistory-details-ul'>
                        <ul>
                            <li>构建时间：{historyLog.logPackTime}</li>
                        </ul>
                    </div>
               </Card>

                <Card title='部署'  className='structureHistory-details-card'>
                    <div className='structureHistory-details-div'>
                        {DeployState()}
                    </div>
                    <div className='structureHistory-details-ul'>
                        <ul>
                            <li>部署时间：{historyLog.logDeployTime}</li>
                        </ul>
                    </div>
               </Card>
           </div>

            <div className='structureHistory-details-out'>
                <h1>控制台输出</h1>
                <div className='structureHistory-details-log' >
                    {historyLog.logRunLog}
                </div>
           </div>
       </div>
    )
}

export default StructureHistoryDetailsCenter