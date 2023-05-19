import React,{useState} from "react";
import {Col, Drawer, Row, message} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import Btn from "../../../../../common/btn/Btn";
import TaskTitleIcon from "./TaskTitleIcon";
import {taskTitle} from "./TaskTitle";
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

    const [taskType,setTaskType] = useState(1)

    // task类型
    const lis=[
        {
            id:1,
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
            id:5,
            title: "代码扫描",
            desc: [
                {type: 'sonar'}
            ]
        },
        {
            id:2,
            title:"测试",
            desc:[
                {type: 'maventest'},
                {type: 'teston'}
            ]
        },
        {
            id:3,
            title: "构建",
            desc:[
                {type: 'maven'},
                {type: 'nodejs'},
            ]
        },
        {
            id:6,
            title: "推送制品",
            desc: [
                {type:'nexus'},
                {type:'ssh'},
                {type:'xpack'}
            ]
        },
        {
            id:4,
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
                taskType:type,
                taskId:data.data,
                taskName:taskTitle(type),
                task:{}
            })
            setTaskFormDrawer(true)
        }
        if(data.code===50001){
            message.info(data.msg,0.7)
        }
    }


    /**
     * 锚点跳转
     * @param anchorName
     */
    const changeAnchor = anchorName =>{
        const scrollTop=document.getElementById("tpl-task")
        if (anchorName) {
            const anchorElement = document.getElementById(anchorName)
            if (anchorElement) {
                scrollTop.scrollTop = anchorElement.offsetTop
                setTaskType(anchorName)
            }
        }
    }

    /**
     * 滚动加载
     */
    const onScroll = () =>{
        const scrollTop=document.getElementById("tpl-task").scrollTop
        const rightIndex = lis.map((item,index)=>index+1)
        for(let x = 1;x <= rightIndex.length;x++){
            const iId = document.getElementById(x) //当前id
            const lastId = document.getElementById(x).previousSibling //上一个id
            const iTop =iId &&  iId.offsetTop
            const lastTop =lastId && lastId.offsetTop
            if(scrollTop > lastTop && scrollTop < iTop ){
                setTaskType(x)
            }
        }
    }

    const renderLeftLis = item =>{
        return  <div key={item.id} className={`item ${taskType===item.id? "item-select":""}`}
                     onClick={()=>changeAnchor(item.id)}
                >
                    <div className="item-title">{item.title}</div>
                </div>
    }

    const renderRightLis = group =>{
        return  <div className="group" key={group.id} id={group.id}>
            <div className="group-title">{group.title}</div>
            <div className="group-content">
                {
                    group.desc && group.desc.map((item,index)=>{
                        return(
                            <div key={index} className={`group-desc ${item.type==='docker'?"group-desc-ban":""}`}
                                 onClick={()=>item.type!=='docker'&&addTask(item)}
                            >
                                <TaskTitleIcon type={item.type}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    }

    return(
        <Drawer
            closable={false}
            placement="right"
            onClose={()=>setNewStageDrawer(false)}
            visible={newStageDrawer}
            width={600}
            contentWrapperStyle={{top:48,height:"calc(100% - 48px)"}}
            bodyStyle={{padding:0}}
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
                                lis && lis.map(item=>renderLeftLis(item))
                            }
                        </div>
                    </Col>
                    <Col span={20} className="gui-drawer-content-right" >
                        <div className="drawerRight" id="tpl-task" onScroll={onScroll}>
                            {
                                lis && lis.map((group)=>renderRightLis(group))
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        </Drawer>
    )
}

export default inject("taskStore","stageStore")(observer(TaskAdd))

