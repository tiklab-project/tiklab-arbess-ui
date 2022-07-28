import React,{useEffect} from "react";
import "./searchResult.scss";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import {getUser} from "doublekit-core-ui";

const SearchResult = props => {

    const {pipelineStore,match}=props
    const {searchPipelineList,findOneName}=pipelineStore

    useEffect(()=>{
        const params = {
            userId: getUser().userId,
            pipelineName:match.params.searchresult,
        }
        findOneName(params)
    },[])

    const goPipelineTask= item =>{
        props.history.push(`/index/task/${item.pipelineName}/work`)
    }

    return(
        <div className="pipeline-search">
            <div>
                <h1 >查找的流水线</h1>
                <ul>
                    {
                        searchPipelineList.length === 0 ?
                            <li>
                                没有查询到
                            </li>
                            :
                            searchPipelineList  && searchPipelineList.map((item,index)=>{
                                return  <li key={item.pipelineId} >
                                            <span> {index+1}、</span>
                                            <span className="pipeline-search-link" onClick={()=>goPipelineTask(item)}>
                                                {item.pipelineName}
                                            </span>
                                        </li>
                            })
                    }
               </ul>
           </div>
        </div>
    )
}

export default withRouter(inject("pipelineStore")(observer(SearchResult)))
