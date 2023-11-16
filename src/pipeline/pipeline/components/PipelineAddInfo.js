import React, {useEffect,useState} from "react";
import {Form, Input, Select, Space, Table, Tooltip,Dropdown} from "antd";
import {DeleteOutlined, LockOutlined, PlusOutlined, UnlockOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import {PrivilegeProjectButton} from "tiklab-privilege-ui";
import Profile from "../../../common/component/profile/Profile";
import Btn from "../../../common/component/btn/Btn";
import ListEmpty from "../../../common/component/list/ListEmpty";
import PipelineUserAdd from "./PipelineUserAdd";
import "./PipelineAddInfo.scss";

/**
 * 流水线信息，添加 | 更改
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const PipelineAddInfo = props =>{

    const {set,pipelineStore,setCurrent,onClick,baseInfo,setBaseInfo,setIsLoading} = props

    const {findUserPipeline,updatePipeline,pipeline,pipelineList} = pipelineStore

    const [form] = Form.useForm()
    const user = getUser()

    // 添加用户下拉显示
    const [visible,setVisible] = useState(false)

    // 流水线类型 -- 1多任务或2或阶段
    const [type,setType] = useState(baseInfo?.type || 1)

    // 流水线权限 -- 1私有或2公有
    const [powerType,setPowerType] = useState(1)

    // 流水线私有添加用户
    const [yUserList,setYUserList] = useState(baseInfo?.userList || [])

    useEffect(()=>{
        if(set){
            // 初始化权限
            setPowerType(pipeline.power)
        }
        else {
            // 初始化权限
            setPowerType(baseInfo?.power || 1)
            // 获取所有流水线
            findUserPipeline().then()
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
     * @param record
     */
    const del = record =>{
        // yUserList（已选择） 减少
        setYUserList(yUserList.filter(item=>item.id!==record.id))
    }

    /**
     * 流水线创建或更新确定
     */
    const onOk = () => {
        form.validateFields().then(value=>{
            if(set){
                const params={
                    id: pipeline.id,
                    name: value.name===""? pipeline.name:value.name,
                    power: powerType
                }
                setIsLoading(true)
                updatePipeline(params).then(res => {
                    if (res.code === 0) {
                        value.name!=="" && (pipeline.name = value.name)
                        setIsLoading(false)
                        props.history.push(`/index/pipeline/${pipeline.id}/survey`)
                    }
                })
                return
            }
            setCurrent(1)
            setBaseInfo({
                type: type,
                name: value.name,
                power: powerType,
                userList: yUserList,
            })
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
            render: text => text || '--'
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
                            {text || '--'}
                        </Space>
            }
        },
        {
            title:"权限",
            dataIndex:"adminRole",
            key:"adminRole",
            width:"25",
            ellipsis:true,
            render: (_,record)=>(
                <Select
                    bordered={false}
                    showarrow={"false"}
                    style={{width:120}}
                    defaultValue={record.adminRole}
                    disabled={record.id===user.userId}
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
            render: (_,record) => {
                if (record.id !== user.userId) {
                    return  <Tooltip title="移出用户">
                                <DeleteOutlined onClick={()=>del(record)}/>
                            </Tooltip>
                }
                return  <span className="user-table-ban">
                             <DeleteOutlined />
                        </span>
            }
        },
    ]

    // 用户
    const renderUser = () => {
        return (
            <div className="pipeline-user">
                <div className="pipeline-user-title">
                    <div>流水线成员</div>
                    <Dropdown
                        overlay={
                            <PipelineUserAdd
                                setVisible={setVisible}
                                yUserList={yUserList}
                                setYUserList={setYUserList}
                                pipelineStore={pipelineStore}
                            />
                        }
                        visible={visible}
                        onVisibleChange={visible=>setVisible(visible)}
                        trigger={['click']}
                        placement={'bottomRight'}
                        overlayStyle={{width:240}}
                    >
                        <Btn
                            type={"link-nopadding"}
                            icon={<PlusOutlined/>}
                            title={"添加成员"}
                        />
                    </Dropdown>
                </div>
                <div className="pipeline-user-table">
                    <Table
                        rowKey={(record) => record.id}
                        columns={columns}
                        dataSource={yUserList}
                        pagination={false}
                        showHeader={false}
                        locale={{emptyText: <ListEmpty/>}}
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
                {
                    pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_-]{0,30}$/,
                    message: "流水线名称最长30位且不能包含非法字符，如&,%，&，#……等",
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
                {
                    pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_-]{0,30}$/,
                    message: "流水线名称最长30位且不能包含非法字符，如&,%，&，#……等",
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
                <Form form={form} autoComplete="off" layout={"vertical"} initialValues={{name:pipeline?.name}}>
                    <Form.Item label={"流水线名称"} name="name" rules={rules(set)}>
                        <Input allowClear style={{width:612}}/>
                    </Form.Item>
                </Form>
                { renderPowerType }
                <Btn onClick={onClick} title={"取消"} isMar={true}/>
                <PrivilegeProjectButton code={"pipeline_update"} domainId={pipeline && pipeline.id}>
                    <Btn type={"primary"}
                         title={"确定"}
                         onClick={onOk}
                    />
                </PrivilegeProjectButton>
            </>
        )
    }

    return(
        <>
            <Form form={form} autoComplete="off" layout={"vertical"} initialValues={{name:baseInfo?.name}}>
                <Form.Item label={"流水线名称"} name="name" rules={rules(set)}>
                    <Input allowClear style={{background:"#fff"}}/>
                </Form.Item>
            </Form>
            <div className="pipeline-add-type">
                <div className="pipeline-type-title">流水线类型</div>
                <div className="pipeline-type-ul">
                    <div onClick={()=>setType(1)}
                         className={`${type===1?"pipeline-type-li pipeline-type-select":"pipeline-type-li"}`}
                    >多任务</div>
                    <div onClick={()=>setType(2)}
                         className={`${type===2?"pipeline-type-li pipeline-type-select":"pipeline-type-li"}`}
                    >多阶段</div>
                </div>
            </div>
            { renderPowerType }
            { powerType === 2 && renderUser() }
            <Btn onClick={()=>props.history.push("/index/pipeline")}
                 title={"取消"}
                 isMar={true}
            />
            <Btn type={"primary"}
                 title={"下一步"}
                 onClick={onOk}
            />
        </>
    )
}

export default observer(PipelineAddInfo)
