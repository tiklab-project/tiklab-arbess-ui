import React,{useState} from "react";
import {Button,Drawer} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import AddDrawerLeft from "./addDrawerLeft";
import AddDrawerRight from "./addDrawerRight";
import "./addDrawer.scss";

const lis=[
    {
        id:1,
        title:"源码",
        icon:"suyuanmabiaoqian",
        desc:[
            {
                type:1,
                title:"通用Git",
                icon:"git"
            },
            {
                type:2,
                title:"Gitee",
                icon:"gitee"
            },
            {
                type:3,
                title: "Github",
                icon:"github"
            },
            {
                type:4,
                title: "Gitlab",
                icon:"gitlab"
            },
            {
                type: 5,
                title:"svn",
                icon:"-_ssh"
            }
        ]
    },
    {
        id:5,
        title: "代码扫描",
        desc: [
            {
                type: 51,
                title:"sonarQuebe",
                icon:"ceshi"
            }
        ]
    },
    {
        id:2,
        title:"测试",
        desc:[
            {
                type: 11,
                title:"单元测试",
                icon:"ceshi"
            },
            {
                type: 12,
                title: "junit",
                icon:"ceshi"
            }
        ]
    },
    {
        id:3,
        title: "构建",
        desc:[
            {

                type: 21,
                title:"maven",
                icon:"quanxian"
            },
            {
                type: 22,
                title:"node",
                icon:"nodejs"
            },
            {
                type: 23,
                title:"gradel",
                icon:"nodejs"
            }
        ]
    },
    {
        id:6,
        title: "推送制品",
        desc: [
            {
                type:61,
                title:"jfrog",
                icon: "quanxian"
            },
            {
                type:62,
                title:"nexus",
                icon: "quanxian"
            },
            {
                type:63,
                title:"habor",
                icon: "quanxian"
            },
        ]
    },
    {
        id:4,
        title: "部署",
        desc:[
            {
                type:31 ,
                title:"虚拟机",
                icon:"xuniji"
            },
            {
                type:32 ,
                title:"docker",
                icon:"docker"
            },
        ]
    },
    {
        id:7,
        title: "消息通知",
        desc:[
            {
                type:71,
                title:"站内信",
                icon:"xuniji"
            },
            {
                type:72,
                title:"钉钉",
                icon:"xuniji"
            },
            {
                type:73,
                title:"企业微信",
                icon:"xuniji"
            },
        ]
    },
]

const AddDrawer = props =>{

    const {setNewStageDrawer,newStageDrawer,index} = props

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
        const rightIndex = lis.map((item,index)=>index+1)
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
            style={{marginTop:50}}
            contentWrapperStyle={{width:600}}
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
                            <AddDrawerLeft
                                lis={lis}
                                opt={opt}
                                onClick={changeAnchor}
                            />
                            <AddDrawerRight
                                lis={lis}
                                onScroll={onScroll}
                                setNewStageDrawer={setNewStageDrawer}
                                index={index}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    )
}

export default AddDrawer