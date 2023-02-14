import React, {useEffect,useState} from "react";
import {Dropdown, Form, Input, Select, Space, Table, Tooltip} from "antd";
import {DeleteOutlined, LockOutlined, PlusOutlined, UnlockOutlined} from "@ant-design/icons";
import {Profile} from "tiklab-eam-ui";
import {inject,observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import Btn from "../../common/btn/btn";
import Loading from "../../common/loading/loading";
import PipelineUserAdd from "./pipelineUserAdd";
import EmptyText from "../../common/emptyText/emptyText";
import "./pipelineAddInfo.scss";

const PipelineAddInfo = props =>{

    const {set,pipelineStore,setCurrent,setAddPipelineVisible,
        templateLis,templateType,pipelineType,onClick
    } = props

    const {pipeline,pipelineList,findUserPage,createPipeline,isLoading,updatePipeline} = pipelineStore

    const [form] = Form.useForm()

    const [powerType,setPowerType] = useState(1) // 流水线权限 -- 私有或公有
    const [yUserList,setYUserList] = useState([])
    const [nUserList,setNUserList] = useState([])
    const [member,setMember] = useState([])  // 流水线成员
    const [visible,setVisible] = useState(false) // 添加用户下拉显示

    const userId = getUser().userId

    useEffect(()=>{
        if(set && pipeline){
            setPowerType(pipeline.power)
            form.setFieldsValue({name:pipeline.name})
        }
    },[pipeline])

    useEffect(()=>{
        !set && findUserPage().then(res=>{
            const data = res.data && res.data.dataList
            if(res.code===0){
                setYUserList(data.filter(item=>item.id===userId))
                setNUserList(data.filter(item=>item.id!==userId))
            }
        })
    },[])

    useEffect(()=>{
        const newArr = []
        !set && yUserList && yUserList.map(item=>{
            if(item.id===userId){
                newArr.push({
                    id:item.id,
                    adminRole: true
                })
            }else {
                newArr.push({
                    id:item.id,
                    adminRole: false
                })
            }

        })
        setMember([...newArr])
    },[yUserList])

    const onOk = value => {
        if(set){
            const params={
                id:pipeline.id,
                name:value.name===""?pipeline.name:value.name,
                power:powerType
            }
            updatePipeline(params).then(res => {
                if (res.code === 0) {
                    value.name!=="" && (pipeline.name = value.name)
                    props.history.push(`/index/task/${pipeline.id}/survey`)
                }
            })
        }else {
            const params = {
                type:pipelineType,
                template: templateType===0 ? 1:templateLis[templateType-1].type,
                name: value.name,
                power: powerType,
                userList: member
            }
            createPipeline(params).then(res => {
                if (res.code === 0 && res.data) {
                    props.history.push(`/index/task/${res.data}/config`)
                }
            })
        }
    }

    const powerLis = [
        {
            id:1,
            title:"全局",
            icon:<UnlockOutlined />,
            desc:"公共项目，全部成员可见。不支持TFVC等某些功能。"
        },
        {
            id:2,
            title:"私有",
            icon:<LockOutlined />,
            desc: "只有您授予访问权限的人才能查看此项目。"
        }
    ]

    // 权限
    const renderPowerType = powerLis =>{
        return  <div className="pipeline-power">
            <div className="pipeline-power-title">流水线权限</div>
            <div className="pipeline-power-content">
                {
                    powerLis.map(item=>{
                        return <div
                            key={item.id}
                            className={`pipeline-power-item ${set?"pipeline-power-set":"pipeline-power-noSet"} ${powerType===item.id?"pipeline-power-select":""}`}
                            onClick={()=>setPowerType(item.id)}
                        >
                            <div className="power-item">
                                <div>
                                    <div className="power-title power-icon">{item.icon}</div>
                                    <div className="power-title power-name">{item.title}</div>
                                </div>
                                {
                                    powerType===item.id &&
                                    <div className="power-select-show"/>
                                }
                            </div>
                            <div className="power-desc">{item.desc}</div>
                        </div>
                    })
                }
            </div>
        </div>
    }

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

    // 用户
    const renderUser = () => {
        return (
            <div className="pipeline-user">
                <div className="pipeline-user-title">
                    <div>流水线成员</div>
                    <Dropdown overlay={
                        <PipelineUserAdd
                            visible={visible}
                            setVisible={setVisible}
                            nUserList={nUserList}
                            yUserList={yUserList}
                            setYUserList={setYUserList}
                            setNUserList={setNUserList}
                            findUserPage={findUserPage}
                        />}
                          placement={"bottomRight"}
                          visible={visible}
                          trigger={['click']}
                          onVisibleChange={visible => setVisible(visible)}
                    >
                        <Btn title={"添加成员"} icon={<PlusOutlined/>} type={"link"}/>
                    </Dropdown>
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
            </div>
        )
    }

    // 表单名称效验
    const rules = set => {
        let rule
        if(set){
            rule = [
                {max:30,message:"请输入1~31位以内的名称"},
                {
                    pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_-]{0,}$/,
                    message: "流水线名称不能包含非法字符，如&,%，&，#……等",
                },
                ({ getFieldValue }) => ({
                    validator(rule, value) {
                        let nameArray = []
                        if(pipelineList){
                            const name = pipelineList && pipelineList.map(item=>item.name)
                            nameArray = name.filter(item=>item!==pipeline.name)
                        }
                        if (nameArray.includes(value)) {
                            return Promise.reject("名称已经存在");
                        }
                        return Promise.resolve()
                    },

                })
            ]
        }
        if(!set){
            rule = [
                {required:true,message:"名称不能为空"},
                {max:30,message:"请输入1~31位以内的名称"},
                {
                    pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_-]{0,}$/,
                    message: "流水线名称不能包含非法字符，如&,%，&，#……等",
                },
                ({ getFieldValue }) => ({
                    validator(rule,value) {
                        let nameArray = []
                        if(pipelineList){
                            nameArray = pipelineList && pipelineList.map(item=>item.name)
                        }
                        if (nameArray.includes(value)) {
                            return Promise.reject("名称已经存在");
                        }
                        return Promise.resolve()
                    },

                }),
            ]
        }
        return rule
    }

    return(
        <>
            <Form form={form} autoComplete="off" layout={"vertical"}>
                <Form.Item label={"流水线名称"} name="name" rules={rules(set)}>
                    <Input allowClear bordered={set} style={set? {width:612}: {background:"#fff"}}/>
                </Form.Item>
            </Form>
            { renderPowerType(powerLis) }

            { !set && powerType === 2 && renderUser() }

            {
                set ?
                <Btn onClick={onClick} title={"取消"} isMar={true}/>
                :
                <>
                    <Btn onClick={()=>setAddPipelineVisible(false)} title={"取消"} isMar={true}/>
                    <Btn onClick={()=>setCurrent(1)} title={"上一步"} isMar={true}/>
                </>
            }
            <Btn type={"primary"} title={"确认"}
                 onClick={() => {
                     form
                         .validateFields()
                         .then((values) => {
                             onOk(values)
                             form.resetFields()
                         })
                     }}
                />
            { isLoading && <Loading/> }
        </>
    )
}

export default inject("pipelineStore")(observer(PipelineAddInfo))
