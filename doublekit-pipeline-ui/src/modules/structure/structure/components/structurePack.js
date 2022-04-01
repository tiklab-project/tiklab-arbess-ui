import React,{useState} from 'react'
import { Card,Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

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
            const structureLog=logList.structureLog
            //如果测试时间为10 --运行
            if(logList.testLog.testRunStatus ===10 && structureLog.structureRunStatus===0){
                return (
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                )
            }
            //如果构建状态为10--成功
            else if(structureLog.structureRunStatus){
                return (
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-chenggong-"/>
                    </svg>
                )
            }
            //如果构建状态为1--失败
            else if(structureLog.structureRunStatus===1){
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
            return 0
        }else {
            return logList.structureLog.structureRunTime
        }
    }

    return(
        <Card className='structure-mid-cart'>
            <div className='cart-top'>构建</div>
            <div className='cart-center'>
                <div className='cart-center-item'>
                    <div>{state()}</div>
                    <div>构建时间： {time()}</div>
                </div>
            </div>
            <div className='cart-bottom' >
                日志
            </div>
        </Card>
    )
}

export default StructurePack