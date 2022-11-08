import React,{useEffect,useState} from "react";
import {Drawer,Divider,Badge} from "antd";
import {MailOutlined,BellOutlined,LoadingOutlined} from "@ant-design/icons";
import ModalTitle from "../../common/modalTitle/modalTitle";
import {inject,observer} from "mobx-react";
import "./messageDrawer.scss";

const MessageDrawer = props =>{

    const {homePageStore,visible,setVisible} = props

    const {findMessageDispatchItemPage,messageList,messPage,setMessagePagination,messagePagination,
        setMessageList
    } = homePageStore

    const [isLoading,setIsLoading] = useState(false)
    const [selected,setSelected] = useState(1)

    useEffect(()=>{
        return ()=>{
            setMessageList([])
            setMessagePagination(1)
        }
    },[visible])

    useEffect(()=>{
        visible && findMessageDispatchItemPage().then(res=>{
            setIsLoading(false)
        })
    },[visible,messagePagination])

    const moreMessage = () =>{
        setMessagePagination(messagePagination+1)
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

    const tabs = [
        {
            id:1,
            title:"全部",
        },
        {
            id:2,
            title:"未读",
        },
        {
            id:3,
            title:"已读",
        }
    ]
    
    const renderTabs = item => {
        return   <div
            key={item.id}
            className={`title-item ${item.id===selected?"title-select":null}`}
            onClick={()=>setSelected(item.id)}
        >
            {item.title}

            {
                item.id ===1 &&
                <span className={`messageModal-screen-tab ${messPage && messPage.total<100 ?null:"messageModal-screen-much"}`}>
                    {
                        messPage && messPage.total < 100 ?
                            messPage.total
                            :
                            99
                    }
                </span>
            }

        </div>
    }
    
    return(
        <Drawer
            closable={false}
            placement="right"
            onClose={()=>setVisible(false)}
            maskStyle={{background:"transparent"}}
            visible={visible}
            contentWrapperStyle={{width:450,top:50,height:"calc(100% - 50px)"}}
            bodyStyle={{padding:0}}
            className="mf"
        >
            <div className="messageModal">
                <div className="messageModal-up">
                    <ModalTitle
                        setVisible={setVisible}
                        title={<><BellOutlined style={{fontSize:16}}/>消息</>}
                    />
                </div>
                <div className="messageModal-content">
                    <div className="messageModal-title">
                        {
                            tabs.map(item=>{return renderTabs(item)})
                        }
                    </div>
                    <div className="messageModal-list">
                        {
                            renderMessageList(messageList)
                        }
                        {
                            messageList && messageList.length===messPage.total && setMessagePagination>1 &&
                            <Divider plain>没有更多了 🤐</Divider>
                        }
                        {
                            messageList && messageList.length<messPage.total && !isLoading &&
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
            </div>
        </Drawer>
    )
}

export default inject("homePageStore")(observer(MessageDrawer))