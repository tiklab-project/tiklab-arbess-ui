import React,{useEffect,useState} from "react";
import {Drawer,Divider,Space,Tooltip} from "antd";
import {
    BellOutlined,
    LoadingOutlined,
    CloseOutlined,
    DeleteOutlined
} from "@ant-design/icons";
import ListEmpty from "../../common/component/list/ListEmpty";
import Btn from "../../common/component/btn/Btn";
import messageStore from "../store/MessageStore"
import "./PortalMessage.scss";
import Profile from "../../common/component/profile/Profile";

/**
 * 消息通知
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PortalMessage = props =>{

    const {unread,setUnread,visible,setVisible} = props

    const {findMessageItemPage,updateMessageItem,deleteMessageItem} = messageStore

    // 消息列表
    const [messageList,setMessageList] = useState([])

    // 消息分页
    const [messagePagination,setMessagePagination] = useState(1)

    // 消息总页
    const [messageTotalPage,setMessageTotalPage] = useState(1)

    // 加载
    const [isLoading,setIsLoading] = useState(false)

    // 消息类型
    const [selected,setSelected] = useState(0)

    useEffect(()=>{
        return ()=>{
            setMessageList([])
            setMessagePagination(1)
        }
    },[visible])

    useEffect(()=>{
        findMessageItemPage({
            status:0,
            pageParam: {
                pageSize: 12,
                currentPage: 1
            }
        }).then(res=>{
            if(res.code===0){
                setUnread(res.data.totalRecord || 0)
            }
        })
    },[])

    useEffect(()=>{
        // 获取消息
        visible && findMessage()
    },[visible,messagePagination,selected])

    /**
     * 获取信息
     */
    const findMessage = () => {
        let param = {
            pageParam: {
                pageSize: 12,
                currentPage: messagePagination
            }
        }
        if(selected!==2){
            param.status = selected
        }
        findMessageItemPage(param).then(res=>{
            setIsLoading(false)
            if(res.code===0){
                setMessageTotalPage(res.data?.totalPage || 1)
                if(selected===0){
                    setUnread(res.data.totalRecord || 0)
                }
                if(res.data.currentPage===1){
                    setMessageList(res.data.dataList || [])
                }
                if (res.data.currentPage > 1){
                    setMessageList([...messageList,...res.data.dataList])
                }
            }
        })
    }

    /**
     * 加载更多消息
     */
    const moreMessage = () =>{
        setMessagePagination(messagePagination+1)
        setIsLoading(true)
    }

    const tabs = [
        { id:2, title:"全部"},
        { id:0, title:"未读"},
        { id:1, title:"已读",}
    ]

    /**
     * 消息详情路由跳转
     * @param item
     */
    const goHref = item => {
        const {message,status,...resItem } = item
        if (item.status === 0) {
            const updateParams = {
                ...resItem,
                message: {
                    id: message.id
                },
                status: 1
            }
            // 更新消息（已读）
            updateMessageItem(updateParams).then(res=>{
                findMessage()
            })
        }
        if(item.link){
            props.history.push(item.link.split("#")[1])
        }
        setVisible(false)
    }

    /**
     * 删除消息
     * @param e
     * @param item
     */
    const delMessage = (e,item) =>{
        //屏蔽父层点击事件
        e.stopPropagation()
        deleteMessageItem(item.id).then(res=>{
            if(res.code===0){
                findMessage()
            }
        })
    }

    /**
     * 切换消息类型
     * @param item
     */
    const changMessage = item => {
        setSelected(item.id)
        setMessagePagination(1)
    }

    /**
     * 渲染消息列表
     * @param messageList
     * @returns {*}
     */
    const renderMessageList = messageList =>{
        return messageList && messageList.map((item,index)=>{
            const {sendUser,messageType,sendTime,action,data} = item
            const dataObj = JSON.parse(data)
            return(
                <div key={index} className={`message-item ${item.status===1 ? "message-read":""}`} onClick={()=>goHref(item)}>
                    <div className="message-item-left">
                        <div className="message-item-icon">
                            <Profile
                                userInfo={sendUser}
                            />
                        </div>
                        <div className="message-item-center">
                            <div className="message-item-user">
                                <Space>
                                    <div className="user-title">{sendUser?.nickname || sendUser?.name} {messageType.name}</div>
                                    <div className="user-time">{sendTime}</div>
                                </Space>
                                <Tooltip title={"删除"}>
                                    <div onClick={e=>delMessage(e,item)} className={`message-hidden`}>
                                        <DeleteOutlined />
                                    </div>
                                </Tooltip>
                            </div>
                            <div className='message-item-info'>
                                <div className='message-item-info-action'>{action}</div>
                                {
                                    dataObj?.message &&
                                    <div className="message-item-info-message" title={dataObj?.message}> {dataObj?.message}</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return(
        <Drawer
            closable={false}
            placement="right"
            visible={visible}
            onClose={()=>setVisible(false)}
            maskStyle={{background:"transparent"}}
            contentWrapperStyle={{width:450,top:48,height:"calc(100% - 48px)"}}
            bodyStyle={{padding:0}}
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
                            tabs.map(item=> (
                                <div
                                    key={item.id}
                                    className={`title-item ${item.id===selected?"title-select":""}`}
                                    onClick={()=>changMessage(item)}
                                >
                                    {item.title}
                                    {
                                        item.id === 0 &&
                                        <span className={`messageModal-screen-tab ${unread< 100 ?"":"messageModal-screen-much"}`}>
                                            {
                                                unread < 100 ? unread : 99
                                            }
                                        </span>
                                    }
                                </div>
                            ))
                        }
                    </div>
                    <div className="messageModal-list">
                        {
                            renderMessageList(messageList)
                        }
                        {
                            messagePagination === messageTotalPage && messagePagination > 1 &&
                            <Divider plain>没有更多了 🤐</Divider>
                        }
                        {
                            messageList && messageList.length===0 && messagePagination ===1 &&
                            <div>
                                <ListEmpty title={
                                    <>
                                        { selected===0 && "暂无未读消息"}
                                        { selected===1 && "暂无已读消息"}
                                        { selected===2 && "暂无消息"}
                                    </>
                                }/>
                            </div>
                        }
                        {
                            messagePagination < messageTotalPage && !isLoading &&
                            <div className="messageModal-more" onClick={()=>moreMessage()}>
                                加载更多……
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

export default PortalMessage
