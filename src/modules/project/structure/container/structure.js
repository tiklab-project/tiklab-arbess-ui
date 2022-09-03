import React,{useEffect,useState} from "react";
import {getUser} from "tiklab-core-ui";
import {Spin} from "antd";
import {LoadingOutlined,ExclamationCircleOutlined,CloseCircleOutlined} from "@ant-design/icons";
import StructureLeft from "../components/structureLeft";
import StructureRight from "../components/structureRight";
import BreadcrumbContent from "../../../../common/breadcrumb/breadcrumb";
import StructureEmpty from "../components/structureEmpty";
import "../components/structure.scss";
import {inject,observer} from "mobx-react";

// 项目构建
const Structure = props => {

    const {structureStore,structureListStore,matFlowStore} = props

    const {findExecState,findStructureState,findAll,findPageHistory,matFlowStartStructure,leftPageList,isData,
        findMatFlowUser,setIsData,execState} = structureStore
    const {state,setState,enforcer,setEnforcer,mode,setMode,setPageCurrent,freshen,setFreshen,setDrop,drop} = structureListStore
    const {matFlowId,matFlowName} = matFlowStore
    const userId = getUser().userId

    const [runImState,setRunImState] = useState(false)

    useEffect(()=>{
        if(matFlowId){
            setPageCurrent(1)
            setMode(0)
            setState(0)
            setEnforcer(null)
            findMatFlowUser(matFlowId)
        }
    },[matFlowId])

    // let interval,socket=null
    // useEffect(() => {
    //     socket = new WebSocket("ws://192.168.10.101:8080/start")
    //     socket.onopen = () =>{
    //         findExecState(matFlowId).then(res=>{
    //             if(res.data === 1 ){
    //                 interval = setInterval(()=>socket.send(matFlowId),1000)
    //                 socket.onmessage = response => renderExec(response)
    //                 findAll(matFlowId) // 构建状态
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
    // }, [matFlowId,freshen])

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
            matflowId:matFlowId,
            pageParam: {
                pageSize: 10,
                currentPage: 1
            },
            state:0,
            userId:null,
            type:0
        }
        findPageHistory(params).then(res=>{
            if(res.code===0 && res.data.dataList.length===0){
                setIsData(false)
            }
        })
    }

    const changPage = () =>{
        const params = {
            matflowId:matFlowId,
            pageParam: {
                pageSize: 10,
                currentPage: 1
            },
            state:state,
            userId:enforcer,
            type:mode
        }
        findPageHistory(params).then(res=>{
            if(res.code===0 && res.data && res.data.dataList.length===0){
                if(state!==0 || enforcer!==null || mode!==0){
                    setDrop(!drop)
                    findPage()
                }else{
                    if(execState===""){
                        setIsData(false)
                    }else setIsData(true)
                }
            }
        })
    }

    let interval=null
    useEffect(() => {
        if(matFlowId){
            findExecState(matFlowId).then(res=>{
                if(res.data===1){
                    interval=setInterval(()=>
                        findStructureState(matFlowId).then(res=>{
                            if(res.code===0){renderExec(res.data)}
                        }), 1000)
                    findAll(matFlowId)
                }
                changPage() // 历史列表
            })
        }
    }, [matFlowId,freshen])

    const renderExec = data => {
        if(data===null || data.runStatus===1 || data.runStatus===30){
            setFreshen(!freshen)
            clearInterval(interval)
        }
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
    
    let timeout = null
    const runImmediately = () => {
        const params = {
            userId:userId,
            matFlowId:matFlowId
        }
        setRunImState(true)
        timeout = setTimeout(()=>setFreshen(!freshen),1000)
        matFlowStartStructure(params).then(res=>{
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
            clearTimeout(timeout)
            clearInterval(interval)
        }
    },[matFlowId,freshen])
    
    return (
        <div className="structure">
            {
                // 没有正在构建和历史记录为null（非查询状态）
                isData ?
                    <div className="structure-content">
                        <StructureLeft
                            matFlowId={matFlowId}
                            status={status}
                        />
                        <div className="structure-content-right">
                            <BreadcrumbContent firstItem={matFlowName} secondItem={"历史"}/>
                            {
                                execState === ""  && leftPageList && leftPageList.length === 0 ?
                                    <StructureEmpty/>
                                    :
                                    <StructureRight
                                        freshen={freshen}
                                        setFreshen={setFreshen}
                                        status={status}
                                        setPageCurrent={setPageCurrent}
                                        matFlowId={matFlowId}
                                    />
                            }
                        </div>
                    </div>
                    :
                    <StructureEmpty
                        runImmediately={runImmediately}
                        runImState={runImState}
                        matFlowName={matFlowName}
                    />
            }
        </div>
    )
}

export default inject("structureStore","structureListStore","matFlowStore")(observer(Structure))
