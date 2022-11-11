import React,{useEffect,useState} from "react";
import {Drawer,Divider} from "antd";
import {MailOutlined,BellOutlined,LoadingOutlined} from "@ant-design/icons";
import ModalTitle from "../../common/modalTitle/modalTitle";
import EmptyText from "../../common/emptyText/emptyText";
import {inject,observer} from "mobx-react";
import "./messageDrawer.scss";

const MessageDrawer = props =>{

    const {homePageStore,visible,setVisible,findAllPipelineStatus,pipelineList} = props

    const {findMessageDispatchItemPage,messageList,messPage,setMessagePagination,messagePagination,
        setMessageList,unread,updateMessageDispatchItem,fresh
    } = homePageStore

    const [isLoading,setIsLoading] = useState(false)
    const [selected,setSelected] = useState(0)

    useEffect(()=>{
        return ()=>{
            setMessageList([])
            setMessagePagination(1)
            setSelected(0)
        }
    },[visible])

    useEffect(()=>{
        visible && findAllPipelineStatus()
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

    const renderState = state =>{
        switch (state) {
            case 0:
                return "未读"
            case 1:
                return "已读"
        }
    }
    
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
            props.history.push(`/index/task/${item.messageTemplate.link}/work`)
            setVisible(false)
        }
    }

    const isPipeline = id =>{
        return pipelineList && pipelineList.some(item=>item.pipelineId===id )
    }

    const renderMessageList = messageList =>{
        return messageList && messageList.map((item,index)=>{
            return(
                <div
                    className="message-item" key={index}
                    onClick={()=>goHref(item)}
                >
                    <div className="message-item-left">
                        <div className="message-item-icon">
                            <MailOutlined />
                        </div>
                        <div>
                            <div className="message-item-user">
                                <span className="user-title">
                                    {item.messageTemplate.name}
                                </span>
                                <span className="user-time">
                                    {item.receiveTime}
                                </span>
                            </div>
                            <div
                                dangerouslySetInnerHTML={{__html: item.messageTemplate.content}}
                            />
                        </div>
                    </div>
                    {/*<div className={`message-item-right message-item-state-${item.status}`}>*/}
                    {/*    {renderState(item.status)}*/}
                    {/*</div>*/}
                </div>
            )
        })
    }

    const changSelet = item => {
        setSelected(item.id)
        setMessagePagination(1)
    }
    
    const renderTabs = item => {
        return   <div
            key={item.id}
            className={`title-item ${item.id===selected?"title-select":null}`}
            onClick={()=>changSelet(item)}
        >
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
    
    return(
        <Drawer
            closable={false}
            placement="right"
            onClose={()=>setVisible(false)}
            maskStyle={{background:"transparent"}}
            visible={visible}
            contentWrapperStyle={{width:450,top:48,height:"calc(100% - 48px)"}}
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
                            messageList && messageList.length===messPage.total && messagePagination >1 &&
                            <Divider plain>没有更多了 🤐</Divider>
                        }
                        {
                            messageList && messageList.length===0 && messagePagination ===1 &&
                            <EmptyText/>
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

export default inject("homePageStore")(observer(MessageDrawer))