import React from 'react'
import './pipelineHeader'
import {withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";
import './searchResult.scss'


const SearchResult = props => {

    // const {PIPELINE_STORE}=props
    // const {searchPipelineList}=PIPELINE_STORE

    const searchPipelineList=JSON.parse(localStorage.getItem('searchPipelineList'))

    const  goPipelineTask= (text) =>{
        localStorage.setItem('pipelineName',text.pipelineName)
        localStorage.setItem('pipelineId',text.pipelineId)
        props.history.push('/home/task/work')
    }

    return(
        <div className='search'>
           <div>
               <h1 >查找的流水线</h1>
               <ul >
                   {
                       searchPipelineList  && searchPipelineList.map((item,index)=>{
                           return(
                               <li key={item.pipelineId} onClick={()=>
                                   goPipelineTask(item)
                               }>
                                   {index+1}、{item.pipelineName}
                               </li>
                           )
                       })
                   }
               </ul>
           </div>
        </div>
    )
}

// export default withRouter(inject('PIPELINE_STORE')(observer(SearchResult)))
export default withRouter(SearchResult)
