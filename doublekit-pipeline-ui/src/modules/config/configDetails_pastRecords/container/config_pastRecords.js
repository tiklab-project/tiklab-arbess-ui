import React,{useState} from "react";
import {Button,Card,Divider} from "antd";
import {withRouter} from "react-router-dom";
import './config_pastRecords.scss'
import Config_pastRecordsThis from "../components/config_pastRecordsThis";
import Config_pastRecordsLast from "../components/config_pastRecordsLast";
import Config_pastRecordsScreenModal from "../components/config_pastRecordsScreenModal";

const ConfigPastRecords=props=>{

    const [visible, setVisible] = useState(false)

    const onCreate = values => {
        setVisible(false)
    }

    return(
        <div className='config_pastRecords task'>
            <h2>更改记录</h2>
            <div className='config_pastRecords-btn'>
                <Button type='primary' onClick={()=>props.history.push('/home/task/config')}>
                    返回
                </Button>
                <Button onClick={()=> setVisible(true)}>
                    筛选
                </Button>
            </div>
            <div className='config_pastRecords-h'>
                <Card title={<h3>本次构建</h3>} extra={<h3>上次构建</h3>} >
                    <div className='config_pastRecords-difference'>
                        <Config_pastRecordsThis/>
                        <Config_pastRecordsLast/>
                    </div>
                </Card>
            </div>
            <Config_pastRecordsScreenModal
                visible={visible}
                onCreate={onCreate}
            />
        </div>
    )
}

export default withRouter(ConfigPastRecords)