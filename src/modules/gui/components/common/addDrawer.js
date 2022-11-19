import React,{useState} from "react";
import {Drawer} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import AddDrawerLeft from "./addDrawerLeft";
import AddDrawerRight from "./addDrawerRight";
import "./addDrawer.scss";
import Btn from "../../../common/btn/btn";

const lis=[
    {
        id:1,
        title:"源码",
        icon:"suyuanmabiaoqian",
        desc:[
            {
                type:1,
                tel:"通用Git",
                icon:"git"
            },
            {
                type:2,
                tel:"Gitee",
                icon:"gitee"
            },
            {
                type:3,
                tel: "Github",
                icon:"github"
            },
            {
                type:4,
                tel: "Gitlab",
                icon:"gitlab"
            },
            {
                type: 5,
                tel:"svn",
                icon:"-_ssh"
            }
        ]
    },
    {
        id:5,
        title: "代码扫描",
        desc: [
            {
                type: 41,
                tel:"sonarQuebe",
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
                tel:"maven单元测试",
                icon:"ceshi"
            },
            {
                type: 12,
                tel: "junit",
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
                tel:"maven",
                icon:"quanxian"
            },
            {
                type: 22,
                tel:"node",
                icon:"nodejs"
            },
            {
                type: 23,
                tel:"gradel",
                icon:"nodejs"
            }
        ]
    },
    {
        id:6,
        title: "推送制品",
        desc: [
            {
                type:51,
                tel:"nexus",
                icon: "quanxian"
            },
            {
                type:52,
                tel:"SSH",
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
                tel:"虚拟机",
                icon:"xuniji"
            },
            {
                type:32 ,
                tel:"docker",
                icon:"docker"
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
            maskStyle={{background:"transparent"}}
            contentWrapperStyle={{width:600,top:48,height:"calc(100% - 48px)"}}
            bodyStyle={{padding:0}}
        >
            <div className="wrapper">
                <div className="wrapper-head">
                    <div className="wrapper-head-title"> 选择任务组</div>
                    <Btn
                        onClick={()=>setNewStageDrawer(false)}
                        title={<CloseOutlined />}
                        type="text"
                    />
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