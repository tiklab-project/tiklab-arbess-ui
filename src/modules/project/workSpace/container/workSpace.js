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

    const {workSpaceStore,matFlowStore} = props

    const {getSubmitMassage,fileTree,readFile,recordList,fileList,setFileList} = workSpaceStore
    const {matFlowId,matFlowName} = matFlowStore

    const [fresh,setFresh] = useState(false)
    const [catalogue,setCatalogue] = useState([]) // 目录
    const [detailsDrawer,setDetailsDrawer] = useState(false)
    const [drawerContent,setDrawerContent] = useState("")
    const userId = getUser().userId

    // 近期提交记录
    useEffect(()=>{
        if(matFlowId){
            getSubmitMassage(matFlowId)
            setCatalogue([])
        }
    },[matFlowId])

    // 节点空间
    useEffect(()=>{
        const params = {
            matFlowId:matFlowId,
            userId:userId
        }
        if(matFlowId){
            fileTree(params)
        }
    },[fresh,matFlowId])

    return(
        <div className="workSpace">
            <div className="workSpace-top">
                <BreadcrumbContent
                    config={"config"}
                    firstItem={matFlowName}
                    secondItem={"工作空间"}
                />
            </div>
            <div className="workSpace-content">
                <WorkSpaceNod
                    matFlowName={matFlowName}
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

export default withRouter(inject("workSpaceStore","matFlowStore")(observer(WorkSpace)))