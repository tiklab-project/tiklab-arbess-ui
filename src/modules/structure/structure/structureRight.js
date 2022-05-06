import React, {Fragment, useState} from "react";
import {Card,Spin} from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import Structure_right_logDrawer from './Structure_right_logDrawer'

const StructureRight = props =>{

    const {logList,structureStepList} = props

    
    const [visible,setVisible] = useState(false)
    const [drawer,setDrawer] = useState('')
    const [taskAlias,setTaskAlias] = useState('')

    const type = item =>{
        if(item){
            switch(item.taskType){
                case 1:
                    return '通用Git'
                case 2:
                    return 'Gitee'
                case 11:
                    return '单元测试'
                case 21:
                    return 'maven'
                case 22:
                    return 'node'
                case 31:
                    return 'linux'
                case 32:
                    return 'docker'
            }
        }
    }

    const status = i =>{
        switch(i){
            case 0 :{
                return  <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            }
            case 1 :{
                return  <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-chenggong-"/>
                        </svg>
            }
            case 2 :{
                return  <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-yunhangshibai1"/>
                        </svg>
            }
            case 3:{
                return  <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-yunhang"/>
                        </svg>
            }
        }
    }

    // 返回值：logList.status，状态（1）成功，（100）：失败， 默认值 0，成功后 logList.status+10  
    const state = index =>{
        if(logList){
            const i = logList.sort;
            const j = logList.status;
            if(i > j && index === i ){
                return  status(0)                        
            }else if (index <i ){
                return  status(1)
            }else if(i<j){
                return  status(2)
            }else if(index > i){
                return  status(3)
            }       
        }
    }

    const log = item => {
        setDrawer(item.runLog)
        setTaskAlias(item.taskAlias)
        setVisible(true)
    }

    return(
        <div className='structure-content-right'>
            <div className='structure-content-right-mid'>
                {
                    structureStepList.map((item,index)=>{
                        return(
                            <Card className='structure-content-right-mid-cart' key={index}>
                                <div className='cart-top'>
                                    {item.taskAlias} --
                                    <span style={{paddingLeft:5}}>{type(item)}</span>
                                </div>
                                <div className='cart-center'>
                                    <div className='cart-center-item'>
                                        <div>{state(index+1)}</div>
                                        <div>时间:</div>
                                    </div>
                                </div>
                                <div className='cart-bottom' >
                                    <span
                                        className='cart-bottom-span'
                                        onClick={()=>log(item)
                                    }>
                                        日志
                                    </span>
                                </div>
                            </Card>
                        )
                    })
                }
            </div>

            <Structure_right_logDrawer
                visible={visible}
                setVisible={setVisible}
                drawer={drawer}
                taskAlias={taskAlias}
            />
        </div>
    )
}

export default StructureRight