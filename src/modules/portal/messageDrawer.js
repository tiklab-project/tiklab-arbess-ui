import React,{useEffect,useState} from "react";
import {Drawer,Divider,Space,Tooltip} from "antd";
import {
    BellOutlined,
    LoadingOutlined,
    CloseOutlined,
    MessageOutlined,
    DeleteOutlined
} from "@ant-design/icons";
import EmptyText from "../common/emptyText/emptyText";
import {inject,observer} from "mobx-react";
import "./messageDrawer.scss";
import Btn from "../common/btn/btn";

const MessageDrawer = props =>{

    const {homePageStore,visible,setVisible,pipelineStore} = props

    const {findMessageDispatchItemPage,messageList,messPage,setMessagePagination,messagePagination,
        setMessageList,unread,updateMessageDispatchItem,fresh,deleteMessageDispatchItem
    } = homePageStore
    const {findAllPipelineStatus,pipelineList} = pipelineStore

    const [isLoading,setIsLoading] = useState(false)
    const [selected,setSelected] = useState(2)

    useEffect(()=>{
        visible && findAllPipelineStatus()
        return ()=>{
            setMessageList([])
            setMessagePagination(1)
        }
    },[visible])

    useEffect(()=>{
        visible && findMessageDispatchItemPage(selected).then(res=>{
            setIsLoading(false)
        })
    },[visible,messagePagination,selected,fresh])

    const moreMessage = () =>{
        setMessagePagination(messagePagination+1)
        setIsLoading(true)
    }

    const tabs = [
        {
            id:2,
            title:"全部",
        },
        {
            id:0,
            title:"未读",
        },
        {
            id:1,
            title:"已读",
        }
    ]
    
    const goHref = item => {

        const {message,messageTemplate,status, ...resItem } = item

        if (item.status === 0) {
            const updateParams = {
                ...resItem,
                message: {
                    id: message.id
                },
                messageTemplate: {
                    id: messageTemplate.id
                },
                status: 1
            }
            updateMessageDispatchItem(updateParams)
        }

        if(isPipeline(item.messageTemplate.link)){
            props.history.push(item.messageTemplate.link)
            setVisible(false)
        }
    }

    // 判断流水线是否还存在
    const isPipeline = id =>{
        const arr = id.split('/')
        return pipelineList && pipelineList.some(item=>item.pipelineId===arr[3])
    }

    const delMessage = (e,item) =>{
        //屏蔽父层点击事件
        e.stopPropagation()
        deleteMessageDispatchItem(item.id)
    }

    const renderMessageList = messageList =>{
        return messageList && messageList.map((item,index)=>{
            return(
                <div
                    key={index}
                    className={`message-item ${item.status===1 ? "message-read":""}`}
                    onClick={()=>goHref(item)}
                >
                    <div className="message-item-left">
                        <div className="message-item-icon"><MessageOutlined /></div>
                        <div className="message-item-center">
                            <div className="message-item-user">
                                <Space>
                                    <span className="user-title">{item.messageTemplate.name}</span>
                                    <span className="user-time">{item.receiveTime}</span>
                                </Space>
                                <Tooltip title={"删除"}>
                                    <div onClick={e=>delMessage(e,item)} className={`message-hidden`}>
                                        <DeleteOutlined />
                                    </div>
                                </Tooltip>
                            </div>
                            <div dangerouslySetInnerHTML={{__html: item.messageTemplate.content}}/>
                        </div>
                    </div>
                </div>
            )
        })
    }

    const changSelet = item => {
        setSelected(item.id)
        setMessagePagination(1)
    }
    
    const renderTabs = item => {
        return   <div key={item.id} className={`title-item ${item.id===selected?"title-select":null}`} onClick={()=>changSelet(item)}>
            {item.title}
            {
                item.id === 0 &&
                <span className={`messageModal-screen-tab ${unread< 100 ?null:"messageModal-screen-much"}`}>
                    {
                        unread < 100 ?
                            unread
                            :
                            99
                    }
                </span>
            }
        </div>
    }
    
    const emptyTitle = (
        <>
            { selected===0 && "暂无未读消息"}
            { selected===1 && "暂无已读消息"}
            { selected===2 && "暂无消息"}
        </>
    )

    return(
        <Drawer
            closable={false}
            placement="right"
            onClose={()=>setVisible(false)}
            visible={visible}
            maskStyle={{background:"transparent"}}
            contentWrapperStyle={{width:450,top:48,height:"calc(100% - 48px)"}}
            bodyStyle={{padding:0}}
            className="mf"
        >
            <div className="messageModal">
                <div className="messageModal-up">
                    <div className="messageModal-up-title">
                        <span className="messageModal-up-icon"><BellOutlined/></span>
                        <span>消息</span>
                    </div>
                    <Btn
                        title={<CloseOutlined />}
                        type="text"
                        onClick={()=>setVisible(false)}
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
                            messageList && messageList.length===messPage.total && messagePagination >1 &&
                            <Divider plain>没有更多了 🤐</Divider>
                        }
                        {
                            messageList && messageList.length===0 && messagePagination ===1 &&
                            <div>
                                <EmptyText
                                    title={emptyTitle}
                                />
                            </div>
                        }
                        {
                            messageList && messageList.length < messPage.total && !isLoading &&
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

export default inject("homePageStore","pipelineStore")(observer(MessageDrawer))