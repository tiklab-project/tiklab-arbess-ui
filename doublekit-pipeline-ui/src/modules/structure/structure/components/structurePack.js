import React,{useState} from 'react'
import Running from "../../../../common/running/running";
import { Card } from 'antd';

const StructurePack = props =>{

    const {logList}=props

    const state = () =>{
        if(!logList){
            return (
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-yunhang"/>
                </svg>
            )
        }else {
            //如果测试时间为10 --运行
            if(logList.logTestState===10 && logList.logPackState===0){
                return (
                    <div className='structure-running'>
                        <Running/>
                    </div>
                )
            }
            //如果构建状态为10--成功
            else if(logList.logPackState){
                return (
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-chenggong-"/>
                    </svg>
                )
            }
            //如果构建状态为1--失败
            else if(logList.logPackState===1){
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
                <li>构建时间：0</li>
            )
        }else {
            return (
                <li>构建时间：{logList.logPackTime}</li>
            )
        }
    }

    return(
        <Card title="构建" className='structure-card'>
            <div className='structure-div'>
                {state()}
            </div>
            <div className='structure-ul'>
                <ul>
                    {time()}
                </ul>
            </div>
        </Card>
    )
}

export default StructurePack