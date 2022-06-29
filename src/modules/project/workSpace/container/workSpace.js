import React, {useState, useEffect, Fragment} from "react"
import {withRouter} from "react-router";
import "./workSpace.scss";
import {inject,observer} from "mobx-react";
import WorkSpaceNod from "../components/workSpaceNod";
import WorkSpaceRecord from "../components/workSpaceRecord";
import WorkSpaceDrawer from "../components/workSpaceDrawer";
import ProjectBreadcrumb from "../../breadcrumb/projectBreadcrumb";
import {getUser} from "doublekit-core-ui";

const WorkSpace = props =>{

    const {workSpaceStore} = props
    const {getSubmitMassage,fileTree,readFile,recordList} = workSpaceStore

    const [fileList,setFileList] = useState([])
    const [fresh,setFresh] = useState(false)
    const [catalogue,setCatalogue] = useState([]) // 目录
    const [detailsDrawer,setDetailsDrawer] = useState(false)
    const [drawerContent,setDrawerContent] = useState("")
    const pipelineId = localStorage.getItem("pipelineId")

    useEffect(()=>{
        getSubmitMassage(pipelineId)
        setCatalogue([])
    },[pipelineId])

    useEffect(()=>{
        const params = {
            pipelineId:pipelineId,
            userId:getUser().userId
        }
        fileTree(params).then(res=>{
            setFileList(res.data)
        }).catch(error=>{
            console.log(error)
        })
    },[fresh,pipelineId])

    const style = {
        "position":"fixed",
    }

    return(
        <Fragment>
            <ProjectBreadcrumb style={style}/>
            <div className="workSpace">
                <WorkSpaceNod
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
        </Fragment>
    )
}

export default withRouter(inject("workSpaceStore")(observer(WorkSpace)))