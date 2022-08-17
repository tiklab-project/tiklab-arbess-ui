import React,{useEffect} from "react";
import "./searchResult.scss";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";

const SearchResult = props => {

    const {matFlowStore,match}=props
    const {searchMatFlowList,findLike}=matFlowStore

    useEffect(()=>{
        const params = {
            userId: getUser().userId,
            matFlowName:match.params.searchresult,
        }
        findLike(params)
    },[])

    const goMatFlowTask= item =>{
        props.history.push(`/index/task/${item.matflowName}/work`)
    }

    return(
        <div className="matFlow-search">
            <div>
                <h1>查找的流水线</h1>
                <ul>
                    {
                        searchMatFlowList && searchMatFlowList.length > 0 ?
                            searchMatFlowList  && searchMatFlowList.map((item,index)=>{
                                return  <li key={item.matflowId} >
                                            <span>{index+1}、</span>
                                            <span className="matFlow-search-link" onClick={()=>goMatFlowTask(item)}>
                                                {item.matflowName}
                                            </span>
                                        </li>
                            })
                            :
                            <li>没有查询到</li>
                    }
               </ul>
           </div>
        </div>
    )
}

export default withRouter(inject("matFlowStore")(observer(SearchResult)))
