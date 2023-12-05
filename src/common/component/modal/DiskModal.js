import React from "react";
import {withRouter} from "react-router-dom";
import Modals from "./Modal";

const DiskModal = props =>{

    const {visible,setVisible} = props

    const onOk = () => {
        props.history.push('/setting/resources')
    }

    const onCancel = () => {
        setVisible(false)
    }

    return (
        <Modals
            visible={visible}
            onCancel={onCancel}
            onOk={onOk}
            title={"空间不足"}
            okText={"清理缓存"}
            cancelText={"暂不处理"}
        >
            <div>磁盘空间不足，流水线无法运行</div>
        </Modals>
    )
}

export default withRouter(DiskModal)
