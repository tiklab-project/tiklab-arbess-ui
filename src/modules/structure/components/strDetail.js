import React,{useState,useEffect} from "react";
import {observer} from "mobx-react";
import {
    MinusCircleOutlined,
} from "@ant-design/icons";
import BreadcrumbContent from "../../common/breadcrumb/breadcrumb";
import Loading from "../../common/loading/loading";
import StrDetailtem from "./strDetailtem";
import StrDetailTree from "./strDetailTree";
import Btn from "../../common/btn/btn";
import "./strDetail.scss";

const StrDetail = props =>{

    const {firstItem,index,pipeline,setIsDetails,structureStore,isAll} = props

    const {execData,itemData,killInstance,strDetails} = structureStore

    const [isActiveSlide,setIsActiveSlide] = useState(true)  // 日志滚动条
    const [logData,setLogData] = useState("")  // 日志数据
    const [treeData,setTreeData] = useState("") // 左侧树结构
    const [execIndex,setExecIndex] = useState(0)
    const [id,setId] = useState("")

    useEffect(()=>{
        return ()=>{
            setId("")
            setExecIndex(0)
            setIsDetails(false)
        }
    },[])

    // 完成状态数据
    useEffect(()=>{
        if(index===2 && itemData){
            const data = itemData.runLogList
            pipeline && pipeline.type===1 ? setLogData(itemData):setLogData(data[0])
            setTreeData(data[0])
        }
    },[itemData])

    // 运行状态数据
    useEffect(()=>{
        if(index===1 && execData){
            const data = execData.runLogList
            // id是否有值，有值：手动切换运行状态数据；无值：自动切换运行状态数据；
            if(id){
                setTreeData(data[execIndex])
                setLogData(manualEquals(data))
            }else{
                if(pipeline && pipeline.type===1){
                    setLogData(execData)
                    return
                }
                setLogData(autoEuqals(data))
                setTreeData(autoEuqals(data))
            }
        }
    },[execData,execIndex,id])

    // 运行日志打印（自动）
    const autoEuqals = data =>{
        let a
        if(data && data.some(item=>item.state===0)){
            data && data.map(item=>{
                if(item.state===0){
                    a = item
                }
            })
        }
        else{
            a = data[data && data.length-1]
        }
        return a
    }

    const isequal = data =>{
        for(let i=0 ; i<data.length;i++){
            if(data[i].id !== id){
                continue;
            }
            return data[i]
        }
    }

    // 运行日志打印（手动，三层嵌套）
    const manualEquals = data =>{

        let results = isequal(data)
        if(results != null){
            return results
        }

        for(let i=0 ; i<data.length;i++){
            let a = data[i].runLogList
            if(!a){
                continue
            }
            let result = isequal(a)
            if(result == null){
                continue
            }
            return result
        }

        for(let i=0 ; i<data.length;i++){
            let a = data[i].runLogList
            if(!a){
                continue
            }
            for(let i=0 ; i<a.length;i++){
                let b= a[i].runLogList
                if(!b){
                    continue
                }
                let result = isequal(b)
                if(result == null){
                    continue
                }
                return result
            }
        }
    }

    // 关闭滚动条一直在下面
    const onWheel = () =>{
        setIsActiveSlide(false)
    }

    // 控制台日志
    const renderLog = logData =>{
        const outLog=document.getElementById("outLog")
        if(index===1 && outLog && isActiveSlide){
            outLog.scrollTop = outLog.scrollHeight
        }
        return  <div className="bottom-log" id="outLog" onWheel={onWheel}>
                    {logData && logData.runLog ? logData.runLog : "暂无日志"}
                </div>
    }

    // 终止运行
    const end = () => killInstance(pipeline.id)

    // 返回列表
    const goBack = () => setIsDetails(false)

    // 数据获取钱加载状态
    if(strDetails){
        return <Loading/>
    }

    return(
        <div className="strDetail mf-home-limited mf">
            <div className="strDetail-up" style={{paddingBottom:15}}>
                <BreadcrumbContent
                    firstItem={firstItem}
                    secondItem={`${isAll ? pipeline && pipeline.name:"详情"} # ${index===2?itemData && itemData.name:execData && execData.name}`}
                    goBack={goBack}
                />
                {
                    index===1 && execData.allState!==0 &&
                    <Btn
                        title={"终止"}
                        icon={<MinusCircleOutlined/>}
                        onClick={()=>end()}
                    />
                }
            </div>
            <div className="strDetail-card">
                <StrDetailtem
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
                            <StrDetailTree
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
