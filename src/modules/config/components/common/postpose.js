import React,{useState,useEffect} from "react";
import {DeleteOutlined,PlusOutlined} from "@ant-design/icons";
import {Select,Form,Checkbox,Table,Popconfirm,Tooltip,Space} from "antd";
import {getUser} from "tiklab-core-ui";
import {Profile} from "tiklab-eam-ui";
import {inject,observer} from "mobx-react";
import EmptyText from "../../../common/emptyText/emptyText";
import MirrorContent from "./mirror";
import Btn from "../../../common/btn/btn";
import PostposeAdd from "./postposeAdd";
import PipelineUserAdd from "../../../pipeline/components/pipelineUserAdd";
import "./postpose.scss";

const Postpose = props =>{

    const {pipelineStore} = props

    const {findUserPage} = pipelineStore

    const [postposeVisible,setPostposeVisible] = useState(false)
    const [postposeUserVisible,setPostposeUserVisible] = useState(false)
    const [showArrow,setShowArrow] = useState(false)
    const [postposeData,setPostposeData] = useState([])
    const [yUserList,setYUserList] = useState([])
    const [nUserList,setNUserList] = useState([])

    const userId = getUser().userId

    useEffect(()=>{
        findUserPage().then(res=>{
            const data = res.data && res.data.dataList
            if(res.code===0){
                setYUserList(data.filter(item=>item.id===userId))
                setNUserList(data.filter(item=>item.id!==userId))
            }
        })
    },[])

    const changEnev = () =>{

    }

    // 移出用户
    const del = (text,record) =>{

        // yUserList（已选择） 减少
        setYUserList(yUserList.filter(item=>item.id!==record.id))

        // nUserList（未选择） 添加
        setNUserList(nUserList.concat([record]))
    }

    // 删除类型
    const delType = id =>{
        setPostposeData(postposeData.filter(item=>item.id!==id))
    }
    
    const onOk = item => {
      
    }

    const columns = [
        {
            title: "成员",
            dataIndex: "nickname",
            key: "nickname",
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
            dataIndex: "action",
            key: "action",
            width:"30%",
            ellipsis:true,
            render:(text,record)=>(
                <Select
                    defaultValue={1}
                    bordered={false}
                    showArrow={showArrow}
                    style={{width:80}}
                    onMouseEnter={()=>setShowArrow(true)}
                    onMouseLeave={()=>setShowArrow(false)}
                    onChange={()=>changEnev(record)}
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
                if (record.id !== userId) {
                    return <Tooltip title="移出用户">
                        <DeleteOutlined onClick={()=>del(text,record)}/>
                    </Tooltip>
                }
            }
        },
    ]

    return(
        <div className="post-pose">
            <div className="post-pose-sel">
                <Btn
                    icon={<PlusOutlined/>}
                    onClick={()=>setPostposeVisible(true)}
                    title={"添加"}
                />
                <PostposeAdd
                    postposeVisible={postposeVisible}
                    setPostposeVisible={setPostposeVisible}
                    postposeData={postposeData}
                    setPostposeData={setPostposeData}
                />
            </div>
            <div className="post-pose-content home-limited">
                {
                    postposeData && postposeData.map(item=>{
                        return(
                            <div className="post-pose-forms" key={item.id}>
                                <div className="post-pose-headline">
                                    <div className="headline-left"> {item.title}</div>
                                    <div>
                                        <Popconfirm
                                            placement="topRight"
                                            title="你确定删除吗"
                                            onConfirm={()=>delType(item.id)}
                                            okText="确定"
                                            cancelText="取消"
                                        >
                                            <span className="headline-delete">
                                                <DeleteOutlined />
                                                删除
                                            </span>
                                        </Popconfirm>
                                    </div>
                                </div>
                                {
                                    (item.id===1||item.id===2) &&
                                    <MirrorContent/>
                                }
                                {
                                    item.id===3 &&
                                    <div className="post-pose-form">
                                        <Form
                                            layout={"vertical"}
                                        >
                                            <Form.Item label={"消息发送方式"} name={"typeList"}
                                                       rules={[{required:true, message:"请选择消息发送方式"}]}
                                            >
                                                <Checkbox.Group>
                                                    <Checkbox value="site">站内信</Checkbox>
                                                    <Checkbox value="sms">短信通知</Checkbox>
                                                    <Checkbox value="wechat">企业微信</Checkbox>
                                                </Checkbox.Group>
                                            </Form.Item>
                                        </Form>
                                        <div className="post-pose-title">
                                            <div className="title-user">消息通知人员</div>
                                            <div className="title-user">
                                                <Btn
                                                    type={"link"}
                                                    icon={<PlusOutlined/>}
                                                    onClick={()=>setPostposeUserVisible(true)}
                                                    title={"添加成员"}
                                                />
                                            </div>
                                            <PipelineUserAdd
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
                                            rowKey={(record) => record.id}
                                            pagination={false}
                                            locale={{emptyText: <EmptyText/>}}
                                        />
                                    </div>
                                }

                                {/*<div className="post-pose-btn">*/}
                                {/*    <Btn*/}
                                {/*        // onClick={()=>setVisible(false)}*/}
                                {/*        title={"取消"}*/}
                                {/*        isMar={true}*/}
                                {/*    />*/}
                                {/*    <Btn*/}
                                {/*        onClick={()=>onOk(item)}*/}
                                {/*        title={"确定"}*/}
                                {/*        type={"primary"}*/}
                                {/*    />*/}
                                {/*</div>*/}
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default inject("pipelineStore")(observer(Postpose))