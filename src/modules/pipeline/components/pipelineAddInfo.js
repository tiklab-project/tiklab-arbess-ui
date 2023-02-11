import React, {useEffect,useState} from "react";
import {Form,Input} from "antd";
import {LockOutlined,UnlockOutlined} from "@ant-design/icons";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import Btn from "../../common/btn/btn";
import PipelineUser from "./pipelineUser";
import Loading from "../../common/loading/loading";
import "./pipelineAddInfo.scss";

const PipelineAddInfo = props =>{

    const {set,pipelineStore,setCurrent,setAddPipelineVisible,
        templateLis,templateType,pipelineType,onClick
    } = props

    const {pipeline,pipelineId,pipelineList,findUserPage,createPipeline,isLoading,updatePipeline} = pipelineStore

    const [form] = Form.useForm()

    const [powerType,setPowerType] = useState(1) // 流水线权限 -- 私有或公有
    const [yUserList,setYUserList] = useState([])
    const [nUserList,setNUserList] = useState([])
    const [member,setMember] = useState([])  // 流水线成员

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
                id:pipelineId,
                name:value.name===""?pipeline.name:value.name,
                power:powerType
            }
            updatePipeline(params).then(res => {
                if (res.code === 0) {
                    value.name!=="" && (pipeline.name = value.name)
                    props.history.push(`/index/task/${pipelineId}/survey`)
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
                                    <div className="power-title power-icon">
                                        {item.icon}
                                    </div>
                                    <div className="power-title power-name">
                                        {item.title}
                                    </div>
                                </div>
                                {
                                    powerType===item.id &&
                                    <div className="power-select-show"/>
                                }
                            </div>
                            <div className="power-desc">
                                {item.desc}
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    }

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
            <Form
                form={form}
                autoComplete="off"
                layout={"vertical"}
            >
                <Form.Item
                    label={"流水线名称"}
                    name="name"
                    rules={rules(set)}
                >
                    <Input
                        allowClear
                        bordered={set}
                        style={set? {width:612}: {background:"#fff"}}
                    />
                </Form.Item>
            </Form>

            { renderPowerType(powerLis)}

            {
                !set && powerType === 2 &&
                <PipelineUser
                    yUserList={yUserList}
                    setYUserList={setYUserList}
                    nUserList={nUserList}
                    setNUserList={setNUserList}
                    userId={userId}
                    member={member}
                    setMember={setMember}
                />
            }

            {
                set ?
                <>
                    <Btn
                        onClick={onClick}
                        title={"取消"}
                        isMar={true}
                    />
                    <Btn
                        type={"primary"}
                        onClick={() => {
                            form
                                .validateFields()
                                .then((values) => {
                                    onOk(values)
                                    form.resetFields()

                                })
                        }}
                        title={"确认"}
                    />
                </>
                :
                <>
                    <Btn
                        onClick={()=>setAddPipelineVisible(false)}
                        title={"取消"}
                        isMar={true}
                    />
                    <Btn
                        onClick={()=>setCurrent(1)}
                        title={"上一步"}
                        isMar={true}
                    />
                    <Btn
                        type={"primary"}
                        onClick={() => {
                            form
                                .validateFields()
                                .then((values) => {
                                    onOk(values)
                                    form.resetFields()

                                })
                        }}
                        title={"确认"}
                    />
                </>
            }

            {
                isLoading && <Loading/>
            }
        </>
    )
}

export default inject("pipelineStore")(observer(PipelineAddInfo))
