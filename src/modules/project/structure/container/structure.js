import React,{useEffect,useState} from "react";
import {Spin} from "antd";
import {
    LoadingOutlined,
    ExclamationCircleOutlined,
    CloseCircleOutlined,
    CheckCircleOutlined,
    MinusCircleOutlined,
    PlayCircleOutlined
} from "@ant-design/icons";
import StructureLeft from "../components/structureLeft";
import StructureRight from "../components/structureRight";
import BreadcrumbContent from "../../../common/breadcrumb/breadcrumb";
import StructureEmpty from "../components/structureEmpty";
import "../components/structure.scss";
import {inject,observer} from "mobx-react";

const Structure = props => {

    const {structureStore,pipelineStore} = props

    const {findExecState,findStructureState,findAllPipelineConfig,findPageHistory,pipelineStartStructure,leftPageList,isData,
        findPipelineUser,setIsData,execState,
        state,setState,enforcer,setEnforcer,mode,setMode,pageCurrent,setPageCurrent,freshen,setFreshen
    } = structureStore
    const {pipelineId,pipeline} = pipelineStore

    const [runImState,setRunImState] = useState(false)


    // let interval,socket=null
    // useEffect(() => {
    //     // socket = new WebSocket(`ws://${window.document.location.host}/start`)
    //     socket = new WebSocket(`ws://192.168.10.100:8080/start`)
    //     socket.onopen = () =>{
    //         pipelineId && findExecState(pipelineId).then(res=>{
    //             if(res.data === 1){
    //                 interval = setInterval(()=>socket.send(pipelineId),1000)
    //                 socket.onmessage = response => renderExec(response)
    //                 findAllPipelineConfig(pipelineId) // 正在执行的详情
    //             }else if(res.data===0){
    //                 socket.close()
    //             }
    //         })
    //     }
    //     return ()=> {
    //         clearInterval(interval)
    //         socket.close()
    //     }
    // }, [pipelineId,freshen])

    // const renderExec = response => {
    //     if(response.data){
    //         const data = JSON.parse(response.data)
    //         if(data.data === 0 ){
    //             clearInterval(interval)
    //             socket.close()
    //             setExecState("")
    //             setFreshen(!freshen)
    //         } else {
    //             setIndex(0)
    //             setExecState(data.data)
    //         }
    //     }
    // }

    useEffect(()=>{
        if(pipelineId){
            findPipelineUser(pipelineId)
        }
    },[pipelineId])

    let interval=null
    useEffect(() => {
        pipelineId && findExecState(pipelineId).then(res=>{
            if(res.data===1){
                interval=setInterval(()=>
                    findStructureState(pipelineId).then(res=>{
                        if(res.code===0){renderExec(res.data)}
                    }), 1000)
                findAllPipelineConfig(pipelineId)
            }
        })
    }, [pipelineId,freshen])

    const renderExec = data => {
        if(data===null || data.runStatus===1 || data.runStatus===30){
            setFreshen(!freshen)
            clearInterval(interval)
        }
    }

    useEffect(()=>{
        pipelineId && changPage() // 历史列表
    },[pipelineId,freshen,pageCurrent,state,enforcer,mode])

    const changPage = () =>{
        const params = {
            pipelineId:pipelineId,
            state:state,
            userId:enforcer,
            type:mode
        }
        findPageHistory(params).then(res=>{
            if(res.code===0 && res.data && res.data.dataList.length===0){
                if(state===0 && enforcer===null && mode===0) {
                    if (execState==="") {
                        setIsData(false)
                    } else setIsData(true)
                }
            }
        })
    }

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

            case 0 :
                //运行
                return  <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />

            case 3:
                //运行--等待运行
                return  <PlayCircleOutlined style = {{fontSize:16}}/>

            case 5:
                //运行过程
                return  <MinusCircleOutlined style = {{fontSize:16,color:"#6698ff"}}/>
        }
    }
    
    let timeout = null
    const runImmediately = () => {
        setRunImState(true)
        timeout = setTimeout(()=>setFreshen(!freshen),1000)
        pipelineStartStructure(pipelineId).then(res=>{
            // setTimeout(()=>setFreshen(!freshen),500)
            if(res.code===0 && res.data===1){
                timeout = setTimeout(()=>setRunImState(false),500)
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    // 销毁定时器
    useEffect(()=>{
        return ()=>{
            setPageCurrent(1)
            setMode(0)
            setState(0)
            setEnforcer(null)
            clearTimeout(timeout)
            clearInterval(interval)
        }
    },[pipelineId,freshen])
    
    return (
        <div className="structure mf">
            <div className="structure-content">
                <StructureLeft
                    structureStore={structureStore}
                    pipelineId={pipelineId}
                    status={status}
                />
                <div className="structure-content-right">
                    <BreadcrumbContent firstItem={pipeline.pipelineName} secondItem={"历史"}/>
                    {
                        execState !== ""  || leftPageList && leftPageList.length > 0 ?
                            <StructureRight
                                structureStore={structureStore}
                                pipelineId={pipelineId}
                                status={status}
                            />
                            :
                            <StructureEmpty
                                runImmediately={runImmediately}
                                isData={isData}
                                runImState={runImState}
                            />
                    }
                </div>
            </div>
        </div>
    )
}

export default inject("structureStore","pipelineStore")(observer(Structure))
