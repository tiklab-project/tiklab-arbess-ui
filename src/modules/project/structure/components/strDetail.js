import React,{useState,useEffect} from "react";
import {Drawer} from "antd";
import ModalTitle from "../../../common/modalTitle/modalTitle";
import StrItem from "./strItem";
import StrTree from "./strTree";

const StrDetail = props =>{

    const {execData,detailsDrawer,setDetailsDrawer,detailsContent,itemData,status,index,pipeline} = props

    const [execIndex,setExecIndex] = useState(0)
    const [logData,setLogData] = useState("")
    const [treeData,setTreeData] = useState("")

    useEffect(()=>{
        if(detailsDrawer && index===0){
            setExecIndex(0)
        }
    },[detailsDrawer])

    useEffect(()=>{
        if(detailsDrawer){
            switch (index) {
                case 1:
                    if(itemData){
                        setLogData(itemData[0])
                        setTreeData(itemData[0])
                    }
                    break
                default:
                    if(execData){
                        setLogData(execData[execIndex])
                        setTreeData(execData[execIndex])
                    }
            }
        }
    },[detailsDrawer,itemData,execData])

    return(
        <Drawer
            placement="right"
            visible={detailsDrawer}
            onClose={()=>setDetailsDrawer(false)}
            closable={false}
            maskStyle={{background:"transparent"}}
            contentWrapperStyle={{width:"calc(100% - 400px)",top:48,height:"calc(100% - 48px)"}}
            bodyStyle={{padding:0}}
            className="mf"
        >
            <div className="strDetailDrawer">
                <div className="strDetailDrawer-up">
                    <ModalTitle
                        setVisible={setDetailsDrawer }
                        title={`# ${detailsContent.findNumber}`}
                    />
                </div>
                <div className="strDetailDrawer-card">
                    <StrItem
                        status={status}
                        index={index}
                        itemData={index===0?execData:itemData}
                        setTreeData={setTreeData}
                        setLogData={setLogData}
                        setExecIndex={setExecIndex}
                    />
                </div>
                <div className="strDetailDrawer-log">
                    <div className="bottom-up">控制台</div>
                    <div className="bottom-content">
                        {
                            pipeline && pipeline.type===2 &&
                            <div className="bottom-tree">
                                <StrTree
                                    treeData={treeData}
                                    logData={logData}
                                    setLogData={setLogData}
                                    setExecIndex={setExecIndex}
                                />
                            </div>
                        }
                        <div className="bottom-log">
                            {
                                logData && logData.runLog ? logData.runLog : "暂无日志"
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    )
}

export default StrDetail