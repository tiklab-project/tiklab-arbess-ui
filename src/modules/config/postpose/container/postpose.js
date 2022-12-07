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
import HlineIcon from "../../common/components/hlineIcon";
import Loading from "../../../common/loading/loading";
import "../components/postpose.scss";

// 后置处理
const Postpose = props =>{

    const {pipelineStore,postposeStore} = props

    const {findUserPage,pipelineId} = pipelineStore
    const {createAfterConfig,updateAfterConfig,deleteAfterConfig,findAllAfterConfig,postposeData,isFindPostposeData,
        setIsFindPostposeData,isLoading,setPostposeData,fixedPostposeData
    } = postposeStore

    const [postposeVisible,setPostposeVisible] = useState(false)
    const [postposeUserVisible,setPostposeUserVisible] = useState(false)
    const [allUserList,setAllUserList] = useState([])

    const [form] = Form.useForm()
    const userId = getUser().userId

    useEffect(()=>{
        findUserPage().then(res=>{
            const dataList = res.data && res.data.dataList
            if(res.code===0){
                setAllUserList([...dataList])
            }
        })
    },[pipelineId])

    useEffect(()=>{
        findAllAfterConfig(pipelineId).then(res=>{
            const data = res.data && res.data.filter(item=>item.type===61)[0]
            if(res.code===0){
                data && data.typeList && form.setFieldsValue({typeList: data && data.typeList})
            }
        })
    },[pipelineId,isFindPostposeData])

    // 删除类型
    const delType = item =>{
        deleteAfterConfig(item.configId)
    }
    
    // 消息通知保存
    const onOk = item => {
        let newArr = []
        item.userList && item.userList.map(item=>{
            newArr.push({
                type:item.type,
                user:{id:item.user.id}
            })
        })
        form.validateFields().then((values) => {
            const params = {
                values:{
                    typeList:values.typeList,
                    userList: newArr,
                },
                pipeline:{pipelineId},
                taskType:item.type,
                configId:item.configId
            }
            updateAfterConfig(params)
        })
    }

    const onCancel = item =>{
        setIsFindPostposeData(!isFindPostposeData)
    }

    // 是否符合要求
    const isSuit = (data,item)=>{
        let a
        for(let i=0;i<data.length;i++){
            if(data[i].configId===item.configId){
                a = data[i]
            }
        }
        return a
    }

    // 用户通知事件
    const changEnev = (item,record,value) =>{
        const zz = isSuit(postposeData,item)
        zz.userList && zz.userList.map(it=>{
            if(it.user.id===record.user.id){
                it.type = value
            }
        })
        setPostposeData([...postposeData])
    }

    // 移出用户
    const del = (item,record) =>{
        const zz = isSuit(postposeData,item)
        // yUserList（已选择） 减少
        zz.userList = zz.userList.filter(item=>item.user.id!==record.user.id)
        setPostposeData([...postposeData])
    }

    // 消息发送方式
    const changeMes = (value,item) =>{
        const zz = isSuit(postposeData,item)
        zz.typeList = value
        setPostposeData([...postposeData])
    }

    // 值是否改变
    const isEqual = (newData,oldData) =>{
        if(newData && oldData){
            if(newData.length !== oldData.length) return true
            const uniqueValues = new Set([...newData, ...oldData])
            for (const v of uniqueValues){
                const aCount = newData.filter(e=>e === v).length
                const bCount = oldData.filter(e=>e === v).length
                if(aCount !== bCount) return true
            }
            return false
        }
        return false
    }

    // 消息通知 ，消息通知人员是否更改
    const isYUser = item =>{
        const userList = item.userList
        const yUserList = isSuit(fixedPostposeData,item).userList
        const newId = userList && userList.map(item=>item.user.id+item.type)
        const oldId = yUserList && yUserList.map(item=>item.user.id+item.type)
        return isEqual(newId,oldId)
    }

    // 消息通知 ，消息发送方式是否更改
    const isMesType = item =>{
        const typeList = item.typeList
        const mesType = isSuit(fixedPostposeData,item).typeList
        return isEqual(typeList,mesType)
    }

    // 消息通知的值是否显示取消确定按钮
    const isChangeMes = item => {
        if(isMesType(item) || isYUser(item)){
            return <div className="post-pose-btn">
                        <Btn
                            onClick={()=>onCancel(item)}
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
        return null
    }

    const columns = item =>{
        return [
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
                        style={{width:70}}
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
                    if (record.user.id !== userId) {
                        return  <Tooltip title="移出用户">
                            <DeleteOutlined onClick={()=>del(item,record)}/>
                        </Tooltip>
                    }
                }
            },
        ]
    }

    const [dataItem,setDataItem] = useState("")

    const addUser = item => {
        setDataItem(item)
        setPostposeUserVisible(true)
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
                                    <div className="headline-left">
                                        <HlineIcon type={item.type}/>
                                    </div>
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
                                    item.type===61 &&
                                    <div className="post-pose-form">
                                        <Form form={form} layout={"vertical"} initialValues={{...item.typeList}}>
                                            <Form.Item label={"消息发送方式"} name={"typeList"}
                                                       rules={[{required:true, message:"请选择消息发送方式"}]}
                                            >
                                                <Checkbox.Group onChange={value=>changeMes(value,item)}>
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
                                                    onClick={()=>addUser(item)}
                                                    title={"添加成员"}
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
                                    </div>
                                }
                            </div>
                        )
                    })
                }
                <PostposeUserAdd
                    visible={postposeUserVisible}
                    setVisible={setPostposeUserVisible}
                    allUserList={allUserList}
                    dataItem={dataItem}
                    postposeData={postposeData}
                    setPostposeData={setPostposeData}
                />
            </div>

        </div>
    )
}

export default inject("pipelineStore","postposeStore")(observer(Postpose))