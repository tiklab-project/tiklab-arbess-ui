import React ,{useState,useEffect} from 'react'
import {withRouter} from "react-router";
import './workSpace.scss'
import {inject,observer} from "mobx-react";
import WorkSpaceNod from "../components/workSpaceNod";
import WorkSpaceRecord from "../components/workSpaceRecord";

const WorkSpace = props =>{

    const {workSpaceStore} = props
    const {getSubmitMassage,fileTree,recordList} = workSpaceStore
    const pipelineId = localStorage.getItem('pipelineId')
    const [fileList,setFileList] = useState([])
    const [initial,setInitial] = useState(false)
    const [catalogue,setCatalogue] = useState([]) // 目录

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
        <div className='workSpace task'>
            <WorkSpaceNod
                fileList={fileList}
                setFileList={setFileList}
                initial={initial}
                setInitial={setInitial}
                catalogue={catalogue}
                setCatalogue={setCatalogue}
            />
            <WorkSpaceRecord
                recordList={recordList}
            />
        </div>
    )
}

export default withRouter(inject('workSpaceStore')(observer(WorkSpace)))