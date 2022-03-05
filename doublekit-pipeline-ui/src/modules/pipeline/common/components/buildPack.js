import React,{useState} from 'react'
import Running from "../../../../common/running/running";
import { Card } from 'antd';

const BuildPack = props =>{

    const {logList}=props

    const state = () =>{
        if(!logList){
            return (
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-yunhang"></use>
                </svg>
            )
        }else {
            //如果构建状态为10--成功
            if(logList.logPackState===10){
                return (
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-chenggong-"></use>
                    </svg>
                )
            }
            //如果构建状态为0，克隆状态为10--运行
            else if(logList.logCodeState===10 && logList.logPackState===0 ){
                return (
                   <div className='task-structure-running'>
                       <Running/>
                   </div>
                )
            }
            //如果构建状态为1--失败
            else if(logList.logPackState===1){
                return (
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-yunhangshibai1"></use>
                    </svg>
                )
            }else {
                return (
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-yunhang"></use>
                    </svg>
                )
            }
        }
    }

    const time = () => {
        if(!logList){
            return (
                <li>构建时间：0</li>
            )
        }else {
            return (
                <li>构建时间：{logList.logPackTime}</li>
            )
        }
    }

    return(
        <Card title="构建" className='task-structure-card'>
            <div className='task-structure-div'>
                {state()}
            </div>
            <div className='task-structure-ul'>
                <ul>
                    {time()}
                </ul>
            </div>
        </Card>
    )
}

export default BuildPack