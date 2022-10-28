import React,{useEffect,useState} from "react";
import {Drawer,Divider,Tabs} from "antd";
import {MailOutlined,BellOutlined,LoadingOutlined} from "@ant-design/icons";
import ModalTitle from "../../common/modalTitle/modalTitle";
import {inject,observer} from "mobx-react";
import "./messageDrawer.scss";

const MessageDrawer = props =>{

    const {homePageStore,visible,setVisible} = props

    const {findMessageDispatchItemPage,messageList,page,setPagination,pagination,
        setMessageList
    } = homePageStore

    const [isLoading,setIsLoading] = useState(false)

    useEffect(()=>{
        return ()=>{
            setMessageList([])
            setPagination(1)
        }
    },[visible])

    useEffect(()=>{
        visible && findMessageDispatchItemPage().then(res=>{
            setIsLoading(false)
        })
    },[visible,pagination])

    const moreMessage = () =>{
        setPagination(pagination+1)
        setIsLoading(true)
    }

    const renderState = state =>{
        switch (state) {
            case 0:
                return "未读"
            case 1:
                return "已读"
        }
    }

    const renderMessageList = messageList =>{
        return messageList && messageList.map((item,index)=>{
            return(
                <div className="message-item" key={index}>
                    <div className="message-item-left">
                        <div className="message-item-icon">
                            <MailOutlined />
                        </div>
                        <div>
                            <div className="message-item-user">
                                <span className="user-title">
                                    {item.messageTemplate.title}
                                </span>
                                <span className="user-time">
                                    {item.receiveTime}
                                </span>
                            </div>
                            <div className="message-item-message">
                                <span>{item.messageTemplate.content}</span>
                            </div>
                        </div>
                    </div>
                    <div className={`message-item-right message-item-state-${item.status}`}>
                        {renderState(item.status)}
                    </div>
                </div>
            )
        })
    }

    const tab = (
        <>
            全部
            <span className="messageModal-screen-tab">
                {page && page.total}
            </span>
        </>
    )

    const screen = (
        <div className="messageModal-screen">
            <Tabs defaultValue={2}>
                <Tabs.TabPane key={2} tab={tab}>
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
                    isType={true}
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

export default inject("homePageStore")(observer(MessageDrawer))