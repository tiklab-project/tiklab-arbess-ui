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

const Structure = props => {

    const {structureStore,structureListStore,pipelineStore} = props

    const {findExecState,findStructureState,findAllPipelineConfig,findPageHistory,pipelineStartStructure,leftPageList,isData,
        findPipelineUser,setIsData,execState} = structureStore
    const {state,setState,enforcer,setEnforcer,mode,setMode,setPageCurrent,freshen,setFreshen,setDrop,drop} = structureListStore
    const {pipelineId,pipelineName} = pipelineStore
    const userId = getUser().userId

    const [runImState,setRunImState] = useState(false)

    useEffect(()=>{
        if(pipelineId){
            setPageCurrent(1)
            setMode(0)
            setState(0)
            setEnforcer(null)
            findPipelineUser(pipelineId)
        }
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
            changPage() // 历史列表
        })
    }, [pipelineId,freshen])

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

    // 查找所有构建历史
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
            if(res.code===0 && res.data.dataList.length===0){
                setIsData(false)
            }
        })
    }

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
            pipelineId:pipelineId
        }
        setRunImState(true)
        timeout = setTimeout(()=>setFreshen(!freshen),1000)
        pipelineStartStructure(params).then(res=>{
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
    },[pipelineId,freshen])
    
    return (
        <div className="structure">
            <div className="structure-content">
                <StructureLeft
                    pipelineId={pipelineId}
                    status={status}
                />
                <div className="structure-content-right">
                    <BreadcrumbContent firstItem={pipelineName} secondItem={"历史"}/>
                    {
                        execState !== ""  || leftPageList && leftPageList.length > 0 ?
                            <StructureRight
                                freshen={freshen}
                                setFreshen={setFreshen}
                                status={status}
                                setPageCurrent={setPageCurrent}
                                pipelineId={pipelineId}
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

export default inject("structureStore","structureListStore","pipelineStore")(observer(Structure))
