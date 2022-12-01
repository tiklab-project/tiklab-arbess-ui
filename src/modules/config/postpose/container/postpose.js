import React,{useState,useEffect} from "react";
import {DeleteOutlined,PlusOutlined} from "@ant-design/icons";
import {Select,Form,Checkbox,Table,Popconfirm,Tooltip,Space} from "antd";
import {getUser} from "tiklab-core-ui";
import {Profile} from "tiklab-eam-ui";
import {inject,observer} from "mobx-react";
import EmptyText from "../../../common/emptyText/emptyText";
import MirrorContent from "../components/mirror";
import Btn from "../../../common/btn/btn";
import PostposeAdd from "../components/postposeAdd";
import PostposeUserAdd from "../components/postposeUserAdd";
import Loading from "../../../common/loading/loading";
import "../components/postpose.scss";

// 后置处理
const Postpose = props =>{

    const {pipelineStore,postposeStore} = props

    const {findUserPage,pipelineId} = pipelineStore
    const {createAfterConfig,updateAfterConfig,deleteAfterConfig,findAllAfterConfig,postposeData,isFindPostposeData,
        setIsFindPostposeData,isLoading
    } = postposeStore

    const [postposeVisible,setPostposeVisible] = useState(false)
    const [postposeUserVisible,setPostposeUserVisible] = useState(false)
    const [isShow,setIsShow] = useState(false)
    const [yUserList,setYUserList] = useState([])
    const [nUserList,setNUserList] = useState([])
    const [member,setMember] = useState([])
    const [mesType,setMesType] = useState([])

    const [form] = Form.useForm()
    const userId = getUser().userId

    useEffect(()=>{
        findAllAfterConfig(pipelineId).then(res=>{
            const data = res.data && res.data.filter(item=>item.type===61)[0]
            if(res.code===0){
                const mesType = data && data.typeList
                const userList = data && data.userList
                setYUserList(userList===null ? []:userList)
                setMesType(mesType && mesType)
                form.setFieldsValue({typeList: mesType && mesType})
                findUserPage().then(res=>{
                    const newArr = userList && userList.map(item=>item.user.id)
                    const dataList = res.data && res.data.dataList
                    if(res.code===0){
                        if(!newArr){
                            setNUserList([...dataList])
                        }else {
                            setNUserList(dataList.filter(item=>!newArr.includes(item.id)))
                        }
                    }
                })
            }
        })
    },[pipelineId,isFindPostposeData])

    useEffect(()=>{
        const newArr = []
        yUserList && yUserList.map(item=>{
            newArr.push({
                user: {id: item.user.id},
                type: 1
            })
        })
        setMember([...newArr])
    },[pipelineId,yUserList])

    // 用户通知事件
    const changEnev = (record,value) =>{
        member && member.map(item=>{
            if(item.id===record.id){
                item.type = value
            }
        })
        setMember([...member])
        if(record.type!==value){
            setIsShow(true)
        }else {
            setIsShow(false)
        }
    }

    // 移出用户
    const del = (text,record) =>{

        // yUserList（已选择） 减少
        setYUserList(yUserList.filter(item=>item.user.id!==record.user.id))

        // nUserList（未选择） 添加
        setNUserList(nUserList.concat([record.user]))
    }

    // 删除类型
    const delType = item =>{
        deleteAfterConfig(item.configId)
    }
    
    // 消息通知保存
    const onOk = item => {
        form.validateFields().then((values) => {
            const params = {
                values:{
                    typeList:values.typeList,
                    userList: member,
                },
                pipeline:{pipelineId},
                taskType:item.type,
                configId:item.configId
            }
            updateAfterConfig(params)
            setIsShow(false)
        })
    }

    const onCancel = () =>{
        setIsFindPostposeData(!isFindPostposeData)
        setIsShow(false)
    }

    // 消息通知 ，消息通知人员是否更改
    const isYUser = userList =>{
        if(userList && yUserList){
            return userList.length !== yUserList.length
        }
    }

    // 消息通知 ，消息发送方式是否更改
    const isMesType = typeList =>{
        if(mesType && typeList){
            if(mesType.length !== typeList.length) return true
            const uniqueValues = new Set([...mesType, ...typeList])
            for (const v of uniqueValues){
                const aCount = mesType.filter(e=>e === v).length
                const bCount = typeList.filter(e=>e === v).length
                if(aCount !== bCount) return true
            }
            return false
        }
        return false
    }

    // 切换消息通知类型
    const changMesType = value =>{
        setMesType(value)
    }

    // 消息通知的值是否显示取消确定按钮
    const isChangeMes = item => {
        const typeList = item.typeList
        const userList = item.userList===null ? [] : item.userList
        if(isYUser(userList) || isMesType(typeList) || isShow){
            return <div className="post-pose-btn">
                        <Btn
                            onClick={()=>onCancel()}
                            title={"取消"}
                            isMar={true}
                        />
                        <Btn
                            onClick={()=>onOk(item)}
                            title={"确定"}
                            type={"primary"}
                        />
                    </div>
        }
        else return null
    }

    const columns = [
        {
            title: "成员",
            dataIndex: ["user","nickname"],
            key: ["user","nickname"],
            width:"50%",
            ellipsis:true,
            render:(text,record)=>{
                return <Space>
                    <Profile userInfo={record}/>
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
                    defaultValue={record.type}
                    bordered={false}
                    style={{width:80}}
                    onChange={value=>changEnev(record,value)}
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
                if (record.user.id !== userId) {
                    return  <Tooltip title="移出用户">
                                <DeleteOutlined onClick={()=>del(text,record)}/>
                            </Tooltip>
                }
            }
        },
    ]
    
    const typeTitle = type => {
        switch (type) {
            case 61:
                return "消息通知"
            case 71:
                return "执行bat脚本"
            case 72:
                return "执行shell脚本"
        }
    }

    if(isLoading){
        return <Loading/>
    }

    return(
        <div className="post-pose">
            <div className="post-pose-add">
                <Btn
                    icon={<PlusOutlined/>}
                    onClick={()=>setPostposeVisible(true)}
                    title={"添加"}
                />
                <PostposeAdd
                    postposeVisible={postposeVisible}
                    setPostposeVisible={setPostposeVisible}
                    createAfterConfig={createAfterConfig}
                    pipelineId={pipelineId}
                />
            </div>
            <div className="post-pose-content home-limited">
                {
                    postposeData && postposeData.map(item=>{
                        return(
                            <div className="post-pose-forms" key={item.configId}>
                                <div className="post-pose-headline">
                                    <div className="headline-left">{typeTitle(item.type)}</div>
                                    <div>
                                        <Popconfirm
                                            placement="topRight"
                                            title="你确定删除吗"
                                            onConfirm={()=>delType(item)}
                                            okText="确定"
                                            cancelText="取消"
                                        >
                                            <span className="headline-delete">
                                                <DeleteOutlined />删除
                                            </span>
                                        </Popconfirm>
                                    </div>
                                </div>
                                {
                                    (item.type===72 ||  item.type===71) &&
                                    <MirrorContent
                                        item={item}
                                        pipelineId={pipelineId}
                                        updateAfterConfig={updateAfterConfig}
                                    />
                                }
                                {
                                    item.type === 61 &&
                                    <div className="post-pose-form">
                                        <Form form={form} layout={"vertical"} initialValues={{...item.typeList}}>
                                            <Form.Item label={"消息发送方式"} name={"typeList"}
                                                       rules={[{required:true, message:"请选择消息发送方式"}]}
                                            >
                                                <Checkbox.Group onChange={changMesType}>
                                                    <Checkbox value="site">站内信</Checkbox>
                                                    <Checkbox value="sms">短信通知</Checkbox>
                                                    <Checkbox value="wechat">企业微信</Checkbox>
                                                </Checkbox.Group>
                                            </Form.Item>
                                        </Form>

                                        <div className="post-pose-user">
                                            <div className="post-pose-title">
                                                <div className="title-user">消息通知人员</div>
                                                <Btn
                                                    type={"link"}
                                                    icon={<PlusOutlined/>}
                                                    onClick={()=>setPostposeUserVisible(true)}
                                                    title={"添加成员"}
                                                />
                                                <PostposeUserAdd
                                                    visible={postposeUserVisible}
                                                    setVisible={setPostposeUserVisible}
                                                    nUserList={nUserList}
                                                    yUserList={yUserList}
                                                    setYUserList={setYUserList}
                                                    setNUserList={setNUserList}
                                                />
                                            </div>
                                            <Table
                                                bordered={false}
                                                columns={columns}
                                                dataSource={yUserList}
                                                rowKey={(record) => record.user.id}
                                                pagination={false}
                                                locale={{emptyText: <EmptyText/>}}
                                            />
                                        </div>
                                        { isChangeMes(item) }
                                    </div>
                                }
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default inject("pipelineStore","postposeStore")(observer(Postpose))