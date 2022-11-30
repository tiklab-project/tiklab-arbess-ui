import React, {useEffect,useState} from "react";
import {Form,Input} from "antd";
import {LockOutlined,UnlockOutlined} from "@ant-design/icons";
import {withRouter} from "react-router";
import "./pipelineAddInfo.scss";
import PipelineUser from "./pipelineUser";
import {inject,observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import Btn from "../../common/btn/btn";

const PipelineAddInfo = props =>{

    const {set,powerType,setPowerType,pipelineStore, current,setCurrent,setAddPipelineVisible,
        templateLis,templateType,onClick
    } = props

    const {pipeline,pipelineId,pipelineList,findUserPage,createPipeline,updatePipeline} = pipelineStore

    const [form] = Form.useForm()

    const [yUserList,setYUserList] = useState([])
    const [nUserList,setNUserList] = useState([])
    const [member,setMember] = useState([])  // 流水线成员

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

    useEffect(()=>{
        const newArr = []
        yUserList && yUserList.map(item=>{
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
                pipelineId:pipelineId,
                pipelineName:value.pipelineName===""?pipeline.pipelineName:value.pipelineName,
                pipelinePower:powerType
            }
            updatePipeline(params).then(res => {
                if (res.code === 0) {
                    value.pipelineName!=="" && (pipeline.pipelineName = value.pipelineName)
                    props.history.push(`/index/task/${pipelineId}/survey`)
                }
            })
        }else {
            const params = {
                pipelineType: templateType===0 ? 1:templateLis[templateType-1].type,
                pipelineName: value.pipelineName,
                pipelinePower: powerType,
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
                {
                    pattern: /^[\s\u4e00-\u9fa5a-zA-Z0-9_-]{0,}$/,
                    message: "流水线名称不能包含非法字符，如&,%，&，#……等",
                },
                ({ getFieldValue }) => ({
                    validator(rule, value) {
                        let nameArray = []
                        if(pipelineList){
                            const name = pipelineList && pipelineList.map(item=>item.pipelineName)
                            nameArray = name.filter(item=>item!==pipeline.pipelineName)
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
                {required:true,message:""},
                {
                    pattern: /^[\s\u4e00-\u9fa5a-zA-Z0-9_-]{0,}$/,
                    message: "流水线名称不能包含非法字符，如&,%，&，#……等",
                },
                ({ getFieldValue }) => ({
                    validator(rule,value) {
                        if(!value || value.trim() === ""){
                            return Promise.reject("名称不能为空");
                        }
                        let nameArray = []
                        if(pipelineList){
                            nameArray = pipelineList && pipelineList.map(item=>item.pipelineName)
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
                initialValues={{pipelineName:pipeline && pipeline.pipelineName}}
            >
                <Form.Item
                    label={"流水线名称"}
                    name="pipelineName"
                    rules={rules(set)}
                >
                    <Input
                        allowClear
                        style={set? {width:612}: {background:"#fff"}}
                        bordered={set}
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
                current === 1 &&
                <>
                    <Btn
                        onClick={()=>setAddPipelineVisible(false)}
                        title={"取消"}
                        isMar={true}
                    />
                    <Btn
                        onClick={()=>setCurrent(current - 1)}
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
        </>
    )
}

export default withRouter(inject("pipelineStore")(observer(PipelineAddInfo)))