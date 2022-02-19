import React,{useState} from "react";
import {Button} from "antd";
import {withRouter} from "react-router-dom";
import Config_pastRecordsThis from "./config_pastRecordsThis";
import Config_pastRecordsLast from "./config_pastRecordsLast";
import Config_pastRecordsScreenModal from "./config_pastRecordsScreenModal";

const PastRecordsTask=props=>{
    const [visible, setVisible] = useState(false);

    const onCreate = (values) => {

        setVisible(false);
    };
    return(
        <div className='task-pastRecord'>
            <h1>更改记录</h1>
            <div className='task-pastRecord-btn'>
                <Button type='primary' onClick={()=>props.history.push('/home/task/config')}>
                    返回
                </Button>
                <Button onClick={()=> setVisible(true)}>
                    筛选
                </Button>

            </div>
            <div className='task-pastRecord-h'>
                <h2>本次构建</h2>
                <h2>上次构建</h2>
            </div>
            <Config_pastRecordsThis/>
            <Config_pastRecordsLast/>
            <Config_pastRecordsScreenModal
                visible={visible}
                onCreate={onCreate}
            />
        </div>
    )
}
export default withRouter(PastRecordsTask)