import React ,{useState,useEffect} from 'react'
import {withRouter} from "react-router";
import './workSpace.scss'
import {inject,observer} from "mobx-react";
import WorkSpaceNod from "../components/workSpaceNod";
import WorkSpaceRecord from "../components/workSpaceRecord";

const WorkSpace = props =>{

    const {workSpaceStore} = props
    const {getSubmitMassage} = workSpaceStore
    const [recordList,setRecordList] = useState([])
    const pipelineId = localStorage.getItem('pipelineId')

    useEffect(()=>{
        getSubmitMassage(pipelineId).then(res=>{
            console.log(res,'近期提交记录')
            setRecordList(res.data)
        }).catch(error=>{
            console.log(error)
        })
    },[pipelineId])

    return(
        <div className='workSpace task'>
            <WorkSpaceNod/>
            <WorkSpaceRecord
                recordList={recordList}
            />
        </div>
    )
}

export default withRouter(inject('workSpaceStore')(observer(WorkSpace)))