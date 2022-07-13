import React,{useEffect,useState} from "react";
import "./pipelineCollect.scss";
import PipelineTable from "../../pipelineTable/pipelineTable";
import {getUser} from "doublekit-core-ui";
import {inject,observer} from "mobx-react";

const PipelineCollect = props =>{

    const {pipelineCollectStore} = props
    const {findAllFollow,followList} = pipelineCollectStore

    const [fresh,setFresh] = useState(false)
    const userId = getUser().userId

    useEffect(()=>{
        findAllFollow(userId)
    },[fresh])

    return(
        <div className="pipelineCollect">
            <div className="pipelineCollect-title">我的收藏</div>
            <PipelineTable
                list={followList}
                fresh={fresh}
                setFresh={setFresh}
            />
        </div>
    )
}

export default inject("pipelineCollectStore")(observer(PipelineCollect))