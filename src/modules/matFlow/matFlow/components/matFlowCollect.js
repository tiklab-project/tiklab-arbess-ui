import React,{useEffect,useState} from "react";
import "./matFlowCollect.scss";
import MatFlowTable from "./matFlowTable";
import {getUser} from "tiklab-core-ui";
import {inject,observer} from "mobx-react";

const MatFlowCollect = props =>{

    const {matFlowStore} = props
    const {findAllFollow,followList,updateFollow} = matFlowStore

    const [fresh,setFresh] = useState(false)
    const userId = getUser().userId

    useEffect(()=>{
        findAllFollow(userId)
    },[fresh])

    return(
        <div className="matFlowCollect">
            <div className="matFlowCollect-title">我的收藏</div>
            <MatFlowTable
                list={followList}
                fresh={fresh}
                setFresh={setFresh}
                userId={userId}
                updateFollow={updateFollow}
            />
        </div>
    )
}

export default inject("matFlowStore")(observer(MatFlowCollect))