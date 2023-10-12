import React,{useState,useRef} from "react";
import {Col, Row, message} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import Btn from "../../../../../common/component/btn/Btn";
import PipelineDrawer from "../../../../../common/component/drawer/Drawer";
import {taskTitle, TaskTitleIcon} from "./TaskTitleIcon";
import "./TaskAdd.scss";

/**
 * 添加任务
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TaskAdd = props =>{

    const {pipeline,setTaskFormDrawer,setNewStageDrawer,newStageDrawer,createValue,taskStore,stageStore} = props

    const {createTask,setDataItem} = taskStore
    const {createStage} = stageStore

    const scrollRef = useRef();

    const [taskType,setTaskType] = useState("code")

    // task类型
    const lis=[
        {
            id:"code",
            title:"源码",
            desc:[
                {type:'git'},
                {type:'gitee'},
                {type:'github'},
                {type:'gitlab'},
                {type:'svn'},
                {type:'xcode'}
            ]
        },
        {
            id:"scan",
            title: "代码扫描",
            desc: [
                {type: 'sonar'}
            ]
        },
        {
            id:"test",
            title:"测试",
            desc:[
                {type: 'maventest'},
                {type: 'teston'}
            ]
        },
        {
            id:"build",
            title: "构建",
            desc:[
                {type: 'maven'},
                {type: 'nodejs'},
                {type: 'build_docker'},
            ]
        },
        {
            id:"artifact",
            title: "推送制品",
            desc: [
                {type:'nexus'},
                {type:'ssh'},
                {type:'xpack'}
            ]
        },
        {
            id:"deploy",
            title: "部署",
            desc:[
                {type:'liunx'},
                {type:'docker'},
            ]
        },
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
        }else {
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
                taskType:type,
                formType:'task',
                taskName:taskTitle(type),
                task:{}
            })
            setTaskFormDrawer(true)
        }
        if(data.code===50001){
            message.info(data.msg)
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

    return(
        <PipelineDrawer
            onClose={()=>setNewStageDrawer(false)}
            visible={newStageDrawer}
            width={600}
            mask={true}
            className="mf task-add"
        >
            <div className="task-add-up">
                <div className="wrapper-head-title"> 选择任务组</div>
                <Btn onClick={()=>setNewStageDrawer(false)} title={<CloseOutlined />} type="text"/>
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
                                                        <div key={index} className={`group-desc`}
                                                             onClick={()=> addTask(item)}
                                                        >
                                                            <TaskTitleIcon type={item.type}/>
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

