import React,{useEffect,useState} from "react";
import {Drawer,Divider,Space,Tooltip,Spin} from "antd";
import {
    BellOutlined,
    LoadingOutlined,
    CloseOutlined,
    DeleteOutlined
} from "@ant-design/icons";
import ListEmpty from "../component/list/ListEmpty";
import Btn from "../component/btn/Btn";
import messageStore from "../../home/store/MessageStore"
import Profile from "../component/profile/Profile";
import "./PortalMessage.scss";

const pageSize = 12;

/**
 * 消息通知
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PortalMessage = props =>{

    const {unread,setUnread,visible,setVisible,translateX=75} = props
    const {findMessageItemPage,updateMessageItem,deleteMessageItem} = messageStore
    const pageParam = {
        pageSize: pageSize,
        currentPage: 1
    }
    //初始以及切换加载
    const [spinning,setSpinning] = useState(true);
    //消息列表
    const [messageList,setMessageList] = useState([]);
    //消息参数
    const [messageParams,setMessageParams] = useState({
        status:0,
        pageParam
    });
    //消息分页
    const [messagePagination,setMessagePagination] = useState({});
    //加载更多
    const [isLoading,setIsLoading] = useState(false);

    useEffect(()=>{
        findMessageItemPage({
            status:0,
            pageParam,
        }).then(res=>{
            if(res.code===0){
                setUnread(res.data.totalRecord || 0)
            }
        })
    },[])

    useEffect(()=>{
        if(visible){
            findMessage()
        }
    },[visible,messageParams])

    /**
     * 获取信息
     */
    const findMessage = () => {
        let param = {...messageParams};
        if(param.status===2){
            delete param.status
        }
        findMessageItemPage(param).then(res=>{
            setSpinning(false)
            setIsLoading(false)
            if(res.code===0){
                setMessagePagination({
                    currentPage: res.data.currentPage,
                    totalPage: res.data.totalPage
                })
                if(messageParams.status===0){
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
        setMessageParams({
            ...messageParams,
            pageParam:{
                pageSize: pageSize,
                currentPage: messagePagination.currentPage + 1
            }
        })
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
                setUnread(unread - 1)
            })
        }
        if(item.link){
            props.history.push(item.link.split("#")[1])
        }
        onClose()
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
                setMessageList(messageList.filter(li=>item.id!==li.id))
            }
        })
    }

    /**
     * 切换消息类型
     * @param item
     */
    const changMessage = item => {
        setSpinning(true)
        setMessageParams({
            pageParam,
            status: item.id
        })
    }

    const onClose = () =>{
        setVisible(false)
        setMessageParams({
            ...messageParams,
            pageParam
        })
    }

    return visible && (
        <Drawer
            closable={false}
            placement="left"
            visible={visible}
            onClose={onClose}
            width={450}
            maskStyle={{background:"transparent"}}
            bodyStyle={{padding:0}}
            contentWrapperStyle={visible?{transform:`translateX(${translateX}px)`}:{}}
        >
            <div className="messageModal">
                <div className="messageModal-up">
                    <div className="messageModal-up-title">
                        <span className="messageModal-up-icon"><BellOutlined/></span>
                        <span>消息</span>
                    </div>
                    <Btn title={<CloseOutlined />} type="text" onClick={onClose}/>
                </div>
                <div className="messageModal-content">
                    <div className="messageModal-title">
                        {
                            tabs.map(item=> (
                                <div
                                    key={item.id}
                                    className={`title-item ${item.id===messageParams.status?"title-select":""}`}
                                    onClick={()=>changMessage(item)}
                                >
                                    {item.title}
                                    {
                                        item.id === 0 &&
                                        <span className={`messageModal-screen-tab ${unread< 100 ?"":"messageModal-screen-much"}`}>
                                            {unread < 100 ? unread : 99}
                                        </span>
                                    }
                                </div>
                            ))
                        }
                    </div>
                    <Spin spinning={spinning}>
                        <div className="messageModal-list">
                            {
                                messageList && messageList.map((item,index)=>{
                                    const {sendUser,messageType,sendTime,action,data} = item
                                    const dataObj = JSON.parse(data)
                                    return(
                                        <div key={index} className={`message-item arbess-user-avatar ${item.status===1 ? "message-read":""}`} onClick={()=>goHref(item)}>
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
                            {
                                isLoading ?
                                    <div className="messageModal-more">
                                        <LoadingOutlined/>
                                    </div>
                                    :
                                    messagePagination?.totalPage > messagePagination?.currentPage &&
                                    <div className="messageModal-more" onClick={moreMessage}>
                                        加载更多……
                                    </div>
                            }
                            {
                                messagePagination?.currentPage === messagePagination?.totalPage && messagePagination?.currentPage > 1 &&
                                <Divider plain>没有更多了 🤐</Divider>
                            }
                            {
                                messageList && messageList.length===0 &&
                                <ListEmpty />
                            }
                        </div>
                    </Spin>
                </div>
            </div>
        </Drawer>
    )
}

export default PortalMessage
