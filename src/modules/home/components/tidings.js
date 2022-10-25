import React from "react";
import {UserOutlined} from "@ant-design/icons";
import Guide from "./guide";

const Tidings = props =>{

    const {messageList,setVisible} = props

    const renderState = state =>{
        switch (state) {
            case 0:
                return "未读"
            case 1:
                return "已读"
        }
    }

    return(
        <div className="tidings">
            <Guide
                title={"我的消息"}
                type={"tidings"}
                setVisible={setVisible}
            />
            <div className="tidings-bottom">
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
    )
}

export default Tidings