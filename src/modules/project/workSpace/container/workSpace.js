import React,{useState,useEffect,Fragment} from "react";
import "../components/workSpace.scss";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import WorkSpaceNod from "../components/workSpaceNod";
import WorkSpaceRecord from "../components/workSpaceRecord";
import WorkSpaceDrawer from "../components/workSpaceDrawer";
import BreadcrumbContent from "../../../../common/breadcrumb/breadcrumb";
import {getUser} from "doublekit-core-ui";

const WorkSpace = props =>{

    const {workSpaceStore} = props
    const {getSubmitMassage,fileTree,readFile,recordList,fileList,setFileList} = workSpaceStore

    const [fresh,setFresh] = useState(false)
    const [catalogue,setCatalogue] = useState([]) // 目录
    const [detailsDrawer,setDetailsDrawer] = useState(false)
    const [drawerContent,setDrawerContent] = useState("")
    const pipelineId = localStorage.getItem("pipelineId")
    const userId = getUser().userId

    // 近期提交记录
    useEffect(()=>{
        getSubmitMassage(pipelineId)
        setCatalogue([])
    },[pipelineId])

    // 节点空间
    useEffect(()=>{
        const params = {
            pipelineId:pipelineId,
            userId:userId
        }
        fileTree(params)
    },[fresh,pipelineId])

    const style = {
        "position":"fixed",
        "width":"93%",
        "marginLeft":"15px"
    }

    return(
        <Fragment>
            <BreadcrumbContent style={style} type={"project"}/>
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