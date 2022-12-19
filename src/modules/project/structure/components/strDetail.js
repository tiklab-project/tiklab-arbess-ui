import React,{useState,useEffect} from "react";
import {observer} from "mobx-react";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    LoadingOutlined,
    PlayCircleOutlined,
    MinusCircleOutlined,
} from "@ant-design/icons";
import {Spin} from "antd";
import BreadcrumbContent from "../../../common/breadcrumb/breadcrumb";
import StrItem from "./strItem";
import StrTree from "./strTree";
import Btn from "../../../common/btn/btn";
import "./strDetail.scss";

const StrDetail = props =>{

    const {firstItem,detailsContent,index,pipeline,setIsDetails,structureStore} = props

    const {execData,itemData,killInstance} = structureStore

    const status = i =>{
        switch(i){
            case 1 :
                //失败
                return  <CloseCircleOutlined style = {{fontSize:16,color:"red"}}/>
            case 10 :
                //成功
                return  <CheckCircleOutlined style = {{fontSize:16,color:"#0063FF"}}/>
            case 20:
                //被迫停止
                return  <ExclamationCircleOutlined style = {{fontSize:16}}/>

            case 0:
                //运行
                return  <Spin indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />} />

            case 3:
                //运行--等待运行
                return  <PlayCircleOutlined style = {{fontSize:16}}/>
        }
    }

    const [isActiveSlide,setIsActiveSlide] = useState(true)  // 日志滚动条
    const [logData,setLogData] = useState("")
    const [treeData,setTreeData] = useState("")
    const [execIndex,setExecIndex] = useState(0)  
    const [id,setId] = useState("")

    useEffect(()=>{
        if(index===2 && itemData){
            const data = itemData.runLogList
            pipeline && pipeline.type===1 ? setLogData(itemData):setLogData(data[0])
            setTreeData(data[0])
        }
    },[itemData])

    useEffect(()=>{
        if(index===1 && execData){
            const data = execData.runLogList
            setTreeData(data[execIndex])
            id ? setLogData(isequals(data)) :
                (pipeline && pipeline.type===1 ? setLogData(execData) : setLogData(data[0]) )
        }
    },[execData,execIndex,id])

    const isequal = data =>{
        for(let i=0 ; i<data.length;i++){
            if(data[i].id !== id){
                continue;
            }
            return data[i]
        }
    }

    const isequals = data =>{

        let results = isequal(data)
        if(results != null){
            return results;
        }

        for(let i=0 ; i<data.length;i++){
            let a = data[i].runLogList;
            if(!a){
                continue;
            }
            let result = isequal(a)
            if(result == null){
                continue;
            }
            return result;
        }

        for(let i=0 ; i<data.length;i++){
            let a = data[i].runLogList
            if(!a){
                continue;
            }
            for(let i=0 ; i<a.length;i++){
                let b= a[i].runLogList
                if(!b){
                    continue;
                }
                let result = isequal(b)
                if(result == null){
                    continue;
                }
                return result;
            }
        }
    }

    // 关闭滚动条一直在下面
    const onWheel = () =>{
        setIsActiveSlide(false)
    }

    const renderLog = logData =>{
        const outLog=document.getElementById("outLog")
        if(index===1 && outLog && isActiveSlide){
            outLog.scrollTop = outLog.scrollHeight
        }
        return  <div className="bottom-log" id="outLog" onWheel={onWheel}> 
                    {logData && logData.runLog ? logData.runLog : "暂无日志"}
                </div>
    }

    const end = () => {
        killInstance(pipeline.id)
    }

    const goBack = () => setIsDetails(false)

    return(
        <div className="strDetail mf-home-limited mf">
            <div className="strDetail-up" style={{paddingBottom:15}}>
                <BreadcrumbContent
                    firstItem={firstItem}
                    secondItem={`详情 #${detailsContent.findNumber}`}
                    goBack={goBack}
                />
                {
                    index===1 && 
                    <Btn
                        title={"终止"}
                        icon={<MinusCircleOutlined/>}
                        onClick={()=>end()}
                    />
                }
            </div>
            <div className="strDetail-card">
                <StrItem
                    status={status}
                    index={index}
                    itemData={index===2 ? itemData && itemData.runLogList:execData && execData.runLogList}
                    setTreeData={setTreeData}
                    setLogData={setLogData}
                    setExecIndex={setExecIndex}
                    setId={setId}
                />
            </div>
            <div className="strDetail-log">
                <div className="bottom-up">控制台</div>
                <div className="bottom-content">
                    {
                        pipeline && pipeline.type===2 &&
                        <div className="bottom-tree">
                            <StrTree
                                index={index}
                                treeData={treeData}
                                logData={logData}
                                setLogData={setLogData}
                                setExecIndex={setExecIndex}
                                setId={setId}
                            />
                        </div>
                    }
                    { renderLog(logData) }
                </div>
            </div>
        </div>
    )
}

export default observer(StrDetail)