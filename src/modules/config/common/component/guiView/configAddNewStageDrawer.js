import React ,{useState} from "react";
import {Button, Drawer} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import ConfigAddNewStageLeftDrawer from "./configAddNewStageLeftDrawer";
import ConfigAddNewStageRightDrawer from "./configAddNewStageRightDrawer";

const leftLis = [
    {
        id:1,
        title:"测试"
    },
    {
        id:2,
        title:"构建"
    },
    {
        id:3,
        title:"部署"
    }
]

const rightLis = [
    {
        id:1,
        title:"测试",
        desc:[
            {
                tpl: 11,
                tel:"单元测试",
            }
        ]
    },
    {
        id:2,
        title: "构建",
        desc:[
            {

                tpl: 21,
                tel:"maven"
            },
            {
                tpl: 22,
                tel:"node"
            }
        ]
    },
    {
        id:3,
        title: "部署",
        desc:[
            {
                tpl:31 ,
                tel:"linux"
            },
            {
                tpl:32 ,
                tel:"docker"
            },
        ]
    }
]

const ConfigAddNewStageDrawer = props =>{

    const {setNewStageDrawer,newStageDrawer,setTaskFormDrawer,setNewStage,data,setData,setIsPrompt,index} = props
    const [opt,setOpt] = useState(1)

    const changeAnchor = anchorName =>{
        const scrollTop=document.getElementById("tpl-list-task")
        if (anchorName) {
            const anchorElement = document.getElementById(anchorName)
            if (anchorElement) {
                scrollTop.scrollTop = anchorElement.offsetTop-130
                setOpt(anchorName)
            }
        }
    }

    const onScroll = () =>{
        const scrollTop=document.getElementById("tpl-list-task").scrollTop
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
            visible={newStageDrawer}
            width={600}
        >
            <div className="wrapper">
                <div className="wrapper-head">
                    <div className="wrapper-head-title"> 选择任务组</div>
                    <div>
                        <Button type="text" onClick={()=>setNewStageDrawer(false)}>
                            <CloseOutlined />
                        </Button>
                    </div>
                </div>
                <div className="wrapper-body">
                    <div className="body">
                        <div className="body-menu">
                            <ConfigAddNewStageLeftDrawer
                                leftLis={leftLis}
                                opt={opt}
                                changeAnchor={changeAnchor}
                            />
                            <ConfigAddNewStageRightDrawer
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
        </Drawer>
    )
}

export default ConfigAddNewStageDrawer