import React,{useEffect,useState} from "react";
import "../components/structure.scss";
import {getUser} from "doublekit-core-ui";
import {Spin} from "antd";
import {LoadingOutlined,ExclamationCircleOutlined,CloseCircleOutlined} from "@ant-design/icons";
import StructureLeft from "../components/structureLeft";
import BreadcrumbContent from "../../../../common/breadcrumb/breadcrumb";
import StructureRight from "../components/structureRight";
import StructureEmpty from "../components/structureEmpty";
import {inject,observer} from "mobx-react";

// 项目构建
const Structure = props => {

    const {structureStore,structureListStore,pipelineStore} = props

    const {findExecState,findStructureState,findAll,findPageHistory,pipelineStartStructure,
        leftPageList,setIndex,isData,findPipelineUser,setIsData
    } = structureStore
    const {state,enforcer,mode,setPageCurrent,freshen,setFreshen,setDrop,drop} = structureListStore
    const {pipelineId} = pipelineStore

    const [execState,setExecState] = useState("") //左侧 -- 正在构建
    const userId = getUser().userId

    useEffect(()=>{
        setPageCurrent(1)
        findPipelineUser(pipelineId)
    },[pipelineId])

    // let interval,socket=null
    // useEffect(() => {
    //     socket = new WebSocket("ws://192.168.10.101:8080/start")
    //     socket.onopen = () =>{
    //         findExecState(pipelineId).then(res=>{
    //             if(res.data === 1 ){
    //                 interval = setInterval(()=>socket.send(pipelineId),1000)
    //                 socket.onmessage = response => renderExec(response)
    //                 findAll(pipelineId) // 构建状态
    //             }else if(res.data=== 0){
    //                 setExecState("")
    //                 socket.close()
    //             }
    //             changPage() // 历史列表
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
    //         if( data.data === 0 ){
    //             clearInterval(interval)
    //             socket.close()
    //             setExecState("")
    //             setFreshen(!freshen)
    //         } setExecState(data.data)
    //     }
    // }

    const findPage = () =>{
        const params = {
            pipelineId:pipelineId,
            pageParam: {
                pageSize: 10,
                currentPage: 1
            },
            state:0,
            userId:null,
            type:0
        }
        findPageHistory(params).then(res=>{
            if(res.code === 0 && res.data.dataList.length === 0){
                setIsData(false)
            }
        })
    }

    const changPage = () =>{
        const params = {
            pipelineId:pipelineId,
            pageParam: {
                pageSize: 10,
                currentPage: 1
            },
            state:state,
            userId:enforcer,
            type:mode
        }
        findPageHistory(params).then(res=>{
            if(res.code===0 && res.data.dataList.length===0){
                if(state !==0 || enforcer !==null || mode !==0){
                    setDrop(!drop)
                    findPage()
                } else {
                    setIsData(false)
                }
            }
        })
    }

    let interval=null
    useEffect(() => {
        findExecState(pipelineId).then(res=>{
            if(res.data===1){
                interval=setInterval(()=>{
                    findStructureState(pipelineId).then(res=>{ renderExec(res.data) })
                }, 1000)
                findAll(pipelineId)
            }else if(res.data===0){
                setExecState("")
                setIndex(1)
            }
            changPage() // 历史列表
        })
        return ()=>clearInterval(interval)
    }, [pipelineId,freshen])

    const renderExec = data => {
        if(data===null){
            stop()
        }else{
            setExecState(data)
            if(data.runStatus===1 || data.runStatus===30){
                stop()
            }
        }
    }

    const stop = () => {
        setFreshen(!freshen)
        clearInterval(interval)
    }

    const status = i =>{
        switch(i){
            case 0 :
                //运行
                return  <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            case 1 :
                //成功
                return  <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-chenggong-"/>
                        </svg>
            case 2 :
                //失败
                return  <CloseCircleOutlined style = {{fontSize:17,color:"red"}}/>
            case 3:
                //运行--等待运行
                return  <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-yunhang"/>
                        </svg>
            case 4:
                //被迫停止
                return  <ExclamationCircleOutlined style = {{fontSize:17}}/>
            case 5:
                //运行过程
                return  <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-dengdai1"/>
                        </svg>
        }
    }
    
    const runImmediately = () => {
        const params = {
            userId:userId,
            pipelineId:pipelineId
        }
        pipelineStartStructure(params).then(()=>{
            setTimeout(()=>setFreshen(!freshen),500)
        }).catch(error=>{
            console.log(error)
        })
    }

    return (
        <div className="structure">
            {
                // 没有正在构建和历史记录为null（非查询状态）
                isData ?
                    <div className="structure-content">
                        <StructureLeft
                            pipelineId={pipelineId}
                            execState={execState}
                            status={status}
                        />
                        <div className="structure-content-right">
                            <BreadcrumbContent type={"project"}/>
                            {
                                execState === ""  && leftPageList && leftPageList.length === 0 ?
                                    <StructureEmpty/>
                                    :
                                    <StructureRight
                                        freshen={freshen}
                                        setFreshen={setFreshen}
                                        status={status}
                                        execState={execState}
                                        setPageCurrent={setPageCurrent}
                                        pipelineId={pipelineId}
                                    />
                            }
                        </div>
                    </div>
                    :
                    <StructureEmpty runImmediately={runImmediately}/>
            }
        </div>
    )
}

export default inject("structureStore","structureListStore","pipelineStore")(observer(Structure))
