import React,{useState} from "react";
import {Col, Drawer, Row} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {inject,observer} from "mobx-react";
import Btn from "../../../../common/btn/Btn";
import TaskTitleIcon from "./TaskTitleIcon";
import "./TaskAdd.scss";

const lis=[
    {
        id:1,
        title:"源码",
        icon:"suyuanmabiaoqian",
        desc:[
            {type:1},
            {type:2},
            {type:3},
            {type:4},
            {type:5}
        ]
    },
    {
        id:5,
        title: "代码扫描",
        desc: [
            {type: 41}
        ]
    },
    {
        id:2,
        title:"测试",
        desc:[
            {type: 11},
        ]
    },
    {
        id:3,
        title: "构建",
        desc:[
            {type: 21},
            {type: 22},
        ]
    },
    {
        id:6,
        title: "推送制品",
        desc: [
            {type:51},
            {type:52},
        ]
    },
    {
        id:4,
        title: "部署",
        desc:[
            {type:31},
            {type:32},
        ]
    },
]

const TaskAdd = props =>{

    const {setNewStageDrawer,newStageDrawer,configStore} = props

    const {createTaskConfig} = configStore

    const [type,setType] = useState(1)

    /**
     * 添加task
     * @param item
     */
    const addTask = item =>{
        createTaskConfig({taskType:item.type})
        setNewStageDrawer(false)
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
                setType(anchorName)
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
                setType(x)
            }
        }
    }

    const renderLeftLis = item =>{
        return  <div key={item.id} className={`item ${type===item.id? "item-select":""}`}
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
                            <div key={index} className={`group-desc ${item.type===32?"group-desc-ban":""}`}
                                 onClick={()=>item.type!==32&&addTask(item)}
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
        >
            <div className="wrapper">
                <div className="wrapper-head">
                    <div className="wrapper-head-title"> 选择任务组</div>
                    <Btn onClick={()=>setNewStageDrawer(false)} title={<CloseOutlined />} type="text"/>
                </div>
                <div className="wrapper-body">
                    <Row className="gui-drawer-content">
                        <Col span={4} className="gui-drawer-content-left">
                            <div className="drawerLeft">
                                {
                                    lis && lis.map(item=>renderLeftLis(item))
                                }
                            </div>
                        </Col>
                        <Col span={20} className="gui-drawer-content-right">
                            <div className="drawerRight" id="tpl-task" onScroll={onScroll}>
                                {
                                    lis && lis.map((group)=>renderRightLis(group))
                                }
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </Drawer>
    )
}

export default inject("configStore")(observer(TaskAdd))

