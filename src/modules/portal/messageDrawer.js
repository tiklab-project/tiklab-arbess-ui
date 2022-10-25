import React from "react";
import {Drawer} from "antd";
import {UserOutlined} from "@ant-design/icons";
import ModalTitle from "../../common/modalTitle/modalTitle";
import "./messageDrawer.scss";

const MessageDrawer = props =>{

    const {visible,setVisible,messageList} = props

    const renderState = state =>{
        switch (state) {
            case 0:
                return "未读"
            case 1:
                return "已读"
        }
    }

    return(
        <Drawer
            closable={false}
            placement="right"
            onClose={()=>setVisible(false)}
            maskStyle={{background:"transparent"}}
            visible={visible}
            style={{marginTop:55}}
            contentWrapperStyle={{width:500}}
        >
            <div className="drawers">
                <ModalTitle
                    setVisible={setVisible}
                    title={"我的消息"}
                />
                <div className="drawers-body messageModal">
                    {
                        messageList && messageList.map((item,index)=>{
                            return(
                                <div className="tidings-item" key={index}>
                                    <div className="tidings-item-left">
                                        <div className="tidings-item-icon">
                                            <UserOutlined/>
                                        </div>
                                        <div>
                                            <div className="tidings-item-user">
                                            <span className="user-sendUser">
                                                {/*{item.receiver}*/}
                                            </span>
                                                <span className="user-time">
                                                {item.receiveTime}
                                            </span>
                                            </div>
                                            <div className="tidings-item-message">
                                                <span>{item.messageTemplate.content}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={`tidings-item-right tidings-item-state-${item.status}`}
                                    >
                                        {renderState(item.status)}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Drawer>
    )
}

export default MessageDrawer