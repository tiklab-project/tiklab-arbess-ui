import React,{useState,useEffect,useRef} from "react";
import {Modal,Form,Select,Checkbox,Table,Space,Tooltip} from "antd";
import {DeleteOutlined,PlusOutlined} from "@ant-design/icons";
import {Profile} from "tiklab-eam-ui";
import Btn from "../../../common/btn/btn";
import ModalTitle from "../../../common/modalTitle/modalTitle";
import EmptyText from "../../../common/emptyText/emptyText";
import PostposeUserAdd from "./postposeUserAdd";
import {autoHeight} from "../../../common/client/client";
import {PostposeMirrorScenario} from "../../common/components/mirror";

const PostposeAdd = props =>{

    const {postposeVisible,setPostposeVisible,createPostConfig,pipelineId,formValue,userId,findUserPage,updatePostConfig} = props

    const [form] = Form.useForm()
    const mirrorRefs = useRef(null)

    const [height,setHeight] = useState(0)
    const [type,setType] = useState(61)
    const [userAddVisible,setUserAddVisible] = useState(false)
    const [allUserList,setAllUserList] = useState([])
    const [yUserList,setYUserList] = useState([])
    const [styleActiveLine,setStyleActiveLine] = useState(false)

    useEffect(()=>{
        setHeight(autoHeight())
        return ()=>{
            window.onresize = null
        }
    },[height])

    useEffect(()=>{
        if(postposeVisible){
            setStyleActiveLine(false)
            if(formValue){
                form.setFieldsValue({
                    type: formValue.type,
                    typeList: formValue.typeList,
                })
                setType(formValue.type)
            }
            else {
                form.resetFields()
                setType(61)
            }
        }
     },[postposeVisible])


    useEffect(()=>{
        postposeVisible && findUserPage().then(res=>{
            const dataList = res.data && res.data.dataList
            if(res.code===0){
                setAllUserList([...dataList])
                if(formValue){
                    setYUserList(formValue && formValue.userList)
                }
                else{
                    let arr = []
                    dataList.map(item=>{
                        item.id===userId && arr.push({
                            user:item,
                            type:1
                        })
                        setYUserList([...arr])
                    })
                }
            }
        })
    },[postposeVisible])

    window.onresize=() =>{
        setHeight(autoHeight())
    }

    // 移出用户
    const remove = (record) =>{
        setYUserList(yUserList.filter(item=>item.user.id!==record.user.id))
    }

    const onOk = value => {
        let newArr = []
        yUserList && yUserList.map(item=>{
            newArr.push({
                type:item.type,
                user:{id:item.user.id}
            })
        })
        if(formValue){
            const params = {
                taskType:type,
                configId:formValue.configId,
                pipeline: {id:pipelineId},
                values:null,
            }
            type===61?params.values={ ...value,userList:newArr}:params.values={scriptOrder: mirrorRefs.current.editor.getValue()}
            updatePostConfig(params)
        }else {
            const params = {
                taskType:type,
                pipeline: {id:pipelineId},
                values:null,
            }
            type===61?params.values={ ...value,userList:newArr}:params.values={scriptOrder: mirrorRefs.current.editor.getValue()}
            createPostConfig(params)
        }
        setPostposeVisible(false)
    }

    const modalFooter = (
        <>
            <Btn
                onClick={()=>setPostposeVisible(false)}
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

    const onFocus = () =>{
        setStyleActiveLine(true)
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

    return(
        <Modal
            closable={false}
            visible={postposeVisible}
            onCancel={()=>setPostposeVisible(false)}
            footer={modalFooter}
            destroyOnClose={true}
            width={800}
            style={{height:height,top:60}}
            bodyStyle={{padding:0}}
            className="mf"
        >
            <div className="postpose-modal">
                <div className="postpose-modal-up">
                    <ModalTitle
                        setVisible={setPostposeVisible}
                        title={formValue===""?"添加后置处理":"修改后置处理"}
                    />
                </div>
                <div className="postpose-modal-content">
                    <Form
                        form={form}
                        layout={"vertical"}
                        initialValues={{type:61,typeList:["site"]}}
                    >
                        <Form.Item name={"type"} label={"类型"}
                                   rules={[{required:true, message:"请选择类型"}]}
                        >
                            <Select onChange={value=>setType(value)} disabled={formValue && formValue}>
                                <Select.Option value={61}>消息通知</Select.Option>
                                <Select.Option value={71}>执行bat脚本</Select.Option>
                                <Select.Option value={72}>执行Shell脚本</Select.Option>
                            </Select>
                        </Form.Item>
                        {
                            type===61 &&
                            <>
                                <Form.Item label={"消息发送方式"} name={"typeList"}
                                           rules={[{required:true, message:"请选择消息发送方式"}]}
                                >
                                    <Checkbox.Group>
                                        <Checkbox value="site">站内信</Checkbox>
                                        <Checkbox value="sms">短信通知</Checkbox>
                                        <Checkbox value="wechat">企业微信</Checkbox>
                                    </Checkbox.Group>
                                </Form.Item>
                                <div className="post-pose-user">
                                    <div className="post-pose-title">
                                        <div className="title-user">消息通知人员</div>
                                        <Btn
                                            type={"link"}
                                            icon={<PlusOutlined/>}
                                            onClick={()=>setUserAddVisible(true)}
                                            title={"添加成员"}
                                        />
                                        <PostposeUserAdd
                                            userAddVisible={userAddVisible}
                                            setUserAddVisible={setUserAddVisible}
                                            allUserList={allUserList}
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
                                        locale={{emptyText: <EmptyText/>}}
                                    />
                                </div>
                            </>
                        }
                        {
                            type===71 &&
                            <PostposeMirrorScenario
                                value={formValue?formValue.scriptOrder:""}
                                mirrorRefs={mirrorRefs}
                                styleActiveLine={styleActiveLine}
                                onFocus={onFocus}
                                type={71}
                            />
                        }
                        {
                            type===72 &&
                            <PostposeMirrorScenario
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

export default PostposeAdd