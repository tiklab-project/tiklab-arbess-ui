/**
 * @Description: 添加任务
 * @Author: gaomengyuan
 * @Date:
 * @LastEditors: gaomengyuan
 * @LastEditTime: 2025/3/11
 */
import React,{useState,useRef} from "react";
import {Col, Row} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import Button from "../../../../../common/component/button/Button";
import PipelineDrawer from "../../../../../common/component/drawer/Drawer";
import {taskTitle, TaskIcon} from "./TaskCommon";
import {
    git,
    gitee,
    gitlab,
    github,
    svn,
    gitpuk,
    pri_gitlab,
    sonar,
    spotbugs,
    testhubo,
    maventest,
    mvn,
    nodejs,
    build_docker,
    docker,
    k8s,
    liunx,
    script,
    upload_hadess,
    upload_ssh,
    download_hadess,
    download_ssh, build_go, sourcefare,
} from '../../../../../common/utils/Constant';
import "./TaskAdd.scss";

const TaskAdd = props =>{

    const {pipeline,setTaskFormDrawer,setNewStageDrawer,newStageDrawer,createValue,taskStore,stageStore} = props

    const {createTask,setDataItem} = taskStore
    const {createStage} = stageStore

    const scrollRef = useRef();

    const [taskType,setTaskType] = useState("code");

    // task类型
    const lis=[
        {
            id:"code",
            title:"源码",
            desc:[
                {type: git},
                {type: gitpuk},
                {type: gitee},
                {type: github},
                {type: gitlab},
                {type: svn},
                {type: pri_gitlab},
            ]
        },
        {
            id:"scan",
            title: "代码扫描",
            desc: [
                {type: sonar},
                {type: spotbugs},
                {type: sourcefare},
            ]
        },
        {
            id:"test",
            title:"测试",
            desc:[
                {type: maventest},
                {type: testhubo},
            ]
        },
        {
            id:"build",
            title: "构建",
            desc:[
                {type: mvn},
                {type: nodejs},
                {type: build_docker},
                {type: build_go},
            ]
        },
        {
            id:"deploy",
            title: "部署",
            desc:[
                {type: liunx},
                {type: docker},
                {type: k8s},
            ]
        },
        {
            id:"tool",
            title: "工具",
            desc: [
                {type: script},
                {type: upload_hadess},
                {type: upload_ssh},
                {type: download_hadess},
                {type: download_ssh},
            ]
        }
    ]

    /**
     * 添加task
     * @param item
     */
    const addTask = item =>{
        if(pipeline.type===1){
            createTask({
                taskType:item.type,
                pipelineId:pipeline.id,
                ...createValue
            }).then(res=>{
                setTaskFormValue(res,item.type)
            })
        } else {
            createStage({
                taskType:item.type,
                pipelineId:pipeline.id,
                ...createValue
            }).then(res=>{
                setTaskFormValue(res,item.type)
            })
        }
        setNewStageDrawer(false)
    }

    /**
     * 添加后初始化task基本信息
     * @param data
     * @param type
     */
    const setTaskFormValue = (data,type) =>{
        if(data.code===0){
            setDataItem({
                taskId:data.data,
                taskType: type,
                formType:'task',
                taskName: '',
                task: {}
            })
            setTaskFormDrawer(true)
        }
    }

    /**
     * 锚点跳转
     * @param anchorName
     */
    const changeAnchor = anchorName =>{
        const scrollTop= scrollRef.current
        const anchorElement = document.getElementById(anchorName)
        if (anchorElement) {
            scrollTop.scrollTop = anchorElement.offsetTop
        }
        setTaskType(anchorName)
    }

    /**
     * 滚动加载
     */
    const onScroll = () =>{
        // 获取滚动区域元素到页面顶部的偏移offsetTop
        const offsets = lis.map(item=>{
            return {
                id: item.id,
                offsetTop: document.getElementById(item.id)?.offsetTop
            }
        })
        // 获取滚动区域滚动的距离
        const scrollTop = scrollRef.current.scrollTop
        // 获取第一个符合要求的对象
        const ids = offsets.find(item=> item.offsetTop===scrollTop || item.offsetTop>scrollTop)
        if(!ids){
            return;
        }
        if(ids.id===taskType){
            return;
        }
        setTaskType(ids.id)
    }

    const taskBanList = [];
    // const taskBanList = [upload_hadess,upload_ssh,download_hadess,download_ssh];

    return (
        <PipelineDrawer
            onClose={()=>setNewStageDrawer(false)}
            visible={newStageDrawer}
            width={600}
            mask={true}
            className="task-add"
        >
            <div className="task-add-up">
                <div className="wrapper-head-title">选择任务组</div>
                <Button onClick={()=>setNewStageDrawer(false)} title={<CloseOutlined />} type="text"/>
            </div>
            <div className="task-add-bottom">
                <Row className="gui-drawer-content">
                    <Col span={4} className="gui-drawer-content-left">
                        <div className="drawerLeft">
                            {
                                lis && lis.map(item=>(
                                    <div key={item.id} className={`item ${taskType===item.id? "item-select":""}`}
                                         onClick={()=>changeAnchor(item.id)}
                                    >
                                        <div className="item-title">{item.title}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </Col>
                    <Col span={20} className="gui-drawer-content-right" >
                        <div
                            className="drawerRight"
                            ref={scrollRef}
                            onScroll={onScroll}
                        >
                            {
                                lis && lis.map((group)=>(
                                    <div className="group" key={group.id} id={group.id}>
                                        <div className="group-title">{group.title}</div>
                                        <div className="group-content">
                                            {
                                                group.desc && group.desc.map((item,index)=>{
                                                    return(
                                                        <div
                                                            key={index}
                                                            className={`group-desc ${taskBanList.includes(item.type) ? 'group-desc-ban' : ''}`}
                                                            onClick={()=>taskBanList.includes(item.type) ? undefined : addTask(item)}
                                                        >
                                                            <div className='group-desc-icon'>
                                                                <TaskIcon
                                                                    type={item.type}
                                                                    width={24}
                                                                    height={24}
                                                                />
                                                            </div>
                                                            <div className='group-desc-right'>
                                                                <div className='group-desc-title'>
                                                                    {taskTitle(item.type)}
                                                                </div>
                                                                {
                                                                    item.type===pri_gitlab &&
                                                                    <div className='group-desc-info'>API V4及以上版本</div>
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        </PipelineDrawer>
    )
}

export default inject("taskStore","stageStore")(observer(TaskAdd))

