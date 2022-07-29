import React,{useEffect} from "react";
import "./searchResult.scss";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";

const SearchResult = props => {

    const {matFlowStore,match}=props
    const {searchMatFlowList,findOneName}=matFlowStore

    useEffect(()=>{
        const params = {
            userId: getUser().userId,
            matFlowName:match.params.searchresult,
        }
        findOneName(params)
    },[])

    const goMatFlowTask= item =>{
        props.history.push(`/index/task/${item.matFlowName}/work`)
    }

    return(
        <div className="matFlow-search">
            <div>
                <h1 >查找的流水线</h1>
                <ul>
                    {
                        searchMatFlowList.length === 0 ?
                            <li>
                                没有查询到
                            </li>
                            :
                            searchMatFlowList  && searchMatFlowList.map((item,index)=>{
                                return  <li key={item.matFlowId} >
                                            <span> {index+1}、</span>
                                            <span className="matFlow-search-link" onClick={()=>goMatFlowTask(item)}>
                                                {item.matFlowName}
                                            </span>
                                        </li>
                            })
                    }
               </ul>
           </div>
        </div>
    )
}

export default withRouter(inject("matFlowStore")(observer(SearchResult)))
