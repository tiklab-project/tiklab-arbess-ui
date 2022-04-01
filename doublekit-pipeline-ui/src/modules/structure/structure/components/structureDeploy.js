import React from 'react'
import { Card,Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

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
            const deployLog=logList.deployLog
            //如果构建状态为10--运行
            if(logList.structureLog.structureRunStatus===10 && deployLog.deployRunStatus===0){
                return (
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                )
            }
            //如果部署状态为10--成功
            else if(deployLog.deployRunStatus===10){
                return (
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-chenggong-"/>
                    </svg>
                )
            }
            //如果部署状态为1--失败
            else if(deployLog.deployRunStatus===1){
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
            return logList.deployLog.deployRunTime
        }
    }

    return(
        <Card className='structure-mid-cart'>
            <div className='cart-top'>部署</div>
            <div className='cart-center'>
                <div className='cart-center-item'>
                    <div>{state()}</div>
                    <div>部署时间： {time()}</div>
                </div>
            </div>
            <div className='cart-bottom' >
                日志
            </div>
        </Card>
    )
}

export default StructureDeploy