import React,{useState} from "react";
import {Button,Drawer} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import NewStageAddDrawerLeft from "./newStageAddDrawerLeft";
import NewStageAddDrawerRight from "./newStageAddDrawerRight";

const leftLis = [
    {
        id:1,
        title:"测试",
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
                type: 11,
                tel:"单元测试",
                icon:"ceshi"
            }
        ]
    },
    {
        id:2,
        title: "构建",
        desc:[
            {

                type: 21,
                tel:"maven",
                icon:"quanxian"
            },
            {
                type: 22,
                tel:"node",
                icon:"nodejs"
            }
        ]
    },
    {
        id:3,
        title: "部署",
        desc:[
            {
                type:31 ,
                tel:"虚拟机"
            },
            {
                type:32 ,
                tel:"docker"
            },
        ]
    }
]

const NewStageAddDrawer = props =>{

    const {setNewStageDrawer,newStageDrawer,setTaskFormDrawer,setNewStage,index} = props

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
            const lastId = document.getElementById(x).previousSibling //上一个id
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
            contentWrapperStyle={{width:600,marginTop:55}}
            bodyStyle={{padding:0}}
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
                            <NewStageAddDrawerLeft
                                leftLis={leftLis}
                                opt={opt}
                                changeAnchor={changeAnchor}
                            />
                            <NewStageAddDrawerRight
                                rightLis={rightLis}
                                onScroll={onScroll}
                                setNewStageDrawer={setNewStageDrawer}
                                setTaskFormDrawer={setTaskFormDrawer}
                                setNewStage={setNewStage}
                                index={index}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    )
}

export default NewStageAddDrawer