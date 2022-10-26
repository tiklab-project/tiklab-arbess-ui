import React,{useState} from "react";
import {Drawer,Select,Divider} from "antd";
import {UserOutlined,BellOutlined,LoadingOutlined} from "@ant-design/icons";
import ModalTitle from "../../common/modalTitle/modalTitle";
import "./messageDrawer.scss";

const MessageDrawer = props =>{

    const {visible,setVisible,messageList,page,moreMessage,isLoading} = props

    const renderState = state =>{
        switch (state) {
            case 0:
                return "未读"
            case 1:
                return "已读"
        }
    }

    const title = (
        <>
            <Select bordered={false} style={{width:120}} defaultValue={2}>
                <Select.Option value={2}>
                    <BellOutlined style={{fontSize:16}}/>全部消息
                </Select.Option>
                <Select.Option value={0}>
                    <BellOutlined style={{fontSize:16}}/>未读消息
                </Select.Option>
                <Select.Option value={1}>
                    <BellOutlined style={{fontSize:16}}/>已读消息
                </Select.Option>
            </Select>
        </>
    )

    return(
        <Drawer
            closable={false}
            placement="right"
            onClose={()=>setVisible(false)}
            maskStyle={{background:"transparent"}}
            visible={visible}
            style={{top:50,height:"calc(100vh - 50px)"}}
            contentWrapperStyle={{width:450}}
        >
            <div className="drawers">
                <ModalTitle
                    setVisible={setVisible}
                    title={title}
                />
                <div className="messageModal">
                    <div className="messageModal-list">
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
                    {
                        messageList && messageList.length === page.total &&
                        <Divider plain>没有更多了 🤐</Divider>
                    }
                    {
                        messageList && messageList.length < page.total && !isLoading &&
                        <div
                            className="messageModal-more"
                            onClick={()=>moreMessage()}
                        >
                            加载更多...
                        </div>
                    }
                    {
                        isLoading &&
                        <div className="messageModal-more">
                            <LoadingOutlined/>
                        </div>
                    }
                </div>
            </div>
        </Drawer>
    )
}

export default MessageDrawer