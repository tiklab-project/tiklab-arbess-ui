import React,{useState,useEffect} from "react";
import {Checkbox,Dropdown,Row, Col,Table,Space,Select,Tooltip} from "antd";
import {
    CaretRightOutlined,
    MinusCircleOutlined,
    DeleteOutlined,
    PlusCircleOutlined,
    CaretDownOutlined
} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import Btn from "../../../../common/btn/Btn";
import EmptyText from "../../../../common/emptyText/EmptyText";
import Profile from "../../../../common/profile/Profile";
import MirrorContent from "./CodeBlock";
import PostprocessUserAdd from "../../postprocess/components/PostprocessUserAdd";
import "./Postprocess.scss";

/**
 * task的后置处理
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Postprocess = props =>{

    const {pipelineStore,postprocessStore,dataItem} = props

    const {deletePost,createPost,findTaskPost,fixedPostprocessData,postprocessData,setPostprocessData,
        setIsFindPostprocessData,isFindPostprocessData,updatePost,findMessageSendType,mesSendData
    } = postprocessStore

    const userId = getUser().userId

    // 树的展开与闭合
    const [expandedTree,setExpandedTree] = useState([])

    useEffect(()=>{
        // 初始化是否存在消息发送方式
        findMessageSendType()
    },[])

    useEffect(()=>{
        // 初始化task的后置处理
        findTaskPost(dataItem.taskId)
    },[isFindPostprocessData,dataItem.taskId])

    /**
     * 添加后置处理
     * @param type
     */
    const addPose = type => {
        createPost({
            taskType:type,
            taskId:dataItem.taskId,
            values:null
        }).then(res=>{
            res.code===0 && setExpandedTree(expandedTree.concat(res.data))
        })
    }

    /**
     * 删除后置处理
     * @param e
     * @param item
     */
    const del = (e,item) => {
        e.stopPropagation()
        deletePost(item.postprocessId)
    }

    /**
     * 取消修改
     */
    const onCancel = () => {
        setIsFindPostprocessData(!isFindPostprocessData)
    }

    /**
     * 确定更新
     * @param item
     */
    const onUpdate = item => {
        let newArr=[],typeList=[]
        const values = item.task.values
        if(values){
            newArr = values.userList && values.userList.map(item=>({receiveType:item.receiveType,user:{id:item.user.id}}))
            typeList = values.typeList
        }
        const params = {
            taskType:item.taskType,
            postprocessId:item.postprocessId,
            values:{
                typeList:typeList,
                userList:newArr
            },
        }
        typeList && typeList.length> 0 && updatePost(params)
    }

    /**
     * 两组数组是否相等
     * @param a
     * @param b
     * @returns {boolean}
     */
    const isEqual = (a,b) =>{
        if(a && b){
            if(a.length !== b.length) return true
            const uniqueValues = new Set([...a, ...b])
            for (const v of uniqueValues){
                const aCount = a.filter(e=>e === v).length
                const bCount = b.filter(e=>e === v).length
                if(aCount !== bCount) return true
            }
            return false
        }
        return false
    }

    /**
     * 获取符合要求的item
     * @param data
     * @param item
     * @returns {*}
     */
    const isSuit = (data,item)=>{
        let a
        data && data.map(list=>{
            if(list.postprocessId===item.postprocessId){
                a = list
            }
        })
        return a
    }

    /**
     * 移出用户
     * @param record
     * @param item
     */
    const removeUser = (record,item) =>{
        const zz = isSuit(postprocessData,item)
        zz.task.values.userList = zz.task.values.userList.filter(item=>item.user.id!==record.user.id)
        setPostprocessData([...postprocessData])
    }

    /**
     * 改变用户通知事件
     * @param item
     * @param record
     * @param value
     */
    const changEnev = (item,record,value) =>{
        const zz = isSuit(postprocessData,item)
        zz.task.values.userList.map(it=>{
            if(it.user.id===record.user.id){
                it.receiveType = value
            }
        })
        setPostprocessData([...postprocessData])
    }

    /**
     * 改变消息发送方式
     * @param value
     * @param item
     */
    const changeMes = (value,item) =>{
        const zz = isSuit(postprocessData,item)
        zz.task.values.typeList = value
        setPostprocessData([...postprocessData])
    }

    /**
     * 消息通知人员是否更改
     * @param item
     * @returns {boolean}
     */
    const isYUser = item =>{
        if(item.task.values){
            const userList = item.task.values.userList
            const yUserList = isSuit(fixedPostprocessData,item)
            const newId = userList && userList.map(item=>item.user.id + item.receiveType)
            const oldId = yUserList && yUserList.task.values.userList.map(item=>item.user.id + item.receiveType)
            return isEqual(newId,oldId)
        }
        return false
    }

    /**
     * 消息发送方式是否更改
     * @param item
     * @returns {boolean}
     */
    const isMesType = item =>{
        if(item.task.values){
            const typeList = item.task.values.typeList
            const mesType = isSuit(fixedPostprocessData && fixedPostprocessData,item)
            return isEqual(typeList,mesType && mesType.task.values.typeList)
        }
        return false
    }

    /**
     * 消息通知的值是否显示取消确定按钮
     * @param item
     * @returns {JSX.Element|null}
     */
    const isChangeMes = item => {
        if(isMesType(item) || isYUser(item)){
            return  <div className="post-pose-btn" style={{textAlign:"right"}}>
                        <Btn onClick={()=>onCancel()} title={"取消"} isMar={true}/>
                        <Btn onClick={() =>onUpdate(item)} title={"确定"} type={"primary"}/>
                    </div>
        }
        return null
    }

    /**
     * 展开||闭合是否符合要求
     * @param key
     * @returns {boolean}
     */
    const isExpandedTree = key => {
        return expandedTree.some(item => item ===key)
    }

    /**
     * 展开和闭合
     * @param key
     */
    const setOpenOrClose = key => {
        if (isExpandedTree(key)) {
            // false--闭合
            setExpandedTree(expandedTree.filter(item => item !== key))
        } else {
            // ture--展开
            setExpandedTree(expandedTree.concat(key))
        }
    }

    /**
     * 后置处理类型
     * @param item
     * @returns {string}
     */
    const header = item =>{
        switch (item.taskType) {
            case 'message': return "消息通知"
            case 'bat': return "执行Bat脚本"
            case 'shell': return "执行Shell脚本"
        }
    }

    const columns = item =>{
        return [
            {
                title: "成员",
                dataIndex: ["user","nickname"],
                key: ["user","nickname"],
                width:"50%",
                ellipsis:true,
                render:(text,record)=>(
                    <Space>
                        <Profile userInfo={record.user}/>
                        {text}
                    </Space>
                )
            },
            {
                title: "通知事件",
                dataIndex: "receiveType",
                key: "receiveType",
                width:"30%",
                ellipsis:true,
                render:(text,record)=>(
                    <Select
                        value={record.receiveType}
                        bordered={false}
                        style={{width:80}}
                        onChange={value=>changEnev(item,record,value)}
                    >
                        <Select.Option value={1}>全部</Select.Option>
                        <Select.Option value={2}>仅成功</Select.Option>
                        <Select.Option value={3}>仅失败</Select.Option>
                    </Select>
                )
            },
            {
                title:"操作",
                dataIndex:"action",
                key:"action",
                width:"20%",
                ellipsis:true,
                render: (text,record) => {
                    if(record.user.id!==userId){
                        return  <Tooltip title="移出用户" onClick={()=>removeUser(record,item)}>
                                    <DeleteOutlined />
                                </Tooltip>
                    }
                }
            },
        ]
    }

    const typeList = [
        {
            value:"site",
            title:"站内信"
        },
        {
            value:"email",
            title:"邮箱通知"
        },
        {
            value:"sms",
            title:"短信通知"
        },
        {
            value:"qywechat",
            title:"企业微信机器人"
        },
        {
            value:"dingding",
            title:"钉钉机器人"
        },
    ]

    const renderPose = (item,index) => {
        const isType = type => mesSendData && mesSendData.some(item=>item===type)
        return (
            <div className="pose-pose-item" key={index}>
                <div className="pose-item-head" onClick={()=>setOpenOrClose(item.postprocessId)}>
                    <div className="pose-item-line">
                        {
                            isExpandedTree(item.postprocessId)?
                                <CaretDownOutlined />:<CaretRightOutlined />
                        }
                    </div>
                    <div className="pose-item-title">
                        { header(item) }
                    </div>
                    <div className="pose-item-del">
                        <Tooltip title={"删除"}>
                            <MinusCircleOutlined
                                style={{fontSize:16}}
                                onClick={(e) => del(e,item)}
                            />
                        </Tooltip>
                    </div>
                </div>
                {
                    isExpandedTree(item.postprocessId) &&
                    <div className="pose-item-content">
                        {
                            item.taskType==='message' &&
                            <>
                                <div className="pose-item-typeList">
                                    <div className="title-typeList">消息发送方式</div>
                                    <Checkbox.Group onChange={value=>changeMes(value,item)} value={item.task.values.typeList}>
                                        <Row>
                                            {
                                                typeList.map(item=>{
                                                    if(version==='ce' && item.value==='sms') return null;
                                                    return (
                                                        <Col key={item.value} span={8}>
                                                            <Tooltip title={isType(item.value) && `未配置${item.title}`}>
                                                                <Checkbox value={item.value} disabled={isType(item.value)}>
                                                                    {item.title}
                                                                </Checkbox>
                                                            </Tooltip>
                                                        </Col>
                                                    )
                                                })
                                            }
                                        </Row>
                                    </Checkbox.Group>
                                    {
                                        item.task.values && item.task.values.typeList.length < 1 &&
                                        <div className="title-typeList-error">请选择消息发送方式</div>
                                    }
                                </div>
                                <div className="pose-item-user">
                                    <div className="user-title">
                                        <div className="title-user">消息通知人员</div>
                                        <PostprocessUserAdd
                                            type={'task'}
                                            pipelineStore={pipelineStore}
                                            yUserList={item.task.values}
                                            postprocessData={postprocessData}
                                            setPostprocessData={setPostprocessData}
                                        />
                                    </div>
                                    <Table
                                        bordered={false}
                                        columns={columns(item)}
                                        dataSource={item.task.values.userList}
                                        rowKey={(record) => record.user.id}
                                        pagination={false}
                                        locale={{emptyText: <EmptyText/>}}
                                    />
                                </div>
                                { isChangeMes(item) }
                            </>
                        }
                        {
                            (item.taskType==='bat' || item.taskType==='shell') &&
                            <MirrorContent
                                item={item}
                                updatePost={updatePost}
                            />
                        }
                    </div>
                }
            </div>
        )
    }

    const taskMenu = (
        <div className="pose-pose-dropdown">
            <div className="dropdown-item" onClick={()=>addPose(61)}>消息通知</div>
            <div className="dropdown-item" onClick={()=>addPose(71)}>执行bat脚本</div>
            <div className="dropdown-item" onClick={()=>addPose(72)}>执行Shell脚本</div>
        </div>
    )

    return(
        <div className="pose-pose">
            <div className="pose-pose-up">
                <div>
                    <span style={{paddingRight:5}}>后置处理</span>
                    <span style={{fontSize:13}}>({postprocessData && postprocessData.length?postprocessData.length:0}个)</span>
                </div>
                <Dropdown overlay={taskMenu} trigger={["click"]} placement="bottomRight">
                    <Btn title={"添加后置处理"} type={"link-nopadding"} icon={<PlusCircleOutlined />}/>
                </Dropdown>
            </div>
            <div className="pose-pose-content">
                {
                    postprocessData && postprocessData.length > 0 ?
                    postprocessData.map((item,index)=>renderPose(item,index))
                    :
                    <EmptyText title={"暂无后置处理"}/>
                }
            </div>
        </div>
    )
}

export default inject("pipelineStore","postprocessStore")(observer(Postprocess))
