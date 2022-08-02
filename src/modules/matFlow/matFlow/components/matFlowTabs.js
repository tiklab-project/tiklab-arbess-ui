import React,{useEffect,useState} from "react";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";
import MatFlowTable from "../../matFlowTable/matFlowTable";

const MatFlowTabs = props =>{

    const {matFlowStore,matFlowCollectStore}=props

    const {findAllMatFlowStatus,matFlowList}=matFlowStore
    const {findAllFollow,followList} = matFlowCollectStore

    const [fresh,setFresh] = useState(false)
    const [type,setType] = useState(1)
    const userId = getUser().userId

    useEffect(()=>{
        if(type===1){
            findAllMatFlowStatus(userId)
        }else{
            findAllFollow(userId)
        }
    },[fresh,type])

    const lis = [
        {id:1, title:"所有"},
        {id:2, title:"收藏"}
    ]

    const onclick = item => {
        setType(item.id)
    }

    return(
        <div className="matFlow-tabs">
            <div className="matFlow-tabs-type">
                <div className="matFlow-tabs-type-group">
                    {
                        lis.map(item=>{
                            return <div key={item.id}
                                        className={`matFlow-tabs-type-link 
                                        ${type===item.id ? "matFlow-tabs-type-active" : null}`}
                                        onClick={()=>onclick(item)}
                                    >
                                        {item.title}
                                    </div>
                        })
                    }
                </div>
            </div>
            <MatFlowTable
                list={type === 1 ? matFlowList : followList}
                fresh={fresh}
                setFresh={setFresh}
            />
        </div>
    )
}

export default withRouter(inject("matFlowStore","matFlowCollectStore")(observer(MatFlowTabs)))
