import React ,{useState} from 'react'
import LogDetails from "./logDetails";
import {Card} from "antd";
import { CheckOutlined ,CloseOutlined,PauseOutlined} from '@ant-design/icons';

const StructureHistoryDetailsCenter = props =>{

    const {historyLog}=props

    const [visible,setVisible] = useState(false)
    const [drawer,setDrawer] = useState('')
    const [taskAlias,setTaskAlias] = useState('')

    const state = item => {
        if(item){
            switch (item.runState){
                case 10:
                    return  <CheckOutlined style={{color:"#1890ff"}}/>
                case 30:
                    return  <CloseOutlined style={{color:'#FF0000'}}/>
                default :
                    return <PauseOutlined />
            }
        }
    }

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

    const log = item => {
        setDrawer(item.runLog)
        setTaskAlias(item.taskAlias)
        setVisible(true)
    }

    return(
        <div className='structureHistory-details-center'>
            {
                historyLog && historyLog.map(item=>{
                    return(
                        <Card className='structureHistory-details-center-cart' key={item.pipelineLogId}>
                            <div className='cart-top'>
                                {item.taskAlias} -- 
                                <span style={{paddingLeft:5}}>{type(item)}</span>
                                </div>
                            <div className='cart-center'>
                                <div className='cart-center-item'>
                                    <div>状态：{state(item)}</div>
                                    <div>时间： {item.runTime}</div>
                                </div>
                            </div>
                            <div className='cart-bottom' >
                                <span className='cart-bottom-span' onClick={()=>log(item)}>
                                    日志
                                </span>
                            </div>
                        </Card>
                    )
                })
            }

            <LogDetails
                visible={visible}
                setVisible={setVisible}
                drawer={drawer}
                taskAlias={taskAlias}
            />
        </div>
    )
}

export default StructureHistoryDetailsCenter