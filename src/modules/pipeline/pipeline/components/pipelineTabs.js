import React, {useEffect,useState} from "react";
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import PipelineTable from "../../pipelineTable/pipelineTable";
import {getUser} from "doublekit-core-ui";

const PipelineTabs = props =>{

    const {pipelineStore,pipelineCollectStore}=props

    const {findAllPipelineStatus,pipelineList}=pipelineStore
    const {findAllFollow,followList} = pipelineCollectStore
    const [fresh,setFresh] = useState(false)
    const [type,setType] = useState(1)
    const userId = getUser().userId

    useEffect(()=>{
        if(type===1){
            findAllPipelineStatus(userId)
        }else{
            findAllFollow(userId)
        }
    },[fresh,type])

    const lis = [
        {
            id:1,
            title:"所有"
        },
        {
            id:2,
            title:"收藏"
        }
    ]

    const onclick = item => {
        setType(item.id)
    }

    return(
        <div className="pipeline-tabs">
            <div className="pipeline-tabs-type">
                <div className="pipeline-tabs-type-group">
                    {
                        lis.map(item=>{
                            return <div key={item.id}
                                       className={type === item.id ?
                                       "pipeline-tabs-type-active pipeline-tabs-type-link" : "pipeline-tabs-type-link"}
                                       onClick={()=>onclick(item)}
                                    >
                                        {item.title}
                                    </div>
                        })
                    }
                </div>
            </div>
            <PipelineTable
                list={type === 1 ? pipelineList : followList}
                fresh={fresh}
                setFresh={setFresh}
            />
        </div>
    )
}

export default withRouter(inject("pipelineStore","pipelineCollectStore")(observer(PipelineTabs)))
