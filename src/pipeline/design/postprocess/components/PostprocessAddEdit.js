import React,{useState,useEffect} from "react";
import {Form, Select, Checkbox, Table, Space, Tooltip, Input} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {getUser} from "tiklab-core-ui";
import ListEmpty from "../../../../common/component/list/ListEmpty";
import Modals from "../../../../common/component/modal/Modal";
import Profile from "../../../../common/component/profile/Profile";
import PostprocessUserAdd from "./PostprocessUserAdd";
import {Validation} from "../../../../common/utils/Client";

const PostprocessAddEdit = props =>{

    const {findPost,postprocessVisible,setPostprocessVisible,formValue,postprocessStore,pipelineStore} = props

    const {pipeline} = pipelineStore
    const {createPost,updatePost,mesSendData} = postprocessStore

    const [form] = Form.useForm()
    const user = getUser()

    // 选中的通知人员
    const [yUserList,setYUserList] = useState([])

    useEffect(()=>{
        if(postprocessVisible){
            if(formValue){
                // 初始化表单
                form.setFieldsValue({
                    ...formValue,
                    type:formValue.task.values?.type,
                    typeList: formValue.task.values?.typeList,
                })
                setYUserList(formValue.task.values.userList || [])
                return
            }
            // 初始化通知用户
            setYUserList([{
                user:{...user,id:user.userId},
                receiveType:1
            }])
            // 清空表单
            form.resetFields()
        }
        return ()=>{
            setYUserList([])
        }
     },[postprocessVisible])

    /**
     * 移出用户
     * @param record
     */
    const remove = record =>{
        setYUserList(yUserList.filter(item=>item.user.id!==record.user.id))
    }

    /**
     * 通知人员通知事件
     * @param value
     * @param record
     */
    const changType = (value,record)=>{
        yUserList && yUserList.map(item=>{
            if(item.user.id===record.user.id){
                item.receiveType=value
            }
        })
        setYUserList([...yUserList])
    }

    /**
     * 消息通知方式是否禁止
     * @param type
     * @returns {boolean}
     */
    const isType = type => mesSendData && mesSendData.some(item=>item===type)

    /**
     * 添加或者更新后置处理
     */
    const onOk = () => {
        form.validateFields().then((value)=>{
            let userList = yUserList && yUserList.map(item=>({receiveType:item.receiveType, user: {id:item.user.id}}))
            let params = {
                pipelineId:pipeline.id,
                taskType: 'message',
                postName: value.postName,
                values: {
                    typeList:value.typeList,
                    userList
                }
            }
            if(formValue){
                 params = {
                     ...params,
                     postId:formValue.postId,
                 }
                updatePost(params).then(res=>{
                    if(res.code===0){
                        findPost()
                        setPostprocessVisible(false)
                    }
                })
            } else {
                createPost(params).then(res=>{
                    if(res.code===0){
                        findPost()
                        setPostprocessVisible(false)
                    }
                })
            }
        })
    }

    const columns = [
        {
            title: "成员",
            dataIndex: ["user","nickname"],
            key: ["user","nickname"],
            width:"50%",
            ellipsis:true,
            render:(text,record)=> (
                <Space>
                    <Profile userInfo={record.user}/>
                    { text }
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
                    onChange={value=>changType(value,record)}
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
                if (record.user.id !== user.userId) {
                    return (
                        <DeleteOutlined
                            onClick={()=>remove(record)}
                        />
                    )
                }
            }
        },
    ]

    const typeList = [
        {value:"site", title:"站内信"},
        {value:"email", title:"邮箱通知"},
        {value:"sms", title:"短信通知"},
        {value:"qywechat", title:"企业微信机器人"},
        // {value:"dingding", title:"钉钉机器人"},
    ]

    return(
        <Modals
            visible={postprocessVisible}
            onCancel={()=>setPostprocessVisible(false)}
            onOk={onOk}
            width={800}
            title={formValue?"修改":"添加"}
        >
            <div className="postprocess-modal">
                <Form
                    form={form}
                    layout={"vertical"}
                    autoComplete={'off'}
                    initialValues={{typeList:["site"],type:'shell'}}
                >
                    {/*<Form.Item name={"taskType"} label={"类型"} rules={[{required:true, message:"类型不能为空"}]}>*/}
                    {/*    <Select disabled={formValue && formValue} placeholder='类型'>*/}
                    {/*        <Select.Option value={'message'}>消息通知</Select.Option>*/}
                    {/*        <Select.Option value={'script'}>执行脚本</Select.Option>*/}
                    {/*    </Select>*/}
                    {/*</Form.Item>*/}
                    <Form.Item name="postName" label={"名称"} rules={[{required:true, message:"名称不能为空"},Validation("名称")]}>
                        <Input placeholder='名称'/>
                    </Form.Item>
                    <Form.Item label={"消息发送方式"} name={"typeList"} rules={[{required:true, message:"消息发送方式不能为空"}]}>
                        <Checkbox.Group>
                            {
                                typeList.map(item=>{
                                    if(version!=='cloud' && item.value==='sms') return;
                                    return (
                                        <Tooltip title={isType(item.value) && `未配置${item.title}`} key={item.value}>
                                            <Checkbox value={item.value} disabled={isType(item.value)}>{item.title}</Checkbox>
                                        </Tooltip>
                                    )
                                })
                            }
                        </Checkbox.Group>
                    </Form.Item>
                    <div className="post-pose-user">
                        <div className="post-pose-title">
                            <div className="title-user">消息通知人员</div>
                            <PostprocessUserAdd
                                pipelineStore={pipelineStore}
                                yUserList={yUserList}
                                setYUserList={setYUserList}
                            />
                        </div>
                        <Table
                            bordered={false}
                            columns={columns}
                            dataSource={yUserList}
                            rowKey={(record) => record.user.id}
                            pagination={false}
                            locale={{emptyText: <ListEmpty/>}}
                        />
                    </div>
                </Form>
            </div>
        </Modals>
    )
}

export default PostprocessAddEdit
