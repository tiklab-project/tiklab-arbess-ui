import React,{useState,useRef,useEffect} from "react";
import {Checkbox,Dropdown,Collapse,Row, Col,Table,Space,Select,Tooltip} from "antd";
import {PlusOutlined,CaretRightOutlined,MinusCircleOutlined,DeleteOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import {PostposeMirrorScenario} from "../../../common/components/mirror";
import PostposeUserAdd from "./postposeUserAdd";
import EmptyText from "../../../../common/emptyText/emptyText";
import Btn from "../../../../common/btn/btn";
import MirrorContent from "./mirror";
import {Profile} from "tiklab-eam-ui";
import "./postpose.scss";

const { Panel } = Collapse

/*
    后置处理
*/
const Postpose = props =>{

    const {pipelineStore,postposeStore,dataItem} = props

    const {findDmUserPage,pipelineId} = pipelineStore
    const {deletePostConfig,createPostConfig,findAllPostConfig,fixedPostposeData,postposeData,setPostposeData,setIsFindPostposeData,
        isFindPostposeData,updatePostConfig
    } = postposeStore

    const [userAddVisible,setUserAddVisible] = useState(false)
    const [allUserList,setAllUserList] = useState([])

    const userId = getUser().userId

    useEffect(()=>{
        findAllPostConfig(dataItem.configId)
    },[isFindPostposeData,dataItem.configId])

    useEffect(()=>{
        findDmUserPage(pipelineId).then(res=>{
            const dataList = res.data && res.data.dataList
            if(res.code===0){
                let arr = []
                dataList.map(item=>{
                    item.user.id===userId && arr.push({
                        ...item,
                        messageType:1
                    })
                })
                setAllUserList([...dataList])
            }
        })
    },[])

    const addPose = type => {
        createPostConfig({
            taskType:type,
            taskId:dataItem.configId,
            values:null
        })
    }

    // 删除后置处理（一）
    const del = item => {
        deletePostConfig(item.configId)
    }
    
    const onCancel = () => {
        setIsFindPostposeData(!isFindPostposeData)
    }
    
    const onOk = item => {
        let newArr = []
        item.userList && item.userList.map(item=>{
            newArr.push({
                messageType:item.messageType,
                user:{id:item.user.id}
            })
        })
        const params = {
            taskType:item.type,
            configId:item.configId,
            taskId:pipelineId,
            values:{
                typeList:item.typeList,
                userList:newArr
            },
        }
        item.typeList && item.typeList.length> 0 && updatePostConfig(params)
    }

    // 值是否更改
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

    // 是否符合要求
    const isSuit = (data,item)=>{
        let a
        data && data.map(list=>{
            if(list.configId===item.configId){
                a = list
            }
        })
        return a
    }

    // 移出用户
    const removeUser = (record,item) =>{
        const zz = isSuit(postposeData,item)
        zz.userList = zz.userList.filter(item=>item.user.id!==record.user.id)
        setPostposeData([...postposeData])
    }

    // 用户通知事件
    const changEnev = (item,record,value) =>{
        const zz = isSuit(postposeData,item)
        zz.userList && zz.userList.map(it=>{
            if(it.user.id===record.user.id){
                it.messageType = value
            }
        })
        setPostposeData([...postposeData])
    }

    // 消息发送方式
    const changeMes = (value,item) =>{
        const zz = isSuit(postposeData,item)
        zz.typeList = value
        setPostposeData([...postposeData])
    }

    // 消息通知 ，消息通知人员是否更改
    const isYUser = item =>{
        const userList = item.userList
        const yUserList = isSuit(fixedPostposeData && fixedPostposeData,item)
        const newId = userList && userList.map(item=>item.user.id + item.messageType)
        const oldId = yUserList && yUserList.userList.map(item=>item.user.id + item.messageType)
        return isEqual(newId,oldId)
    }

    // 消息通知 ，消息发送方式是否更改
    const isMesType = item =>{
        const typeList = item.typeList
        const mesType = isSuit(fixedPostposeData && fixedPostposeData,item)
        return isEqual(typeList,mesType && mesType.typeList)
    }

    // 消息通知的值是否显示取消确定按钮
    const isChangeMes = item => {
        if(isMesType(item) || isYUser(item)){
            return <div className="post-pose-btn">
                <Btn
                    onClick={()=>onCancel()}
                    title={"取消"}
                    isMar={true}
                />
                <Btn
                    onClick={() => onOk(item)}
                    title={"确定"}
                    type={"primary"}
                />
            </div>
        }
        return null
    }

    const header = item =>{
        switch (item.type) {
            case 61:
                return "消息通知"
            case 71:
                return "执行bat脚本"
            case 72:
                return "执行Shell脚本"
        }
    }

    const genExtra = item => (
        <Tooltip title={"删除"}>
            <MinusCircleOutlined
                style={{fontSize:16}}
                onClick={(event) => {
                    event.stopPropagation()
                    del(item)
                }}
            />
        </Tooltip>
    )

    const columns = item =>{
        return [
            {
                title: "成员",
                dataIndex: ["user","nickname"],
                key: ["user","nickname"],
                width:"50%",
                ellipsis:true,
                render:(text,record)=>{
                    return  <Space>
                        <Profile userInfo={record.user}/>
                        {text}
                    </Space>
                }
            },
            {
                title: "通知事件",
                dataIndex: "type",
                key: "type",
                width:"30%",
                ellipsis:true,
                render:(text,record)=>(
                    <Select
                        value={record.messageType}
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

    const [yUserList,setYUserList] = useState("")

    // 添加通知成员
    const addUser = item =>{
        setYUserList(item)
        setUserAddVisible(true)
    }

    const renderPose = (item,index) =>{
        return(
            <Panel key={index} header={header(item)} extra={genExtra(item)}>
                {
                    item.type===61 &&
                    <>
                        <div className="title-typeList">消息发送方式</div>
                        <Checkbox.Group onChange={value=>changeMes(value,item)} value={item.typeList}>
                            <Row>
                                <Col span={8}>
                                    <Checkbox value="site">站内信</Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value="sms">短信通知</Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value="wechat">企业微信机器人</Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value="dingding">钉钉机器人</Checkbox>
                                </Col>
                                <Col span={8}>
                                    <Checkbox value="mail">邮箱通知</Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>
                        {
                            item.typeList && item.typeList.length<1 &&
                            <div className="title-typeList-error">
                                请选择消息发送方式
                            </div>
                        }
                        <div className="pose-pose-user">
                            <div className="pose-pose-title">
                                <div className="title-user">消息通知人员</div>
                                <Btn
                                    type={"link"}
                                    icon={<PlusOutlined/>}
                                    onClick={()=>addUser(item)}
                                    title={"添加成员"}
                                />
                                <PostposeUserAdd
                                    userAddVisible={userAddVisible}
                                    setUserAddVisible={setUserAddVisible}
                                    allUserList={allUserList}
                                    yUserList={yUserList}
                                    postposeData={postposeData}
                                    setPostposeData={setPostposeData}
                                />
                            </div>
                            <Table
                                bordered={false}
                                columns={columns(item)}
                                dataSource={item.userList}
                                rowKey={(record) => record.user.id}
                                pagination={false}
                                locale={{emptyText: <EmptyText/>}}
                            />
                        </div>
                        { isChangeMes(item) }
                    </>
                }
                {
                    (item.type===71 || item.type===72) &&
                    <MirrorContent
                        item={item}
                        pipelineId={pipelineId}
                        updatePostConfig={updatePostConfig}
                    />
                }
            </Panel>
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
                    <span style={{fontSize:13}}>({postposeData && postposeData.length?postposeData.length:0}个)</span>
                </div>
                <Dropdown overlay={taskMenu} trigger={["click"]} placement="bottomRight">
                    <Btn
                        title={"添加任务"}
                        type={"link-nopadding"}
                        icon={<PlusOutlined/>}
                    />
                </Dropdown>
            </div>
            <div className="pose-pose-content">
                {
                    postposeData && postposeData.length > 0 ?
                    <Collapse
                        className="site-collapse-custom-collapse"
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                    >
                        {
                             postposeData.map((item,index)=>{
                                return renderPose(item,index)
                            })
                        }
                    </Collapse>
                    :
                    <EmptyText title={"暂无后置处理"}/>
                }
            </div>
        </div>
    )
}

export default inject("pipelineStore","postposeStore")(observer(Postpose))