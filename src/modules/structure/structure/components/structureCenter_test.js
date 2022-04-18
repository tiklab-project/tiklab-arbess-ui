import React, {useState} from 'react'
import { Card } from 'antd';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const StructureCenter_test = props =>{

    const {logList}=props

    const state = () =>{
        if(!logList){
            return (
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-yunhang"/>
                </svg>
            )
        }else {
            const testLog=logList.testLog
            if(logList.codeLog.codeRunStatus ===10 && testLog.testRunStatus===0){
                return  <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            }
            else if(testLog.testRunStatus===10){
                return  <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-chenggong-"/>
                        </svg>
            }
            else if(testLog.testRunStatus===1){
                return  <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-yunhangshibai1"/>
                        </svg>
            }
            else {
                return  <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-yunhang"/>
                        </svg>
            }
        }
    }

    const time = () => {
        if(!logList){
            return 0
        }else {
            return logList.testLog.testRunTime
        }
    }

    return(
        <Card className='structure-mid-cart'>
            <div className='cart-top'>测试</div>
            <div className='cart-center'>
                <div className='cart-center-item'>
                    <div>{state()}</div>
                    <div>测试时间：{time()}</div>
                </div>
            </div>
            <div className='cart-bottom' >
                日志
            </div>
        </Card>
    )
}

export default StructureCenter_test