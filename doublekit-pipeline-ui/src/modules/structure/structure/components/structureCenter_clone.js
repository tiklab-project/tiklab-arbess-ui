import React,{useState} from 'react'
import { Card,Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const StructureCenter_clone = props =>{

    const {logList}=props

    const state = () =>{
        if(!logList){
            return   <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-yunhang"/>
                    </svg>
        }else {
            const codeLog =  logList.codeLog
            if(codeLog.codeRunStatus===2){
                return  <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            }else if(codeLog.codeRunStatus===10){

                return  <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-chenggong-"/>
                        </svg>
            }else if(codeLog.codeRunStatus===1){

                return  <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-yunhangshibai1"/>
                        </svg>
            }else {
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
            return logList.codeLog.codeRunTime
        }
    }

    return(
        <Card className='structure-mid-cart'>
            <div className='cart-top'>克隆</div>
            <div className='cart-center'>
                <div className='cart-center-item'>
                    <div>{state()}</div>
                    <div>克隆时间： {time()}</div>
                </div>
            </div>
            <div className='cart-bottom' >
                日志
            </div>
        </Card>
    )
}

export default StructureCenter_clone