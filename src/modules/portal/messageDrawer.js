import React,{useEffect} from "react";
import {Drawer,Select,Divider,Tabs} from "antd";
import {UserOutlined,BellOutlined,LoadingOutlined} from "@ant-design/icons";
import ModalTitle from "../../common/modalTitle/modalTitle";
import "./messageDrawer.scss";

const MessageDrawer = props =>{

    const {visible,setVisible,messageList,page,moreMessage,isLoading,pagination} = props

    const renderState = state =>{
        switch (state) {
            case 0:
                return "未读"
            case 1:
                return "已读"
        }
    }

    const renderMessageList = () =>{
        return messageList && messageList.map((item,index)=>{
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
                    <div className={`tidings-item-right tidings-item-state-${item.status}`}>
                        {renderState(item.status)}
                    </div>
                </div>
            )
        })
    }

    const screen = (
        <div className="messageModal-screen">
            <Tabs defaultValue={2}>
                <Tabs.TabPane key={2} tab={"全部"}>
                    <div className="messageModal-list">
                        {
                            renderMessageList(messageList)
                        }
                    </div>
                </Tabs.TabPane>
                <Tabs.TabPane key={0} tab={'未读'}>
                    未读消息
                </Tabs.TabPane>
                <Tabs.TabPane key={1} tab={"已读"} >
                    已读消息
                </Tabs.TabPane>
            </Tabs>
        </div>
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
                    title={<><BellOutlined style={{fontSize:16}}/>消息</>}
                />
                <div className="messageModal">
                    {screen}
                    {
                        messageList && messageList.length === page.total && pagination > 1&&
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