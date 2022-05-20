import React ,{useState} from "react";
import {Drawer} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import Config_newStage_drawer_left from './config_newStage_drawer_left'
import Config_newStage_drawer_right from "./config_newStage_drawer_right";

const leftLis = [
    {
        id:1,
        title:'测试'
    },
    {
        id:2,
        title:'构建'
    },
    {
        id:3,
        title:'部署'
    }
]

const rightLis = [
    {
        id:1,
        title:'测试',
        desc:[
            {
                tpl:'单元测试'
            }
        ]
    },
    {
        id:2,
        title: '构建',
        desc:[
            {
                tpl: 'maven',
            },
            {
                tpl: 'node',
            }
        ]
    },
    {
        id:3,
        title: '部署',
        desc:[
            {
                tpl:'linux'
            },
            {
                tpl:'docker'
            },
        ]
    }
]

const Config_newStage_drawer = props =>{

    const {setNewStageDrawer,formDetailsDrawer,setTaskFormDrawer,setNewStage,
        data,setData,setIsPrompt,index
    } = props

    const [opt,setOpt] = useState(1)

    const changeAnchor = anchorName =>{
        const scrollTop=document.getElementById('tpl-list-task')
        if (anchorName) {
            const anchorElement = document.getElementById(anchorName)
            if (anchorElement) {
                scrollTop.scrollTop = anchorElement.offsetTop-130
                setOpt(anchorName)
            }
        }
    }

    const onScroll = () =>{
        const scrollTop=document.getElementById('tpl-list-task').scrollTop
        const rightIndex = rightLis.map((item,index)=>index+1)
        for(let x = 1;x <= rightIndex.length;x++){
            const iId = document.getElementById(x) //当前id
            const lastId = document.getElementById(x-1) //上一个id
            const iTop =iId &&  iId.offsetTop
            const lastTop =lastId && lastId.offsetTop
            if(scrollTop > lastTop && scrollTop < iTop ){
                setOpt(x)
            }
        }
    }

    return(
        <Drawer
            closable={false}
            placement="right"
            onClose={()=>setNewStageDrawer(false)}
            visible={formDetailsDrawer}
            width={600}
        >
            <nav className="bm-item-list" style={{height:'100%'}}>
                <div className="menu-wrapper">
                    <div className="menu-wrapper-head">
                        <div className="menu-wrapper-head-title"> 选择任务组</div>
                        <div onClick={()=>setNewStageDrawer(false)}><CloseOutlined /></div>
                    </div>
                    <div className="menu-wrapper-body" id="pipeline-menu-wrapper-body" style={{padding:0}}>
                        <div className="body">
                            <div className="body-menu">
                                <Config_newStage_drawer_left
                                    leftLis={leftLis}
                                    opt={opt}
                                    changeAnchor={changeAnchor}
                                />
                                <Config_newStage_drawer_right
                                    rightLis={rightLis}
                                    onScroll={onScroll}
                                    setNewStageDrawer={setNewStageDrawer}
                                    setTaskFormDrawer={setTaskFormDrawer}
                                    setNewStage={setNewStage}
                                    data={data}
                                    setData={setData}
                                    setIsPrompt={setIsPrompt}
                                    index={index}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </Drawer>
    )
}

export default Config_newStage_drawer