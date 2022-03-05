import React from 'react'
import {Card} from "antd";



const BuildHistoryDetailsCenter = props =>{

    const {historyLog}=props

    const CodeState = () =>{
        if(historyLog.logCodeState===10){
            return (
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-chenggong-"></use>
                </svg>
            )
        }else {
            return (
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-yunhangshibai1"></use>
                </svg>
            )
        }
    }

    const PackState = () =>{
        if(historyLog.logPackState===10){
            return (
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-chenggong-"></use>
                </svg>
            )
        }else {
            return (
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-yunhangshibai1"></use>
                </svg>
            )
        }
    }

    const DeployState = () =>{
        if(historyLog.logDeployState===10){
            return (
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-chenggong-"></use>
                </svg>
            )
        }else {
            return (
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-yunhangshibai1"></use>
                </svg>
            )
        }
    }

    return(
        <div>
            <div className='task-build-center'>
                <Card title='克隆'  className='task-build-card'>
                    <div className='task-build-div'>
                        {CodeState()}
                    </div>
                    <div className='task-build-ul'>
                        <ul>
                            <li>克隆时间：{historyLog.logCodeTime}</li>
                        </ul>
                    </div>
               </Card>

                <Card title='构建'  className='task-build-card'>
                    <div className='task-build-div'>
                        {PackState()}
                    </div>
                    <div className='task-build-ul'>
                        <ul>
                            <li>构建时间：{historyLog.logPackTime}</li>
                        </ul>
                    </div>
               </Card>

                <Card title='部署'  className='task-build-card'>
                    <div className='task-build-div'>
                        {DeployState()}
                    </div>
                    <div className='task-build-ul'>
                        <ul>
                            <li>部署时间：{historyLog.logDeployTime}</li>
                        </ul>
                    </div>
               </Card>
           </div>

            <div className='task-build-out'>
                <h1>控制台输出</h1>
                <div className='task-build-log' >
                    {historyLog.logRunLog}
                </div>
           </div>
       </div>
    )
}
export default BuildHistoryDetailsCenter