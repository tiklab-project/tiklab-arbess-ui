import React , { useState }from 'react'
import {Button, Modal} from "antd";
import {withRouter} from "react-router-dom";

const ConfigDetailsTop = props=>{

    const [visible, setVisible] = useState(false);

    return(
        <div className='config-details-post'  id='scrollB'>
            <Button  onClick={() => setVisible(true)}>过往记录</Button>
            <Modal
                title="是否离开"
                visible={visible}
                closable={false}
                onOk={()=>props.history.push('/home/task/post')}
                onCancel={() => setVisible(false)}
                okText='保存'
                cancelText='取消'
            >
                你所做的更改可能未保存
            </Modal>
        </div>
    )
}

export default withRouter(ConfigDetailsTop)