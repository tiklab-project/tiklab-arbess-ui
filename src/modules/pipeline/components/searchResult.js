import React,{useEffect} from "react";
import "./searchResult.scss";
import {withRouter} from "react-router";
import {inject,observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";

const SearchResult = props => {

    const {pipelineStore,match}=props
    const {searchPipelineList,findLike}=pipelineStore

    useEffect(()=>{
        const params = {
            userId: getUser().userId,
            pipelineName:match.params.searchresult,
        }
        findLike(params)
    },[])

    const goPipelineTask= item =>{
        props.history.push(`/index/task/${item.pipelineName}/work`)
    }

    return(
        <div className="pipeline-search">
            <div>
                <h1>查找的流水线</h1>
                <ul>
                    {
                        searchPipelineList && searchPipelineList.length > 0 ?
                            searchPipelineList.map((item,index)=>{
                                return  <li key={item.pipelineId}>
                                            <span>{index+1}、</span>
                                            <span className="pipeline-search-link" onClick={()=>goPipelineTask(item)}>
                                                {item.pipelineName}
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

export default withRouter(inject("pipelineStore")(observer(SearchResult)))
