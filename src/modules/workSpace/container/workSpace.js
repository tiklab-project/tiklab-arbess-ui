import React ,{useState,useEffect} from 'react'
import {withRouter} from "react-router";
import './workSpace.scss'
import {inject,observer} from "mobx-react";
import WorkSpaceNod from "../components/workSpaceNod";
import WorkSpaceRecord from "../components/workSpaceRecord";
import WorkSpaceDrawer from "../components/workSpaceDrawer";

const WorkSpace = props =>{

    const {workSpaceStore} = props
    const {getSubmitMassage,fileTree,recordList,readFile} = workSpaceStore

    const [fileList,setFileList] = useState([])
    const [initial,setInitial] = useState(false)
    const [catalogue,setCatalogue] = useState([]) // 目录
    const [detailsDrawer,setDetailsDrawer] = useState(false)
    const [drawerContent,setDrawerContent] = useState('')
    const pipelineId = localStorage.getItem('pipelineId')

    useEffect(()=>{
        getSubmitMassage(pipelineId)
        setCatalogue([])
    },[pipelineId])

    useEffect(()=>{
        fileTree(pipelineId).then(res=>{
            setFileList(res.data)
        }).catch(error=>{
            console.log(error)
        })
    },[initial,pipelineId])



    return(
        <div className='workSpace'>
            <WorkSpaceNod
                fileList={fileList}
                setFileList={setFileList}
                initial={initial}
                setInitial={setInitial}
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
    )
}

export default withRouter(inject('workSpaceStore')(observer(WorkSpace)))