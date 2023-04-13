import React, {useEffect,useState} from "react";
import {Dropdown, Form, Input, Select, Space, Table, Tooltip} from "antd";
import {DeleteOutlined, LockOutlined, PlusOutlined, UnlockOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import {PrivilegeProjectButton} from "tiklab-user-ui";
import Profile from "../../../common/profile/Profile";
import Btn from "../../../common/btn/Btn";
import EmptyText from "../../../common/emptyText/EmptyText";
import PipelineUserAdd from "./PipelineUserAdd";
import "./PipelineAddInfo.scss";

/**
 * 添加流水线，完善信息
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PipelineAddInfo = props =>{

    const {set,pipelineStore,setCurrent,onClick,setBaseInfo} = props

    const {pipeline,pipelineList,findUserPage,updatePipeline,findUserPipeline} = pipelineStore

    const [form] = Form.useForm()
    const userId = getUser().userId

    // 流水线类型
    const [type,setType] = useState(1)

    // 流水线权限 -- 1私有或2公有
    const [powerType,setPowerType] = useState(1)

    // 全部用户
    const [allUserList,setAllUserList] = useState([])

    // 选中的用户
    const [yUserList,setYUserList] = useState([])

    // 添加用户下拉显示
    const [visible,setVisible] = useState(false)

    useEffect(()=>{
        if(set && pipeline){
            // 初始化权限
            setPowerType(pipeline.power)
            // 初始化表单
            form.setFieldsValue({name:pipeline.name})
        }
    },[pipeline])

    useEffect(()=>{
        if(!set){
            // 获取流水线
            findUserPipeline()
            // 获取用户
            findUserPage({
                pageParam:{
                    pageSize:6,
                    currentPage:1
                }
            }).then(res=>{
                const data = res.data && res.data.dataList
                if(res.code===0){
                    setAllUserList(data)
                    setYUserList(data.map(item=>({...item,adminRole:true})).filter(item=>item.id===userId))
                }
            })
        }
    },[])

    /**
     * 改变用户权限
     * @param record
     * @param value
     */
    const changePower = (record,value) => {
        yUserList && yUserList.map(item=>{
            if(item.id===record.id){
                item.adminRole = value
            }
        })
        setYUserList([...yUserList])
    }

    /**
     * 移出用户
     * @param text
     * @param record
     */
    const del = (text,record) =>{
        // yUserList（已选择） 减少
        setYUserList(yUserList.filter(item=>item.id!==record.id))
    }

    /**
     * 流水线创建或更新确定
     * @param value
     */
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
                    props.history.push(`/index/pipeline/${pipeline.id}/survey`)
                }
            })
            return
        }
        setCurrent(1)
        const userList = yUserList && yUserList.map(item=>({id:item.id,adminRole:item.adminRole}))
        setBaseInfo({
            type:type,
            name: value.name,
            power: powerType,
            userList,
        })
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

    const renderType = (
        <div className="pipeline-add-type">
            <div className="pipeline-type-title">流水线类型</div>
            <div className="pipeline-type-ul">
                <div
                    onClick={()=>setType(1)}
                    className={`${type===1?"pipeline-type-li pipeline-type-select":"pipeline-type-li"}`}
                >多任务
                </div>
                <div
                    onClick={()=>setType(2)}
                    className={`${type===2?"pipeline-type-li pipeline-type-select":"pipeline-type-li"}`}
                >多阶段
                </div>
            </div>
        </div>
    )

    // 权限
    const renderPowerType = (
        <div className="pipeline-power">
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
    )

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
                return  <Space>
                            <Profile userInfo={record}/>
                            {text}
                        </Space>
            }
        },
        {
            title:"权限",
            dataIndex:"adminRole",
            key:"adminRole",
            width:"25",
            ellipsis:true,
            render: (text,record)=>(
                <Select
                    defaultValue={record.id===userId}
                    bordered={false}
                    showarrow={"false"}
                    style={{width:120}}
                    disabled={record.id===userId}
                    onChange={value=>changePower(record,value)}
                >
                    <Select.Option value={true}>管理员角色</Select.Option>
                    <Select.Option value={false}>默认角色</Select.Option>
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
                    return  <Tooltip title="移出用户">
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
                            allUserList={allUserList}
                            yUserList={yUserList}
                            setYUserList={setYUserList}
                            pipelineStore={pipelineStore}
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

    if(set){
        return (
            <>
                <Form form={form} autoComplete="off" layout={"vertical"}>
                    <Form.Item label={"流水线名称"} name="name" rules={rules(set)}>
                        <Input allowClear style={set? {width:612}: {background:"#fff"}}/>
                    </Form.Item>
                </Form>
                { renderPowerType }
                <Btn onClick={onClick} title={"取消"} isMar={true}/>
                <PrivilegeProjectButton code={"pipeline_update"} domainId={pipeline && pipeline.id}>
                    <Btn type={"primary"}
                         title={"确定"}
                         onClick={() => {
                             form
                                 .validateFields()
                                 .then((values) => {
                                     onOk(values)
                                     form.resetFields()
                                 })
                         }}
                    />
                </PrivilegeProjectButton>
            </>
        )
    }

    return(
        <>
            <Form form={form} autoComplete="off" layout={"vertical"}>
                <Form.Item label={"流水线名称"} name="name" rules={rules(set)}>
                    <Input allowClear style={set? {width:612}: {background:"#fff"}}/>
                </Form.Item>
            </Form>
            { renderType }
            { renderPowerType }
            { powerType === 2 && renderUser() }
            <Btn
                onClick={()=>props.history.push("/index/pipeline")}
                title={"取消"}
                isMar={true}
            />
            <Btn type={"primary"}
                 title={"下一步"}
                 onClick={() => {
                     form
                         .validateFields()
                         .then((values) => {
                             onOk(values)
                             form.resetFields()
                         })
                 }}
            />
        </>
    )
}

export default observer(PipelineAddInfo)
