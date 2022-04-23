import React ,{Fragment}from "react";
import {Button, Form} from "antd";


const Config_addNewStage = props =>{

    const {setNewStageVisible} = props

    return(
       <Fragment>
            <div className='config-details-tail'>
                <div className='config-details-Headline'>新阶段</div>
                <div
                    className='config-details-handle'
                    onClick={()=> setNewStageVisible(true)}
                >
                    新任务
                    </div>
            </div>
            <Form.Item style={{marginTop:20}}>
                <Button htmlType="submit" type='primary'>保存</Button>
            </Form.Item>
       </Fragment>
    )
}

export default Config_addNewStage