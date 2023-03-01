import React,{useState,useEffect,useRef} from "react";
import {Modal, Form, Select, Checkbox, Table, Space, Tooltip, Dropdown, message} from "antd";
import {DeleteOutlined,PlusOutlined} from "@ant-design/icons";
import {Profile} from "tiklab-eam-ui";
import {PostprocessMirrorScenario} from "../../../common/editor/CodeMirror";
import {autoHeight} from "../../../common/client/Client";
import Btn from "../../../common/btn/Btn";
import ModalTitle from "../../../common/modalTitle/ModalTitle";
import EmptyText from "../../../common/emptyText/EmptyText";
import PostprocessUserAdd from "./PostprocessUserAdd";

const PostprocessAdd = props =>{

    const {mesSendData,postprocessVisible,setPostprocessVisible,createPostConfig,pipelineId,
        formValue,userId,findDmUserPage,updatePostConfig
    } = props

    const [form] = Form.useForm()
    const mirrorRefs = useRef(null)
    const [height,setHeight] = useState(0)

    // 后置处理类型
    const [type,setType] = useState(61)

    // 通知人员选择框展示||隐藏
    const [userAddVisible,setUserAddVisible] = useState(false)

    // 所有通知人员
    const [allUserList,setAllUserList] = useState([])

    // 选中的通知人员
    const [yUserList,setYUserList] = useState([])

    // 代码块行高亮
    const [styleActiveLine,setStyleActiveLine] = useState(false)

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
            // 初始表单
            if(formValue){
                form.setFieldsValue({
                    type: formValue.type,
                    typeList: formValue.typeList,
                })
                setType(formValue.type)
                return
            }
            form.resetFields()
            setType(61)
        }
        return ()=>{
            setStyleActiveLine(false)
        }
     },[postprocessVisible])

    useEffect(()=>{
        // 获取通知人员
        postprocessVisible && findDmUserPage(pipelineId).then(res=>{
            const dataList = res.data && res.data.dataList
            if(res.code===0){
                setAllUserList([...dataList])
                if(formValue){
                    setYUserList(formValue && formValue.userList)
                    return
                }
                let arr = []
                dataList.map(item=> {
                    item.user && item.user.id===userId && arr.push(Object.assign({},item,{messageType:1}))
                })
                setYUserList([...arr])
            }
        })
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
                item.messageType=value
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
        let newArr = []
        yUserList && yUserList.map(item=>{
            newArr.push({
                messageType:item.messageType,
                user:{id:item.user.id}
            })
        })
        if(formValue){
            const params = {
                taskType:type,
                configId:formValue.configId,
                taskId:pipelineId,
                values:null,
            }
            type===61?params.values={ ...value,userList:newArr}:
                params.values={scriptOrder: mirrorRefs.current.editor.getValue()}
            updatePostConfig(params).then(res=>{
                res.code===0 && message.info("更新成功",0.5)
            })
        }else {
            const params = {
                taskType:type,
                taskId:pipelineId,
                values:null,
            }
            type===61?params.values={ ...value,userList:newArr}:
                params.values={scriptOrder: mirrorRefs.current.editor.getValue()}
            createPostConfig(params).then(res=>{
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
                    defaultValue={record.messageType}
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
            value:"wechat",
            title:"企业微信机器人"
        },
        {
            value:"dingding",
            title:"钉钉机器人"
        },
        {
            value:"mail",
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
                    <Form form={form} layout={"vertical"} initialValues={{type:61,typeList:["site"]}}>
                        <Form.Item name={"type"} label={"类型"} rules={[{required:true, message:"请选择类型"}]}>
                            <Select onChange={value=>setType(value)} disabled={formValue && formValue}>
                                <Select.Option value={61}>消息通知</Select.Option>
                                <Select.Option value={71}>执行bat脚本</Select.Option>
                                <Select.Option value={72}>执行Shell脚本</Select.Option>
                            </Select>
                        </Form.Item>
                        {
                            type===61 &&
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
                                       <Dropdown
                                           overlay={ <PostprocessUserAdd
                                               userAddVisible={userAddVisible}
                                               setUserAddVisible={setUserAddVisible}
                                               allUserList={allUserList}
                                               yUserList={yUserList}
                                               setYUserList={setYUserList}
                                                />}
                                           placement={"bottomRight"}
                                           visible={userAddVisible}
                                           trigger={['click']}
                                           onVisibleChange={visible => setUserAddVisible(visible)}
                                       >
                                           <Btn
                                               type={"link-nopadding"}
                                               icon={<PlusOutlined/>}
                                               title={"添加成员"}
                                           />
                                       </Dropdown>
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
                            </>
                        }
                        {
                            type===71 &&
                            <PostprocessMirrorScenario
                                value={formValue?formValue.scriptOrder:""}
                                mirrorRefs={mirrorRefs}
                                styleActiveLine={styleActiveLine}
                                onFocus={onFocus}
                                type={71}
                            />
                        }
                        {
                            type===72 &&
                            <PostprocessMirrorScenario
                                value={formValue?formValue.scriptOrder:""}
                                mirrorRefs={mirrorRefs}
                                styleActiveLine={styleActiveLine}
                                onFocus={onFocus}
                                type={72}
                            />
                        }
                    </Form>
                </div>
            </div>
        </Modal>
    )
}

export default PostprocessAdd
