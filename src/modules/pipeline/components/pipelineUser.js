import React,{useState} from "react";
import {Space,Table,Select,Tooltip} from "antd";
import {Profile} from "tiklab-eam-ui";
import {DeleteOutlined,PlusOutlined} from "@ant-design/icons";
import Btn from "../../common/btn/btn";
import PipelineUserAdd from "./pipelineUserAdd";
import EmptyText from "../../common/emptyText/emptyText";

const PipelineUser = props =>{

    const {yUserList,setYUserList,nUserList,setNUserList,userId,member,setMember} = props

    const [visible,setVisible] = useState(false)

    // 用户权限
    const changePower = (record,value) => {
        if(value==="1"){
            value=true
        }
        if(value==="2"){
            value=false
        }
        member && member.map(item=>{
            if(item.id===record.id){
                item.adminRole = value
            }
        })
        setMember([...member])
    }

    // 移出用户
    const del = (text,record) =>{

        // yUserList（已选择） 减少
        setYUserList(yUserList.filter(item=>item.id!==record.id))

        // nUserList（未选择） 添加
        setNUserList(nUserList.concat([record]))
    }

    const columns = [
        {
            title:"昵称",
            dataIndex:"nickname",
            key:"nickname",
            width:"40%",
            ellipsis:true,
        },
        {
            title:"名称",
            dataIndex:"name",
            key:"name",
            width:"30%",
            ellipsis:true,
            render:(text,record)=>{
                return <Space>
                    <Profile userInfo={record}/>
                    {text}
                </Space>
            }
        },
        {
            title:"权限",
            dataIndex:"power",
            key:"power",
            width:"25",
            ellipsis:true,
            render: (text,record)=>(
                <Select
                    defaultValue={record.id===userId ?"1":"2"}
                    bordered={false}
                    showarrow={"false"}
                    style={{width:120}}
                    disabled={record.id===userId}
                    onChange={value=>changePower(record,value)}
                >
                    <Select.Option value={"1"}>管理员角色</Select.Option>
                    <Select.Option value={"2"}>默认角色</Select.Option>
                </Select>
            )
        },
        {
            title:"操作",
            dataIndex:"action",
            key:"action",
            width:"5%",
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

    return (
        <div className="pipeline-user">
            <div className="pipeline-user-title">
                <div>
                    流水线成员
                </div>
                <Btn
                    title={"添加成员"}
                    icon={<PlusOutlined/>}
                    onClick={()=>setVisible(true)}
                    type={"link"}
                />
            </div>
            <div className="pipeline-user-table">
                <Table
                    rowKey={(record) => record.id}
                    columns={columns}
                    dataSource={yUserList}
                    pagination={false}
                    showHeader={false}
                    locale={{emptyText: <EmptyText/>}}
                />
            </div>
            <PipelineUserAdd
                visible={visible}
                setVisible={setVisible}
                nUserList={nUserList}
                yUserList={yUserList}
                setYUserList={setYUserList}
                setNUserList={setNUserList}
            />
        </div>
    )
}

export default PipelineUser