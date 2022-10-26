import React,{useState,useEffect} from "react";
import {getUser} from "tiklab-core-ui";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import "../components/workSpace.scss";
import WorkSpaceNod from "../components/workSpaceNod";
import WorkSpaceRecord from "../components/workSpaceRecord";
import WorkSpaceDrawer from "../components/workSpaceDrawer";
import BreadcrumbContent from "../../../../common/breadcrumb/breadcrumb";

const WorkSpace = props =>{

    const {workSpaceStore,pipelineStore} = props

    const {getSubmitMassage,fileTree,readFile,recordList,fileList,setFileList} = workSpaceStore
    const {pipelineId,pipeline} = pipelineStore

    const [fresh,setFresh] = useState(false)
    const [catalogue,setCatalogue] = useState([]) // 目录
    const [detailsDrawer,setDetailsDrawer] = useState(false)
    const [isFileList,setIsFileList] = useState(false) // 源文件初始是否有数据
    const [drawerContent,setDrawerContent] = useState("")
    const userId = getUser().userId

    // 近期提交记录
    useEffect(()=>{
        if(pipelineId){
            getSubmitMassage(pipelineId)
            setCatalogue([])
        }
    },[pipelineId])

    // 节点空间
    useEffect(()=>{
        const params = {
            pipelineId:pipelineId,
            userId:userId
        }
        pipelineId && fileTree(params).then(res=>{
            if(res.code===0){
                if(res.data){
                    setIsFileList(true)
                }else setIsFileList(false)
            }
        })
    },[fresh,pipelineId])

    return(
        <div className="workSpace">
            <div className="workSpace-top workSpace-top-limited">
                <BreadcrumbContent
                    firstItem={pipeline.pipelineName}
                    secondItem={"概况"}
                />
            </div>
            <div className="workSpace-content">
                <WorkSpaceNod
                    isFileList={isFileList}
                    pipelineName={pipeline.pipelineName}
                    fileList={fileList}
                    setFileList={setFileList}
                    fresh={fresh}
                    setFresh={setFresh}
                    catalogue={catalogue}
                    setCatalogue={setCatalogue}
                    readFile={readFile}
                    setDetailsDrawer={setDetailsDrawer}
                    setDrawerContent={setDrawerContent}
                />
                <WorkSpaceRecord
                    recordList={recordList}
                    setDetailsDrawer={setDetailsDrawer}
                    setDrawerContent={setDrawerContent}
                />
                <WorkSpaceDrawer
                    detailsDrawer={detailsDrawer}
                    setDetailsDrawer={setDetailsDrawer}
                    drawerContent={drawerContent}
                />
            </div>
        </div>
    )
}

export default withRouter(inject("workSpaceStore","pipelineStore")(observer(WorkSpace)))