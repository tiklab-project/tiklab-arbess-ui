import React ,{Fragment}from "react";
import {Button, Form} from "antd";


const ConfigAddNewStage = props =>{

    const {setNewStageVisible} = props

    return(
        <Fragment>
            <div className='configView1-wrapper'>
                <div className='configView1-wrapper-Headline'>新阶段</div>
                <div className='configView1-wrapper-handle'
                     onClick={()=>setNewStageVisible(true)}
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

export default ConfigAddNewStage