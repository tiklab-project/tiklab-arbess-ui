import React ,{useEffect,useState} from "react";
import "./pipelineCollect.scss";
import {getUser} from "doublekit-core-ui";
import {inject,observer} from "mobx-react";
import PipelineTable from "../../pipelineTable/pipelineTable";

const PipelineCollect = props =>{

    const {pipelineCollectStore} = props
    const {findAllFollow,followList} = pipelineCollectStore

    const [fresh,setFresh] = useState(false)

    useEffect(()=>{
        findAllFollow(getUser().userId)
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