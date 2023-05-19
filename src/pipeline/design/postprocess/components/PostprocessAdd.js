import React,{useState,useEffect,useRef} from "react";
import {Modal, Form, Select, Checkbox, Table, Space, Tooltip, message} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {getUser} from "tiklab-core-ui";
import Btn from "../../../../common/btn/Btn";
import EmptyText from "../../../../common/emptyText/EmptyText";
import ModalTitle from "../../../../common/modalTitle/ModalTitle";
import {PostprocessMirrorScenario} from "../../../../common/editor/CodeMirror";
import Profile from "../../../../common/profile/Profile";
import {autoHeight} from "../../../../common/client/Client";
import PostprocessUserAdd from "./PostprocessUserAdd";

const PostprocessAdd = props =>{

    const {postprocessVisible,setPostprocessVisible,formValue,postprocessStore,pipelineStore} = props

    const {pipeline,pipelineUserList} = pipelineStore
    const {createPost,updatePost,mesSendData} = postprocessStore

    const [form] = Form.useForm()
    const userId = getUser().userId
    const mirrorRefs = useRef(null)
    const [height,setHeight] = useState(0)

    // 后置处理类型
    const [postprocessType,setPostprocessType] = useState('message')

    // 代码块行高亮
    const [styleActiveLine,setStyleActiveLine] = useState(false)

    // 选中的通知人员
    const [yUserList,setYUserList] = useState([])

    useEffect(()=>{
        setHeight(autoHeight())
        return ()=>{
            window.onresize = null
        }
    },[height])

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    useEffect(()=>{
        if(postprocessVisible){
            if(formValue){
                // 初始化表单
                form.setFieldsValue({
                    taskType: formValue.taskType,
                    typeList: formValue.task.values.typeList,
                })
                setYUserList(formValue && formValue.task.values.userList)
                setPostprocessType(formValue.taskType)
                return
            }
            // 获取通知人员
            let arr = []
            pipelineUserList.map(item=> {
                item.user && item.user.id===userId && arr.push(Object.assign({},item,{receiveType:1}))
            })
            setYUserList([...arr])
            // 清空表单
            form.resetFields()
        }
        return ()=>{
            setStyleActiveLine(false)
            setPostprocessType('message')
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
     * 执行脚本高亮
     */
    const onFocus = () =>{
        setStyleActiveLine(true)
    }

    /**
     * 消息通知方式是否禁止
     * @param type
     * @returns {boolean}
     */
    const isType = type => mesSendData && mesSendData.some(item=>item===type)

    /**
     * 添加或者更新后置处理
     * @param value
     */
    const onOk = value => {
        let userList = yUserList && yUserList.map(item=>({receiveType:item.receiveType, user: {id:item.user.id}}))
        let params = {
            taskType:postprocessType,
            values: postprocessType==='message' ? { ...value,userList}: {scriptOrder: mirrorRefs.current.editor.getValue()}
        }
        if(formValue){
             params = {
                 ...params,
                 postprocessId:formValue.postprocessId,
             }
            updatePost(params).then(res=>{
                res.code===0 && message.info("更新成功",0.5)
            })
        }else {
            params = {
                ...params,
                pipelineId:pipeline.id,
            }
            createPost(params).then(res=>{
                res.code===0 && message.info("添加成功",0.5)
            })
        }
        setPostprocessVisible(false)
    }

    const modalFooter = (
        <>
            <Btn
                onClick={()=>setPostprocessVisible(false)}
                title={"取消"}
                isMar={true}
            />
            <Btn
                onClick={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields()
                            onOk(values)
                        })
                }}
                title={"确定"}
                type={"primary"}
            />
        </>
    )

    const columns = [
        {
            title: "成员",
            dataIndex: ["user","nickname"],
            key: ["user","nickname"],
            width:"50%",
            ellipsis:true,
            render:(text,record)=>{
                return  <Space>
                            <Profile userInfo={record.user}/>
                            { text }
                        </Space>
            }
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
                if (record.user.id !== userId) {
                    return  <Tooltip title="移出用户">
                                <DeleteOutlined onClick={()=>remove(record)}/>
                            </Tooltip>
                }
            }
        },
    ]

    const typeList = [
        {
            value:"site",
            title:"站内信"
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
        {
            value:"email",
            title:"邮箱通知"
        },
    ]

    return(
        <Modal
            closable={false}
            visible={postprocessVisible}
            onCancel={()=>setPostprocessVisible(false)}
            footer={modalFooter}
            destroyOnClose={true}
            width={800}
            style={{height:height,top:60}}
            bodyStyle={{padding:0}}
            className="mf"
        >
            <div className="postprocess-modal">
                <div className="postprocess-modal-up">
                    <ModalTitle setVisible={setPostprocessVisible} title={formValue===""?"添加后置处理":"修改后置处理"}/>
                </div>
                <div className="postprocess-modal-content">
                    <Form form={form} layout={"vertical"} initialValues={{taskType:'message',typeList:["site"]}}>
                        <Form.Item name={"taskType"} label={"类型"} rules={[{required:true, message:"请选择类型"}]}>
                            <Select onChange={value=>setPostprocessType(value)} disabled={formValue && formValue}>
                                <Select.Option value={'message'}>消息通知</Select.Option>
                                <Select.Option value={'bat'}>执行bat脚本</Select.Option>
                                <Select.Option value={'shell'}>执行Shell脚本</Select.Option>
                            </Select>
                        </Form.Item>
                        {
                            postprocessType==='message' &&
                            <>
                                <Form.Item label={"消息发送方式"} name={"typeList"} rules={[{required:true, message:"请选择消息发送方式"}]}>
                                    <Checkbox.Group>
                                        {
                                            typeList.map(item=>(
                                                <Tooltip title={isType(item.value) && `未配置${item.title}`} key={item.value}>
                                                    <Checkbox value={item.value} disabled={isType(item.value)}>{item.title}</Checkbox>
                                                </Tooltip>
                                            ))
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
                                        locale={{emptyText:<EmptyText/>}}
                                    />
                                </div>
                            </>
                        }
                        {
                            (postprocessType==='bat' || postprocessType==='shell') &&
                            <PostprocessMirrorScenario
                                value={formValue?formValue.task.values.scriptOrder:""}
                                mirrorRefs={mirrorRefs}
                                styleActiveLine={styleActiveLine}
                                onFocus={onFocus}
                                type={postprocessType}
                            />
                        }
                    </Form>
                </div>
            </div>
        </Modal>
    )
}

export default PostprocessAdd
