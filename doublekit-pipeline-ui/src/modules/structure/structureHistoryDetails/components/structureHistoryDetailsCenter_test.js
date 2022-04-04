import React ,{useState}from 'react'
import {Card} from "antd";
import LogDetails from "./logDetails";
import {CheckOutlined, CloseOutlined, PauseOutlined} from "@ant-design/icons";

const StructureHistoryDetailsCenter_test= props =>{

    const {historyLog,findHistoryLog}=props

    const [visible,setVisible] = useState(false)
    const [drawer,setDrawer] = useState('')

    const status = () =>{
        if(historyLog){
            const testLog=historyLog.testLog
            if(testLog){
                switch (testLog.testRunStatus) {
                    case 10:
                        return  <CheckOutlined style={{color:"#1890ff"}}/>
                    case 1:
                        return  <CloseOutlined style={{color:'#FF0000'}}/>

                    case 0:
                        return  <PauseOutlined />

                }
            }
        }
    }

    const testRunTime =() =>{
        if(historyLog){
            const testLog=historyLog.testLog
            if(testLog){
                return  testLog.testRunTime
            }
        }
    }

    const logDetails = () =>{
        setDrawer('test')
        setVisible(true)
    }

    return(
        <Card className='structureHistory-details-center-cart'>
            <div className='cart-top'>测试</div>
            <div className='cart-center'>
                <div className='cart-center-item'>
                    <div>状态： {status()}</div>
                    <div>时间： {testRunTime()}</div>
                </div>
            </div>
            <div className='cart-bottom' onClick={logDetails}>
                日志
            </div>
            <LogDetails
                visible={visible}
                setVisible={setVisible}
                findHistoryLog={findHistoryLog}
                drawer={drawer}
                historyLog={historyLog}
            />
        </Card>
    )
}

export default StructureHistoryDetailsCenter_test