import React ,{useEffect} from 'react'
import {withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import './searchResult.scss';
import {getUser} from "doublekit-core-ui";

const SearchResult = props => {

    const {pipelineStore,match}=props
    const {searchPipelineList,findOneName}=pipelineStore

    useEffect(()=>{
        const params = {
            userId : getUser().userId,
            pipelineName:match.params.searchresult
        }
        findOneName(params)
    },[])

    const  goPipelineTask= record =>{
        localStorage.setItem('pipelineName',record.pipelineName)
        localStorage.setItem('pipelineId',record.pipelineId)
        props.history.push('/index/task/work')
    }

    return(
        <div className='search'>
            <div>
                <h1 >查找的流水线</h1>
                <ul >
                    {
                       searchPipelineList  && searchPipelineList.map((item,index)=>{
                           return(
                               <li key={item.pipelineId} >
                                   <span> {index+1}、</span>
                                   <span className={'search-link'} onClick={()=> goPipelineTask(item)}>
                                       {item.pipelineName}
                                   </span>
                               </li>
                           )
                       })
                    }
               </ul>
           </div>
        </div>
    )
}

export default withRouter(inject('pipelineStore')(observer(SearchResult)))
